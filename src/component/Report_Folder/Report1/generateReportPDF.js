import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../../fonts/Vazirmatn-Regular-normal";
import "../../../fonts/Vazirmatn-Bold-normal";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

export const generateReportPDF = (columns, data, filters, title = "Report", t, language) => {
  const isRTL = language === "FA";
  const doc = new jsPDF({ orientation: "landscape" });

 
  const fixText = (text) => {
    if (!text) return "";
    return String(text);
  };

  doc.setFont("Vazirmatn", "normal");
  const pageWidth = doc.internal.pageSize.getWidth();
  const rightX = pageWidth - 10;
  const leftX = 10;
  
  // تاریخ و زمان
  const todayRaw = moment().format("jYYYY/jMM/jDD HH:mm");
  const today = fixText(todayRaw);

  // معکوس کردن ستون‌ها برای RTL
  const tableColumns = isRTL ? [...columns].reverse() : columns;

  const translateValue = (value, t) => {
    if (!value) return "";
    const val = String(value).toLowerCase();
    if (val === "yes") return t.yes;
    if (val === "no") return t.no;
    if (val === "available") return t.available;
    if (val === "unavailable") return t.unavailable;
    return value;
  };

  // 📅 تاریخ (بالا)
  doc.setFontSize(10);
  doc.text(today, isRTL ? rightX : leftX, 25, { align: isRTL ? "right" : "left" });

  // 📌 عنوان
  doc.setFontSize(14);
  doc.text(fixText(title), pageWidth / 2, 10, { align: "center" });

  // 🧾 بخش فیلترها و جمع کل
  doc.setFontSize(10);
  let currentY = 33;
  const alignX = isRTL ? 10 : pageWidth - 10;
  const alignX1 = isRTL ? pageWidth - 10 : 10 ;

  // نمایش فیلترها
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      const filterLabel = fixText(`${t[key]} : ${translateValue(filters[key], t)}`);
      doc.text(filterLabel, isRTL ? pageWidth - 10 : 10, currentY, { align: isRTL ? "right" : "left" });
      currentY += 7;
    }
  });

  // محاسبات مالی
  const totalRecords = data.length;
  const totalPrice = data.reduce((sum, row) => sum + Number(row.price || 0), 0);
  const totalfinalPrice = data.reduce((sum, row) => sum + Number(row.final_price || 0), 0);
  
  doc.text(fixText(`${t.total_records}: ${totalRecords}`), isRTL ? 10 : pageWidth - 10, currentY, { align: isRTL ? "left" :"right"  });
  doc.text(fixText(`${t.total_price}: ${totalPrice.toLocaleString()}`), isRTL ? leftX : rightX, currentY + 7, { align: isRTL ?  "left" :"right" });
  doc.text(fixText(`${t.total_final_price}: ${totalfinalPrice.toLocaleString()}`), isRTL ? leftX : rightX, currentY + 14, { align: isRTL ?  "left" :"right"  });

  // 📊 آماده‌سازی داده‌های جدول
  const tableData = data.map(row =>
    tableColumns.map(col => {
      let value = row[col.accessor];
      // ترجمه مقادیر خاص
      if (["status", "elevator", "heating", "electric_meter", "roof"].includes(col.accessor)) {
        value = translateValue(value, t);
      }
      return fixText(value); 
    })
  );

  const tableHeaders = [tableColumns.map(col => fixText(t[col.header]))];

  autoTable(doc, {
    startY: currentY + 20,
    head: tableHeaders,
    body: tableData,
    theme: "grid",

    
    tableWidth: 'full',
    margin: { left: 5, right: 5 },

    styles: {
      font: "Vazirmatn", // استفاده اجباری از وزیر برای نمایش فارسی
      fontSize: 7,
      halign: isRTL ? "right" : "left",
      cellPadding: 2,
    },
    headStyles: {
      halign: isRTL ? "right" : "left", // 👈 خیلی مهم
      fillColor: [245, 245, 245],
      textColor: 20,
      fontSize: 7,
      fontStyle: "bold",
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
  
      // بعد از تمام جدول:
      doc.putTotalPages('{total_pages}');

  doc.save(`${title}.pdf`);
};