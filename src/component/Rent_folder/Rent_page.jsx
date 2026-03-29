import React, { useEffect, useState } from "react";
import rent_icon from "../../assets/rent.png";
import report_icon from "../../assets/report.png";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext"; // 👈 مهم

const Rent_page = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const isRentFormAllowed = user?.rent_form === 1;
  const isRentReportAllowed = user?.rent_report === 1;
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
          {t.rent_management}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-10">

          {/* Rent Form Card */}
          <button
            onClick={() => {
              if (isRentFormAllowed) {
                navigate('rent_form');
              }
            }}
            disabled={!isRentFormAllowed}
            className={`group flex flex-col items-center justify-center rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 ${isRentFormAllowed ? "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-xl cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
          >
            <img
              src={rent_icon}
              alt="Rent"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
            />
            <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
              {t.rent_form}
            </span>
          </button>

          {/* Report Card */}
          <button
            onClick={() => {
              if (isRentReportAllowed) {
                navigate('rent_report');
              }
            }}
            disabled={!isRentReportAllowed}
            className={`group flex flex-col items-center justify-center rounded-2xl p-6 sm:p-10 min-h-[220px] transition-all duration-300 ${isRentReportAllowed ? "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-xl cursor-pointer" : "bg-white/5 opacity-40 cursor-not-allowed"}`}
          >
            <img
              src={report_icon}
              alt="Report"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4"
            />
            <span className="text-base sm:text-lg md:text-xl font-semibold text-white">
              {t.rent_report}
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default Rent_page;