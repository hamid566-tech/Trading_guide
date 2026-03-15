import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../fonts/Vazirmatn-Regular-normal";
import "../../../fonts/Vazirmatn-Bold-normal";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

export const ApplicantgenerateReportPDF = (columns, data, filters, title = "Report") => {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("Vazirmatn", "normal");
  
  const pageWidth = doc.internal.pageSize.getWidth(); // اندازه عرض صفحه
  const today = moment().format("jYYYY/jMM/jDD HH:mm");

  // 📅 تاریخ (بالا سمت چپ)
  doc.setFontSize(10);
  doc.text(today, 10, 25);

  // 📌 عنوان (مرکز صفحه)
  doc.setFontSize(12);
  doc.text(title, pageWidth / 2, 10, { align: "center" });

  // 🧾 بخش فیلترها
  doc.setFontSize(10);
  let currentY = 33; // موقعیت شروع عمودی

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      doc.text(`${key} : ${filters[key]}`, 14, currentY);
      currentY += 6;
    }
  });

  // ➕ بخش جمع کل‌ها (راست صفحه)
  const totalRecords = data.length;

  // متن کاملاً به راست تراز شود (10 واحد فاصله از لبه)

  const summaryY = 33;

  doc.text(
    `Total Records: ${totalRecords}`,
    pageWidth - 10,
    summaryY,
    { align: "right" }
  );

  // 📊 داده‌های جدول
  const tableData = data.map(row => columns.map(col => row[col.accessor]));

  autoTable(doc, {
    startY: currentY + 22, // شروع زیر فیلترها و جمع کل‌ها
    head: [columns.map(col => col.header)],
    body: tableData,
    theme: "grid",
    margin: { left: 10, right: 10 },
    tableWidth: "auto",

    styles: {
      font: "Vazirmatn",
      fontStyle: "normal",  
      fontSize: 10,
      halign: "center",
      valign: "middle",
      cellWidth: "auto",
      overflow: "linebreak",
      minCellHeight: 8,
      cellPadding: 2,
      lineWidth: 0.1,
      lineColor: [0, 0, 0],
      textColor: 0,
    },
    headStyles: {
      font: "Vazirmatn",
      fontStyle: "bold",
      fillColor: [240, 240, 240],
      textColor: 0,
    },
    didDrawPage: function () {
      const pageCount = doc.getNumberOfPages();
      const pageSize = doc.internal.pageSize;
      doc.setFontSize(9);
      doc.text(
        `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        pageSize.width / 2,
        pageSize.height - 10,
        { align: "center" }
      );
    },
  });

  doc.save(`${title}.pdf`);
};