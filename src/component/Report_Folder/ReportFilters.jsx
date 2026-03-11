import React from "react";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

const ReportFilters = ({ fields, filters, onChange }) => {

  // تبدیل اعداد فارسی به لاتین
  const persianToEnglish = (str) => {
    if (!str) return "";
    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
    const englishNumbers = "0123456789";
    return str.replace(/[۰-۹]/g, (d) =>
      englishNumbers[persianNumbers.indexOf(d)]
    );
  };

  // برای فیلدهای متنی
  const handleTextChange = (name, value) => {
    const newValue = persianToEnglish(value);
    onChange({ target: { name, value: newValue } });
  };

  // وقتی روی فیلد فوکوس شد تاریخ امروز شمسی وارد شود
  const handleDateFocus = (name) => {
    if (!filters[name]) {
      const todayJ = moment().format("jYYYY/jMM/jDD"); // تاریخ امروز شمسی
      onChange({ target: { name, value: todayJ } });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {fields.map((field) => {
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
                <option key={opt} value={opt} className="text-gray-800">{opt}</option>
              ))}
            </select>
          );
        } else if (field.type === "text" && (field.name === "startDate" || field.name === "endDate")) {
          return (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              value={filters[field.name] || ""}
              onFocus={() => handleDateFocus(field.name)}
              onChange={(e) => handleTextChange(field.name, e.target.value)}
              className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 w-full"
            />
          );
        } else {
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
        }
      })}
    </div>
  );
};

export default ReportFilters;