import React, { useState } from 'react'
import UserReportHeader from '../../Report_Folder/Report3/UserReportHeader';
import UserReportFilters from '../../Report_Folder/Report3/UserReportFilters';
import UserReportTable from '../../Report_Folder/Report3/UserReportTable';

const User_report_page = () => {
  
      const [filters, setFilters] = useState({});
      const [filteredData, setFilteredData] = useState([]);
      const handleChange = (e) => {setFilters({ ...filters, [e.target.name]: e.target.value });};
      const totalRecords = filteredData.length;
    
      const fields = [
        { name: "name", label: "Name", type: "text" },
        { name: "fname", label: "Fname", type: "text" },
        { name: "tazkira", label: "Tazkira", type: "text" },
        { name: "phone", label: "Phone", type: "text" },
        { name: "user_name", label: "User Name", type: "text" },
        { name: "startDate", label: "Start Date", type: "text" },
        { name: "endDate", label: "End Date", type: "text" },
      ];

      const checkFields = [
        { label: "Rent Form", name: "rent_form" },
        { label: "Rent Report", name: "rent_report" },
        { label: "Mortgage Form", name: "mortgage_form" },
        { label: "Mortgage Report", name: "mortgage_report" },
        { label: "Saleable Form", name: "saleable_form" },
        { label: "Saleable Report", name: "saleable_report" },
        { label: "Applicant Form", name: "applicant_form" },
        { label: "Applicant Report", name: "applicant_report" },
        { label: "User Create Form", name: "user_create_form" },
        { label: "User Report", name: "user_report" },
      ];

      const limitationFields = [
        { label: "Submit", name: "submit" },
        { label: "Update", name: "update_perm" },
        { label: "Delete", name: "delete_perm" },
        { label: "Search", name: "search_perm" },
        { label: "Print", name: "print_perm" },
      ];

      const columns = [
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "F/Name", accessor: "fname" },
        { header: "Tazkira", accessor: "tazkira" },
        { header: "Phone", accessor: "phone" },
        { header: "Date", accessor: "date" },
        { header: "User Name", accessor: "user_name" },
        { header: "Password", accessor: "password" },
        { header: "Rent Form", accessor: "rent_form" },
        { header: "Rent Report", accessor: "rent_report" },
        { header: "Mortgage Form", accessor: "mortgage_form" },
        { header: "Mortgage Report", accessor: "mortgage_report" },
        { header: "Saleable Form", accessor: "saleable_form" },
        { header: "Saleable Report", accessor: "saleable_report" },
        { header: "Applicant Form", accessor: "applicant_form" },
        { header: "Applicant Report", accessor: "applicant_report" },
        { header: "User Create Form", accessor: "user_create_form" },
        { header: "User Report", accessor: "user_report" },
        { header: "Submit", accessor: "submit" },
        { header: "Update", accessor: "update_perm" },
        { header: "Delete", accessor: "delete_perm" },
        { header: "Search", accessor: "search_perm" },
        { header: "Print", accessor: "print_perm" },
      ];

      const handleSearch = async () => {
        const queryFilters = { ...filters };
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
    <div className="mt-24 max-w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20 p-6">
        
        <UserReportHeader title="User Report 📊" reportId="r_005" />

        <UserReportFilters fields={fields} filters={filters} onChange={handleChange} checkFields={checkFields} limitationFields={limitationFields} />


        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 mt-4">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            🔍 Search
          </button>

          <button
            onClick={() => ApplicantgenerateReportPDF(columns, filteredData, filters, "User Report")}
            className="relative overflow-hidden px-6 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
            rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            🖨️ Print Report
          </button>
        </div>

        <UserReportTable columns={columns} data={filteredData} />

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

export default User_report_page;

