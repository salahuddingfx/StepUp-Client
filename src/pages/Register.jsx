import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../validators/auth.validator';
import { register as registerAPI } from '../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, GraduationCap, Loader2, Eye, EyeOff, AtSign } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [allowTeacher, setAllowTeacher] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'student',
      targetClass: 'Spoken English Learner'
    }
  });

  const selectedRole = watch('role');

  useEffect(() => {
    const fetchRegSettings = async () => {
      try {
        const response = await api.get('/settings');
        if (response.success && response.data) {
          const isAllowed = response.data.allowTeacherRegistration;
          setAllowTeacher(isAllowed);
          if (!isAllowed) {
            setValue('role', 'student');
          }
        }
      } catch (err) {
        console.error('Failed to load register settings:', err);
      }
    };
    fetchRegSettings();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await registerAPI(data);
      if (res.success) {
        toast.success(res.message || 'Registration successful! Verification code sent.');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const targetClassesList = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 
    'Class 5', 'Class 6', 'Class 7', 'Class 8', 
    'SSC Candidate', 'HSC Candidate', 'Spoken English Learner'
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-extrabold text-brand-black dark:text-white">Join English StepUp</h2>
        <p className="text-xs text-gray-500">Create an account to start your learning track.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              {...register('name')}
              placeholder="Tahmid Hasan"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
          {errors.name && <p className="text-[10px] text-brand-red font-medium">{errors.name.message}</p>}
        </div>

        {/* Username Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Username</label>
          <div className="relative">
            <AtSign className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              {...register('username')}
              placeholder="tahmid_hasan"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
          {errors.username && <p className="text-[10px] text-brand-red font-medium">{errors.username.message}</p>}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              {...register('email')}
              placeholder="tahmid@domain.com"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
          {errors.email && <p className="text-[10px] text-brand-red font-medium">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-gray-400 hover:text-brand-red transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] text-brand-red font-medium">{errors.password.message}</p>}
        </div>

        {/* Role Selection */}
        {allowTeacher && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">I am registering as a:</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer">
                <input type="radio" value="student" {...register('role')} className="text-brand-red focus:ring-brand-red" />
                <span className="text-xs font-medium">Student</span>
              </label>
              <label className="flex items-center space-x-2 p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer">
                <input type="radio" value="teacher" {...register('role')} className="text-brand-red focus:ring-brand-red" />
                <span className="text-xs font-medium">Teacher</span>
              </label>
            </div>
          </div>
        )}

        {/* Student-specific target class input */}
        {selectedRole === 'student' && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Target Learning Benchmark</label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <select
                {...register('targetClass')}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-brand-darkGray border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors appearance-none"
              >
                {targetClassesList.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand-red hover:bg-red-600 text-white font-bold rounded-lg text-xs transition-all shadow-md shadow-brand-red/15 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-brand-red hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
