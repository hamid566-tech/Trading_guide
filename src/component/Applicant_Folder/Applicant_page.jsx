import React from "react";
import applicant_icon from "../../assets/applicant.png";
import report_icon from "../../assets/report.png";
import { useNavigate } from "react-router-dom";

const Applicant_page = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
        
              <div className="w-full max-w-6xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10">
        
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
                  Applicant Management
                </h2>
        
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">
        
                  {/* Rent Form Card */}
                  <button
                    onClick={()=> navigate('applicant_form')}
                    className="hover:cursor-pointer group flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={applicant_icon}
                      alt="Rent"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 group-hover:scale-110 transition duration-300"
                    />
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                      Applicant Form
                    </span>
                  </button>
        
                  {/* Report Card */}
                  <button
                    className="hover:cursor-pointer group flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={report_icon}
                      alt="Report"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 group-hover:scale-110 transition duration-300"
                    />
                    <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
                      Applicant Report
                    </span>
                  </button>
        
                </div>
        
              </div>
            </div>
  )
}

export default Applicant_page
