import React, { useState } from 'react'
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Saleable_Form_page = () => {

    const navigate=useNavigate();
    
    const [fields,setFields]=useState([
        {label:"Name", type:"text", placeholder:"Enter Name"},
        {label:"FName", type:"text", placeholder:"Enter Father Name"},
        {label:"Tazkira", type:"text", placeholder:"Enter Tazkira Number"},
        {label:"phone", type:"text", placeholder:"Enter Phone Number"},
        {label:"Address", type:"text", placeholder:"Enter Address Number"},
        {label:"Rooms", type:"text", placeholder:"Enter Rooms Number"},
        {label:"Appartment", type:"text", placeholder:"Enter Appartment Number"},
        {label:"Qawala", type:"text", placeholder:"Enter Qawala"},
        {label:"Bathrooms", type:"text", placeholder:"Enter Bathroom Number"},
        {label:"Area", type:"text", placeholder:"Enter Area"},
        {label:"Nature", type:"text", placeholder:"Enter Nature"},
        {label:"Appartment Features", type:"text", placeholder:"Enter Appartment Features"},
        {label:"City Features", type:"text", placeholder:"Enter City Features"},
        {label:"Date", type:"text", placeholder:"Enter Date"},
        {label:"Elevator", type:"select"},
        {label:"Heating", type:"select"},
        {label:"Electric Meter", type:"select"},
        {label:"Roof", type:"select"},
        {label:"Price", type:"text", placeholder:"Enter Price"},
        {label:"Final Price", type:"text", placeholder:"Enter Final Price"},
    ]);

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
                        className="flex-1 px-4 py-2 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
    
                        <button
                        className="px-4 py-2 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition duration-300 flex items-center justify-center">
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
                        className=" w-full sm:flex px-4 py-2 rounded-lg bg-white/30 text-white 
                     focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="" className="text-black">Select Status</option>
                        <option value="available" className="text-black">Available</option>
                        <option value="unavailable" className="text-black">Unavailable</option>
                    </select>
    
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

                <select
                    className="px-4 py-2 rounded-lg bg-white/30 text-white
                            focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                    <option value="" className="text-black"> Select {t.label}</option>
                    <option value="Yes" className="text-black">Yes</option>
                    <option value="No" className="text-black">No</option>
                </select>

                ) : (

                <input
                    type={t.type}
                    placeholder={t.placeholder}
                    className="px-4 py-2 rounded-lg bg-white/30
                            placeholder-white/70 text-white
                            focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                )}

            </div>

            ))}
    
            
    
          </div>
    
          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            {/* Submit */}
            <button className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-green-400 to-emerald-600 rounded-lg font-semibold hover:scale-105 hover:shadow-green-500/40 transition duration-300 shadow-lg cursor-pointer">
                Submit
            </button>
    
            {/* Update */}
            <button className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-blue-400 to-indigo-600 rounded-lg font-semibold hover:scale-105 hover:shadow-blue-500/40 transition duration-300 shadow-lg cursor-pointer">
                Update
            </button>
    
            {/* Delete */}
            <button className="w-full sm:w-auto px-8 py-2 bg-linear-to-r from-red-400 to-red-600 rounded-lg font-semibold hover:scale-105 hover:shadow-red-500/40 transition duration-300 shadow-lg cursor-pointer">
                Delete
            </button>
          </div>
    
        </div>
  )
}

export default Saleable_Form_page
