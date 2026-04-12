import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../../../context/LanguageContext";


const User_Reset_password_page = () => {

    const { t, language } = useLanguage();
    const navigate = useNavigate();

    const [fields] = useState([
        {label:"user_name", name:"user", type:"text", placeholder:"enter_user_name"},
        {label:"previous_password", name:"previousPassword", type:"password", placeholder:"enter_previous_password"},
        {label:"new_password", name:"newPassword", type:"password", placeholder:"enter_new_password"},
        {label:"repeat_password", name:"repeatPassword", type:"password", placeholder:"enter_repeat_password"},
    ]);

    const [formData, setFormData] = useState({
        user: "",
        previousPassword: "",
        newPassword: "",
        repeatPassword: ""
    });

    const [showPasswords, setShowPasswords] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePassword = (name) => {
        setShowPasswords(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const handleSave = async () => {
        if (formData.newPassword !== formData.repeatPassword) {
            alert(t.password_not_match);
            return;
        }

        if (!formData.user || !formData.previousPassword || !formData.newPassword) {
            alert(t.fill_fields);
            return;
        }

        try {
            // ✅ Step 1: Check user
            const checkRes = await fetch("http://localhost:5000/api/user_permissions/check-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: formData.user,
                    password: formData.previousPassword
                })
            });

            const checkData = await checkRes.json();

            if (!checkData.success) {
                alert(t.wrong_credentials);
                return;
            }

            // ✅ Step 2: Change password
            const updateRes = await fetch("http://localhost:5000/api/user_permissions/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: formData.user,
                    newPassword: formData.newPassword
                })
            });

            const updateData = await updateRes.json();

            if (updateData.success) {
                alert(t.password_updated);
                setFormData({
                    user: "",
                    previousPassword: "",
                    newPassword: "",
                    repeatPassword: ""
                }); 

            // (اختیاری) بستن eye ها
                setShowPasswords({});
            } else {
                alert(t.update_failed_password);
            }

        } catch (error) {
            console.error(error);
            alert(t.server_error);
        }
    };

    return (
        <div className="mt-24 w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30 select-none">

            {/* Back Button */}
            <div className={`fixed top-6 ${document.documentElement.dir === "rtl" ? "right-6" : "left-6"} z-50`}>
                <button
                onClick={() => navigate(-1)}
                className="group p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <ArrowLeft size={20} className={`text-white transition ${document.documentElement.dir === "rtl"? "rotate-180 group-hover:translate-x-1": "group-hover:-translate-x-1"}`}/>
                </button>
            </div>

            {/* ID Badge */}
            <div className={`fixed top-6 ${document.documentElement.dir === "rtl" ? "left-6" : "right-6"} z-50`}>
                <div className="px-4 py-2 font-semibold">
                    S_A_5
                </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-10 text-center">
                {t.password_reset}
            </h2>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((field, index) => (
                    <div key={index} className="flex flex-col gap-2">

                        <label className="text-sm font-semibold">
                            {t[field.label]}
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    field.type === "password"
                                        ? (showPasswords[field.name] ? "text" : "password")
                                        : field.type
                                }
                                name={field.name}
                                placeholder={t[field.placeholder]}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            {/* Eye Icon */}
                            {field.type === "password" && (
                                <button
                                type="button"
                                onClick={() => togglePassword(field.name)}
                                className={`absolute ${document.documentElement.dir === "rtl" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-white/70 hover:text-white`}>
                                    {showPasswords[field.name] ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            )}
                        </div>

                    </div>
                ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-10">
                <button
                    onClick={handleSave}
                    className="px-8 py-2 bg-linear-to-r from-green-400 to-emerald-600 rounded-lg font-semibold hover:scale-105 transition shadow-lg cursor-pointer"
                >
                    Save
                </button>
            </div>

        </div>
    )
}

export default User_Reset_password_page;