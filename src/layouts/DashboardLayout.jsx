import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { toggleTheme } from '../store/themeSlice';
import { 
  LayoutDashboard, BookOpen, FileText, FileSpreadsheet, 
  Award, BarChart3, Calendar, Bell, Settings, LogOut, 
  Menu, X, Sun, Moon, Sparkles, FolderOpen, IdCard
} from 'lucide-react';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
    { name: 'Assignments', path: '/dashboard/assignments', icon: FileSpreadsheet },
    { name: 'Notes & PDFs', path: '/dashboard/notes', icon: FileText },
    { name: 'Resources', path: '/dashboard/resources', icon: FolderOpen },
    { name: 'Certificates', path: '/dashboard/certificates', icon: Award },
    { name: 'ID Card', path: '/dashboard/id-card', icon: IdCard },
    { name: 'Quiz Results', path: '/dashboard/quizzes', icon: BarChart3 },
    { name: 'Attendance', path: '/dashboard/attendance', icon: Calendar },
    { name: 'Notifications', path: '/dashboard/notifications', icon: Bell },
    { name: 'Profile Settings', path: '/dashboard/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-black flex transition-colors duration-300">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-brand-darkGray border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-0 -translate-x-full'
      }`}>
        {/* Brand/Logo Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/StepUp.jpg" alt="StepUp Logo" className="h-8 w-8 rounded-lg object-cover shadow-lg border border-gray-100 dark:border-gray-800" />
            <span className="font-extrabold text-md tracking-wider text-brand-black dark:text-white">
              StepUp <span className="text-xs text-brand-red font-medium">Student</span>
            </span>
          </Link>
          <button 
            className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-brand-black/40 rounded-xl">
            <img 
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60'} 
              alt={user?.name} 
              className="h-10 w-10 rounded-full object-cover border-2 border-brand-red/30"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold truncate text-brand-black dark:text-white">{user?.name}</h4>
              <p className="text-[10px] text-gray-500 truncate capitalize">{user?.role} Portal</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/10' 
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-brand-black/20'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10 transition-all"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden">
        {/* Dashboard Top Header */}
        <header className="h-16 bg-white dark:bg-brand-darkGray border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 z-10">
          <button
            className="md:hidden p-1.5 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Quick Header Widget */}
          <div className="hidden sm:flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-brand-red animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400">Keep up the great work! Complete your daily lessons.</span>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Theme switcher */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-black/40 text-gray-500 dark:text-gray-300"
            >
              {mode === 'dark' ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notification alert */}
            <Link 
              to="/dashboard/notifications" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-brand-black/40 text-gray-500 dark:text-gray-300 relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand-red animate-ping" />
            </Link>
          </div>
        </header>

        {/* Dashboard Page Contents */}
        <main className="flex-grow p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
