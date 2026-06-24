/** Minimal valid PDF generator (no external deps) for vendor sales reports */

function escapePdfText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function buildVendorSalesReportPdf(data: {
  storeName: string;
  generatedAt: string;
  totalEarnings: number;
  totalOrders: number;
  averageRating: number;
  reviewCount: number;
  chartLabels: string[];
  revenueSeries: number[];
  ordersSeries: number[];
}): Blob {
  const lines = [
    "BuildConnect — Vendor Sales Report",
    `Store: ${data.storeName}`,
    `Generated: ${data.generatedAt}`,
    "",
    `Total earnings: RWF ${data.totalEarnings.toLocaleString()}`,
    `Total orders: ${data.totalOrders}`,
    `Average rating: ${data.averageRating} (${data.reviewCount} reviews)`,
    "",
    "Monthly revenue (RWF):",
    ...data.chartLabels.map((label, i) => `  ${label}: ${(data.revenueSeries[i] ?? 0).toLocaleString()}`),
    "",
    "Monthly orders:",
    ...data.chartLabels.map((label, i) => `  ${label}: ${data.ordersSeries[i] ?? 0}`),
    "",
    "— End of report —",
  ];

  const contentLines = ["BT", "/F1 11 Tf", "50 750 Td", "14 TL"];
  lines.forEach((line, i) => {
    if (i === 0) {
      contentLines.push(`(${escapePdfText(line)}) Tj`);
    } else {
      contentLines.push("T*");
      contentLines.push(`(${escapePdfText(line)}) Tj`);
    }
  });
  contentLines.push("ET");
  const stream = contentLines.join("\n");
  const streamLen = new TextEncoder().encode(stream).length;

  const objects = [
    "1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj",
    "2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj",
    "3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>endobj",
    `4 0 obj<< /Length ${streamLen} >>stream\n${stream}\nendstream\nendobj`,
    "5 0 obj<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>endobj",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];
  objects.forEach((obj) => {
    offsets.push(pdf.length);
    pdf += obj + "\n";
  });
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

export function downloadPdfBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
