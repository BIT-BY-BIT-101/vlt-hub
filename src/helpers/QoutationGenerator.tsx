import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (
  pdfElements: React.RefObject<HTMLDivElement>[]
) => {
  const pdf = new jsPDF("p", "mm", "a4"); // Creates a new PDF document
  const pdfWidth = pdf.internal.pageSize.getWidth();

  for (let i = 0; i < pdfElements.length; i++) {
    const element = pdfElements[i].current;
    if (!element) continue; // Skip if ref is null

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Adjust scale for better resolution
    });
    const imgData = canvas.toDataURL("image/png");
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Add a new page if there are more elements to process
    if (i < pdfElements.length - 1) {
      pdf.addPage();
    }
  }

  pdf.save("Proposal.pdf"); // Save the generated PDF
};
