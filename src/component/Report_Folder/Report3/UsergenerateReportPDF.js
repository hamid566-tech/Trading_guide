import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../fonts/Vazirmatn-Regular-normal";
import "../../../fonts/Vazirmatn-Bold-normal";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern" });

export const UsergenerateReportPDF = (columns, data, filters, title = "Report", t, language) => {
  const isRTL = language === "FA";
  const doc = new jsPDF({ orientation: "landscape" });

  
  const fixText = (text) => {
    if (!text) return "0";
    return String(text);
  };

  doc.setFont("Vazirmatn", "normal");
  
  const pageWidth = doc.internal.pageSize.getWidth(); // اندازه عرض صفحه
  const rightX = pageWidth - 10;
  const leftX = 10;
  const today = moment().format("jYYYY/jMM/jDD HH:mm");

  // 📅 تاریخ (بالا سمت چپ)
  doc.setFontSize(10);
  doc.text(today, isRTL ? rightX : leftX, 25, {
    align: isRTL ? "right" : "left"
  });

  // 📌 عنوان (مرکز صفحه)
  doc.setFontSize(12);
  doc.text(fixText(title), pageWidth / 2, 10, { align: "center" });

  // 🧾 بخش فیلترها
  doc.setFontSize(10);
  let currentY = 33; // موقعیت شروع عمودی

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      const filterLabel = `${t[key]} : ${filters[key]}`;
      doc.text(fixText(filterLabel),isRTL ? pageWidth - 10 : 10,currentY,{ align: isRTL ? "right" : "left" });
      currentY += 7;
      }
    });

  // ➕ بخش جمع کل‌ها (راست صفحه)
  const totalRecords = data.length;

  // متن کاملاً به راست تراز شود (10 واحد فاصله از لبه)

  const summaryY = 33;

  doc.text(fixText(`${t.total_records}: ${totalRecords}`),isRTL ? 10 : pageWidth - 10,summaryY,{ align: isRTL ? "left" : "right" });

  // 📊 داده‌های جدول
  const tableColumns = isRTL ? [...columns].reverse() : columns;
  const tableData = data.map(row =>tableColumns.map(col => fixText(row[col.accessor])));

  autoTable(doc, {
    startY: currentY + 22, // شروع زیر فیلترها و جمع کل‌ها
    head: [tableColumns.map(col => fixText(t[col.header]))],
    body: tableData,
    theme: "grid",
    margin: { left: 10, right: 10 },
    tableWidth: "auto",

    styles: {
      font: "Vazirmatn",
      fontStyle: "normal",  
      fontSize: 6,
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
    columnStyles: tableColumns.reduce((acc, col) => {
      acc[col.accessor] = { cellWidth: 'wrap', minCellWidth: 30 };
      return acc;
    }, {}),

    didDrawPage: function (data) {
      const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
      const footer = isRTL ? `صفحه ${pageNumber} از {total_pages}` : `Page ${pageNumber} of {total_pages}`;
      doc.setFontSize(9);
      doc.text(fixText(footer), pageWidth / 2, doc.internal.pageSize.height - 10, { align: "center" });
    },
  });

  doc.save(`${title}.pdf`);
};