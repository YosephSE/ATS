import { jsPDF } from 'jspdf';
import uploadImage from './imageUploader';
import { candidateProfile, Education, Experience } from '../../types/users.types';


export const generateAndUploadPdf = async (data: candidateProfile) => {
  const doc = new jsPDF();
  const titleColor = '#007BFF'; 
  const sectionColor = '#343A40'; 
  const textColor = '#212529'; 

  const placeholderAvatar = "https://i.postimg.cc/GtBKLRbj/l60Hf.png";

  //Profile
  doc.setFontSize(22);
  doc.setTextColor(titleColor);
  doc.text("Profile", 15, 20);

  const avatar = data.profilePicture || placeholderAvatar;
  doc.addImage(avatar,"JPEG", 15, 30, 50, 50);

  // Name and Job Title
  doc.setFontSize(18);
  doc.setTextColor(titleColor);
  doc.text(`${data.firstName} ${data.lastName}`, 70, 40);

  // Contact Details
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(titleColor);
  doc.text(`Details`, 15, 70);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(textColor);
  doc.text(`Phone: ${data.phoneNumber}`, 15, 80);
  doc.text(`Email: ${data.email}`, 15, 85);
  doc.text(`LinkedIn: ${data.linkedIn}`, 15, 90);

  doc.setDrawColor(textColor);
  doc.line(15, 95, 195, 95); 

  // Skills section
  doc.setFontSize(16);
  doc.setTextColor(sectionColor);
  doc.setFont('Helvetica', 'bold');
  doc.text("Skills", 15, 110);
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  const skillsList = data.skills.join(", ");
  doc.text(skillsList, 15, 120);

  doc.setDrawColor(textColor);
  doc.line(15, 125, 195, 125); 

  //Experience
  doc.setFontSize(16);
  doc.setTextColor(sectionColor);
  doc.setFont('Helvetica', 'bold');
  doc.text("Experience", 15, 140);
  data.experience.forEach((exp: Experience, index: number) => {
    const yPos = 150 + index * 20; // Adjusted spacing
    doc.setFontSize(12);
    doc.setTextColor(textColor);
    doc.setFont('Helvetica', 'bold');
    doc.text(`${exp.title} at ${exp.company}`, 15, yPos);
    doc.setFont('Helvetica', 'italic');
    doc.text(`${exp.location} (${exp.startDate} - ${exp.endDate})`, 15, yPos + 5);
    doc.setFont('Helvetica', 'normal');
    doc.text(`${exp.description}`, 15, yPos + 10);
  });

  doc.setDrawColor(textColor);
  doc.line(15, data.experience.length * 20 + 145, 195, data.experience.length * 20 + 145); // Draw a line

  // Education section
doc.setFontSize(16);
doc.setTextColor(sectionColor);
doc.setFont('Helvetica', 'bold');
doc.text("Education", 15, data.experience.length * 30 + 140); 

data.education.forEach((edu: Education, index: number) => {
  const yPos = data.experience.length * 30 + 150 + index * 13; 
  doc.setFontSize(12);
  doc.setTextColor(textColor);
  doc.setFont('Helvetica', 'bold');
  doc.text(`${edu.degree} in ${edu.fieldOfStudy}`, 15, yPos);
  doc.setFont('Helvetica', 'italic');
  doc.text(`${edu.schoolName} (${edu.startYear} - ${edu.endYear})`, 15, yPos + 5);
});

  const pdfBlob = doc.output('blob');
  const pdfFile = new File([pdfBlob], `${data.firstName}_${data.lastName}.pdf`, { type: 'application/pdf' });

  const uploadedLink = await uploadImage(pdfFile);
  return uploadedLink;
};