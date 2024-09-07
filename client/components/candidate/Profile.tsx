import React, { useState, ChangeEvent } from "react";
import { Plus } from "lucide-react";
import uploadImage from "@/utils/imageUploader";

interface Education {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  email: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  linkedIn: string;
  resume: string;
}

const CandidateProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "Y",
    lastName: "K",
    password: "",
    phoneNumber: "0912345678",
    email: "y.k@g.com",
    skills: ["JavaScript", "Node.js", "MongoDB", "React", "Python"],
    education: [
      {
        schoolName: "Harvard University",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startYear: "2015",
        endYear: "2019",
      },
    ],
    experience: [
      {
        title: "Software Engineer",
        company: "Tech Corp",
        location: "New York, NY",
        startDate: "2019-06-01",
        endDate: "2021-08-31",
        description: "Developed and maintained web applications using JavaScript, Node.js, and MongoDB.",
      },
      {
        title: "Senior Software Engineer",
        company: "Innovatech",
        location: "San Francisco, CA",
        startDate: "2021-09-01",
        endDate: "2023-03-01",
        description: "Led a team of developers in building scalable web solutions and microservices architecture.",
      },
    ],
    linkedIn: "https://linkedin.com/in/johndoe",
    resume: "https://example.com/resume/johndoe.pdf",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imgLink, setImgLink] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)),
    }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }));
  };

  const addEducation = () => {
    setProfileData((prev) => ({
      ...prev,
      education: [...prev.education, { schoolName: "", degree: "", fieldOfStudy: "", startYear: "", endYear: "" }],
    }));
  };

  const addExperience = () => {
    setProfileData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", location: "", startDate: "", endDate: "", description: "" }],
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0] as File);
    }
  };

  const handleUpdateProfile = async () => {
    if (image) {
      const uploadedImgLink = await uploadImage(image) || null;
      setImgLink(uploadedImgLink);
    }
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 order-1 md:order-none">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center mb-4">
              {imgLink ? (
                <img
                  src={imgLink}
                  alt={profileData.firstName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {profileData.firstName.charAt(0)}
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-gray-600 text-center mb-1">
              Email: {profileData.email}
            </p>
            <p className="text-gray-600 text-center mb-4">
              Phone Number: {profileData.phoneNumber}
            </p>

            {!isEditing ? (
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Edit Profile
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                  Delete
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="password"
                  name="password"
                  value={profileData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="New Password"
                />
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded"
                  accept="image/*"
                />
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={handleUpdateProfile}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-2/3 order-2 md:order-none">
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="First Name"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Last Name"
                disabled={!isEditing}
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Email"
                disabled={!isEditing}
              />
              <input
                type="tel"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Phone Number"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="linkedIn"
                value={profileData.linkedIn}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="LinkedIn URL"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="resume"
                value={profileData.resume}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                placeholder="Resume URL"
                disabled={!isEditing}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <input
                type="text"
                name="skills"
                value={profileData.skills.join(", ")}
                onChange={(e) => setProfileData((prev) => ({ ...prev, skills: e.target.value.split(", ") }))}
                className="w-full px-3 py-2 border rounded"
                placeholder="Skills (comma-separated)"
                disabled={!isEditing}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              {profileData.education.map((edu, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    value={edu.schoolName}
                    onChange={(e) => handleEducationChange(index, "schoolName", e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="School Name"
                    disabled={!isEditing}
                  />
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Degree"
                    disabled={!isEditing}
                  />
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleEducationChange(index, "fieldOfStudy", e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Field of Study"
                    disabled={!isEditing}
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={edu.startYear}
                      onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
                      className="w-1/2 px-3 py-2 border rounded"
                      placeholder="Start Year"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
                      className="w-1/2 px-3 py-2 border rounded"
                      placeholder="End Year"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={addEducation}
                  className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
                >
                  <Plus size={16} className="mr-1" /> Add Education
                </button>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              {profileData.experience.map((exp, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Job Title"
                    disabled={!isEditing}
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Company"
                    disabled={!isEditing}
                  />
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, "location", e.target.value)}
                    className="w-full px-3 py-2 border rounded mb-2"
                    placeholder="Location"
                    disabled={!isEditing}
                  />
                  <div className="flex gap-2 mb-2">
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                      className="w-1/2 px-3 py-2 border rounded"
                      disabled={!isEditing}
                    />
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                      className="w-1/2 px-3 py-2 border rounded"
                      disabled={!isEditing}
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Job Description"
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={addExperience}
                  className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
                >
                  <Plus size={16} className="mr-1" /> Add Experience
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;