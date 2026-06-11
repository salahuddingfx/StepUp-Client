import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../validators/auth.validator';
import { forgotPassword } from '../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, HelpCircle, Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await forgotPassword(data.email);
      if (res.success) {
        toast.success(res.message || 'Verification OTP code sent to your email.');
        // Navigate to password reset with email in state query
        navigate(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-extrabold text-brand-black dark:text-white">Recover Password</h2>
        <p className="text-xs text-gray-500">Provide your account email to retrieve verification codes.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <HelpCircle className="h-4 w-4" />
              <span>Send OTP Code</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Back to{' '}
        <Link to="/login" className="font-bold text-brand-red hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
