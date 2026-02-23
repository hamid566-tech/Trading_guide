const ReportTable = ({ columns, data }) => {
  return (
    <div className="w-full h-[350px] overflow-y-auto border border-white/20 rounded-xl">

      <table className=" table-fixed text-sm text-left">

        <thead className="bg-white/20 sticky top-0 backdrop-blur-md">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="p-3">
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
                  <td key={col.accessor} className="p-3 wrap-break-word">
                    {row[col.accessor]}
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
}


export default ReportTable;