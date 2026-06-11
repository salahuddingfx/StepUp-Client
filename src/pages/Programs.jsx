import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { BookOpen, Tag, GraduationCap, Clock, Award } from 'lucide-react';
import { CourseCardSkeleton } from '../components/Skeleton';

const Programs = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const categories = ['All', 'Kids English', 'Junior English', 'SSC English Preparation', 'HSC English Preparation', 'Spoken English'];

  // Mock Fallback courses
  const mockCourses = [
    { _id: 'c1', title: 'English Phonics Masterclass', category: 'Kids English', price: 1500, duration: '6 Weeks', level: 'Beginner', description: 'Fun interactive speech exercise for kids. Mastering standard sound alphabets.' },
    { _id: 'c2', title: 'Interactive Grammar & Vocabulary', category: 'Junior English', price: 2000, duration: '8 Weeks', level: 'Intermediate', description: 'Enhance your written sentences, narrative prose structures, and parts of speech.' },
    { _id: 'c3', title: 'SSC Academic Prep Suite', category: 'SSC English Preparation', price: 3000, duration: '12 Weeks', level: 'Exam Prep', description: 'Complete board question analyses, pre-tests evaluations, and mock exams.' },
    { _id: 'c4', title: 'HSC Target A+ Grammar', category: 'HSC English Preparation', price: 3500, duration: '12 Weeks', level: 'Exam Prep', description: 'Detailed focus on modifiers, prepositions, composition and summaries writing.' },
    { _id: 'c5', title: 'Fluent Spoken English Workshop', category: 'Spoken English', price: 2500, duration: '8 Weeks', level: 'Advanced', description: 'Overcoming stage fear, accent neutralisation, global workplace conversation setups.' }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/courses?isPublished=true');
        if (res.success && res.courses.length > 0) {
          setCourses(res.courses);
        } else {
          setCourses(mockCourses);
        }
      } catch (err) {
        // Use Mock data in case DB is not running or empty
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to enroll in courses');
      navigate('/login');
      return;
    }

    try {
      const res = await api.post('/students/enroll', { courseId });
      if (res.success) {
        toast.success('Enrolled successfully! Redirecting to dashboard...');
        navigate('/dashboard/courses');
      }
    } catch (err) {
      toast.error(err.message || 'Enrollment failed');
    }
  };

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Our Coaching Programs</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Structured lessons designed to build language skills systematically.</p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat 
                ? 'bg-brand-red text-white shadow-md shadow-brand-red/15'
                : 'bg-white dark:bg-brand-darkGray text-gray-600 dark:text-gray-300 hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course._id} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between card-hover">
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-brand-red px-2.5 py-1 bg-brand-red/10 rounded-md">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold text-gray-500">{course.level}</span>
                </div>
                <h3 className="text-base font-bold text-brand-black dark:text-white leading-snug">{course.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{course.description}</p>
                
                <div className="grid grid-cols-2 gap-4 py-2 text-[11px] text-gray-500 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-brand-red" />
                    <span>{course.duration || '8 Weeks'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-3.5 w-3.5 text-brand-red" />
                    <span>Instructor Coach</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-brand-black/20 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Course Fee</span>
                  <span className="text-base font-extrabold text-brand-black dark:text-white">৳{course.price}</span>
                </div>
                <button
                  onClick={() => handleEnroll(course._id)}
                  className="px-5 py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-brand-red/10 hover:shadow-lg hover:shadow-brand-red/20"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Programs;
