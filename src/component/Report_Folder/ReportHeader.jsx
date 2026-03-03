import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportHeader = ({ title, reportId }) => {
  const navigate = useNavigate();

  const today = new Date().toLocaleString();

  return (
    <div className="relative mb-10">

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="group p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:bg-white/20 hover:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft
            size={20}
            className="text-white group-hover:-translate-x-1 transition"
          />
        </button>
      </div>

      {/* Report ID */}
      {reportId && (
        <div className="fixed top-6 right-6 px-4 py-2 text-white font-semibold">
          {reportId}
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-white mt-16">
        {title}
      </h2>

      {/* Date */}
      <p className="text-center text-white/70 text-sm mt-2">
        {today}
      </p>

    </div>
  );
};

export default ReportHeader;