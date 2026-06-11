import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Mail, GraduationCap, Star, ShieldCheck } from 'lucide-react';
import { TeacherCardSkeleton } from '../components/Skeleton';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockTeachers = [
    { _id: 't1', user: { name: 'Dr. Sarah Rahman', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=60' }, bio: 'Ex-IELTS Examiner. 12+ years teaching academic secondary and college preparation tracks.', rating: 4.9, expertise: ['HSC Grammar', 'IELTS Writing', 'Academic English'] },
    { _id: 't2', user: { name: 'James Miller', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=60' }, bio: 'Native UK Trainer focusing on corporate verbal communications and accent neutralize.', rating: 4.8, expertise: ['Accent Neutralisation', 'Workplace English', 'Mock Speaking'] },
    { _id: 't3', user: { name: 'Anisul Islam', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=60' }, bio: 'Specialist secondary school educator. Grammar workbook author and pre-test specialist.', rating: 4.9, expertise: ['SSC Prep', 'Junior Grammar Essentials'] }
  ];

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get('/teachers');
        if (res.success && res.teachers.length > 0) {
          setTeachers(res.teachers);
        } else {
          setTeachers(mockTeachers);
        }
      } catch (err) {
        setTeachers(mockTeachers);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Meet Our Instructors</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Expert coaches committed to your language growth.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <TeacherCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map(teacher => (
            <div key={teacher._id} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 p-6 rounded-3xl flex flex-col items-center text-center space-y-4 shadow-sm card-hover">
              <img 
                src={teacher.user?.avatar} 
                alt={teacher.user?.name} 
                className="h-28 w-28 rounded-full object-cover border-4 border-brand-red/20 shadow-md" 
              />
              <div className="space-y-1">
                <h3 className="text-base font-bold flex items-center justify-center space-x-1">
                  <span>{teacher.user?.name}</span>
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-red fill-current text-white dark:text-brand-darkGray" />
                </h3>
                <div className="flex items-center justify-center text-yellow-400 text-xs">
                  <Star className="h-3.5 w-3.5 fill-current mr-1" />
                  <span className="font-bold text-brand-black dark:text-white">{teacher.rating || 4.8}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed px-4">{teacher.bio}</p>
              
              <div className="flex flex-wrap gap-1.5 justify-center py-2">
                {teacher.expertise?.map((exp, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-gray-100 dark:bg-brand-black/40 text-[10px] text-gray-500 rounded-md font-semibold">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
