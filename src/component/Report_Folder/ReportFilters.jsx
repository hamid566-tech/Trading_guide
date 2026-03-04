import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ReportFilters = ({ fields, filters, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {fields.map((field) =>
        field.type === "select" ? (
          <select
            key={field.name}
            name={field.name}
            value={filters[field.name] || ""}
            onChange={onChange}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white w-full"
          >
            <option value="">{field.label}</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt} className="text-gray-800">
                {opt}
              </option>
            ))}
          </select>
        ) : field.type === "text" && (field.name === "startDate" || field.name === "endDate") ? (
          <DatePicker
            key={field.name}
            calendar={persian}
            locale={persian_fa}
            value={filters[field.name] || null}
            onChange={(date) =>
              onChange({
                target: { name: field.name, value: date.format("YYYY/MM/DD") },
              })
            }
            placeholder={field.label}
            inputClass="bg-white/20 text-white w-full p-2 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        ) : (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.label}
            value={filters[field.name] || ""}
            onChange={onChange}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 w-full"
          />
        )
      )}
    </div>
  );
};

export default ReportFilters;