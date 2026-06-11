import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    // Sync theme class on mount
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-white text-brand-black dark:bg-brand-black dark:text-white flex flex-col font-sans transition-colors duration-300">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Body */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
