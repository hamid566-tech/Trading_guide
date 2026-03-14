import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";

// moment.loadPersian({ dialect: "persian-modern" });

const ReportFilters = ({ fields, filters, onChange }) => {


  // تغییر فیلدهای متنی
  const handleTextChange = (name, value) => {
    const newValue = value
    onChange({ target: { name, value: newValue } });
  };

  // تغییر تاریخ
  const handleDateChange = (name, date) => {
    if (!date) {
      onChange({ target: { name, value: "" } });
      return;
    }

    const formatted = date.format("YYYY/MM/DD");

    onChange({
      target: {
        name,
        value: formatted
      }
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {fields.map((field) => {

        // SELECT
        if (field.type === "select") {
          return (
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
          );
        }

        // DATE PICKER (تقویم شمسی)
        if (field.name === "startDate" || field.name === "endDate") {
          return (
            <DatePicker
              key={field.name}
              calendar={persian}
              locale={persian_en}
              format="YYYY/MM/DD"
              value={filters[field.name] || ""}
              onChange={(date) => handleDateChange(field.name, date)}
              inputClass="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 w-full"
              placeholder={field.label}
            />
          );
        }

        // TEXT INPUT
        return (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.label}
            value={filters[field.name] || ""}
            onChange={(e) => handleTextChange(field.name, e.target.value)}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 w-full"
          />
        );

      })}
    </div>
  );
};

export default ReportFilters;