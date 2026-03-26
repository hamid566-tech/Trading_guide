import React, { useState } from 'react'
import ApplicantReportHeader from '../../Report_Folder/Report2/ApplicantReportHeader'
import ApplicantReportFilters from '../../Report_Folder/Report2/ApplicantReportFilters';
import ApplicantReportTable from '../../Report_Folder/Report2/ApplicantReportTable';
import { ApplicantgenerateReportPDF } from '../../Report_Folder/Report2/ApplicantgenerateReportPDF';

const Applicant_Report_page = () => {

      const [filters, setFilters] = useState({});
      const [filteredData, setFilteredData] = useState([]);
      const handleChange = (e) => {setFilters({ ...filters, [e.target.name]: e.target.value });};
      const totalRecords = filteredData.length;
    
      const fields = [
        { name: "name", label: "Name", type: "text" },
        { name: "fname", label: "Fname", type: "text" },
        { name: "tazkira", label: "Tazkira", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        { name: "property_type", label: "Property Type", type: "text" },
        { name: "property_location", label: "Property Location", type: "text" },
        { name: "startDate", label: "Start Date", type: "text" },
        { name: "endDate", label: "End Date", type: "text" },
      ];

      const columns = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "F/Name", accessor: "fname" },
        { header: "Tazkira", accessor: "tazkira" },
        { header: "Phone", accessor: "phone" },
        { header: "Date", accessor: "date" },
        { header: "Property Type", accessor: "property_type" },
        { header: "Property Location", accessor: "property_location" },
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
        
        <ApplicantReportHeader title="Applicant Report 📊" reportId="r_002" />

        <ApplicantReportFilters fields={fields} filters={filters} onChange={handleChange} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            🔍 Search
          </button>

          <button
            onClick={() => ApplicantgenerateReportPDF(columns, filteredData, filters, "Applicant Report")}
            className="relative overflow-hidden px-6 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
            rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            🖨️ Print Report
          </button>
        </div>

        <ApplicantReportTable columns={columns} data={filteredData} />

          <div className="flex flex-col items-center mt-5">
            <label className="text-white text-sm mb-1">Total Records</label>
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
