import React, { useState } from "react";
import { ArrowLeft, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Rent_Report_page = () => {
  const navigate = useNavigate();

  const [data] = useState([
    {
      id: "S_A_1",
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

    
  ]);

  const [filters, setFilters] = useState({});

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  // فلتر عمومی کامل
  const filteredData = data.filter((item) =>
    Object.keys(filters).every((key) => {
      if (!filters[key]) return true;

      if (key === "startDate") return item.startDate >= filters.startDate;
      if (key === "endDate") return item.endDate <= filters.endDate;

      if (
        key === "rooms" ||
        key === "bathrooms" ||
        key === "area" ||
        key === "price"
      ) {
        return item[key] === Number(filters[key]);
      }

      return item[key]
        ?.toString()
        .toLowerCase()
        .includes(filters[key].toLowerCase());
    })
  );

  const generatePDF = () => {

  const doc = new jsPDF({ orientation: "landscape" });

  const today = new Date();
  doc.setFontSize(10);
  doc.text(today.toLocaleString(), 10, 10);

  doc.setFontSize(12);
  doc.text("Rent Report", 148, 10, { align: "center" });

  const tableData = filteredData.map(item => [
    item.name,
    item.fname,
    item.tazkira,
    item.phone,
    item.address,
    item.rooms,
    item.apartment,
    item.bathrooms,
    item.area,
    item.startDate,
    item.endDate,
    item.elevator,
    item.heating,
    item.electricMeter,
    item.roof,
    item.price
  ]);

  autoTable(doc, {   // 👈 اینجا تغییر مهم است
    startY: 20,
    head: [[
      "Name", "F/Name", "Tazkira", "Phone",
      "Address", "Rooms", "Apartment",
      "Bathrooms", "Area", "Start", "End",
      "Elevator", "Heating", "Electric", "Roof", "Price"
    ]],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 8,
      cellPadding: 3,
      halign: "center",
      lineWidth: 0.1,      // 👈 thin border
      lineColor: [0, 0, 0] // black border
    },
    headStyles: {
      fontStyle: "bold",
      fillColor: [240, 240, 240], // light gray header
      textColor: 0
    },
     didDrawPage: function (data) {
    const pageCount = doc.getNumberOfPages();
    const pageSize = doc.internal.pageSize;
    const pageHeight = pageSize.height;
    const pageWidth = pageSize.width;

    doc.setFontSize(9);
    doc.text(
      `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }
  });

  doc.save("Rent_Report.pdf");
};
  

  return (
    <div className="mt-24 max-w-7xl mx-auto p-8 bg-white/20 backdrop-blur-md rounded-2xl text-white">

      <div className="fixed top-6 left-6 z-50">
                  <button
                      onClick={() => navigate(-1)}
                      className="group relative p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-yellow-400/40 active:scale-90 transition-all duration-300 cursor-pointer"
                  >
                      <ArrowLeft
                      size={20}
                      className="text-white group-hover:-translate-x-1 transition-transform duration-300"
                      />
                  </button>
                  </div>
      
                  {/* ID Badge - Right */}
                  <div className="fixed top-6 right-6 z-50">
                  <div className="px-4 py-2 text-white font-semibold">
                      S_B_1
                  </div>
              </div>

      <h2 className="text-3xl font-bold text-center mt-15 md:mt-0 mb-10">
        Rent Report 📊
      </h2>

      {/* ================= FILTERS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">

        {[
          "Name",
          "Fname",
          "Tazkira",
          "Phone",
          "Address",
          "Rooms",
          "Apartment",
          "Bathrooms",
          "Area",
          "Price",
        ].map((field) => (
          <input
            key={field}
            type={["rooms","bathrooms","area","price"].includes(field) ? "number" : "text"}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="bg-white/20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        ))}

        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="bg-white/20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          className="bg-white/20 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {[
          { label: "Elevator", name: "elevator" },
          { label: "Heating", name: "heating" },
          { label: "Electric Meter", name: "electricMeter" },
          { label: "Roof", name: "roof" },
        ].map((field) => (
          <div key={field.name} className="relative">
            <select
              name={field.name}
              onChange={handleChange}
              className="w-full bg-white/15 text-white border border-white/30 backdrop-blur-md p-2 rounded-lg  shadow-md hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            >
              <option value="" className="text-gray-800">{field.label}</option>
              <option value="Yes" className="text-gray-800">Yes</option>
              <option value="No" className="text-gray-800">No</option>
            </select>
          </div>
        ))}

      </div>

      {/* ================= TABLE ================= */}
      <div className="w-full h-[400px] overflow-y-auto border border-white/20 rounded-xl">

        <table className="mw-full table-fixed text-left text-sm">
          
          <thead className="bg-white/20 sticky top-0 backdrop-blur-md">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">F/Name</th>
              <th className="p-3">Tazkira</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Address</th>
              <th className="p-3">Rooms</th>
              <th className="p-3">Apartment</th>
              <th className="p-3">Bathrooms</th>
              <th className="p-3">Area</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Elevator</th>
              <th className="p-3">Heating</th>
              <th className="p-3">Electric</th>
              <th className="p-3">Roof</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length ? (
              filteredData.map((item, i) => (
                <tr key={i} className="border-t border-white/20 hover:bg-white/10">
                  <td className="p-3 wrap-break-words">{item.name}</td>
                  <td className="p-3 wrap-break-words">{item.fname}</td>
                  <td className="p-3 wrap-break-word">{item.tazkira}</td>
                  <td className="p-3 wrap-break-word">{item.phone}</td>
                  <td className="p-3 wrap-break-words">{item.address}</td>
                  <td className="p-3 wrap-break-words">{item.rooms}</td>
                  <td className="p-3 wrap-break-words">{item.apartment}</td>
                  <td className="p-3 wrap-break-words">{item.bathrooms}</td>
                  <td className="p-3 wrap-break-words">{item.area}</td>
                  <td className="p-3 wrap-break-words">{item.startDate}</td>
                  <td className="p-3 wrap-break-words">{item.endDate}</td>
                  <td className="p-3 wrap-break-words">{item.elevator}</td>
                  <td className="p-3 wrap-break-words">{item.heating}</td>
                  <td className="p-3 wrap-break-words">{item.electricMeter}</td>
                  <td className="p-3 wrap-break-words">{item.roof}</td>
                  <td className="p-3 font-semibold wrap-break-words">{item.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="16" className="p-6 text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={generatePDF}
          className="group relative inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300 ease-in-out rounded-xl font-semibold text-white shadow-lg"
        >
          <Printer className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          Print Report
        </button>
      </div>

    </div>
  );
};

export default Rent_Report_page;
