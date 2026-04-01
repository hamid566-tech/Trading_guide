import { useLanguage } from "../../../context/LanguageContext";
const ReportTable = ({ columns, data }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full h-[400px] overflow-y-auto overflow-x-auto border border-white/20 rounded-xl">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-white/20 sticky top-0 z-10 backdrop-blur-md">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="p-3 whitespace-nowrap">
                {t[col.header]}
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
                        {t[row.status]}
                      </span>
                    ) : ["elevator","heating","electric_meter","roof"].includes(col.accessor) ? (
                      t[row[col.accessor]?.toLowerCase()]
                    ): (
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

export default ReportTable;