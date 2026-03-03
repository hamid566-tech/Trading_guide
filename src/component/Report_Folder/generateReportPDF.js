import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../fonts/Vazirmatn-Regular-normal";
import "../../fonts/Vazirmatn-Bold-normal";

export const generateReportPDF = (columns, data, filters, title = "Report") => {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("Vazirmatn", "normal");
  
  const pageWidth = doc.internal.pageSize.getWidth(); // اندازه عرض صفحه
  const today = new Date().toLocaleString();

  // 📅 تاریخ (بالا سمت چپ)
  doc.setFontSize(10);
  doc.text(today, 10, 10);

  // 📌 عنوان (مرکز صفحه)
  doc.setFontSize(12);
  doc.text(title, pageWidth / 2, 10, { align: "center" });

  // 🧾 بخش فیلترها
  doc.setFontSize(10);
  let currentY = 18; // موقعیت شروع عمودی

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      doc.text(`${key} : ${filters[key]}`, 14, currentY);
      currentY += 6;
    }
  });

  // ➕ بخش جمع کل‌ها (راست صفحه)
  const totalRecords = data.length;
  const totalPrice = data.reduce((sum, row) => sum + Number(row.price || 0), 0);
  const totalFinalPrice = data.reduce((sum, row) => sum + Number(row.final_price || 0),0);

  // متن کاملاً به راست تراز شود (10 واحد فاصله از لبه)
  doc.text(
    `Total Records: ${totalRecords}`,
    pageWidth - 10,
    currentY + 4,
    { align: "right" }
  );
  doc.text(
    `Total Price: ${totalPrice.toLocaleString()}`,
    pageWidth - 10,
    currentY + 10,
    { align: "right" }
  );
  doc.text(
    `Total Final Price: ${totalFinalPrice.toLocaleString()}`,
    pageWidth - 10,
    currentY + 16,
    { align: "right" }
  );

  // 📊 داده‌های جدول
  const tableData = data.map(row => columns.map(col => row[col.accessor]));

  autoTable(doc, {
    startY: currentY + 22, // شروع زیر فیلترها و جمع کل‌ها
    head: [columns.map(col => col.header)],
    body: tableData,
    theme: "grid",
    styles: {
      font: "Vazirmatn",
      fontStyle: "normal",  
      fontSize: 8,
      halign: "center",
      valign: "middle",
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