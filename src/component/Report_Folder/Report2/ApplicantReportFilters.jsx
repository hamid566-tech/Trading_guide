import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useLanguage } from "../../../context/LanguageContext";

const ApplicantReportFilters = ({ fields, filters, onChange }) => {

  const { t } = useLanguage();

  const handleTextChange = (name, value) => {
    onChange({ target: { name, value } });
  };

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

        // ✅ SELECT
        if (field.type === "select") {
          return (
            <select
              key={field.name}
              name={field.name}
              value={filters[field.name] || ""}
              onChange={onChange}
              className="bg-white/10 border border-white/30 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">{t.select} {t[field.label]}</option>

              {field.options?.map((opt) => (
                <option key={opt} value={opt} className="text-gray-800">
                  {t[opt] || opt}
                </option>
              ))}
            </select>
          );
        }

        // ✅ DATE
        if (field.name === "startDate" || field.name === "endDate") {
          return (
            <DatePicker
              key={field.name}
              calendar={persian}
              locale={persian_en}
              format="YYYY/MM/DD"
              value={filters[field.name] || null}
              onChange={(date) => handleDateChange(field.name, date)}
              inputClass="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 w-full"
              placeholder={t[field.label]}
            />
          );
        }

        // ✅ TEXT
        return (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={t[field.label]}
            value={filters[field.name] || ""}
            onChange={(e) => handleTextChange(field.name, e.target.value)}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70 w-full"
          />
        );

      })}
    </div>
  );
};

export default ApplicantReportFilters;