import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (pdfElement: any) => {
  const pdf = new jsPDF("p", "mm", "a4"); // Creates a new PDF document

  // Convert HTML to canvas
  const canvas = await html2canvas(pdfElement.current, {
    scale: 2, // Adjust scale for better resolution
  });
  const imgData = canvas.toDataURL("image/png");

  // Add the image to PDF (width, height might need adjustment for a4 format)
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("Proposal.pdf"); // Save PDF
};
