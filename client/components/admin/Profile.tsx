import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/Hooks";
import { RootState } from "@/redux/Store";
import { profile, updateprofile, changepassword, resetSuccess } from "@/redux/slices/AdminSlice";
import { adminProfile } from "../../../types/users.types";
import uploadImage from "@/utils/imageUploader";

const AdminProfile: React.FC = () => {
  const currentProfile = useAppSelector((state: RootState) => state.admin);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [passwordEditing, setPasswordEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<adminProfile>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    profilePicture: "",
    role: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imgLink, setImgLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(profile());
      dispatch(resetSuccess());
    };
    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    if (currentProfile.profile) {
      setProfileData(currentProfile.profile);
      setImgLink(currentProfile.profile.profilePicture);
    }
  }, [currentProfile.profile]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      const uploadedImgLink = await uploadImage(selectedImage);
      if (uploadedImgLink) {
        setImgLink(uploadedImgLink);
        setProfileData((prev) => ({ ...prev, profilePicture: uploadedImgLink }));
      }
    }
  };

  const handleUpdateProfile = async () => {
    await dispatch(updateprofile(profileData));
    setIsEditing(false);
  };

  const handleUpdatePassword = async () => {
    if (
      oldPasswordRef.current &&
      newPasswordRef.current &&
      confirmPasswordRef.current
    ) {
      if (newPasswordRef.current.value === confirmPasswordRef.current.value) {
        await dispatch(changepassword({
          newPassword: newPasswordRef.current.value,
          oldPassword: oldPasswordRef.current.value,
        }));
      } else {
        setError("Passwords do not match");
      }
    }
  };

  useEffect(() => {
    if (currentProfile.isSuccess) {
      setError(null);
    } else {
      setError(currentProfile.error);
    }
  }, [currentProfile]);

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Box */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              {imgLink ? (
                <img
                  src={imgLink}
                  alt={profileData.firstName}
                  className="w-32 h-32 rounded-full object-cover "
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-600">
                  {profileData.firstName.charAt(0)}
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-gray-600 text-center mb-1">
              Email: {profileData.email}
            </p>
            <p className="text-gray-600 text-center mb-4">
              Phone: {profileData.phoneNumber}
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
              <div className="flex justify-between space-x-2">
                <button
                  onClick={() => setPasswordEditing(!passwordEditing)}
                  className="w-1/2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  {passwordEditing ? "Cancel Edit": "Change Password"}
                </button>
                <button
                  className="w-1/2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Profile Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
                disabled={!isEditing}
              />
              <input
                type="text"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
                disabled={!isEditing}
              />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                disabled={!isEditing}
              />
              {isEditing && (
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept="image/*"
                />
              )}
              {isEditing && (
                <button
                  onClick={handleUpdateProfile}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Update Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Box */}
      {passwordEditing && (
        <div className="mt-6 w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Change Password</h3>
            <div className="space-y-4">
              <input
                ref={oldPasswordRef}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Old Password"
              />
              <input
                ref={newPasswordRef}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="New Password"
              />
              <input
                ref={confirmPasswordRef}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm Password"
              />
              <button
                onClick={handleUpdatePassword}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
              >
                Update Password
              </button>
              {error && <p className="mt-2 text-red-500">{error}</p>}
              {currentProfile.isSuccess && <p className="mt-2 text-green-500">Password Changed Successfully</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;