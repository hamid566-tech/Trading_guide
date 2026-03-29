import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { handleSearchById } from "./Search_handler_Functions_folder/Search_handler_page";
import { useLanguage } from "../../context/LanguageContext"; // 👈 مهم

const First_page = () => {

  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const { t } = useLanguage(); // 👈 اینجا

  const handleSearch = () => {
  handleSearchById(searchId, navigate);
};


  return (
    <div className="min-h-screen flex justify-center items-center w-full select-none">

      <div className=" w-full max-w-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl rounded-2xl p-10 text-white">

        <h1 className="text-3xl font-bold text-center mb-8">
          {t.search_property} 🔍
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">

          <input
            type="text"
            placeholder={t.enter_screen_id}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition duration-300 flex items-center justify-center gap-2"
          >
            <Search size={18} />
            {t.search}
          </button>

        </div>

      </div>

    </div>
  );
};

export default First_page;
