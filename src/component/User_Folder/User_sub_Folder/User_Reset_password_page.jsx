import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const User_Reset_password_page = () => {

    const navigate = useNavigate();

    const [fields] = useState([
        {label:"User", name:"user", type:"text", placeholder:"Enter User"},
        {label:"Previous Password", name:"previousPassword", type:"password", placeholder:"Enter Previous Password"},
        {label:"New Password", name:"newPassword", type:"password", placeholder:"Enter New password"},
        {label:"Repeat New Password", name:"repeatPassword", type:"password", placeholder:"Enter Repeat New Password"},
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
            alert("❌ New Password and Repeat Password do not match");
            return;
        }

        if (!formData.user || !formData.previousPassword || !formData.newPassword) {
            alert("⚠️ Please fill all fields");
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
                alert("❌ Username or Previous Password is incorrect");
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
                alert("✅ Password updated successfully");
                setFormData({
                    user: "",
                    previousPassword: "",
                    newPassword: "",
                    repeatPassword: ""
                }); 

            // (اختیاری) بستن eye ها
                setShowPasswords({});
            } else {
                alert("❌ Failed to update password");
            }

        } catch (error) {
            console.error(error);
            alert("⚠️ Server error");
        }
    };

    return (
        <div className="mt-24 w-full max-w-2xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30">

            {/* Back Button */}
            <div className="fixed top-6 left-6 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="group p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition cursor-pointer"
                >
                    <ArrowLeft size={20} className="text-white group-hover:-translate-x-1 transition"/>
                </button>
            </div>

            {/* ID Badge */}
            <div className="fixed top-6 right-6 z-50">
                <div className="px-4 py-2 font-semibold">
                    S_A_5
                </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-10 text-center">
                Password Reset Form
            </h2>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map((t, index) => (
                    <div key={index} className="flex flex-col gap-2">

                        <label className="text-sm font-semibold">
                            {t.label}
                        </label>

                        <div className="relative">
                            <input
                                type={
                                    t.type === "password"
                                        ? (showPasswords[t.name] ? "text" : "password")
                                        : t.type
                                }
                                name={t.name}
                                placeholder={t.placeholder}
                                value={formData[t.name]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 pr-10 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            {/* Eye Icon */}
                            {t.type === "password" && (
                                <button
                                    type="button"
                                    onClick={() => togglePassword(t.name)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                                >
                                    {showPasswords[t.name] ? <EyeOff size={18}/> : <Eye size={18}/>}
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