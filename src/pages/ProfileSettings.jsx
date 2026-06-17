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
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      avatar: user?.avatar || ''
    }
  });

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
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="h-20 w-20 rounded-full object-cover border-4 border-brand-red/20 shadow-md self-center" 
            />
            <div className="space-y-1 self-center text-center sm:text-left">
              <h3 className="text-sm font-bold">{user?.name}</h3>
              <p className="text-[10px] text-gray-400 capitalize">{user?.role} Account</p>
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
