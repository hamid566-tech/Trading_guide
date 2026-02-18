import React, { useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const User_Reset_password_page = () => {


    const navigate=useNavigate();
    
    const [fields,setFields]=useState([
        {label:"user", type:"text", placeholder:"Enter User"},
        {label:"Previous Password", type:"password", placeholder:"Enter Previous Password"},
        {label:"New Password", type:"Password", placeholder:"Enter New password"},
        {label:"Repeat New Password", type:"password", placeholder:"Enter Repeat New Password"},
    ]);

  return (
    <div className="mt-24 w-full max-w-xl mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 sm:p-10 text-white border border-white/30">
            
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
                    S_A_5
                </div>
            </div>
    
    
    
          <h2 className="text-xl sm:text-2xl font-bold my-8 text-center">
            Password Reset Form
          </h2>
    
          {/* Form Fields */}
          <div className="flex flex-col justify-center items-center gap-6">
            
            {fields.map((t, index) => (
    
                    <div key={index} className="flex flex-col gap-2">
    
                        {t.type === "checkbox" ? (
    
                        <label className="flex items-center gap-3 text-sm  sm:justify-center font-semibold cursor-pointer">
                            <input
                            type="checkbox"
                            className="w-5 h-5 accent-yellow-400 cursor-pointer"
                            />
                            {t.label}
                        </label>
    
                        ) : (
    
                        <>
                            <label className="text-sm font-semibold">
                            {t.label}
                            </label>
    
                            <input
                            type={t.type}
                            placeholder={t.placeholder}
                            className="px-4 py-2 rounded-lg bg-white/30 
                                        placeholder-white/70 text-white
                                        focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </>
    
                        )}
    
                    </div>
    
            ))}
            
          </div>
    
          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            
            <button className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-green-400 to-emerald-600 rounded-lg font-semibold hover:scale-105 hover:shadow-green-500/40 transition duration-300 shadow-lg cursor-pointer">
                Save
            </button>

          </div>
    
        </div>
  )
}

export default User_Reset_password_page
