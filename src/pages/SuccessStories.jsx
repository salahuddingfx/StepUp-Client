import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Star, Award, GraduationCap, TrendingUp, Quote } from 'lucide-react';
import { TestimonialCardSkeleton } from '../components/Skeleton';

const SuccessStories = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockReviews = [
    { _id: 'r1', student: { name: 'Tahmid Hasan', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=60' }, content: 'English StepUp transformed my HSC grammar prep. The detailed PDF booklets and practice assignments gave me the confidence to secure an A+ score!', rating: 5 },
    { _id: 'r2', student: { name: 'Nusrat Jahan', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60' }, content: 'Speaking in front of coworkers was a huge challenge for me. After doing the Spoken English course, I can communicate fluently in presentation rooms.', rating: 5 },
    { _id: 'r3', student: { name: 'Tanvir Hossain', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60' }, content: 'My son joined the Kids English block. The interactive audio flashcards and sound tables helped him build vocabulary extremely fast!', rating: 5 }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/testimonials/approved');
        if (res.success && res.testimonials.length > 0) {
          setReviews(res.testimonials);
        } else {
          setReviews(mockReviews);
        }
      } catch (err) {
        setReviews(mockReviews);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Student Success Stories</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Discover how our students transformed their academic and conversational skills.</p>
      </div>

      {/* Grid Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl space-y-4 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">1,200+ GPA 5.00s</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Students who completed our SSC & HSC boards target preparations achieved A+ grades.</p>
        </div>

        <div className="bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl space-y-4 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">IELTS Band 7.5+</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Advanced spoken learners completed IELTS mock sessions, reaching high fluency grades.</p>
        </div>

        <div className="bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl space-y-4 shadow-sm text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold">Kids Vocab Boost</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Primary students increased vocabulary and basic reading test ratings within two months.</p>
        </div>
      </section>

      {/* Testimonial Cards */}
      <section className="space-y-8">
        <h2 className="text-xl font-bold text-center">Reviews from the Community</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <TestimonialCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map(item => (
              <div key={item._id} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 p-8 rounded-3xl flex flex-col justify-between shadow-sm relative card-hover">
                <Quote className="absolute top-6 right-8 h-10 w-10 text-gray-100 dark:text-gray-800 -z-0" />
                <div className="space-y-4 relative z-10">
                  <div className="flex text-yellow-400">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                    "{item.content}"
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-6 relative z-10 border-t border-gray-100 dark:border-gray-800 mt-4">
                  <img src={item.student?.avatar} alt={item.student?.name} className="h-10 w-10 rounded-full object-cover border-2 border-brand-red/20" />
                  <div>
                    <h4 className="text-xs font-bold">{item.student?.name}</h4>
                    <p className="text-[10px] text-gray-500 uppercase">Verified Learner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SuccessStories;
