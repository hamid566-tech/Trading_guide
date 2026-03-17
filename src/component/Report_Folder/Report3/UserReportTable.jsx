const UserReportTable = ({ columns, data }) => {
  return (
    <div className="w-full overflow-x-auto border border-white/20 rounded-xl">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-white/20 sticky top-0 backdrop-blur-md">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="p-3 whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, i) => (
              <tr key={i} className="border-t border-white/20 hover:bg-white/10">
                {columns.map((col) => (
                  <td key={col.accessor} className="p-3 wrap-break-words max-w-[150px]">
                    {col.accessor === "status" ? (
                      <span
                        className={`rounded-full text-xs flex justify-center font-semibold px-2 py-1
                          ${row.status === "available"
                            ? "bg-green-600 text-white"
                            : row.status === "unavailable"
                            ? "bg-red-600 text-white"
                            : "bg-gray-400 text-gray-800"
                          }`}
                      >
                        {row.status}
                      </span>
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
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