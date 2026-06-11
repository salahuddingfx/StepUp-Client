import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/Home';
import Programs from '../pages/Programs';
import SpokenEnglish from '../pages/SpokenEnglish';
import Teachers from '../pages/Teachers';
import SuccessStories from '../pages/SuccessStories';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Developer from '../pages/Developer';
import FAQ from '../pages/FAQ';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Refund from '../pages/Refund';
import BlogDetails from '../pages/BlogDetails';

// Auth Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

// Student Dashboard Pages
import DashboardOverview from '../pages/DashboardOverview';
import MyCourses from '../pages/MyCourses';
import CourseViewer from '../pages/CourseViewer';
import Assignments from '../pages/Assignments';
import Notes from '../pages/Notes';
import Resources from '../pages/Resources';
import Certificates from '../pages/Certificates';
import QuizResults from '../pages/QuizResults';
import Attendance from '../pages/Attendance';
import Notifications from '../pages/Notifications';
import ProfileSettings from '../pages/ProfileSettings';

// Private Route Guard
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Guard (prevents logged in users from visiting login/register)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes (under MainLayout with navbar/footer) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="programs" element={<Programs />} />
        <Route path="spoken-english" element={<SpokenEnglish />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="success-stories" element={<SuccessStories />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="developer" element={<Developer />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="refund" element={<Refund />} />
      </Route>

      {/* Auth Routes (under AuthLayout split screen) */}
      <Route path="/" element={<AuthLayout />}>
        <Route 
          path="login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route 
          path="forgot-password" 
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } 
        />
        <Route 
          path="reset-password" 
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          } 
        />
      </Route>

      {/* Student Dashboard Routes (under DashboardLayout) */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="course-view/:id" element={<CourseViewer />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="notes" element={<Notes />} />
        <Route path="resources" element={<Resources />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="quizzes" element={<QuizResults />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
