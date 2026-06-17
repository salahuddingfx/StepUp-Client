import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess } from '../store/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';
import { User, Settings, Save, Loader2 } from 'lucide-react';
import { ProfileSkeleton } from '../components/Skeleton';
import { useEffect } from 'react';

const ProfileSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: user?.name || '',
      avatar: user?.avatar || ''
    }
  });

  const currentAvatar = watch('avatar');

  if (pageLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Profile Settings</h2>
          <p className="text-xs text-gray-500">Manage your profile name and avatar parameters.</p>
        </div>
        <ProfileSkeleton />
      </div>
    );
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'avatars');

    setUploading(true);
    try {
      const res = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.success && res.url) {
        setValue('avatar', res.url);
        toast.success('Avatar uploaded successfully!');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.put('/users/profile', data);
      if (res.success) {
        dispatch(updateUserSuccess(res.user));
        toast.success('Profile updated successfully!');
      }
    } catch (err) {
      // Offline fallback
      dispatch(updateUserSuccess(data));
      toast.success('Settings updated locally!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Profile Settings</h2>
        <p className="text-xs text-gray-500">Manage your profile name and avatar parameters.</p>
      </div>

      <div className="bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/80 max-w-xl shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative group self-center h-20 w-20 shrink-0">
              <img 
                src={currentAvatar || user?.avatar} 
                alt={user?.name} 
                className="h-20 w-20 rounded-full object-cover border-4 border-brand-red/20 shadow-md transition-all group-hover:opacity-75" 
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
            </div>
            <div className="space-y-2 self-center text-center sm:text-left">
              <h3 className="text-sm font-bold">{user?.name}</h3>
              <p className="text-[10px] text-gray-400 capitalize mb-1">{user?.role} Account</p>
              <label className="inline-block px-3 py-1.5 bg-gray-150 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[10px] font-bold rounded-lg cursor-pointer transition-colors text-brand-black dark:text-gray-200">
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-6">
            <div className="space-y-2">
              <label className="text-xs font-bold">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4.5 w-4.5 text-gray-400" />
                <input 
                  type="text" 
                  required
                  {...register('name')}
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Avatar Image URL</label>
              <input 
                type="text" 
                {...register('avatar')}
                placeholder="https://example.com/avatar-image.jpg"
                className="w-full px-4 py-2 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
