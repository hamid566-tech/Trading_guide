import React, { useState } from "react";
import ReportFilters from "../../Report_Folder/ReportFilters";
import ReportTable from "../../Report_Folder/ReportTable";
import { generateReportPDF } from "../../Report_Folder/generateReportPDF";
import ReportHeader from "../../Report_Folder/ReportHeader";

const Rent_Report_page = () => {

  const [filters, setFilters] = useState({});

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  

  const data = [
    {
      name: "Ahmad",
      fname: "Ali",
      tazkira: "123456",
      phone: "0700000000",
      address: "Kabul",
      rooms: 3,
      apartment: "A1",
      bathrooms: 2,
      area: 120,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      elevator: "Yes",
      heating: "Central",
      electricMeter: "Yes",
      roof: "Yes",
      price: 5000,
    },
  ];

  
  const [filteredData, setFilteredData] = useState(data);


  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "fname", label: "Fname", type: "text" },
    { name: "tazkira", label: "Tazkira", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "rooms", label: "Rooms", type: "text" },
    { name: "apartment", label: "Apartment", type: "text" },
    { name: "bathrooms", label: "Bathrooms", type: "text" },
    { name: "area", label: "Area", type: "text" },
    { name: "price", label: "Price", type: "text" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "elevator", label: "Elevator", type: "select", options: ["Yes", "No"] },
    { name: "heating", label: "Heating", type: "select", options: ["Yes", "No"] },
    { name: "electricMeter", label: "Electric Meter", type: "select", options: ["Yes", "No"] },
    { name: "roof", label: "Roof", type: "select", options: ["Yes", "No"] },
  ];

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "F/Name", accessor: "fname" },
    { header: "Tazkira", accessor: "tazkira" },
    { header: "Phone", accessor: "phone" },
    { header: "Address", accessor: "address" },
    { header: "Rooms", accessor: "rooms" },
    { header: "Apartment", accessor: "apartment" },
    { header: "Bathrooms", accessor: "bathrooms" },
    { header: "Area", accessor: "area" },
    { header: "Start", accessor: "startDate" },
    { header: "End", accessor: "endDate" },
    { header: "Elevator", accessor: "elevator" },
    { header: "Heating", accessor: "heating" },
    { header: "Electric", accessor: "electricMeter" },
    { header: "Roof", accessor: "roof" },
    { header: "Price", accessor: "price" },
  ];

  const handleSearch = () => {
    const result = data.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true; // اگر خالی بود نادیده بگیر

        return item[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase());
      });
    });

    setFilteredData(result);
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto p-8 bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20">
    
      <ReportHeader title="Rent Report  📊" reportId="r_001"/>
      <ReportFilters fields={fields} filters={filters} onChange={handleChange} />

      <div className="flex justify-center my-6">
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95"
        >
          🔍 Search
        </button>
      </div>
      
      <ReportTable columns={columns} data={filteredData} />

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => generateReportPDF(columns, filteredData, "Rent Report")}
          className="group inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 rounded-xl font-semibold text-white"
        >
          Print Report
        </button>
      </div>

    </div>  
  );
};

export default Rent_Report_page;