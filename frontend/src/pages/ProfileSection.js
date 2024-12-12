import React, { useState } from 'react';

const ProfileSection = ({ profile, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newProfile, setNewProfile] = useState({ ...profile });
  const [imagePreview, setImagePreview] = useState(profile.avatar);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        avatar: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile(newProfile);
    setIsEditing(false);
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center">
        <img
          src={imagePreview}
          alt="User Avatar"
          className="rounded-full w-32 h-32 mr-6"
        />
        <div>
          {isEditing ? (
            <input
              type="file"
              onChange={handleImageChange}
              className="mb-4 text-gray-800 dark:text-gray-100"
            />
          ) : null}
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={newProfile.name}
                onChange={handleProfileChange}
                className="text-xl font-semibold"
              />
            ) : (
              profile.name
            )}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isEditing ? (
              <input
                type="text"
                name="shortDescription"
                value={newProfile.shortDescription}
                onChange={handleProfileChange}
                className="text-lg font-medium"
              />
            ) : (
              profile.shortDescription
            )}
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            {isEditing ? (
              <textarea
                name="longDescription"
                value={newProfile.longDescription}
                onChange={handleProfileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            ) : (
              profile.longDescription
            )}
          </p>
          <button
            onClick={isEditing ? handleSave : handleEditClick}
            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
