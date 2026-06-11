import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../services/api';
import { BookOpen, Award, FileSpreadsheet, Calendar, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton, StatCardSkeleton } from '../components/Skeleton';

const DashboardOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mocks fallback
  const mockDashboardData = {
    stats: {
      totalCourses: 2,
      completedCourses: 0,
      averageProgress: 45,
      certificatesCount: 0,
      attendanceRate: 92
    },
    courses: [
      { course: { _id: 'c2', title: 'Interactive Grammar & Vocabulary', category: 'Junior English', price: 2000, duration: '8 Weeks' }, progress: 60 },
      { course: { _id: 'c5', title: 'Fluent Spoken English Workshop', category: 'Spoken English', price: 2500, duration: '8 Weeks' }, progress: 30 }
    ],
    assignments: [
      { assignment: { title: 'Verb Agreement Sheet' }, status: 'graded', score: 85, grade: 'A' },
      { assignment: { title: 'Introducing Yourself Speech' }, status: 'pending', score: null, grade: null }
    ]
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/students/dashboard');
        if (res.success) {
          setData(res);
        } else {
          setData(mockDashboardData);
        }
      } catch (err) {
        setData(mockDashboardData);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Banner Shimmer */}
        <Skeleton className="h-32 w-full rounded-3xl" />
        
        {/* Stats Grid Shimmer */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        {/* Content sections split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-4 bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const statsList = [
    { name: 'Enrolled Courses', value: data?.stats?.totalCourses || 0, icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/20' },
    { name: 'Average Progress', value: `${data?.stats?.averageProgress || 0}%`, icon: Clock, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20' },
    { name: 'Attendance Rate', value: `${data?.stats?.attendanceRate || 100}%`, icon: Calendar, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' },
    { name: 'Certificates Earned', value: data?.stats?.certificatesCount || 0, icon: Award, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/20' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message Banner */}
      <div className="bg-brand-red text-white p-6 rounded-3xl relative overflow-hidden shadow-lg shadow-brand-red/10">
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-bold">
            <Sparkles className="h-3 w-3 mr-1" />
            Class Student
          </span>
          <h2 className="text-xl font-extrabold">Welcome back, {user?.name}!</h2>
          <p className="text-xs text-red-100 max-w-md">Ready to resume learning? Keep up your streak to earn your completion certificates.</p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statsList.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-150/50 dark:border-gray-800/80 flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">{stat.name}</span>
                <span className="text-lg font-bold text-brand-black dark:text-white">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Courses Progress Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Course List progress */}
        <div className="lg:col-span-8 bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold">Ongoing Courses</h3>
            <Link to="/dashboard/courses" className="text-xs font-bold text-brand-red flex items-center space-x-1 hover:underline">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {data?.courses?.map((record, idx) => (
              <div key={idx} className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold">{record.course?.title}</h4>
                    <span className="text-[9px] text-brand-red bg-brand-red/5 px-2 py-0.5 rounded font-semibold mt-1 inline-block">
                      {record.course?.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-gray-500">{record.progress}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-brand-red h-full" style={{ width: `${record.progress}%` }} />
                </div>
                <Link 
                  to={`/dashboard/course-view/${record.course?._id}`}
                  className="inline-block text-[10px] font-bold text-brand-red hover:underline"
                >
                  Enter Course Portal →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Assignments feed */}
        <div className="lg:col-span-4 bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-6">
          <h3 className="text-sm font-bold">Recent Submissions</h3>

          <div className="space-y-4">
            {data?.assignments?.map((sub, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 border border-gray-100 dark:border-gray-800 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold truncate max-w-[150px]">{sub.assignment?.title}</h4>
                  <span className={`text-[9px] font-bold uppercase mt-1 inline-block ${
                    sub.status === 'graded' ? 'text-emerald-500' : 'text-amber-500'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                {sub.status === 'graded' ? (
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-brand-red">{sub.grade}</span>
                    <p className="text-[9px] text-gray-400">{sub.score}/100</p>
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-400 font-medium">Pending Review</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
