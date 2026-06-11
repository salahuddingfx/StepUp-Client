import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { logoutUser } from '../store/authSlice';
import { Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useSelector((state) => state.theme);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Spoken English', path: '/spoken-english' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glassmorphism border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/StepUp.jpg" alt="StepUp Logo" className="h-9 w-9 rounded-lg object-cover shadow-lg shadow-brand-red/10 border border-gray-100 dark:border-gray-800" />
              <span className="font-extrabold text-lg tracking-wider text-brand-black dark:text-white">
                English <span className="text-brand-red">StepUp</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-red ${
                    isActive ? 'text-brand-red font-semibold' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Toolbar Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Switcher */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-darkGray text-gray-500 dark:text-gray-300 transition-colors"
              aria-label="Toggle Theme"
            >
              {mode === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-brand-black dark:bg-brand-darkGray dark:text-white dark:hover:bg-gray-800 transition-all"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-red-50 text-brand-red dark:hover:bg-red-950/20 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-brand-red transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold px-5 py-2 rounded-full bg-brand-red text-white hover:bg-red-600 transition-all shadow-md shadow-brand-red/20 hover:shadow-lg hover:shadow-brand-red/30"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-darkGray text-gray-500 dark:text-gray-300"
            >
              {mode === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-brand-darkGray text-gray-500 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glassmorphism border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive ? 'text-brand-red bg-red-50/50 dark:bg-red-950/20' : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="border-t border-gray-200 dark:border-gray-800 my-2 pt-2 px-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to={user?.role === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-center bg-gray-100 dark:bg-brand-darkGray justify-center font-medium"
                    >
                      <User className="h-4 w-4" />
                      <span>Go to Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-center bg-red-50 text-brand-red dark:bg-red-950/20 justify-center font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-center text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-center bg-brand-red text-white rounded-lg text-sm font-medium"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
