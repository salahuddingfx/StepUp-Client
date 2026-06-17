import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../validators/auth.validator';
import { resetPassword } from '../services/auth.service';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle2, Lock, ShieldCheck, Loader2, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data) => {
    if (!email) {
      toast.error('Email parameter missing. Please try from forgot password again.');
      return;
    }
    setLoading(true);
    try {
      const res = await resetPassword(email, data.code, data.newPassword);
      if (res.success) {
        toast.success(res.message || 'Password reset successful! You can now log in.');
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to reset password. Please check the OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-extrabold text-brand-black dark:text-white">Reset Password</h2>
        <p className="text-xs text-gray-500">
          Enter the 6-digit OTP code sent to <span className="font-bold text-brand-red">{email}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* OTP Code */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">OTP Code</label>
          <div className="relative">
            <ShieldCheck className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              {...register('code')}
              placeholder="123456"
              maxLength={6}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors tracking-widest text-center font-bold"
            />
          </div>
          {errors.code && <p className="text-[10px] text-brand-red font-medium">{errors.code.message}</p>}
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-600 dark:text-gray-300">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('newPassword')}
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
          {errors.newPassword && <p className="text-[10px] text-brand-red font-medium">{errors.newPassword.message}</p>}
        </div>

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
              <CheckCircle2 className="h-4 w-4" />
              <span>Reset Password</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Already remembered?{' '}
        <Link to="/login" className="font-bold text-brand-red hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
