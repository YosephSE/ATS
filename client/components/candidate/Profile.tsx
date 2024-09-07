import React, { useState, ChangeEvent } from "react";
import { Edit2, X } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  email: string;
  skills: string[];
  education: {
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startYear: number;
    endYear: number;
  }[];
  experience: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

const user = {
  _id: "66d8ca6d3af2918c82e14976",
  firstName: "Y",
  lastName: "K",
  email: "y.k@g.com",
  skills: ["JavaScript", "Node.js", "MongoDB", "React", "Python"],
  bookmarks: ["64b7c92e5d8e4b001a1b1c5a", "64b7c97e5d8e4b001a1b1c5b"],
  education: [
    {
      _id: "66dc571db519611384150f6e",
      schoolName: "Harvard University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startYear: 2015,
      endYear: 2019,
    },
    {
      _id: "66dc571db519611384150f6f",
      schoolName: "Harvard University",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startYear: 2015,
      endYear: 2019,
    },
  ],
  experience: [
    {
      _id: "66dc571db519611384150f70",
      title: "Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      startDate: "2019-06-01T00:00:00.000Z",
      endDate: "2021-08-31T00:00:00.000Z",
      description:
        "Developed and maintained web applications using JavaScript, Node.js, and MongoDB.",
    },
    {
      _id: "66dc571db519611384150f71",
      title: "Senior Software Engineer",
      company: "Innovatech",
      location: "San Francisco, CA",
      startDate: "2021-09-01T00:00:00.000Z",
      endDate: "2023-03-01T00:00:00.000Z",
      description:
        "Led a team of developers in building scalable web solutions and microservices architecture.",
    },
  ],
  __v: 0,
  linkedIn: "https://linkedin.com/in/johndoe",
  resume: "https://example.com/resume/johndoe.pdf",
};
const AdminProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
    phoneNumber: "0912345678",
    email: user.email,
    skills: user.skills,
    education: user.education,
    experience: user.experience,
  });
  const [image, setImage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdateProfile = () => {
    // Here you would typically send the updated data to your backend
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          {image ? (
            <img
              src={image}
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

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Last Name"
            />
            <input
              type="text"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Phone Number"
            />
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={profileData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
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
        ) : (
          <div>
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
            <h3 className="text-lg font-semibold mt-4">Skills</h3>
            <p>{profileData.skills.join(", ")}</p>
            <h3 className="text-lg font-semibold mt-4">Education</h3>
            <ul>
              {profileData.education.map((edu, index) => (
                <li key={index} className="mb-2">
                  {edu.degree} in {edu.fieldOfStudy} from {edu.schoolName} (
                  {edu.startYear} - {edu.endYear})
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4">Experience</h3>
            <ul>
              {profileData.experience.map((exp, index) => (
                <li key={index} className="mb-2">
                  <strong>{exp.title}</strong> at {exp.company}, {exp.location}{" "}
                  ({new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {new Date(exp.endDate).toLocaleDateString()})
                  <p>{exp.description}</p>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mt-4">LinkedIn</h3>
            <a
              href={user.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {user.linkedIn}
            </a>
            <h3 className="text-lg font-semibold mt-4">Resume</h3>
            <a
              href={user.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              {user.resume}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
