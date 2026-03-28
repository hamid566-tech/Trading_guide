import React, { useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali';
import { useEffect } from 'react';


const Saleable_Form_page = () => {

    const [id,setID]=useState('');
    const [idError,setIDError] = useState('');
    const [mode, setMode] = useState('');
    const [status,setStatus] =useState('');
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const user = JSON.parse(localStorage.getItem("user"));

    const navigate=useNavigate();
    
    const [fields,setFields]=useState([
        {label:"Name", type:"text", placeholder:"Enter Name", required:true},
        {label:"FName", type:"text", placeholder:"Enter Father Name", required:true},
        {label:"Tazkira", type:"text", placeholder:"Enter Tazkira Number", required:true},
        {label:"phone", type:"tel", inputMode:"numeric", placeholder:"Enter Phone Number", required:true},
        {label:"Address", type:"text", placeholder:"Enter Address Number", required:true},
        {label:"Rooms", type:"text", placeholder:"Enter Rooms Number", required:true},
        {label:"Appartment", type:"text", placeholder:"Enter Appartment Number", required:true},
        {label:"Qawala", type:"text", placeholder:"Enter Qawala", required:true},
        {label:"Bathrooms", type:"text", placeholder:"Enter Bathroom Number", required:true},
        {label:"Area", type:"text", placeholder:"Enter Area", required:true},
        {label:"Nature", type:"text", placeholder:"Enter Nature", required:true},
        {label:"Appartment Features", type:"text", placeholder:"Enter Appartment Features", required:true},
        {label:"City Features", type:"text", placeholder:"Enter City Features", required:true},
        {label:"Date", type:"text", placeholder:"Enter Date", required:true},
        {label:"Elevator", type:"select", required:true},
        {label:"Heating", type:"select", required:true},
        {label:"Electric Meter", type:"select", required:true},
        {label:"Roof", type:"select", required:true},
        {label:"Price", type:"text", placeholder:"Enter Price", required:true},
        {label:"Final Price", type:"text", placeholder:"Enter Final Price", required:false},
    ]);

    const handleSearch=async ()=>{
        if(!id.trim()){
            alert("⚠️ لطفاً اول ID را وارد کنید");
            return;
        }

        try{
            const res = await fetch(`http://localhost:5000/api/saleable/${id}`);
            const data = await res.json();

            if(data.success) {
                setFormData({
                    "Name": data.saleable.name || "",
                    "FName": data.saleable.fname || "",
                    "Tazkira": data.saleable.tazkira || "",
                    "phone": data.saleable.phone || "",
                    "Address": data.saleable.address || "",
                    "Rooms": data.saleable.rooms || "",
                    "Appartment": data.saleable.appartment || "",
                    "Qawala": data.saleable.qawala || "",
                    "Bathrooms": data.saleable.bathrooms || "",
                    "Area": data.saleable.area || "",
                    "Nature": data.saleable.nature || "",
                    "Appartment Features": data.saleable.appartment_features || "",
                    "City Features": data.saleable.city_features || "",
                    "Date": data.saleable.date || "",
                    "Elevator": data.saleable.elevator || "",
                    "Heating": data.saleable.heating || "",
                    "Electric Meter": data.saleable.electric_meter || "",
                    "Roof": data.saleable.roof || "",
                    "Price": data.saleable.price || "",
                    "Final Price": data.saleable.final_price || ""
                });
                setStatus(data.saleable.status || "");
                setMode('edit');
                setErrors({});
            }else {
                alert("ID پیدا نشد ❌");
                setFormData({});
                setStatus("");
                setMode("");
                setErrors({});
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const handleSubmit = () => {
        if(id.trim()){
            const confirmMsg = window.confirm(
            "فیلد ID باید خالی باشد.\nآیا میخواهید صفحه دوباره تازه (Reload) شود؟"
            );

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
                newErrors[field.label] = "این فیلد لازمی است";
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // بررسی Final Price
            if (!formData["Final Price"] || formData["Final Price"].trim() === "") {
                const addFinalPrice = window.confirm(
                    "Final Price خالی است. آیا می‌خواهید Final Price اضافه شود؟"
                );
                if (addFinalPrice) {
                    // تمرکز روی فیلد Final Price تا کاربر مقدار وارد کند
                    const finalInput = document.querySelector('input[placeholder="Enter Final Price"]');
                    finalInput?.focus();
                    return; // توقف Submit تا کاربر مقدار وارد کند
                }
            }

            const confirmSubmit = window.confirm("آیا مطمئن هستید که فورم ثبت شود؟");
            if (!confirmSubmit) return;

            fetch("http://localhost:5000/api/saleable/add", {
                method: 'POST',
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({...formData, status})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    alert("فورم موفقانه ثبت شد ✅ ID: " + data.id);
                    setFormData({});
                    setStatus("");
                }else {
                    alert("خطا در ثبت معلومات ❌");
                }
            })
            .catch(err => {
                console.error("Error: ",err);
                alert("مشکل در اتصال به سرور ❌");
            });
        }
    }

    const handleUpdate = async () => {
        if(!id.trim()) {
            alert("اول ID را جستجو کن ⚠️");
            return;
        }

        if(mode !== "edit"){
            const confirmMsg = window.confirm(
            "شما در حالت جستجو نیستید.\nآیا میخواهید صفحه دوباره تازه شود؟"
            );

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
                newErrors[field.label] = "این فیلد لازمی است";
            }
        });

        setErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return;

        // بررسی Final Price
        if (!formData["Final Price"] || formData["Final Price"].trim() === "") {
            const addFinalPrice = window.confirm(
                "Final Price خالی است. آیا می‌خواهید Final Price اضافه شود؟"
            );
            if (addFinalPrice) {
                const finalInput = document.querySelector('input[placeholder="Enter Final Price"]');
                finalInput?.focus();
                return; // توقف Update تا کاربر مقدار وارد کند
            }
        }

        const confirmUpdate = window.confirm("آیا مطمئن هستید که معلومات اپدیت شود؟");
        if (!confirmUpdate) return;

        try {
            const res = await fetch(`http://localhost:5000/api/saleable/${id}`, {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({...formData, status})
            });
            const data = await res.json();
            if(data.success) {
                alert("معلومات موفقانه اپدیت شد ✅");
                setFormData({});
                setStatus("");
                setID("");
                setMode("");
                setErrors({});
            } else {
                alert("اپدیت انجام نشد ❌");
            }
        } catch (error) {
            console.error("Error:",error);
            alert("مشکل در اتصال به سرور ❌");
        }
    }

    const handleDelete = async () =>{
        if(!id.trim()){
            alert("اول ID را جستجو کن ⚠️");
            return;
        }

        if(mode !== "edit"){
            const confirmMsg = window.confirm(
            "اطلاعات جستجو نشده است.\nآیا میخواهید صفحه دوباره تازه شود؟"
            );

            if(confirmMsg){
                window.location.reload();
            }

            return;
        }
        
        const confirmDelete = window.confirm("آیا مطمئن هستید که این رکورد حذف شود؟");
        if(!confirmDelete) return;
        
        try{
            const res = await fetch(`http://localhost:5000/api/saleable/${id}`,{
                method:'DELETE'
            });
            const data = await res.json();
            if(data.success){
            alert("رکورد موفقانه حذف شد ✅");
            setFormData({});
            setStatus("");
            setID("");
            setMode("");
            } else{
                alert("رکورد پیدا نشد ❌");
            }
        } catch (error){
            console.error("Error:",error);
            alert("مشکل در اتصال به سرور ❌");
        }
    }

    // اضافه کنید بعد از تعریف useState برای formData و status

    useEffect(() => {
    // وقتی Final Price تغییر کرد
    if (formData["Final Price"] && formData["Final Price"].trim() !== "") {
        setStatus("unavailable"); // اگر پر باشد، وضعیت unavailable
    } else {
        setStatus("available"); // اگر خالی باشد، وضعیت available
    }
    }, [formData["Final Price"]]);

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
                    S_A_3
                </div>
            </div>
    
    
    
          <h2 className="text-xl sm:text-2xl font-bold mt-15 md:mt-0 mb-10 text-center">
            saleable Form
          </h2>
    
    
            <div className="w-full flex flex-col items-center gap-6 mb-10">
    
                <div className="w-full max-w-md">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
    
                    <label className="sm:w-24 text-sm font-semibold">
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
                        {idError && <p className=' text-red-300 text-sm mt-1'>{idError}</p>}
    
                        <button
                        onClick={handleSearch}
                        className={`px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition duration-300 flex items-center justify-center cursor-pointer`}>
                        <Search size={18} color="white" />
                        </button>
                    </div>
    
                    </div>
                </div>
    
                {/* Status Section */}
                <div className="w-full max-w-md">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
    
                        <label className="sm:w-24 text-sm font-semibold">
                            Status :
                        </label>
    
                        <input
                        type="text"
                        value={status}
                        readOnly
                        className="w-full px-4 py-2 rounded-lg bg-white/20 text-white opacity-70 cursor-not-allowed focus:outline-none"
                        />
    
                    </div>
                </div>
    
            </div>
    
    
    
    
          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {fields.map((t, index) => (

            <div key={index} className="flex flex-col gap-2">

                <label className="text-sm font-semibold">
                {t.label}
                </label>

                {t.type === "select" ? (

                <>
                    <select
                    value={formData[t.label] || ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ ...formData, [t.label]: value });
                        setErrors(prev => ({ ...prev, [t.label]: "" }));
                    }}
                    className={`px-4 py-2 rounded-lg bg-white/30 text-white ${errors[t.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:outline-none focus:ring-2 focus:ring-yellow-400"}`}>
                        <option value="" className="text-black"> Select {t.label}</option>
                        <option value="Yes" className="text-black">Yes</option>
                        <option value="No" className="text-black">No</option>
                    </select>
                    {errors[t.label] && (<p className='text-red-400 text-sm font-medium'>{errors[t.label]}</p>)}
                </>

                ) : (

                <>
                    <input
                    type={t.type}
                    placeholder={t.placeholder}
                    value={formData[t.label] || ""}
                    onChange={(e) => {
                        let value = e.target.value;
                        // فقط اعداد برای فیلدهای خاص
                        if(t.label === "phone" || t.label === "Price" || t.label === "Final Price"){
                            value = value.replace(/[^0-9]/g,'');
                        }
                        // مقدار فرم را بروز کن
                        setFormData({...formData, [t.label]: value});
                        // خطا را پاک کن
                        setErrors(prev => ({...prev,[t.label]: ""}));
                    }}
                    readOnly={t.label === "Date"}
                    onFocus={() => {
                                if (t.label === "Date" && !formData[t.label]) {
                                    const today = moment().format("jYYYY/jMM/jDD");
                                    setFormData({...formData,[t.label]:today});
                                    setErrors(prev => ({...prev, [t.label]: ""}));
                                }
                            }}
                    className={`px-4 py-2 rounded-lg bg-white/30 placeholder-white/40 text-whitefocus:outline-none ${errors[t.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:ring-2 focus:ring-yellow-400" } `}/>
                    {errors[t.label] && (<p className='text-red-400 text-sm font-medium'>{errors[t.label]}</p>)}
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
                Submit
            </button>
    
            {/* Update */}
            <button 
            onClick={handleUpdate}
            disabled={user?.update_perm === 0}
            className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${user?.update_perm === 0 ? "bg-gray-400 cursor-not-allowed": "bg-linear-to-r from-blue-400 to-indigo-600 hover:scale-105 hover:shadow-blue-500/40 cursor-pointer"}`}>
                Update
            </button>
    
            {/* Delete */}
            <button 
            onClick={handleDelete}
            disabled={user?.delete_perm === 0}
            className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${user?.delete_perm === 0 ? "bg-gray-400 cursor-not-allowed": "bg-linear-to-r from-blue-400 to-indigo-600 hover:scale-105 hover:shadow-blue-500/40 cursor-pointer"}`}>
                Delete
            </button>
          </div>
    
        </div>
  )
}

export default Saleable_Form_page
