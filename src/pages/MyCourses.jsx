import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { BookOpen, GraduationCap, PlayCircle, Clock } from 'lucide-react';
import { CourseCardSkeleton } from '../components/Skeleton';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocks fallback
  const mockCourses = [
    { course: { _id: 'c2', title: 'Interactive Grammar & Vocabulary', category: 'Junior English', price: 2000, duration: '8 Weeks' }, progress: 60 },
    { course: { _id: 'c5', title: 'Fluent Spoken English Workshop', category: 'Spoken English', price: 2500, duration: '8 Weeks' }, progress: 30 }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/students/dashboard');
        if (res.success && res.courses) {
          setCourses(res.courses);
        } else {
          setCourses(mockCourses);
        }
      } catch (err) {
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">My Enrolled Courses</h2>
          <p className="text-xs text-gray-500">Access your active study syllabi and play video lessons.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">My Enrolled Courses</h2>
        <p className="text-xs text-gray-500">Access your active study syllabi and play video lessons.</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-150/50 dark:border-gray-800/80 p-8 space-y-4">
          <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
          <h3 className="text-sm font-bold">No active enrollments</h3>
          <p className="text-xs text-gray-500">Browse our programs directory to register for courses.</p>
          <Link to="/programs" className="inline-block px-6 py-2.5 bg-brand-red text-white text-xs font-bold rounded-full">Explore Programs</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((record) => (
            <div key={record.course?._id} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between card-hover">
              <div className="p-6 space-y-4">
                <span className="text-[10px] font-extrabold text-brand-red px-2.5 py-1 bg-brand-red/10 rounded-md uppercase tracking-wider">
                  {record.course?.category}
                </span>
                <h3 className="text-sm font-bold">{record.course?.title}</h3>
                
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold">
                    <span>PROGRESS</span>
                    <span>{record.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-red h-full" style={{ width: `${record.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center text-[10px] text-gray-400 space-x-4 pt-2">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{record.course?.duration || '8 Weeks'}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Certified Program</span>
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-brand-black/20 border-t border-gray-100 dark:border-gray-800">
                <Link
                  to={`/dashboard/course-view/${record.course?._id}`}
                  className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Resume Class</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
