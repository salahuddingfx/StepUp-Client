import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Award, Users } from 'lucide-react';
import { GenericPageSkeleton } from '../components/Skeleton';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GenericPageSkeleton />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Block */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="px-3.5 py-1 text-xs font-bold text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-full">
            Our Journey
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-brand-black dark:text-white">
            Empowering Growth Through English Learning
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
            English StepUp is a leading EdTech coaching platform dedicated to providing student-centric, interactive, and academically structured English training programs. We bridge the gap between textbook grammar and practical communication, helping students from class 1 up to HSC candidates and spoken learners build confidence.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-brand-red/5 rounded-3xl blur-3xl -z-10" />
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80" 
            alt="Students collaborating" 
            className="w-full aspect-video rounded-3xl object-cover shadow-md border border-gray-150 dark:border-gray-800"
          />
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-150/50 dark:border-gray-800/80 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">1</div>
            <h3 className="text-sm font-bold">Student-Centric Coaching</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              We design syllabus courses matching the logical cognitive milestones of each class and target age bracket.
            </p>
          </div>

          <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-150/50 dark:border-gray-800/80 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">2</div>
            <h3 className="text-sm font-bold">Continuous Evaluation</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Daily homework submissions and live MCQs keep our candidates ready for actual academic tests.
            </p>
          </div>

          <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-150/50 dark:border-gray-800/80 space-y-4">
            <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">3</div>
            <h3 className="text-sm font-bold">Confidence First</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              We guide children and corporate students to overcome stage fear, speak openly, and learn organically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
