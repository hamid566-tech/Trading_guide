const UserReportTable = ({ columns, data }) => {
  // List of columns that are "boolean/permission" type
  const booleanColumns = [
    "rent_form", "rent_report",
    "mortgage_form", "mortgage_report",
    "saleable_form", "saleable_report",
    "applicant_form", "applicant_report",
    "user_create_form", "user_report",
    "submit", "update_perm",
    "delete_perm", "search_perm",
    "print_perm"
  ];

  return (
    <div className="w-full overflow-x-auto border border-white/20 rounded-xl">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-white/20 sticky top-0 backdrop-blur-md">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="p-3 whitespace-normal wrap-break-words max-w-[150px]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, i) => (
              <tr key={i} className="border-t border-white/20 hover:bg-white/10">
                {columns.map((col) => {
                  const value = row[col.accessor];

                  // Check if column is in booleanColumns
                  const isBoolean = booleanColumns.includes(col.accessor);
                  const bgColor = isBoolean
                    ? value === 1
                      ? "bg-gradient-to-r from-green-500/50 to-green-700/50 text-white"
                      : "bg-gradient-to-r from-red-500/50 to-red-700/50 text-white"
                    : "";

                  return (
                    <td key={col.accessor} className="p-3 wrap-break-words max-w-[150px]">
                      {isBoolean ? (
                        <span className={`rounded-full text-xs flex justify-center font-semibold px-2 py-1 ${bgColor}`}>
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-6 text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserReportTable;