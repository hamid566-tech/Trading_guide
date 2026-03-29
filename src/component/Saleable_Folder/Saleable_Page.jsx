import React, { useEffect, useState } from "react";
import saleable_icon from "../../assets/saleable.png";
import report_icon from "../../assets/report.png";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext"; // 👈 مهم

const Saleable_Page = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const isSaleableFormAllowed = user?.saleable_form === 1;
    const isSaleableReportAllowed = user?.saleable_report === 1;
    const { t } = useLanguage(); // 👈 اینجا
    
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
    

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 select-none">
    
          <div className="w-full max-w-6xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
    
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
              {t.saleable_management}
            </h2>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
    
              {/* Rent Form Card */}
              <button
                onClick={()=>{
                  if(isSaleableFormAllowed){
                    navigate('saleable_form');
                  }
                }}
                disabled={!isSaleableFormAllowed}
                className={`group flex flex-col items-center justify-center rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 ${isSaleableFormAllowed ? "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-xl cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
              >
                <img
                  src={saleable_icon}
                  alt="Rent"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                  {t.saleable_form}
                </span>
              </button>
    
              {/* Report Card */}
              <button
                onClick={()=>{
                  if(isSaleableReportAllowed){
                    navigate('saleable_report');
                  }
                }}
                disabled={!isSaleableReportAllowed}
                className={`group flex flex-col items-center justify-center rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 ${isSaleableReportAllowed ? "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-xl cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
              >
                <img
                  src={report_icon}
                  alt="Report"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
                />
                <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                  {t.saleable_report}
                </span>
              </button>
    
            </div>
    
          </div>
        </div>
  )
}

export default Saleable_Page
