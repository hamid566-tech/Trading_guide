import React, { useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Rent_Form_page = () => {

    const [id,setID]=useState('');
    const [idError,setIDError] = useState('');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [status,setStatus] =useState('');
    const [mode, setMode] = useState('');

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

    const handlSearch=async ()=>{

        if(!id.trim()){
            setIDError('ضرورت به ID است');
            setMode("");   // برگردد به حالت عادی
            return; 
        }
        else{
            setIDError('');
        }
        
        try {

            const res = await fetch(`http://localhost:5000/api/rents/${id}`);
            const data = await res.json();

            if (data.success) {
                // 👇 اینجا فورم را با معلومات دیتابیس پر می‌کنیم
                setFormData({
                    "Name": data.rent.name || "",
                    "FName": data.rent.fname || "",
                    "Tazkira": data.rent.tazkira || "",
                    "phone": data.rent.phone || "",
                    "Address": data.rent.address || "",
                    "Rooms": data.rent.rooms || "",
                    "Appartment": data.rent.appartment || "",
                    "Qawala": data.rent.qawala || "",
                    "Bathrooms": data.rent.bathrooms || "",
                    "Area": data.rent.area || "",
                    "Nature": data.rent.nature || "",
                    "Appartment Features": data.rent.appartment_features || "",
                    "City Features": data.rent.city_features || "",
                    "Date": data.rent.date || "",
                    "Elevator": data.rent.elevator || "",
                    "Heating": data.rent.heating || "",
                    "Electric Meter": data.rent.electric_meter || "",
                    "Roof": data.rent.roof || "",
                    "Price": data.rent.price || "",
                    "Final Price": data.rent.final_price || ""
                });

                // ست کردن Status
                setStatus(data.rent.status || "");
                setMode("edit");

            } else {
                alert("ID پیدا نشد ❌");
                setFormData({});
                setStatus("");
                setMode("");
            }

        } catch (error) {
            console.error("Error:", error);
        }

    }

    const handleSubmit = () => {

        // 1️⃣ اول بررسی ID
        if (id.trim()) {
            alert("⚠️ فیلد ID باید خالی باشد تا فورم ثبت شود.");
            return;
        }

        setMode('submit');

        // 2️⃣ بررسی فیلدها
        let newErrors = {};

        if (!status) {
            newErrors.status = "انتخاب Status لازمی است";
        }

        fields.forEach((field) => {
            if (field.required && (!formData[field.label] || !formData[field.label].trim())) {
                newErrors[field.label] = "این فیلد لازمی است";
            }
        });

        setErrors(newErrors);

        // 3️⃣ اگر هیچ خطا نبود → ارسال به سرور
        if (Object.keys(newErrors).length === 0) {

            fetch("http://localhost:5000/api/rents/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    status
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("فورم موفقانه ثبت شد ✅ ID: " + data.id);

                    // اختیاری: پاک کردن فورم بعد از ثبت
                    setFormData({});
                    setStatus("");
                } else {
                    alert("خطا در ثبت معلومات ❌");
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("مشکل در اتصال به سرور ❌");
            });

        }
    };

    const handleUpdate = async () => {

        if (!id.trim()) {
            alert("اول ID را جستجو کن ⚠️");
            return;
        }

        try {

            const res = await fetch(`http://localhost:5000/api/rents/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    status
                })
            });

            const data = await res.json();

            if (data.success) {
                alert("معلومات موفقانه اپدیت شد ✅");
            } else {
                alert("اپدیت انجام نشد ❌");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("مشکل در اتصال به سرور ❌");
        }
    };

    const handleDelete = async () => {

    if (!id.trim()) {
        alert("اول ID را جستجو کن ⚠️");
        return;
    }

    const confirmDelete = window.confirm("آیا مطمئن هستید که این رکورد حذف شود؟");

    if (!confirmDelete) return;

    try {

        const res = await fetch(`http://localhost:5000/api/rents/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (data.success) {
            alert("رکورد موفقانه حذف شد ✅");

            setFormData({});
            setStatus("");
            setID("");
            setMode("");

        } else {
            alert("رکورد پیدا نشد ❌");
        }

    } catch (error) {
        console.error("Error:", error);
        alert("مشکل در اتصال به سرور ❌");
    }
};

    const getTodayShamsi = () => {
        const date = new Date();
        return new Intl.DateTimeFormat("fa-IR-u-nu-latn").format(date);
    };

  return (
    
    <div className="mt-24 w-full max-w-5xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30">
        
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
                S_A_1
            </div>
        </div>



      <h2 className="text-xl sm:text-2xl font-bold mt-15 md:mt-0 mb-10 text-center">
        Rent Form
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
                        
                        {
                        idError && <p className=' text-red-300 text-sm mt-1'>{idError}</p>
                        }

                        <button 
                        onClick={handlSearch}
                        disabled={mode === "submit"}
                        className={`px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 ${mode === "submit" ? "opacity-50 cursor-not-allowed" : "hover:scale-105"} transition duration-300 flex items-center justify-center`}>
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

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`w-full sm:flex px-4 py-2 rounded-lg bg-white/30 text-white 
                    focus:outline-none
                    ${errors.status ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:ring-2 focus:ring-yellow-400"}`}
                >
                    <option value="" className="text-black">Select Status</option>
                    <option value="available" className="text-black">Available</option>
                    <option value="unavailable" className="text-black">Unavailable</option>
                </select>

                {errors.status && (
                    <p className="text-red-400 text-sm font-medium">
                        {errors.status}
                    </p>
                )}

                </div>
            </div>

        </div>




      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {fields.map((t, index) => (

            <div key={index} className="flex flex-col gap-2">

                <label className="text-sm font-semibold text-[#fbfbfb]">
                {t.label} :
                </label>

                {t.type === "select" ? (
                    <>
                        <select
                            value={formData[t.label] || ""}
                            onChange={(e) => setFormData({ ...formData, [t.label]: e.target.value })}
                            className={`px-4 py-2 rounded-lg bg-white/30 text-white ${errors[t.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:outline-none focus:ring-2 focus:ring-yellow-400"}`}
                        >
                            <option value="" className="text-black">
                            Select {t.label}
                            </option>
                            <option value="Yes" className="text-black">Yes</option>
                            <option value="No" className="text-black">No</option>
                        </select>
                        {
                            errors[t.label] && (
                                <p className='text-red-400 text-sm font-medium'>{errors[t.label]}</p>
                            )
                        }
                    </>
                ) : (
                    <>
                        <input
                            type={t.type}
                            placeholder={t.placeholder}
                            value={formData[t.label] || ""}
                            onChange={(e)=> setFormData({...formData,[t.label]:e.target.value})}
                            readOnly={t.label === "Date"}
                            onFocus={() => {
                                if (t.label === "Date" && !formData[t.label]) {
                                    setFormData({
                                        ...formData,
                                        [t.label]: getTodayShamsi()
                                    });
                                }
                            }}
                            className={`px-4 py-2 rounded-lg bg-white/30
                                    placeholder-white/40 text-white
                                    focus:outline-none ${errors[t.label] ? "border-2 border-red-600 shadow-lg shadow-red-500/40" : "focus:ring-2 focus:ring-yellow-400" } `}
                        />

                        {
                            errors[t.label] && (
                                <p className='text-red-400 text-sm font-medium'>{errors[t.label]}</p>
                            )
                        }
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
        disabled={mode === "edit" || idError !== ""}
        className={`w-full sm:w-auto px-8 py-2 bg-linear-to-r from-green-400 to-emerald-600 rounded-lg font-semibold ${mode === "edit" || idError !=="" ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-green-500/40transition duration-300 shadow-lg cursor-pointer"} `}>
            Submit
        </button>

        {/* Update */}
        <button 
        onClick={handleUpdate}
        disabled={mode !== "edit"}
        className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${mode !== "edit" ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-linear-to-r from-blue-400 to-indigo-600 hover:scale-105 hover:shadow-blue-500/40 cursor-pointer"}`}>
            Update
        </button>

        {/* Delete */}
        <button
        disabled={mode !== "edit"}
        onClick={handleDelete}
        className={`w-full sm:w-auto px-8 py-2 rounded-lg font-semibold transition duration-300 shadow-lg ${mode !== "edit" ? "bg-gray-400 opacity-50 cursor-not-allowed" : "bg-linear-to-r from-red-400 to-red-600 hover:scale-105 hover:shadow-red-500/40 cursor-pointer"}`}>
            Delete
        </button>
      </div>

    </div>
  )
}

export default Rent_Form_page
