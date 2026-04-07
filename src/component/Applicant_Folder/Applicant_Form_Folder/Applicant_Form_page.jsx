import React, { useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali';
import { useLanguage } from "../../../context/LanguageContext";

const Applicant_Form_page = () => {

    const [id,setID]=useState('');
    const [idError,setIDError] = useState('');
    const [mode, setMode] = useState('');
    const [status,setStatus] =useState('');
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));
    const { t, language } = useLanguage();

    const navigate=useNavigate();

    const [fields,setFields]=useState([
        {label:"name", type:"text", placeholder:"enter_name", required:true},
        {label:"fname", type:"text", placeholder:"enter_fname", required:true},
        {label:"tazkira", type:"text", placeholder:"enter_tazkira", required:true},
        {label:"phone", type:"text", placeholder:"enter_phone", required:true},
        {label:"date", type:"text", placeholder:"enter_date", required:true},
        {label:"property_type", type:"text", placeholder:"enter_property_type", required:true},
        {label:"property_location", type:"text", placeholder:"enter_property_location", required:true},
    ]);

    const handleSearch=async ()=>{
         if(!id.trim()){
            alert(t.enter_id_warning);
            return;
        }

        try{
            const res = await fetch(`http://localhost:5000/api/applicant/${id}`);
            const data = await res.json();

            if(data.success) {
                setFormData({
                    name: data.applicant.name || "",
                    fname: data.applicant.fname || "",
                    tazkira: data.applicant.tazkira || "",
                    phone: data.applicant.phone || "",
                    date: data.applicant.date || "",
                    property_type: data.applicant.property_type || "",
                    property_location: data.applicant.property_location || "",
                });
                
                setMode('edit');
                setErrors({});

            }else {
                alert(t.id_not_found);
                setFormData({});
                setMode("");
                setErrors({});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleSubmit = () => {
        if(id.trim()){
            const confirmMsg = window.confirm(t.confirm_reload);

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }

        setMode('submit');

        let newErrors = {};
        // ولیدیشن بقیه فیلدهای ضروری
        fields.forEach((field) => {
            if (field.required && (!formData[field.label] || !formData[field.label].trim())) {
                newErrors[field.label] = "field_required";
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {

            const confirmSubmit = window.confirm(t.confirm_submit);
            if (!confirmSubmit) return;

            fetch("http://localhost:5000/api/applicant/add", {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({...formData, status})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    alert(t.form_successfully_saved + data.id);
                    setFormData({});
                    setStatus("");
                }else {
                    alert(t.error_saving_information);
                }
            })
            .catch(err => {
                console.error("Error: ",err);
                alert(t.server_error);
            });
        }
    }

    const handleUpdate = async () => {
        if(!id.trim()) {
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

        setMode('edit');
        let newErrors={};

        // ولیدیشن فیلدهای ضروری
        fields.forEach((field)=>{
            if (field.required && (!formData[field.label] || !formData[field.label].trim())) {
                newErrors[field.label] = "field_required";
            }
        });

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return;


        const confirmUpdate = window.confirm(t.confirm_update);
        if (!confirmUpdate) return;

        try {
            const res = await fetch(`http://localhost:5000/api/applicant/${id}`, {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({...formData, status})
            });
            const data = await res.json();
            if(data.success) {
                alert(t.information_update);
                setFormData({});
                setID("");
                setMode("");
                setErrors({});
            } else {
                alert(t.update_failed);
            }
        } catch (error) {
            console.error("Error:",error);
            alert(t.server_error);
        }
    }

    const handleDelete = async () =>{
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
            const res = await fetch(`http://localhost:5000/api/applicant/${id}`,{
                method:'DELETE'
            });
            const data = await res.json();
            if(data.success){
            alert(t.record_delete);
            setFormData({});
            setID("");
            setMode("");
            setErrors({});
            } else{
                alert(t.record_not_found);
            }
        } catch (error){
            console.error("Error:",error);
            alert(t.server_error);
        }
    }
  
  return (
    <div className="mt-24 w-full max-w-5xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30 select-none">
            
          {/* Back Button - Left */}
            <div className={`fixed top-6 ${document.documentElement.dir === "rtl" ? "right-6" : "left-6"} z-50`}>
                <button
                    onClick={() => navigate(-1)}
                    className="group relative p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-yellow-400/40 active:scale-90 transition-all duration-300 cursor-pointer"
                >
                    <ArrowLeft
                    size={20}
                    className={`text-white transition-transform duration-300 ${document.documentElement.dir === "rtl" ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}/>
                </button>
                </div>
    
                {/* ID Badge - Right */}
                <div className={`fixed top-6 ${document.documentElement.dir === "rtl" ? "left-6" : "right-6"} z-50`}>
                <div className="px-4 py-2 text-white font-semibold">
                    S_A_4
                </div>
            </div>
    
    
    
          <h2 className="text-xl sm:text-2xl font-bold mt-15 md:mt-0 mb-10 text-center">
            {t.applicant_form}
          </h2>
    
    
            <div className="w-full flex flex-col items-center gap-6 mb-10">
    
                <div className="w-full max-w-md">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
    
                    <label className="sm:w-24 sm:text-right text-sm font-semibold">
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
                        {idError && <p className=' text-red-300 text-sm mt-1'>{idError}</p>}
    
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
    
    
    
    
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {fields.map((field, index) => (
    
                    <div key={index} className="flex flex-col gap-2">
    
                            <label className="text-sm font-semibold">
                            {t[field.label]} :
                            </label>
    
                            <input
                            type={field.type}
                            placeholder={t[field.placeholder]}
                            value={formData[field.label] || ""}
                            onChange={(e) => {
                                let value = e.target.value;
                                if(field.label === "phone"){
                                    value = value.replace(/[^0-9]/g,'');
                                }
                                setFormData({...formData, [field.label]: value});
                                setErrors(prev => ({...prev,[field.label]: ""}));
                            }}
                            readOnly={field.label === "date"}
                            onFocus={() => {
                                        if (field.label === "date" && !formData[field.label]) {
                                            const today = moment().format("jYYYY/jMM/jDD");
                                            setFormData({...formData,[field.label]:today});
                                            setErrors(prev => ({...prev, [field.label]: ""}));
                                        }
                                    }}
                            className={`px-4 py-2 rounded-lg bg-white/30 placeholder-white/40 text-white focus:outline-none ${errors[field.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:ring-2 focus:ring-yellow-400" } `}/>
                            
                            {errors[field.label] && (<p className='text-red-400 text-sm font-medium'>{t.field_required}</p>)}
                            
                    </div>
    
            ))}
    
    
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
            className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${user?.delete_perm === 0 ? "bg-gray-400 cursor-not-allowed": "bg-linear-to-r from-blue-400 to-indigo-600 hover:scale-105 hover:shadow-blue-500/40 cursor-pointer"}`}>
                {t.delete}
            </button>
          </div>
    
        </div>
  )
}

export default Applicant_Form_page
