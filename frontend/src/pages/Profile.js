import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
} from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    avatar: user?.avatar || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateProfile(formData);
    setLoading(false);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      bio: user?.bio || "",
      avatar: user?.avatar || "",
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="mt-2 text-gray-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="card">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b border-gray-200">
            <img
              src={formData.avatar || user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2 text-sm text-gray-500">
                <FiCalendar />
                <span>Member since {formatDate(user?.createdAt)}</span>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary flex items-center space-x-2"
              >
                <FiEdit2 />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="mt-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                    placeholder="Your name"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    className="input"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                {/* Avatar URL */}
                <div>
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Avatar URL
                  </label>
                  <input
                    id="avatar"
                    name="avatar"
                    type="url"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="input"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Enter a URL for your profile picture
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                    <FiX />
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FiSave />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 text-gray-900">
                    <FiMail className="text-gray-400" />
                    <span>{user?.email}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                {/* Bio Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {user?.bio || "No bio added yet"}
                  </p>
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center space-x-2 text-gray-900">
                    <FiCalendar className="text-gray-400" />
                    <span>{formatDate(user?.createdAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-primary-600">
              {user?.id ? user.id.substring(0, 8) : "N/A"}
            </div>
            <p className="text-sm text-gray-600 mt-2">User ID</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-600">Active</div>
            <p className="text-sm text-gray-600 mt-2">Account Status</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">Premium</div>
            <p className="text-sm text-gray-600 mt-2">Plan Type</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
