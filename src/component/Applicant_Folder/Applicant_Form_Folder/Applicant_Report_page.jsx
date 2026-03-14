import React from 'react'
import ApplicantReportHeader from '../../Report_Folder/Report2/ApplicantReportHeader'

const Applicant_Report_page = () => {
  return (
    <div className="mt-24 max-w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl text-white shadow-2xl border border-white/20 p-6">
        
        <ApplicantReportHeader title="Mortgag Report 📊" reportId="r_002" />

        <ReportFilters fields={fields} filters={filters} onChange={handleChange} />

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 rounded-lg font-semibold text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            🔍 Search
          </button>

          <button
            onClick={() => generateReportPDF(columns, filteredData, filters, "Mortgage Report")}
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
  )
}

export default Applicant_Report_page
