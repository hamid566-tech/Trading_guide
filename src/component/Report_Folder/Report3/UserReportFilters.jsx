import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";

const UserReportFilters = ({ fields, filters, onChange, checkFields, limitationFields }) => {

  // تغییر فیلدهای متنی
  const handleTextChange = (name, value) => {
    onChange({ target: { name, value } });
  };

  // تغییر تاریخ
  const handleDateChange = (name, date) => {
    const formatted = date ? date.format("YYYY/MM/DD") : "";
    onChange({ target: { name, value: formatted } });
  };

  // تغییر checkbox
  const handleCheckboxChange = (name, checked) => {
    onChange({ target: { name, value: checked ? 1 : 0 } });
  };

  return (
    <div className="space-y-6">

      {/* Text & Date Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fields.map((field) => {
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

      {/* Check Fields */}
      {checkFields && (
        <div className="p-4 bg-white/10 rounded-xl border border-white/20">
          <h3 className="text-white font-bold mb-2 text-center py-3">Permissions</h3>
          <div className="grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {checkFields.map((item) => (
              <label key={item.name} className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="checkbox"
                  checked={filters[item.name] === 1}
                  onChange={(e) => handleCheckboxChange(item.name, e.target.checked)}
                  className="w-4 h-4 accent-yellow-400"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Limitation Fields */}
      {limitationFields && (
        <div className="p-4 bg-white/10 rounded-xl border border-white/20">
          <h3 className="text-white font-bold mb-2 text-center py-3">Limitations</h3>
          <div className="grid grid-cols-1 px-5 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {limitationFields.map((item) => (
              <label key={item.name} className="flex items-center gap-2 cursor-pointer text-white">
                <input
                  type="checkbox"
                  checked={filters[item.name] === 1}
                  onChange={(e) => handleCheckboxChange(item.name, e.target.checked)}
                  className="w-4 h-4 accent-yellow-400"
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default UserReportFilters;