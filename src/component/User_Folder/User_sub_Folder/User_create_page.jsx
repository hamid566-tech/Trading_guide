import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali';
import { useLanguage } from "../../../context/LanguageContext";


const User_create_page = () => {

    const [id,setID]=useState('');
    const [idError,setIDError] = useState('');
    const [mode, setMode] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const { t, language } = useLanguage();
    
    const navigate=useNavigate();
    
    const [inputFields] = useState([
        {label:"name", type:"text", placeholder:"enter_name", required:true},
        {label:"fname", type:"text", placeholder:"enter_fname", required:true},
        {label:"tazkira", type:"text", placeholder:"enter_tazkira", required:true},
        {label:"phone", type:"text", placeholder:"enter_phone", required:true},
        {label:"date", type:"text", placeholder:"enter_date", required:true},
        {label:"user_name", type:"text", placeholder:"enter_user_name", required:true},
        {label:"password", type:"password", placeholder:"enter_password", required:true},
    ]);

    const [checkFields] = useState([
        {label:"rent_form"},
        {label:"rent_report"},
        {label:"mortgage_form"},
        {label:"mortgage_report"},
        {label:"saleable_form"},
        {label:"saleable_report"},
        {label:"applicant_form"},
        {label:"applicant_report"},
        {label:"user_create_form"},
        {label:"user_report"},
    ]);

    const [limitation] = useState([
        {label:"submit"},
        {label:"update_perm"},
        {label:"delete_perm"},
        {label:"search_perm"},
        {label:"print_perm"},
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // اگر فیلد phone است، فقط اعداد را قبول کن
        if(name === "phone"){
            if(!/^\d*$/.test(value)) return; // اگر غیر عدد است، مقدار را نادیده بگیر
        }
        setFormData({...formData,[name]: value});
        // حذف خطا اگر بود
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked ? 1 : 0
        }));

        // اگر می‌خواهید خطا برای checkbox هم حذف شود
        setErrors(prev => ({ ...prev, [name]: "" }));
    };


    
    const handleSearch = async () => {

        if(!id.trim()){
        alert(t.enter_id_warning);
        return;
        }

        try{

        const res = await fetch(`http://localhost:5000/api/user_permissions/${id}`);
        const data = await res.json();

        if(data.success){

        setFormData({
        name: data.user.name,
        fname: data.user.fname,
        tazkira: data.user.tazkira,
        phone: data.user.phone,
        date: data.user.date,
        user_name: data.user.user_name,
        password: data.user.password,

        rent_form: data.user.rent_form,
        rent_report: data.user.rent_report,
        mortgage_form: data.user.mortgage_form,
        mortgage_report: data.user.mortgage_report,
        saleable_form: data.user.saleable_form,
        saleable_report: data.user.saleable_report,
        applicant_form: data.user.applicant_form,
        applicant_report: data.user.applicant_report,
        user_create_form: data.user.user_create_form,
        user_report: data.user.user_report,

        submit: data.user.submit,
        update_perm: data.user.update_perm,
        delete_perm: data.user.delete_perm,
        search_perm: data.user.search_perm,
        print_perm: data.user.print_perm

        });

            setMode("edit");
            setErrors({});

        }else{
            alert(t.id_not_found)
            setFormData({});
            setMode("");
            setErrors({});
        }

        }catch(error){
        console.log(error);
        }

    };

    const handleSubmit = async () => {

        // اگر ID پر باشد یعنی کاربر جدید نیست
        if(id.trim()){
            const confirmMsg = window.confirm(t.confirm_reload);

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        setMode('submit');
        // -------- Validation --------
        let newErrors = {};

        inputFields.forEach(field =>{
            const val = formData[field.label]?.trim();

            if(field.required && !val){
                newErrors[field.label] = "field_required";
            }

            if(field.label === "phone" && val && !/^\d+$/.test(val)){
                newErrors[field.label] = "invalid_phone";
            }
        });

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        // -------- Confirmation AFTER validation --------
        const confirmSubmit = window.confirm(t.confirm_submit);
        if(!confirmSubmit) return;

        try{

            const res = await fetch("http://localhost:5000/api/user_permissions/add",{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify(formData)
            });

            const data = await res.json();
 
            if (!res.ok) {
                alert(t.user_already_exist);
                return;
            }

            if(data.success){
                alert(t.form_successfully_saved + data.id);
                setFormData({});   // خالی شدن تمام فیلدها
                setID("");         // خالی شدن ID
                setMode("");
                setErrors({});
            }

        }catch(error){
            console.log(error);
            alert(t.server_error);
        }

    };

    const handleUpdate = async () => {

        if(!id.trim()){
            alert(t.search_id);
            return;
        }

        if(mode !== "edit"){
            const confirmMsg = window.confirm(t.confirm_reload_update);

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        let newErrors = {};

        inputFields.forEach(field =>{
            const val = formData[field.label]?.trim();

            if(field.required && !val){
                newErrors[field.label] = "field_required";
            }

            if(field.label === "phone" && val && !/^\d+$/.test(val)){
                newErrors[field.label] = "invalid_phone";
            }
        });

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return;

        const confirmUpdate = window.confirm(t.confirm_update);
        if(!confirmUpdate) return;

        try{

            const res = await fetch(`http://localhost:5000/api/user_permissions/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "❌ Server Error");
                return;
            }
            
            if(data.success){
                alert(t.information_update);

                setFormData({});
                setID("");
                setMode("");
                setErrors({});

            }else{
                alert(t.update_failed);
            }

        }catch(error){
            console.log(error);
            alert(t.server_error);
        }

    };

    const handleDelete = async () => {

        if(!id.trim()){
            alert(t.search_id);
            return;
        }

        if(mode !== "edit"){
            const confirmMsg = window.confirm(t.confirm_reload_update);

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        const confirmDelete = window.confirm(t.confirm_delete);
        if(!confirmDelete) return;

        try{

            const res = await fetch(`http://localhost:5000/api/user_permissions/${id}`,{
                method:"DELETE"
            });

            const data = await res.json();

            if(data.success){

                alert(t.record_delete);

                setFormData({});
                setID("");
                setMode("");
                setErrors({});

            }else{
                alert(t.record_not_found);
            }

        }catch(error){
            console.log(error);
            alert(t.server_error);
        }

    };


  return (
    <div className="mt-24 w-full max-w-5xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30 select-none">
                
              {/* Back Button - Left */}
                <div className={`fixed top-6 ${document.documentElement.dir === "rtl" ? "right-6" : "left-6"} z-50`}>
                    <button
                        onClick={() => navigate(-1)}
                        className="group relative p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-yellow-400/40 active:scale-90 transition-all duration-300 cursor-pointer">
                            <ArrowLeft
                            size={20}
                            className={`text-white transition-transform duration-300 ${document.documentElement.dir === "rtl" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}/>
                    </button>
                </div>
        
                    {/* ID Badge - Right */}
                <div className={`fixed top-6 ${document.documentElement.dir === "rtl" ? "left-6" : "right-6"} z-50`}>
                    <div className="px-4 py-2 text-white font-semibold">
                        S_A_6
                    </div>
                </div>
        
                <h2 className="text-xl sm:text-2xl font-bold mt-15 md:mt-0 mb-10 text-center">
                    {t.user_create_form}
                </h2>

                <div className="w-full flex flex-col items-center gap-6 mb-10">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            
                            <label className="sm:w-24 sm:text-right text-sm font-semibold ">
                                {t.id} :
                            </label>
            
                            <div className="flex flex-col sm:flex-row w-full gap-3">
                                <input
                                type="text"
                                placeholder={t.enter_id}
                                value={id}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, "");
                                    setID(value);
                                    if (value.trim()) {
                                        setMode(""); 
                                    }
                                    setIDError("");
                                }}
                                className="flex-1 px-4 py-2 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
            
                                <button
                                onClick={handleSearch}
                                className={`px-4 py-2 gap-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer`}>
                                <Search size={18} color="white" />
                                {t.search}
                                </button>
                            </div>
        
                        </div>
                    </div>
        
                </div>
        
                            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inputFields.map((field, index) => (
                        <div key={index} className="flex flex-col gap-2">
                           
                            <label className="text-sm font-semibold">
                                {t[field.label]}
                            </label>

                            <div className='relative'>
                                <input
                                    type={field.label === "password" ? (showPassword ? "text" : "password") : field.type}
                                    placeholder={t[field.placeholder]}
                                    name={field.label}
                                    value={formData[field.label] || ""}
                                    onChange={handleChange}
                                    readOnly={field.label === "date" || (field.label === "user_name" && mode === "edit")}
                                    onFocus={() => {
                                        
                                        if (field.label === "date" && !formData[field.label]) {
                                            const today = moment().format("jYYYY/jMM/jDD");
                                            setFormData({...formData,[field.label]:today});
                                            setErrors(prev => ({...prev, [field.label]: ""}));
                                        }
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 ${errors[field.label] ? "focus:ring-red-400 border border-red-400" : "focus:ring-yellow-400"} `}
                                />

                                {/* 👇 button باید اینجا باشد */}
                                {field.label === "password" && (
                                    <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute ${document.documentElement.dir === "rtl" ? "left-3" : "right-3"} top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white`}>
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                )}
                            </div>
                            {errors[field.label] && (<span className="text-red-400 text-sm font-medium">{t[errors[field.label]]}</span>)}
                        </div>
                    ))}
                </div>

                <div className="mt-10 p-6 bg-white/10 rounded-xl border border-white/20">
                
                    <h3 className="text-lg font-bold mb-6 text-center">
                        {t.user_permissions}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {checkFields.map((field, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 text-sm font-semibold cursor-pointer"
                        >
                            <input
                            type="checkbox"
                            name={field.label}
                            checked={formData[field.label] === 1 ? true : false}
                            onChange={handleCheckbox}
                            className="w-5 h-5 accent-yellow-400 cursor-pointer"
                            />
                            {t[field.label]}
                        </label>
                        ))}
                    </div>
                </div>

                <div className="mt-10 p-6 bg-white/10 rounded-xl border border-white/20">
                
                    <h3 className="text-lg font-bold mb-6 text-center">
                        {t.user_limitations}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {limitation.map((field, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 text-sm font-semibold cursor-pointer"
                        >
                            <input
                            type="checkbox"
                            name={field.label}
                            checked={formData[field.label] === 1 ? true : false}
                            onChange={handleCheckbox}
                            className="w-5 h-5 accent-yellow-400 cursor-pointer"
                            />
                            {t[field.label]}
                        </label>
                        ))}
                    </div>
                </div>

        
              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
                {/* Submit */}
                <button 
                onClick={handleSubmit}
                disabled={user?.submit === 0}
                className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg  ${user?.submit === 0 ? "bg-gray-400 cursor-not-allowed" : " cursor-pointer bg-linear-to-r from-green-400 to-emerald-600 hover:scale-105 hover:shadow-green-500/40"}`}>
                    {t.submit}
                </button>
        
                {/* Update */}
                <button 
                onClick={handleUpdate}
                disabled={user?.update_perm === 0}
                className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${user?.update_perm === 0 ? "bg-gray-400 cursor-not-allowed": "bg-linear-to-r from-blue-400 to-indigo-600 hover:scale-105 hover:shadow-blue-500/40 cursor-pointer"}`}>
                    {t.update}
                </button>
        
                {/* Delete */}
                <button 
                onClick={handleDelete}
                disabled={user?.delete_perm === 0}
                className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${user?.delete_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-rose-500 via-red-600 to-red-800 hover:scale-105 hover:shadow-red-500/40 cursor-pointer"}`}>
                    {t.delete}
                </button>
              </div>
        
            </div>
  )
}

export default User_create_page
