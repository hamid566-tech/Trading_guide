const ReportFilters = ({ fields, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">

      {fields.map((field) => {

        if (field.type === "select") {
          return (
            <select
              key={field.name}
              name={field.name}
              onChange={onChange}
              className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
            >
              <option value="" className="text-gray-800">
                {field.label}
              </option>
              {field.options.map((opt) => (
                <option key={opt} value={opt} className="text-gray-800">
                  {opt}
                </option>
              ))}
            </select>
          );
        }

        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.label}
            onChange={onChange}
            className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-white/70"
          />
        );
      })}
    </div>
  );
};


export default ReportFilters;