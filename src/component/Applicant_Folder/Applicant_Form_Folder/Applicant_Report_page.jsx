import React, { useState } from 'react'
import ApplicantReportHeader from '../../Report_Folder/Report2/ApplicantReportHeader'
import ApplicantReportFilters from '../../Report_Folder/Report2/ApplicantReportFilters';
import ApplicantReportTable from '../../Report_Folder/Report2/ApplicantReportTable';
import { ApplicantgenerateReportPDF } from '../../Report_Folder/Report2/ApplicantgenerateReportPDF';
import { useLanguage } from "../../../context/LanguageContext";

const Applicant_Report_page = () => {

      const [filters, setFilters] = useState({});
      const [filteredData, setFilteredData] = useState([]);
      const handleChange = (e) => {setFilters({ ...filters, [e.target.name]: e.target.value });};
      const totalRecords = filteredData.length;
      const user = JSON.parse(localStorage.getItem("user"));
      const { t, language } = useLanguage();
    
      const fields = [
        { name: "name", label: "name", type: "text" },
        { name: "fname", label: "fname", type: "text" },
        { name: "tazkira", label: "tazkira", type: "text" },
        { name: "phone", label: "phone", type: "text" },
        { name: "property_type", label: "property_type", type: "text" },
        { name: "property_location", label: "property_location", type: "text" },
        { name: "startDate", label: "startDate", type: "text" },
        { name: "endDate", label: "endDate", type: "text" },
      ];

      const columns = [
        { header: "id", accessor: "id" },
        { header: "name", accessor: "name" },
        { header: "fname", accessor: "fname" },
        { header: "tazkira", accessor: "tazkira" },
        { header: "phone", accessor: "phone" },
        { header: "date", accessor: "date" },
        { header: "property_type", accessor: "property_type" },
        { header: "property_location", accessor: "property_location" },
      ];

      const handleSearch = async () => {
      const queryFilters = { ...filters };
      const query = new URLSearchParams(queryFilters).toString();

      try {
        const res = await fetch(`http://localhost:5000/api/applicant?${query}`);
        const result = await res.json();
        if (result.success) setFilteredData(result.data);
      } catch (error) {
        console.error("Search Error:", error);
      }
    };

  return (
    <div className="mt-24 max-w-full px-4 sm:px-6 lg:px-8 select-none">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20 p-6">
        
        <ApplicantReportHeader title={t.applicant_report + " 📊"}  reportId="r_002" language={language} />

        <ApplicantReportFilters fields={fields} filters={filters} onChange={handleChange} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button
          onClick={handleSearch}
          disabled={user?.search_perm === 0}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg cursor-pointer ${user?.search_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95"}`}>
            🔍 {t.search}
          </button>

          <button
          onClick={() => ApplicantgenerateReportPDF(columns, filteredData, filters, t.applicant_report, t, language)}
          disabled={user?.print_perm === 0}
          className={`relative overflow-hidden px-6 py-2 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${user?.print_perm === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 active:scale-95 cursor-pointer"}`}>
            🖨️  {t.print_report}
          </button>
        </div>

        <ApplicantReportTable columns={columns} data={filteredData} />

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

export default Applicant_Report_page
