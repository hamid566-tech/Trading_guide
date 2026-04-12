import React, { useState } from 'react'
import UserReportHeader from '../../Report_Folder/Report3/UserReportHeader';
import UserReportFilters from '../../Report_Folder/Report3/UserReportFilters';
import UserReportTable from '../../Report_Folder/Report3/UserReportTable';
import { UsergenerateReportPDF } from '../../Report_Folder/Report3/UsergenerateReportPDF';
import { useLanguage } from "../../../context/LanguageContext";

const User_report_page = () => {
  
      const [filters, setFilters] = useState({});
      const [filteredData, setFilteredData] = useState([]);
      const handleChange = (e) => {setFilters({ ...filters, [e.target.name]: e.target.value });};
      const totalRecords = filteredData.length;
      const user = JSON.parse(localStorage.getItem("user"));
      const { t, language } = useLanguage();
    
      const fields = [
        { name: "name", label: t.name, type: "text" },
        { name: "fname", label: t.fname, type: "text" },
        { name: "tazkira", label: t.tazkira, type: "text" },
        { name: "phone", label: t.phone, type: "text" },
        { name: "user_name", label: t.user_name, type: "text" },
        { name: "startDate", label: t.startDate, type: "text" },
        { name: "endDate", label: t.endDate, type: "text" },
      ];

      const checkFields = [
        { label: t.rent_form, name: "rent_form" },
        { label: t.rent_report, name: "rent_report" },
        { label: t.mortgage_form, name: "mortgage_form" },
        { label: t.mortgage_report, name: "mortgage_report" },
        { label: t.saleable_form, name: "saleable_form" },
        { label: t.saleable_report, name: "saleable_report" },
        { label: t.applicant_form, name: "applicant_form" },
        { label: t.applicant_report, name: "applicant_report" },
        { label: t.user_create_form, name: "user_create_form" },
        { label: t.user_report, name: "user_report" },
      ];

      const limitationFields = [
        { label: t.submit, name: "submit" },
        { label: t.update_perm, name: "update_perm" },
        { label: t.delete_perm, name: "delete_perm" },
        { label: t.search_perm, name: "search_perm" },
        { label: t.print_perm, name: "print_perm" },
      ];

      const columns = [
        { header: "id", accessor: "id" },
        { header: "name", accessor: "name" },
        { header: "fname", accessor: "fname" },
        { header: "tazkira", accessor: "tazkira" },
        { header: "phone", accessor: "phone" },
        { header: "date", accessor: "date" },
        { header: "user_name", accessor: "user_name" },
        { header: "password", accessor: "password" },
        { header: "rent_form", accessor: "rent_form" },
        { header: "rent_report", accessor: "rent_report" },
        { header: "mortgage_form", accessor: "mortgage_form" },
        { header: "mortgage_report", accessor: "mortgage_report" },
        { header: "saleable_form", accessor: "saleable_form" },
        { header: "saleable_report", accessor: "saleable_report" },
        { header: "applicant_form", accessor: "applicant_form" },
        { header: "applicant_report", accessor: "applicant_report" },
        { header: "user_create_form", accessor: "user_create_form" },
        { header: "user_report", accessor: "user_report" },
        { header: "submit", accessor: "submit" },
        { header: "update_perm", accessor: "update_perm" },
        { header: "delete_perm", accessor: "delete_perm" },
        { header: "search_perm", accessor: "search_perm" },
        { header: "print_perm", accessor: "print_perm" },
      ];

      const handleSearch = async () => {
        const queryFilters = {};

        for (let key in filters) {
          if (filters[key] !== "" && filters[key] !== null) {
            queryFilters[key] = filters[key];
          }
        }
        const query = new URLSearchParams(queryFilters).toString();

        try {
          const res = await fetch(`http://localhost:5000/api/user_permissions?${query}`);
          const result = await res.json();
          if (result.success) setFilteredData(result.data);
        } catch (error) {
          console.error("Search Error:", error);
        }
      };

      

  return (
    <div className="mt-24 max-w-full px-4 sm:px-6 lg:px-8 select-none">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20 p-6">
        
        <UserReportHeader title={t.user_report + " 📊"} reportId="r_005" language={language} />

        <UserReportFilters fields={fields} filters={filters} onChange={handleChange} checkFields={checkFields} limitationFields={limitationFields} />


        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 mt-4">
          <button
          onClick={handleSearch}
          disabled={user?.search_perm === 0}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg cursor-pointer
          ${user?.search_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95"}`}>
            🔍 {t.search}
          </button>

          <button
          onClick={() => UsergenerateReportPDF(columns, filteredData, filters, t.user_report, t, language)}
          disabled={user?.print_perm === 0}
          className={`relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-white shadow-lg transition-all duration-300
          ${user?.print_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 active:scale-95 cursor-pointer"}`}>
            🖨️ {t.print_report}
          </button>
        </div>

        <UserReportTable columns={columns} data={filteredData} />

          <div className="flex flex-col items-center mt-5">
            <label className="text-white text-sm mb-1">{t.total_records}</label>
            <input
              type="text"
              readOnly
              value={totalRecords}
              className="bg-white/20 text-white p-2 rounded-lg w-28 text-center"
            />
          </div>
         
      </div>
    </div>
  )
}

export default User_report_page;

