"use client";

import { useState, useRef } from "react";
import { supabase, DBProfile } from "@/lib/supabase";
import { sanitizeUsername, containsProfanity } from "@/lib/profanity";
import { updateProfile } from "@/lib/auth";

interface ProfileEditModalProps {
  userId: string;
  currentProfile: DBProfile;
  onClose: () => void;
  onSaved: (updatedProfile: DBProfile) => void;
}

export default function ProfileEditModal({
  userId,
  currentProfile,
  onClose,
  onSaved,
}: ProfileEditModalProps) {
  const [username, setUsername] = useState(currentProfile.username);
  const [bio, setBio] = useState((currentProfile as DBProfile & { bio?: string }).bio || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentProfile.avatar_url);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(currentProfile.cover_photo_url || null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const BIO_MAX_LENGTH = 150;

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.trim().length === 0) {
      setUsernameError(null);
      return;
    }
    const result = sanitizeUsername(value);
    setUsernameError(result.valid ? null : result.error || null);
  };

  const handleBioChange = (value: string) => {
    if (value.length > BIO_MAX_LENGTH) return;
    setBio(value);
    if (containsProfanity(value)) {
      setBioError("Bio contains inappropriate language");
    } else {
      setBioError(null);
    }
  };

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const path = `${userId}/avatar.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) {
      setUploadError(error.message);
      setUploading(false);
      return;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarUrl(publicUrl);
    setUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  const uploadCoverPhoto = async (file: File) => {
    setUploadingCover(true);
    setUploadError(null);
    const ext = file.name.split(".").pop();
    const path = `${userId}/cover.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) {
      setUploadError(error.message);
      setUploadingCover(false);
      return;
    }
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);
    setCoverPhotoUrl(publicUrl);
    setUploadingCover(false);
  };

  const handleCoverFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCoverPhoto(file);
    }
  };

  const isValid =
    username.trim().length > 0 &&
    !usernameError &&
    !bioError &&
    !uploading &&
    !uploadingCover;

  const handleSave = async () => {
    if (!isValid) return;
    setSaving(true);

    const updates: Partial<DBProfile> & { bio?: string } = {
      username,
      avatar_url: avatarUrl,
      cover_photo_url: coverPhotoUrl,
    };

    // Include bio in updates
    (updates as Record<string, unknown>).bio = bio;

    const { error } = await updateProfile(userId, updates as Partial<DBProfile>);
    if (error) {
      setUploadError(error.message);
      setSaving(false);
      return;
    }

    const updatedProfile: DBProfile = {
      ...currentProfile,
      username,
      avatar_url: avatarUrl,
      cover_photo_url: coverPhotoUrl,
    };

    onSaved(updatedProfile);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-bg-card border border-border rounded-2xl shadow-2xl overflow-hidden fade-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary text-center">
            Edit Profile
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-bg-elevated border-2 border-border flex items-center justify-center">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-semibold text-text-secondary">
                    {username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Upload overlay */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-xs font-medium text-white">
                  {uploading ? "..." : "Upload"}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            {uploading && (
              <p className="text-xs text-accent-blue mt-2 pulse-soft">Uploading...</p>
            )}
            {uploadError && (
              <p className="text-xs text-red-400 mt-2">{uploadError}</p>
            )}
          </div>

          {/* Cover Photo Section */}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Cover Photo
            </label>
            <div className="relative w-full h-24 rounded-lg overflow-hidden bg-bg-elevated border border-border group">
              {coverPhotoUrl ? (
                <img
                  src={coverPhotoUrl}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-accent-blue/10 via-accent-purple/10 to-accent-cyan/10">
                  <span className="text-xs text-text-muted">No cover photo</span>
                </div>
              )}
              {/* Upload overlay */}
              <button
                onClick={() => coverInputRef.current?.click()}
                disabled={uploadingCover}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <span className="text-xs font-medium text-white px-3 py-1.5 bg-accent-blue/80 rounded-lg">
                  {uploadingCover ? "Uploading..." : "Change Cover"}
                </span>
              </button>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverFileSelect}
                className="hidden"
              />
            </div>
            {uploadingCover && (
              <p className="text-xs text-accent-blue mt-1.5 pulse-soft">Uploading cover...</p>
            )}
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
              placeholder="Enter username"
            />
            {usernameError && (
              <p className="text-xs text-red-400 mt-1.5">{usernameError}</p>
            )}
          </div>

          {/* Bio Textarea */}
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => handleBioChange(e.target.value)}
              rows={3}
              className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
            <div className="flex justify-between items-center mt-1.5">
              {bioError ? (
                <p className="text-xs text-red-400">{bioError}</p>
              ) : (
                <span />
              )}
              <p className={`text-xs ${bio.length >= BIO_MAX_LENGTH ? "text-red-400" : "text-text-muted"}`}>
                {bio.length}/{BIO_MAX_LENGTH}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid || saving}
            className="flex-1 btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
