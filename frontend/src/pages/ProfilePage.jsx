import React, { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[400px] bg-slate-600 p-3 rounded-lg">
            <div className="text-center">
              <h1 className="font-bold text-xl">Profile</h1>
              <p>Your profile Information</p>
            </div>

            {/* Avatar Image */}
            <div className="flex items-center justify-center flex-col gap-4">
              <label htmlFor="fileInput" className="relative cursor-pointer">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="img"
                  className="w-[100px] h-[100px] rounded-full object-cover"
                />
                <Camera className="absolute bottom-0 left-0 right-0 cursor-pointer" />
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                  disabled={isUpdatingProfile}
                />
              </label>
              <p>Click the camera icon to update photo</p>
            </div>

            {/* User Details */}
            <div className="form-control my-2">
              <div className="flex items-center gap-2">
                <User className="size-5" />
                <label className="label">
                  <span className="label-text font-medium">User Name</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  className={`input input-bordered w-full`}
                  placeholder={authUser.fullName}
                  readOnly
                />
              </div>
            </div>

            <div className="form-control my-2">
              <div className="flex items-center gap-2">
                <Mail className="size-5" />
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  className={`input input-bordered w-full`}
                  placeholder={authUser.email}
                  readOnly
                />
              </div>
            </div>

            <div className="p-4 space-y-5">
              <h1 className="font-bold">Account Information</h1>
              <div className="flex justify-between items-center my-2 border-b-2 border-slate-500">
                <h3>Member since</h3>
                <p>10/02/2024</p>
              </div>
              <div className="flex justify-between items-center my-2 border-b-2 border-slate-500">
                <h3>Account signal</h3>
                <p className="text-green-600">active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
