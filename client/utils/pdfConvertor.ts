import { jsPDF } from 'jspdf';
import uploadImage from './imageUploader';
import { candidateProfile, Education, Experience } from '../../types/users.types';

export const generateAndUploadPdf = async (data: candidateProfile) => {
  const doc = new jsPDF();
  const titleColor = '#007BFF'; 
  const sectionColor = '#343A40'; 
  const textColor = '#212529'; 
  const pageHeight = doc.internal.pageSize.height; // get the page height

  const placeholderAvatar = "https://i.postimg.cc/GtBKLRbj/l60Hf.png";

  let currentY = 20; // Track current Y position for overflow handling

  // Profile Section
  doc.setFontSize(22);
  doc.setTextColor(titleColor);
  doc.text("Profile", 15, currentY);
  currentY += 10;

  const avatar = data.profilePicture || placeholderAvatar;
  doc.addImage(avatar, "JPEG", 15, currentY, 50, 50);
  currentY += 55;

  // Name and Job Title
  doc.setFontSize(18);
  doc.setTextColor(titleColor);
  doc.text(`${data.firstName} ${data.lastName}`, 70, currentY - 25); // Adjusted to align with avatar

  // Contact Details
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(titleColor);
  doc.text(`Details`, 15, currentY);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(textColor);
  doc.text(`Phone: ${data.phoneNumber}`, 15, currentY + 10);
  doc.text(`Email: ${data.email}`, 15, currentY + 15);
  doc.text(`LinkedIn: ${data.linkedIn}`, 15, currentY + 20);

  currentY += 30;

  doc.setDrawColor(textColor);
  doc.line(15, currentY, 195, currentY); 
  currentY += 10;

  // Page overflow handler
  const checkPageOverflow = (additionalSpace: number) => {
    if (currentY + additionalSpace > pageHeight - 20) { 
      doc.addPage();
      currentY = 20; 
    }
  };

  // Skills Section
  doc.setFontSize(16);
  doc.setTextColor(sectionColor);
  doc.setFont('Helvetica', 'bold');
  doc.text("Skills", 15, currentY);
  currentY += 10;

  doc.setFontSize(12);
  doc.setTextColor(textColor);
  const skillsList = data.skills.join(", ");
  const skillsText = doc.splitTextToSize(skillsList, 180); 
  checkPageOverflow(skillsText.length * 6); 
  doc.text(skillsText, 15, currentY);
  currentY += skillsText.length * 6 + 5;

  doc.setDrawColor(textColor);
  doc.line(15, currentY, 195, currentY); 
  currentY += 10;

  // Experience Section
  doc.setFontSize(16);
  doc.setTextColor(sectionColor);
  doc.setFont('Helvetica', 'bold');
  doc.text("Experience", 15, currentY);
  currentY += 10;

  data.experience.forEach((exp: Experience, index: number) => {
    checkPageOverflow(25); 
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${exp.title} at ${exp.company}`, 15, currentY);
    doc.setFont('Helvetica', 'italic');
    doc.text(`${exp.location} (${exp.startDate} - ${exp.endDate})`, 15, currentY + 5);
    doc.setFont('Helvetica', 'normal');
    const experienceDesc = doc.splitTextToSize(exp.description, 180);
    doc.text(experienceDesc, 15, currentY + 10);
    currentY += experienceDesc.length * 6 + 15;
  });

  doc.setDrawColor(textColor);
  doc.line(15, currentY, 195, currentY); 
  currentY += 10;

  // Education Section
  doc.setFontSize(16);
  doc.setTextColor(sectionColor);
  doc.setFont('Helvetica', 'bold');
  doc.text("Education", 15, currentY);
  currentY += 10;

  data.education.forEach((edu: Education, index: number) => {
    checkPageOverflow(20); 
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${edu.degree} in ${edu.fieldOfStudy}`, 15, currentY);
    doc.setFont('Helvetica', 'italic');
    doc.text(`${edu.schoolName} (${edu.startYear} - ${edu.endYear})`, 15, currentY + 5);
    currentY += 15;
  });

  const pdfBlob = doc.output('blob');
  const pdfFile = new File([pdfBlob], `${data.firstName}_${data.lastName}.pdf`, { type: 'application/pdf' });

  const uploadedLink = await uploadImage(pdfFile);
  return uploadedLink;
};
