import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validators/auth.validator';
import { login } from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        dispatch(loginSuccess(res));
        toast.success(`Welcome back, ${res.user.name}!`);
        if (res.user.role === 'admin') {
          const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
          window.location.href = `${adminUrl}/admin?token=${res.accessToken}&user=${encodeURIComponent(JSON.stringify(res.user))}`;
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
      toast.error(err.message || 'Login failed. Please check credentials.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-2xl font-extrabold text-brand-black dark:text-white">Welcome Back</h2>
        <p className="text-xs text-gray-500">Sign in to resume your English learning classes.</p>
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
              placeholder="name@domain.com"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
          {errors.email && <p className="text-[10px] text-brand-red font-medium">{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300">Password</label>
            <Link to="/forgot-password" className="text-[10px] font-bold text-brand-red hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="password"
              {...register('password')}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none transition-colors"
            />
          </div>
          {errors.password && <p className="text-[10px] text-brand-red font-medium">{errors.password.message}</p>}
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
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      <div className="text-center text-xs text-gray-500">
        Don't have an account?{' '}
        <Link to="/register" className="font-bold text-brand-red hover:underline">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
