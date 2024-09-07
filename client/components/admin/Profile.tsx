import React, { useState, ChangeEvent, useEffect } from "react";
import uploadImage from "@/utils/imageUploader";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/store";
import { profile, updateprofile } from "@/redux/slices/AdminSlice";

interface ProfileData {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  email: string;
  profilePicture: string;
}

const AdminProfile: React.FC = () => {
  const currentProfile = useAppSelector((state: RootState) => state.admin);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>(
    currentProfile.profile
      ? { ...currentProfile.profile, password: "" }
      : {
          firstName: "",
          lastName: "",
          password: "",
          phoneNumber: "",
          email: "",
          profilePicture: "",
        }
  );

  const [image, setImage] = useState<File | null>(null);
  const [imgLink, setImgLink] = useState<string | null>(profileData.profilePicture);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(profile());
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      const uploadedImgLink = await uploadImage(selectedImage);
      uploadedImgLink && setImgLink(uploadedImgLink);
      uploadedImgLink && setProfileData((prev) => ({ ...prev, profilePicture: uploadedImgLink }));
    }
  };

  const handleUpdateProfile = async () => {
    await dispatch(updateprofile(profileData));
    setIsEditing(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
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
        )}
      </div>
    </div>
  );
};

export default AdminProfile;