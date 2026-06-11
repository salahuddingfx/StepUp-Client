import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ProfileSkeleton } from '../components/Skeleton';

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-black flex transition-colors duration-300">
      {/* Return home button */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          to="/" 
          className="flex items-center space-x-1 text-xs font-semibold text-gray-500 hover:text-brand-red dark:text-gray-400 dark:hover:text-brand-red transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side Info Panel (Only visible on lg screens) */}
        <div className="hidden lg:flex lg:col-span-5 relative bg-brand-black flex-col justify-between p-12 overflow-hidden">
          {/* Animated/Glowing background circles */}
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />

          {/* Logo block */}
          <div className="relative z-10 flex items-center space-x-2">
            <span className="h-10 w-10 rounded-xl bg-brand-red flex items-center justify-center text-white font-extrabold text-2xl">ES</span>
            <span className="font-extrabold text-xl tracking-wider text-white">
              English <span className="text-brand-red">StepUp</span>
            </span>
          </div>

          {/* Core messages */}
          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-red/10 text-brand-red border border-brand-red/20">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Empowering Growth
            </span>
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              Master English With Confidence
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Join thousands of learners unlocking opportunities through premium Spoken, Kids, Junior, SSC & HSC prep resources. Start your growth journey today.
            </p>
          </div>

          {/* Tagline footer */}
          <div className="relative z-10 text-xs text-gray-500">
            © {new Date().getFullYear()} English StepUp. Unleash Your Communication Potential.
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-20 bg-white dark:bg-brand-black/60 relative">
          <div className="mx-auto w-full max-w-md">
            {loading ? <ProfileSkeleton /> : <Outlet />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
