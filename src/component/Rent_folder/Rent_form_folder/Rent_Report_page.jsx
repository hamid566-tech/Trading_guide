import React, { useState } from "react";
import ReportFilters from "../../Report_Folder/Report1/ReportFilters";
import ReportTable from "../../Report_Folder/Report1/ReportTable";
import { generateReportPDF } from "../../Report_Folder/Report1/generateReportPDF";
import ReportHeader from "../../Report_Folder/Report1/ReportHeader";
import { useLanguage } from "../../../context/LanguageContext";

const Rent_Report_page = () => {

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const handleChange = (e) => {setFilters({ ...filters, [e.target.name]: e.target.value });};
  const totalRecords = filteredData.length;
  const totalPrice = filteredData.reduce((sum, row) => sum + Number(row.price || 0),0);
  const totalFinalPrice = filteredData.reduce((sum, row) => sum + Number(row.final_price || 0),0);
  const user = JSON.parse(localStorage.getItem("user"));
  const { t, language } = useLanguage();

  const fields = [
    { name: "name", label: "name", type: "text" },
    { name: "fname", label: "fname", type: "text" },
    { name: "tazkira", label: "tazkira", type: "text" },
    { name: "phone", label: "phone", type: "text" },
    { name: "status", label: "status", type: "select", options: ["available", "unavailable"] },
    { name: "address", label: "address", type: "text" },
    { name: "rooms", label: "rooms", type: "text" },
    { name: "appartment", label: "appartment", type: "text" },
    { name: "bathrooms", label: "bathrooms", type: "text" },
    { name: "area", label: "area", type: "text" },
    { name: "price", label: "price", type: "text" },
    { name: "startDate", label: "startDate", type: "text" },
    { name: "endDate", label: "endDate", type: "text" },
    { name: "elevator", label: "elevator", type: "select", options: ["yes", "no"] },
    { name: "heating", label: "heating", type: "select", options: ["yes", "no"] },
    { name: "electric_meter", label: "electric_meter", type: "select", options: ["yes", "no"] },
    { name: "roof", label: "roof", type: "select", options: ["yes", "no"] },
  ];

  const columns = [
    { header: "id", accessor: "id" },
    { header: "status", accessor: "status" },
    { header: "name", accessor: "name" },
    { header: "fname", accessor: "fname" },
    { header: "tazkira", accessor: "tazkira" },
    { header: "phone", accessor: "phone" },
    { header: "address", accessor: "address" },
    { header: "rooms", accessor: "rooms" },
    { header: "appartment", accessor: "appartment" },
    { header: "qawala", accessor: "qawala" },
    { header: "bathrooms", accessor: "bathrooms" },
    { header: "area", accessor: "area" },
    { header: "nature", accessor: "nature" },
    { header: "appartment_features", accessor: "appartment_features" },
    { header: "city_features", accessor: "city_features" },
    { header: "date", accessor: "date" },
    { header: "elevator", accessor: "elevator" },
    { header: "heating", accessor: "heating" },
    { header: "electric_meter", accessor: "electric_meter" },
    { header: "roof", accessor: "roof" },
    { header: "price", accessor: "price" },
    { header: "final_price", accessor: "final_price" },
  ];


const handleSearch = async () => {

  const mappedFilters = { ...filters };

  // // تبدیل مقادیر select به yes/no
  // ["heating","elevator","roof","electric_meter"].forEach(field => {
  //   if(mappedFilters[field]){
  //     if(t.language === "fa"){
  //       mappedFilters[field] = mappedFilters[field] === "بلی" ? "yes" : 
  //                              mappedFilters[field] === "نخیر" ? "no" : mappedFilters[field];
  //     }
  //   }
  // });

  // حذف moment و تبدیل تاریخ
   const query = new URLSearchParams(mappedFilters).toString();

  

  try {
    const res = await fetch(`http://localhost:5000/api/rents?${query}`);
    const result = await res.json();
    if (result.success) setFilteredData(result.data);
  } catch (error) {
    console.error("Search Error:", error);
  }
};
  
  return (
    <div className="mt-24 max-w-full px-4 sm:px-6 lg:px-8 select-none">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20 p-6">
       
        <ReportHeader title={t.rent_report + " 📊"} reportId="r_001" language={language} />

        <ReportFilters fields={fields} filters={filters} onChange={handleChange} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button
          onClick={handleSearch}
          disabled={user?.search_perm === 0}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg cursor-pointer ${user?.search_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95"}`}>
            🔍 {t.search}
          </button>

          <button
          onClick={() => generateReportPDF(columns, filteredData, filters, t.rent_report, t, language)}
          disabled={user?.print_perm === 0}
          className={`relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${user?.print_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 active:scale-95 cursor-pointer"}`}>
            🖨️ {t.print_report}
          </button>
        </div>

        <ReportTable columns={columns} data={filteredData} />

        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 flex-wrap">
          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">{t.total_records}</label>
            <input
              type="text"
              readOnly
              value={totalRecords}
              className="bg-white/20 text-white p-2 rounded-lg w-28 text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">{t.total_price}</label>
            <input
              type="text"
              readOnly
              value={totalPrice.toLocaleString()}
              className="bg-white/20 text-white p-2 rounded-lg w-32 text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">{t.total_final_price}</label>
            <input
              type="text"
              readOnly
              value={totalFinalPrice.toLocaleString()}
              className="bg-white/20 text-white p-2 rounded-lg w-32 text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent_Report_page;