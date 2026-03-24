import React, { useEffect, useState } from "react";
import mortgage_icon from "../../assets/mortgage.png";
import report_icon from "../../assets/report.png";
import { useNavigate } from "react-router-dom";

const Mortgage_page = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    
    
    const isMortgageFormAllowed = user?.mortgage_form === 1;
    const isMortgageReportAllowed = user?.mortgage_report === 1;

    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
    

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
    
          <div className="w-full max-w-6xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
    
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
              Mortgage Management
            </h2>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
    
              {/* Rent Form Card */}
              <button
                onClick={()=>{
                  if(isMortgageFormAllowed){
                    navigate('mortgage_form');
                  }
                }}
                
                disabled={!isMortgageFormAllowed}
                className={`group flex flex-col items-center justify-center rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 ${isMortgageFormAllowed ? "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-xl cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
              >
                <img
                  src={mortgage_icon}
                  alt="Rent"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                  Mortgage Form
                </span>
              </button>
    
              {/* Report Card */}
              <button
                onClick={()=>{
                  if(isMortgageReportAllowed){
                    navigate('mortgage_report');
                  }
                }}
                disabled={!isMortgageReportAllowed}
                className={`group flex flex-col items-center justify-center rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 ${isMortgageReportAllowed ? "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-xl cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
              >
                <img
                  src={report_icon}
                  alt="Report"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                  Mortgage Report
                </span>
              </button>
    
            </div>
    
          </div>
        </div>
  )
}

export default Mortgage_page
