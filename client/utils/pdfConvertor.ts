import { jsPDF } from 'jspdf';
import uploadImage from './imageUploader';

export const generateAndUploadPdf = async (data: any) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    linkedIn,
    skills,
    education,
    experience,
  } = data;

  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text(`${firstName} ${lastName}`, 20, 30);
  doc.setFontSize(12);
  doc.text(`Phone: ${phoneNumber}`, 20, 40);
  doc.text(`Email: ${email}`, 20, 50);
  doc.text(`LinkedIn: ${linkedIn}`, 20, 60);

  doc.text('Skills:', 20, 80);
  doc.setFontSize(12);
  skills.forEach((skill:any, index: number) => {
    doc.text(`• ${skill}`, 20, 90 + index * 10);
  });

  doc.setFontSize(14);
  doc.text('Education:', 20, 110 + skills.length * 10);
  doc.setFontSize(12);
  education.forEach((edu:any, index: number) => {
    doc.text(`• ${edu}`, 20, 120 + (skills.length + index) * 10);
  });

  doc.setFontSize(14);
  doc.text('Experience:', 20, 130 + (skills.length + education.length) * 10);
  doc.setFontSize(12);
  experience.forEach((exp: any, index: number) => {
    doc.text(`• ${exp}`, 20, 140 + (skills.length + education.length + index) * 10);
  });

  const pdfBlob = doc.output('blob');

  const formData = new FormData();
  formData.append('file', pdfBlob, 'application.pdf');

  //const uploadedLink = await uploadImage(formData)
  //return uploadedLink
};