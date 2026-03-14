import React, { useState } from "react";
import ReportFilters from "../../Report_Folder/Report1/ReportFilters";
import ReportTable from "../../Report_Folder/Report1/ReportTable";
import { generateReportPDF } from "../../Report_Folder/Report1/generateReportPDF";
import ReportHeader from "../../Report_Folder/Report1/ReportHeader";
import moment from "moment-jalaali";

const Rent_Report_page = () => {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (e) => {

    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const totalRecords = filteredData.length;
  const totalPrice = filteredData.reduce(
    (sum, row) => sum + Number(row.price || 0),
    0
  );
  const totalFinalPrice = filteredData.reduce(
    (sum, row) => sum + Number(row.final_price || 0),
    0
  );

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "fname", label: "Fname", type: "text" },
    { name: "tazkira", label: "Tazkira", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "status", label: "Status", type: "select", options: ["available", "unavailable"] },
    { name: "address", label: "Address", type: "text" },
    { name: "rooms", label: "Rooms", type: "text" },
    { name: "appartment", label: "Appartment", type: "text" },
    { name: "bathrooms", label: "Bathrooms", type: "text" },
    { name: "area", label: "Area", type: "text" },
    { name: "price", label: "Price", type: "text" },
    { name: "startDate", label: "Start Date", type: "text" },
    { name: "endDate", label: "End Date", type: "text" },
    { name: "elevator", label: "Elevator", type: "select", options: ["Yes", "No"] },
    { name: "heating", label: "Heating", type: "select", options: ["Yes", "No"] },
    { name: "electric_meter", label: "Electric Meter", type: "select", options: ["Yes", "No"] },
    { name: "roof", label: "Roof", type: "select", options: ["Yes", "No"] },
  ];

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Status", accessor: "status" },
    { header: "Name", accessor: "name" },
    { header: "F/Name", accessor: "fname" },
    { header: "Tazkira", accessor: "tazkira" },
    { header: "Phone", accessor: "phone" },
    { header: "Address", accessor: "address" },
    { header: "Rooms", accessor: "rooms" },
    { header: "Appartment", accessor: "appartment" },
    { header: "Qawala", accessor: "qawala" },
    { header: "Bathrooms", accessor: "bathrooms" },
    { header: "Area", accessor: "area" },
    { header: "Nature", accessor: "nature" },
    { header: "App Features", accessor: "appartment_features" },
    { header: "City Features", accessor: "city_features" },
    { header: "Date", accessor: "date" },
    { header: "Elevator", accessor: "elevator" },
    { header: "Heating", accessor: "heating" },
    { header: "Electric", accessor: "electric_meter" },
    { header: "Roof", accessor: "roof" },
    { header: "Price", accessor: "price" },
    { header: "Final Price", accessor: "final_price" },
  ];

  // const handleSearch = async () => {
  //   const query = new URLSearchParams(filters).toString();
  //   try {
  //     const res = await fetch(`http://localhost:5000/api/rents?${query}`);
  //     const result = await res.json();
  //     if (result.success) setFilteredData(result.data);
  //   } catch (error) {
  //     console.error("Search Error:", error);
  //   }
  // };

//   const handleSearch = async () => {
//   const queryFilters = { ...filters };

//   if (filters.startDate) {
//     queryFilters.startDate = moment(filters.startDate, "jYYYY/jMM/jDD").format("YYYY/MM/DD");
//   }
//   if (filters.endDate) {
//     queryFilters.endDate = moment(filters.endDate, "jYYYY/jMM/jDD").format("YYYY/MM/DD");
//   }

//   const query = new URLSearchParams(queryFilters).toString();

//   try {
//     const res = await fetch(`http://localhost:5000/api/rents?${query}`);
//     const result = await res.json();
//     if (result.success) setFilteredData(result.data);
//   } catch (error) {
//     console.error("Search Error:", error);
//   }
// };

const handleSearch = async () => {
  const queryFilters = { ...filters };

  // حذف moment و تبدیل تاریخ
  const query = new URLSearchParams(queryFilters).toString();

  try {
    const res = await fetch(`http://localhost:5000/api/rents?${query}`);
    const result = await res.json();
    if (result.success) setFilteredData(result.data);
  } catch (error) {
    console.error("Search Error:", error);
  }
};
  
  return (
    <div className="mt-24 max-w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20 p-6">
       
        <ReportHeader title="Rent Report 📊" reportId="r_001" />

        <ReportFilters fields={fields} filters={filters} onChange={handleChange} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            🔍 Search
          </button>

          <button
            onClick={() => generateReportPDF(columns, filteredData, filters, "Rent Report")}
            className="relative overflow-hidden px-6 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 
            rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            🖨️ Print Report
          </button>
        </div>

        <ReportTable columns={columns} data={filteredData} />

        <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4 flex-wrap">
          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">Total Records</label>
            <input
              type="text"
              readOnly
              value={totalRecords}
              className="bg-white/20 text-white p-2 rounded-lg w-28 text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">Total Price</label>
            <input
              type="text"
              readOnly
              value={totalPrice.toLocaleString()}
              className="bg-white/20 text-white p-2 rounded-lg w-32 text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-white text-sm mb-1">Total Final Price</label>
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