import React, { useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import moment from "moment-jalaali";
import { useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const Mortgage_Form_page = () => {

    const [id,setID]=useState('');
    const [idError,setIDError] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [status,setStatus] =useState('');
    const [mode, setMode] = useState('');
    const user = JSON.parse(localStorage.getItem("user"));
    const { t , language} = useLanguage();

    const navigate=useNavigate();
    
    const [fields,setFields]=useState([
        {label:"name", type:"text", placeholder:"enter_name", required:true},
        {label:"fname", type:"text", placeholder:"enter_fname", required:true},
        {label:"tazkira", type:"text", placeholder:"enter_tazkira", required:true},
        {label:"phone", type:"tel", inputMode:"numeric", placeholder:"enter_phone", required:true},
        {label:"address", type:"text", placeholder:"enter_address", required:true},
        {label:"rooms", type:"text", placeholder:"enter_rooms", required:true},
        {label:"appartment", type:"text", placeholder:"enter_appartment", required:true},
        {label:"qawala", type:"text", placeholder:"enter_qawala", required:true},
        {label:"bathrooms", type:"text", placeholder:"enter_bathrooms", required:true},
        {label:"area", type:"text", placeholder:"enter_area", required:true},
        {label:"nature", type:"text", placeholder:"enter_nature", required:true},
        {label:"appartment_features", type:"text", placeholder:"enter_appartment_features", required:true},
        {label:"city_features", type:"text", placeholder:"enter_city_features", required:true},
        {label:"date", type:"text", placeholder:"enter_date", required:true},
        {label:"elevator", type:"select", required:true},
        {label:"heating", type:"select", required:true},
        {label:"electric_meter", type:"select", required:true},
        {label:"roof", type:"select", required:true},
        {label:"price", type:"text", placeholder:"enter_price", required:true},
        {label:"final_price", type:"text", placeholder:"enter_final_price", required:false},
    ]);

    const handleSearch = async () => {

        if(!id.trim()){
            alert(t.enter_id_warning);
            return;
        }

        try{

            const res = await fetch(`http://localhost:5000/api/mortgage/${id}`);
            const data = await res.json();

            if(data.success){

                setFormData({
                    name: data.mortgage.name || "",
                    fname: data.mortgage.fname || "",
                    tazkira: data.mortgage.tazkira || "",
                    phone: data.mortgage.phone || "",
                    address: data.mortgage.address || "",
                    rooms: data.mortgage.rooms || "",
                    appartment: data.mortgage.appartment || "",
                    qawala: data.mortgage.qawala || "",
                    bathrooms: data.mortgage.bathrooms || "",
                    area: data.mortgage.area || "",
                    nature: data.mortgage.nature || "",
                    appartment_features: data.mortgage.appartment_features || "",
                    city_features: data.mortgage.city_features || "",
                    date: data.mortgage.date || "",
                    elevator: data.mortgage.elevator || "",
                    heating: data.mortgage.heating || "",
                    electric_meter: data.mortgage.electric_meter || "",
                    roof: data.mortgage.roof || "",
                    price: data.mortgage.price || "",
                    final_price: data.mortgage.final_price || ""
                });

                setStatus(data.mortgage.status || "");
                setMode("edit");
                setErrors({});

            }else{
                alert(t.id_not_found);
                setFormData({});
                setStatus("");
                setMode("");
                setErrors({});
            }

        }catch(error){
            console.error("Error:",error);
            alert(t.server_error);
        }

    };

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
            // بررسی Final Price
            if (!formData["final_price"] || formData["final_price"].trim() === "") {
                const addFinalPrice = window.confirm(t.final_price_empty);
                if (addFinalPrice) {
                    // تمرکز روی فیلد Final Price تا کاربر مقدار وارد کند
                    const finalInput = document.querySelector('input[name="final_price"]');
                    finalInput?.focus();
                    return; // توقف Submit تا کاربر مقدار وارد کند
                }
            }

            const confirmSubmit = window.confirm(t.confirm_submit);
            if (!confirmSubmit) return;

            fetch("http://localhost:5000/api/mortgage/add", {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({...formData, status})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    alert(t.form_successfully_saved + data.id);
                    setFormData({});
                    setStatus("available");
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

        // بررسی Final Price
        if (!formData["final_price"] || formData["final_price"].trim() === "") {
            const addFinalPrice = window.confirm(t.final_price_empty);
            if (addFinalPrice) {
                const finalInput = document.querySelector('input[placeholder="Enter Final Price"]');
                finalInput?.focus();
                return; // توقف Update تا کاربر مقدار وارد کند
            }
        }

        const confirmUpdate = window.confirm(t.confirm_update);
        if (!confirmUpdate) return;

        try {
            const res = await fetch(`http://localhost:5000/api/mortgage/${id}`, {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({...formData, status})
            });
            const data = await res.json();
            if(data.success) {
                alert(t.information_update);
                setFormData({});
                setStatus("available");
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
            const res = await fetch(`http://localhost:5000/api/mortgage/${id}`,{
                method:'DELETE'
            });
            const data = await res.json();
            if(data.success){
            alert(t.record_delete);
            setFormData({});
            setStatus("");
            setID("");
            setMode("");
            } else{
                alert(t.record_not_found);
            }
        } catch (error){
            console.error("Error:",error);
            alert(t.server_error);
        }
    }

    useEffect(() => {
        // وقتی Final Price تغییر کرد
        if (formData["final_price"] && formData["final_price"].trim() !== "") {
            setStatus("unavailable"); // اگر پر باشد، وضعیت unavailable
        } else {
            setStatus("available"); // اگر خالی باشد، وضعیت available
        }
    }, [formData["final_price"]]);

    const yesNoOptions = [
        { value: "Yes", labelEn: "Yes", labelFa: "بلی" },
        { value: "No", labelEn: "No", labelFa: "نخیر" }
    ];

    const getStatusLabel = () => {
        if(status === "available") return t.available;
        if(status === "unavailable") return t.unavailable;
        return "";
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
                S_A_2
            </div>
        </div>


      <h2 className="text-xl sm:text-2xl font-bold mt-15 md:mt-0 mb-10 text-center">
        {t.mortgage_form}
      </h2>


        <div className="w-full flex flex-col items-center gap-6 mb-10">

            <div className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                <label className="sm:w-24 text-sm font-semibold">
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
                    className={`px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer`}>
                    <Search size={18} color="white" />
                    {t.search}
                    </button>
                </div>

                </div>
            </div>

            {/* Status Section */}
            <div className="w-full max-w-md">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                    <label className="sm:w-24 text-sm font-semibold">
                        {t.status} :
                    </label>

                    <input
                    type="text"
                    value={getStatusLabel()}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white opacity-70 cursor-not-allowed focus:outline-none"
                    />

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

                {field.type === "select" ? (
                <>
                    <select
                    value={formData[field.label] || ""}
                    onChange={(e) => {
                        setFormData({ ...formData, [field.label]: e.target.value });
                        // Clear error immediately when user selects an option
                        setErrors(prev => ({ ...prev, [field.label]: "" }));
                    }}
                    className={`px-4 py-2 rounded-lg bg-white/30 text-white ${errors[field.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:outline-none focus:ring-2 focus:ring-yellow-400"}`}>
                         <option value="">{t.select} {t[field.label]}</option>
                            {yesNoOptions.map((option) => (
                                <option key={option.value} value={option.value} className="text-gray-800">
                                    {language === "FA" ? option.labelFa : option.labelEn}
                                </option>
                            ))}
                    </select>
                    {errors[field.label] && (<p className='text-red-400 text-sm font-medium'>{t[errors[field.label]]}</p>)}
                </>
                ) : (
                <>
                    <input
                    name={field.label}
                    type={field.type}
                    placeholder={t[field.placeholder]}
                    value={formData[field.label] || ""}
                    onChange={(e) => {
                        let value = e.target.value;
                        // فقط اعداد برای فیلدهای خاص
                        if(field.label === "phone" || field.label === "price" || field.label === "final_price"){
                            value = value.replace(/[^0-9]/g,'');
                        }
                        // مقدار فرم را بروز کن
                        setFormData({...formData, [field.label]: value});
                        // خطا را پاک کن
                        setErrors(prev => ({...prev,[field.label]: ""}));
                    }}
                    readOnly={field.label === "date"}
                    onFocus={() => {
                                if (field.label === "date" && !formData[field.label]) {
                                    const today = moment().format("jYYYY/jMM/jDD");
                                    setFormData({...formData,[field.label]:today});
                                    setErrors(prev => ({...prev, [field.label]: ""})); // خطا پاک شود
                                }
                            }}
                    className={`px-4 py-2 rounded-lg bg-white/30 placeholder-white/40 text-white focus:outline-none ${errors[field.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:ring-2 focus:ring-yellow-400" } `}/>
                    
                {errors[field.label] && (<p className='text-red-400 text-sm font-medium'>{t[errors[field.label]]}</p>)}
                </>
                )}

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
        className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${user?.delete_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-rose-500 via-red-600 to-red-800 hover:scale-105 hover:shadow-red-500/40 cursor-pointer"}`}>
            {t.delete}
        </button>
      </div>

    </div>
  )
}

export default Mortgage_Form_page
