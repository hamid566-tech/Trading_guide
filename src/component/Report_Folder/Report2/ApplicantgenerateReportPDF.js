import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../fonts/Vazirmatn-Regular-normal";
import "../../../fonts/Vazirmatn-Bold-normal";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

export const ApplicantgenerateReportPDF = (columns, data, filters, title = "Report", t, language = "FA") => {
  const isRTL = language === "FA";
  const doc = new jsPDF({ orientation: "landscape" });

  const fixText = (text) => (text ? String(text) : "");
  doc.setFont("Vazirmatn", "normal");

  const pageWidth = doc.internal.pageSize.getWidth();
  const rightX = pageWidth - 10;
  const leftX = 10;

  // تاریخ و زمان
  const today = fixText(moment().format("jYYYY/jMM/jDD HH:mm"));

  // معکوس کردن ستون‌ها برای RTL
  const tableColumns = isRTL ? [...columns].reverse() : columns;

  // ترجمه مقادیر خاص
  const translateValue = (value) => {
    if (!value) return "";
    const val = String(value).toLowerCase();
    if (val === "yes") return t.yes;
    if (val === "no") return t.no;
    if (val === "available") return t.available;
    if (val === "unavailable") return t.unavailable;
    return value;
  };

  // تاریخ بالا
  doc.setFontSize(10);
  doc.text(today, isRTL ? rightX : leftX, 25, { align: isRTL ? "right" : "left" });

  // عنوان
  doc.setFontSize(14);
  doc.text(fixText(title), pageWidth / 2, 10, { align: "center" });

  // نمایش فیلترها
  doc.setFontSize(10);
  let currentY = 33;
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      const filterLabel = fixText(`${t[key] || key} : ${translateValue(filters[key])}`);
      doc.text(filterLabel, isRTL ? rightX : leftX, currentY, { align: isRTL ? "right" : "left" });
      currentY += 7;
    }
  });

  // جمع کل‌ها
  const totalRecords = data.length;

  doc.text(`${t.total_records || "Total Records"}: ${totalRecords}`, isRTL ? leftX : rightX, currentY, { align: isRTL ? "left" : "right" });

  // داده‌های جدول
  const tableData = data.map(row =>
    tableColumns.map(col => {
      let value = row[col.accessor];
      if (["status", "elevator", "heating", "electric_meter", "roof"].includes(col.accessor)) {
        value = translateValue(value);
      }
      return fixText(value);
    })
  );

  const tableHeaders = [tableColumns.map(col => fixText(t[col.header] || col.header))];

  autoTable(doc, {
    startY: currentY + 10,
    head: tableHeaders,
    body: tableData,
    theme: "grid",
    tableWidth: "full",
    margin: { left: 5, right: 5 },
    styles: {
      font: "Vazirmatn",
      fontSize: 7,
      halign: isRTL ? "right" : "left",
      cellPadding: 2,
    },
    headStyles: {
      halign: isRTL ? "right" : "left",
      fillColor: [245, 245, 245],
      textColor: 20,
      fontSize: 7,
      fontStyle: "bold",
    },
    columnStyles: tableColumns.reduce((acc, col) => {
      acc[col.accessor] = { cellWidth: 'wrap', minCellWidth: 30 };
      return acc;
    }, {}),
    didDrawPage: function () {
      const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(9);
      const footerText = isRTL
        ? `صفحه ${pageNumber} از ${pageCount}`
        : `Page ${pageNumber} of ${pageCount}`;
      doc.text(fixText(footerText), pageWidth / 2, doc.internal.pageSize.height - 10, { align: "center" });
    },
  });

  doc.save(`${title}.pdf`);
};