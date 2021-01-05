var pdf = require("pdfkit");
var fs = require("fs");
var doc = new pdf();

function monthDelta(d2) {
  var months;
  var d1 = new Date("12/01/2020");
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

var issueDate = new Date();
var formattedDate = [
  "20",
  issueDate.getMonth() + 1,
  issueDate.getFullYear(),
].join("/");

var invoiceYear = issueDate.getFullYear() - (issueDate.getMonth() == 0 ? 1 : 0);
var invoiceMonth = [
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
][issueDate.getMonth()];

var clientName = "Evil Incorporated";
var myName = "John Doe";
var subject = `Hours worked in ${invoiceMonth} ${invoiceYear}`;
var quantity = 160;
var unitPrice = 8;
var amountDue = quantity * unitPrice;

var invoiceId = monthDelta(issueDate);
var invoiceFolder = "./invoices";
var invoiceDoc = `${invoiceFolder}/INVOICE_${invoiceId}_${myName.replace(
  /\s/g,
  "_"
)}.pdf`;

var fontRegular = "./fonts/Aller_Rg.ttf";
var fontBold = "./fonts/Aller_Bd.ttf";
var fontLight = "./fonts/Aller_Lt.ttf";
var sizeRegular = 12;
var sizeLight = 10;
var sizeTitle = 24;
var lineColor = "#cccccc";

// INVOICE
doc.pipe(fs.createWriteStream(invoiceDoc));
doc.font(fontBold).fontSize(sizeTitle).text("INVOICE", 50, 50);

// From | Jorge Rolando Kalmbach
doc.font(fontLight).fontSize(sizeLight).text("From", 360, 60);
doc.moveTo(390, 55).lineTo(390, 75).strokeColor(lineColor).stroke();
doc.font(fontBold).fontSize(sizeRegular).text(myName, 400, 59);

// Invoice For | Waysact
doc.font(fontLight).fontSize(sizeLight).text("Invoice For", 334, 130);
doc.moveTo(390, 125).lineTo(390, 145).strokeColor(lineColor).stroke();
doc.font(fontBold).fontSize(sizeRegular).text(clientName, 400, 129);

// Invoice ID
doc.font(fontLight).fontSize(sizeLight).text("Invoice ID", 50, 130);
doc.font(fontRegular).fontSize(sizeLight).text(invoiceId, 125, 130);

// Issue Date
doc.font(fontLight).fontSize(sizeLight).text("Issue Date", 50, 150);
doc.font(fontRegular).fontSize(sizeLight).text(formattedDate, 125, 150);

// Subject
doc.font(fontLight).fontSize(sizeLight).text("Subject", 50, 170);
doc.font(fontRegular).fontSize(sizeLight).text(subject, 125, 170);

doc.moveTo(115, 125).lineTo(115, 190).strokeColor(lineColor).stroke();

// Details Table
doc.moveTo(115, 230).lineTo(115, 270).strokeColor(lineColor).stroke();
doc.moveTo(320, 230).lineTo(320, 270).strokeColor(lineColor).stroke();
doc.moveTo(390, 230).lineTo(390, 270).strokeColor(lineColor).stroke();
doc.moveTo(460, 230).lineTo(460, 270).strokeColor(lineColor).stroke();
doc.moveTo(50, 240).lineTo(550, 240).strokeColor(lineColor).stroke();
doc.moveTo(50, 270).lineTo(550, 270).strokeColor(lineColor).stroke();

doc.font(fontLight).fontSize(sizeLight).text("Item Type", 50, 225);
doc.font(fontLight).fontSize(sizeLight).text("Description", 120, 225);
doc.font(fontLight).fontSize(sizeLight).text("Quantity", 344, 225);
doc.font(fontLight).fontSize(sizeLight).text("Unit Price", 411, 225);
doc.font(fontLight).fontSize(sizeLight).text("Amount", 500, 225);

doc.font(fontLight).fontSize(sizeLight).text("Service", 50, 250);
doc.font(fontLight).fontSize(sizeLight).text(subject, 120, 250);
doc
  .font(fontLight)
  .fontSize(sizeLight)
  .text(parseFloat(quantity).toFixed(2), 352, 250);
doc
  .font(fontLight)
  .fontSize(sizeLight)
  .text(`$ ${parseFloat(unitPrice).toFixed(2)}`, 420, 250);
doc
  .font(fontRegular)
  .fontSize(sizeLight)
  .text(`$ ${parseFloat(amountDue).toFixed(2)}`, 488, 250);

// Amount Due
doc.font(fontRegular).fontSize(sizeRegular).text("Amount Due", 390, 290);
doc
  .font(fontRegular)
  .fontSize(sizeRegular)
  .text(`$ ${parseFloat(amountDue).toFixed(2)}`, 480, 290);

doc.end();

console.log("---------------------");
console.log("From:    ", myName);
console.log("For:     ", clientName);
console.log("Subject: ", subject);
console.log("Amount:  ", amountDue);
console.log("File:    ", invoiceDoc);
console.log("---------------------");
