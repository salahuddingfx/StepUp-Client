import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserSuccess } from '../store/authSlice';
import api from '../services/api';
import toast from 'react-hot-toast';
import { User, Mail, AtSign, GraduationCap, Lock, Save, Loader2, Upload, Eye, EyeOff, ShieldCheck, Calendar, BadgeCheck, AlertTriangle } from 'lucide-react';
import { ProfileSkeleton } from '../components/Skeleton';

const targetClassOptions = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'SSC Candidate', 'HSC Candidate',
  'Spoken English Learner'
];

const ProfileSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(true);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [targetClass, setTargetClass] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchingDetails, setFetchingDetails] = useState(true);

  const [details, setDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get('/users/profile');
        if (res.success) {
          setDetails(res.details);
          if (res.details?.targetClass) {
            setTargetClass(res.details.targetClass);
          }
          if (res.user?.username) setUsername(res.user.username);
        }
      } catch (err) {
        // silent
      } finally {
        setFetchingDetails(false);
      }
    };
    fetchDetails();
  }, []);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'avatars');

    setUploading(true);
    try {
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.success && res.url) {
        setAvatar(res.url);
        toast.success('Avatar uploaded!');
      }
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const payload = { name, avatar };
      if (email !== user?.email) payload.email = email;
      if (username !== user?.username) payload.username = username;
      if (targetClass) payload.targetClass = targetClass;

      const res = await api.put('/users/profile', payload);
      if (res.success) {
        dispatch(updateUserSuccess(res.user));
        if (res.user?.username) setUsername(res.user.username);
        toast.success('Profile updated!');
      }
    } catch (err) {
      dispatch(updateUserSuccess({ name, avatar }));
      toast.success('Profile updated locally!');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await api.put('/users/password', {
        currentPassword,
        newPassword
      });
      if (res.success) {
        toast.success('Password changed!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Profile Settings</h2>
          <p className="text-xs text-gray-500">Manage your account details and security.</p>
        </div>
        <ProfileSkeleton />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'account', label: 'Account', icon: ShieldCheck }
  ];

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Profile Settings</h2>
        <p className="text-xs text-gray-500">Manage your account details and security.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white dark:bg-brand-darkGray rounded-2xl p-1.5 border border-gray-200/50 dark:border-gray-800/80 w-fit shadow-sm">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/15'
                  : 'text-gray-500 hover:text-brand-black dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Profile Info Tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleProfileSubmit}>
          <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 max-w-xl shadow-sm overflow-hidden">
            {/* Avatar Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="relative group self-center shrink-0">
                  <img
                    src={avatar || user?.avatar}
                    alt={name}
                    className="h-20 w-20 rounded-full object-cover border-4 border-brand-red/20 shadow-md"
                  />
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                      <Loader2 className="h-5 w-5 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h3 className="text-sm font-bold">{name || 'Your Name'}</h3>
                  <p className="text-[10px] text-gray-400 capitalize">{user?.role} Account</p>
                  <label className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-150 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-[10px] font-bold rounded-lg cursor-pointer transition-colors text-brand-black dark:text-gray-200">
                    {uploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>{uploading ? 'Uploading...' : 'Change Photo'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} />
                  </label>
                </div>
              </div>
            </div>

            {/* Fields */}
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
                </div>
                {email !== user?.email && (
                  <p className="text-[10px] text-amber-500 flex items-center space-x-1 mt-1">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Changing email will require re-verification</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold">Username</label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold">Avatar URL</label>
                <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
              </div>

              {user?.role === 'student' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold flex items-center space-x-1.5">
                    <GraduationCap className="h-4 w-4 text-brand-red" />
                    <span>Target Class</span>
                  </label>
                  <select value={targetClass} onChange={(e) => setTargetClass(e.target.value)}
                    className="w-full px-4 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none">
                    {targetClassOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="px-6 pb-6">
              <button type="submit" disabled={profileLoading}
                className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50">
                {profileLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /><span>Save Changes</span></>}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 max-w-xl shadow-sm">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800/50">
              <h3 className="text-sm font-bold flex items-center space-x-2">
                <Lock className="h-4 w-4 text-brand-red" />
                <span>Change Password</span>
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">Use a strong password with at least 6 characters.</p>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type={showCurrent ? 'text' : 'password'} value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-red">
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type={showNew ? 'text' : 'password'} value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-red">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-gray-250 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-red">
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button type="submit" disabled={passwordLoading}
                className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50">
                {passwordLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-4 w-4" /><span>Update Password</span></>}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Account Info Tab */}
      {activeTab === 'account' && (
        <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 max-w-xl shadow-sm">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800/50">
            <h3 className="text-sm font-bold flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-brand-red" />
              <span>Account Information</span>
            </h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Role</p>
                  <p className="text-xs font-bold capitalize">{user?.role}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-brand-red/10 text-brand-red">
                {user?.role}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Member Since</p>
                  <p className="text-xs font-bold">{memberSince}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <BadgeCheck className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Email Verified</p>
                  <p className="text-xs font-bold">{user?.isEmailVerified ? 'Verified' : 'Not Verified'}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                user?.isEmailVerified ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {user?.isEmailVerified ? 'Verified' : 'Pending'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-brand-black/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <AtSign className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-400 font-medium">Username</p>
                  <p className="text-xs font-bold">{username || user?.username || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
