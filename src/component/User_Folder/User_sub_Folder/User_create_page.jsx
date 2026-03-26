import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali';

const User_create_page = () => {

    const [id,setID]=useState('');
    const [idError,setIDError] = useState('');
    const [mode, setMode] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    
    const navigate=useNavigate();
    
    const [inputFields] = useState([
        {label:"Name", type:"text", placeholder:"Enter Name", required:true},
        {label:"FName", type:"text", placeholder:"Enter Father Name", required:true},
        {label:"Tazkira", type:"text", placeholder:"Enter Tazkira Number", required:true},
        {label:"phone", type:"text", placeholder:"Enter Phone Number", required:true},
        {label:"Date", type:"text", placeholder:"Enter Date Number", required:true},
        {label:"User Name", type:"text", placeholder:"Enter Date Number", required:true},
        {label:"Password", type:"password", placeholder:"Enter Date Number", required:true},
    ]);

    const [checkFields] = useState([
        {label:"Rent Form"},
        {label:"Rent Report"},
        {label:"Mortgage Form"},
        {label:"Mortgage Report"},
        {label:"Saleable Form"},
        {label:"Saleable Report"},
        {label:"Applicant Form"},
        {label:"Applicant Report"},
        {label:"User Create Form"},
        {label:"User Report"},
    ]);

    const [limitation] = useState([
        {label:"Submit"},
        {label:"Update"},
        {label:"Delete"},
        {label:"Search"},
        {label:"Print"},
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

        if(!id){
        alert("Please enter ID");
        return;
        }

        try{

        const res = await fetch(`http://localhost:5000/api/user_permissions/${id}`);
        const data = await res.json();

        if(data.success){

        setFormData({
        Name:data.user.name,
        FName:data.user.fname,
        Tazkira:data.user.tazkira,
        phone:data.user.phone,
        Date:data.user.date,
        "User Name":data.user.user_name,
        "Password":data.user.password,

        "Rent Form":data.user.rent_form,
        "Rent Report":data.user.rent_report,
        "Mortgage Form":data.user.mortgage_form,
        "Mortgage Report":data.user.mortgage_report,
        "Saleable Form":data.user.saleable_form,
        "Saleable Report":data.user.saleable_report,
        "Applicant Form":data.user.applicant_form,
        "Applicant Report":data.user.applicant_report,
        "User Create Form":data.user.user_create_form,
        "User Report":data.user.user_report,

        Submit:data.user.submit,
        Update:data.user.update_perm,
        Delete:data.user.delete_perm,
        Search:data.user.search_perm,
        Print:data.user.print_perm

        });

            setMode("edit");
            setErrors({});

        }else{
            alert("User not found");
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
            const confirmMsg = window.confirm(
            "ID must be empty for new user.\nReload page?"
            );

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        // -------- Validation --------
        let newErrors = {};

        inputFields.forEach(field =>{
            const val = formData[field.label]?.trim();

            if(field.required && !val){
                newErrors[field.label] = `${field.label} is required`;
            }

            if(field.label === "phone" && val && !/^\d+$/.test(val)){
                newErrors[field.label] = "Phone must contain only numbers";
            }
        });

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            return;
        }

        // -------- Confirmation AFTER validation --------
        const confirmSave = window.confirm("Are you sure you want to save this user?");
        if(!confirmSave) return;

        try{

            const res = await fetch("http://localhost:5000/api/user_permissions/add",{
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify(formData)
            });

            const data = await res.json();
 
            if (!res.ok) {
                alert(data.message || "❌ Server Error");
                return;
            }

            if(data.success){
                alert("User saved successfully ✅ ID: " + data.id);
                setFormData({});   // خالی شدن تمام فیلدها
                setID("");         // خالی شدن ID
                setMode("");
                setErrors({});
            }

        }catch(error){
            console.log(error);
            alert("❌ Server Error");
        }

    };

    const handleUpdate = async () => {

        if(!id.trim()){
            alert("⚠️ Please search ID first");
            return;
        }

        if(mode !== "edit"){
            const confirmMsg = window.confirm(
            "You are not in search mode.\nDo you want to reload the page?"
            );

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        let newErrors = {};

        inputFields.forEach(field =>{
            const val = formData[field.label]?.trim();

            if(field.required && !val){
                newErrors[field.label] = `${field.label} is required`;
            }

            if(field.label === "phone" && val && !/^\d+$/.test(val)){
                newErrors[field.label] = "Phone must contain only numbers";
            }
        });

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return;

        const confirmUpdate = window.confirm("Are you sure you want to update this user?");
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
                alert("User updated successfully ✅");

                setFormData({});
                setID("");
                setMode("");
                setErrors({});

            }else{
                alert("Update failed ❌");
            }

        }catch(error){
            console.log(error);
            alert("Server Error ❌");
        }

    };

    const handleDelete = async () => {

        if(!id.trim()){
            alert("⚠️ Please search ID first");
            return;
        }

        if(mode !== "edit"){
            const confirmMsg = window.confirm(
            "User not searched.\nDo you want to reload the page?"
            );

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if(!confirmDelete) return;

        try{

            const res = await fetch(`http://localhost:5000/api/user_permissions/${id}`,{
                method:"DELETE"
            });

            const data = await res.json();

            if(data.success){

                alert("User deleted successfully ✅");

                setFormData({});
                setID("");
                setMode("");
                setErrors({});

            }else{
                alert("User not found ❌");
            }

        }catch(error){
            console.log(error);
            alert("Server Error ❌");
        }

    };


  return (
    <div className="mt-24 w-full max-w-5xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30 select-none">
                
              {/* Back Button - Left */}
                <div className="fixed top-6 left-6 z-50">
                    <button
                        onClick={() => navigate(-1)}
                        className="group relative p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-yellow-400/40 active:scale-90 transition-all duration-300 cursor-pointer"
                    >
                        <ArrowLeft
                        size={20}
                        className="text-white group-hover:-translate-x-1 transition-transform duration-300"
                        />
                    </button>
                    </div>
        
                    {/* ID Badge - Right */}
                    <div className="fixed top-6 right-6 z-50">
                    <div className="px-4 py-2 text-white font-semibold">
                        S_A_6
                    </div>
                </div>
        
                <h2 className="text-xl sm:text-2xl font-bold mt-15 md:mt-0 mb-10 text-center">
                    User Create Form
                </h2>

                <div className="w-full flex flex-col items-center gap-6 mb-10">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            
                            <label className="sm:w-24 sm:text-right text-sm font-semibold ">
                                ID :
                            </label>
            
                            <div className="flex flex-col sm:flex-row w-full gap-3">
                                <input
                                type="text"
                                placeholder="Enter ID"
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
                                className="px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition duration-300 flex items-center justify-center">
                                <Search size={18} color="white" />
                                </button>
                            </div>
        
                        </div>
                    </div>
        
                </div>
        
                            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inputFields.map((t, index) => (
                        <div key={index} className="flex flex-col gap-2">
                           
                            <label className="text-sm font-semibold">
                                {t.label}
                            </label>

                            <div className='relative'>
                                <input
                                    type={t.label === "Password" ? (showPassword ? "text" : "password") : t.type}
                                    placeholder={t.placeholder}
                                    name={t.label}
                                    value={formData[t.label] || ""}
                                    onChange={handleChange}
                                    readOnly={t.label === "Date" || (t.label === "User Name" && mode === "edit")}
                                    onFocus={() => {
                                        
                                        if (t.label === "Date" && !formData[t.label]) {
                                            const today = moment().format("jYYYY/jMM/jDD");
                                            setFormData({...formData,[t.label]:today});
                                            setErrors(prev => ({...prev, [t.label]: ""}));
                                        }
                                    }}
                                    className={`w-full px-4 py-2 pr-10 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 ${errors[t.label] ? "focus:ring-red-400 border border-red-400" : "focus:ring-yellow-400"} `}
                                />

                                {/* 👇 button باید اینجا باشد */}
                                {t.label === "Password" && (
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                    </button>
                                )}
                            </div>
                            {errors[t.label] && (<span className="text-red-400 text-sm">{errors[t.label]}</span>)}
                        </div>
                    ))}
                </div>

                <div className="mt-10 p-6 bg-white/10 rounded-xl border border-white/20">
                
                    <h3 className="text-lg font-bold mb-6 text-center">
                        User Permissions
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {checkFields.map((t, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 text-sm font-semibold cursor-pointer"
                        >
                            <input
                            type="checkbox"
                            name={t.label}
                            checked={formData[t.label] === 1 ? true : false}
                            onChange={handleCheckbox}
                            className="w-5 h-5 accent-yellow-400 cursor-pointer"
                            />
                            {t.label}
                        </label>
                        ))}
                    </div>
                </div>

                <div className="mt-10 p-6 bg-white/10 rounded-xl border border-white/20">
                
                    <h3 className="text-lg font-bold mb-6 text-center">
                        User Permissions
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {limitation.map((t, index) => (
                        <label
                            key={index}
                            className="flex items-center gap-3 text-sm font-semibold cursor-pointer"
                        >
                            <input
                            type="checkbox"
                            name={t.label}
                            checked={formData[t.label] === 1 ? true : false}
                            onChange={handleCheckbox}
                            className="w-5 h-5 accent-yellow-400 cursor-pointer"
                            />
                            {t.label}
                        </label>
                        ))}
                    </div>
                </div>

        
              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
                {/* Submit */}
                <button 
                onClick={handleSubmit}
                className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-green-400 to-emerald-600 rounded-lg font-semibold hover:scale-105 hover:shadow-green-500/40 transition duration-300 shadow-lg cursor-pointer">
                    Submit
                </button>
        
                {/* Update */}
                <button 
                onClick={handleUpdate}
                className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-blue-400 to-indigo-600 rounded-lg font-semibold hover:scale-105 hover:shadow-blue-500/40 transition duration-300 shadow-lg cursor-pointer">
                    Update
                </button>
        
                {/* Delete */}
                <button 
                onClick={handleDelete}
                className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-red-400 to-red-600 rounded-lg font-semibold hover:scale-105 hover:shadow-red-500/40 transition duration-300 shadow-lg cursor-pointer">
                    Delete
                </button>
              </div>
        
            </div>
  )
}

export default User_create_page
