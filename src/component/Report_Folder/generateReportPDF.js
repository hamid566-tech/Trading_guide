import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReportPDF = (columns, data, title = "Report") => {

  const doc = new jsPDF({ orientation: "landscape" });

  const today = new Date().toLocaleString();

  // 📅 Date (Top Left)
  doc.setFontSize(10);
  doc.text(today, 10, 10);

  // 📌 Title (Center)
  doc.setFontSize(12);
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 10, {
    align: "center",
  });

  // 📊 Table Data
  const tableData = data.map(row =>
    columns.map(col => row[col.accessor])
  );

  autoTable(doc, {
    startY: 20,
    head: [columns.map(col => col.header)],
    body: tableData,

    theme: "grid",

    styles: {
      fontSize: 8,
      halign: "center",
      valign: "middle",
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      textColor: 0,
    },

    headStyles: {
      fillColor: [240, 240, 240],
      textColor: 0,
      fontStyle: "bold",
    },

    didDrawPage: function (data) {
      const pageCount = doc.getNumberOfPages();
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height;
      const pageWidth = pageSize.width;

      doc.setFontSize(9);
      doc.text(
        `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    },
  });

  doc.save(`${title}.pdf`);
};