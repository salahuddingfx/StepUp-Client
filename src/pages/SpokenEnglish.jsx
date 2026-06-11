import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, Speech, MessageCircle, Heart, Star, Award, ShieldAlert } from 'lucide-react';
import { GenericPageSkeleton } from '../components/Skeleton';

const SpokenEnglish = () => {
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
  const cards = [
    { title: 'Fluency Over Grammar', desc: 'We train you to speak first and correct later. Overcoming stage fear is our primary objective.', icon: Speech },
    { title: 'Interactive Speaking Labs', desc: 'Join daily verbal group discussions with fellow learners on real-life scenarios.', icon: MessageCircle },
    { title: 'Accent & Pronunciation', desc: 'Understand phonetic sound patterns, neutralise regional accents, and speak clearly.', icon: Mic }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Intro Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="px-3.5 py-1 text-xs font-bold text-brand-red bg-brand-red/10 border border-brand-red/20 rounded-full">
            Specialized Speaking Tracks
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-brand-black dark:text-white">
            Unlock Fluent Spoken English
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
            Overcome fear and start speaking English naturally. Our spoken courses are custom-designed for professionals, corporate job holders, freelancers, and adults seeking globally competitive fluency.
          </p>
          <div className="pt-2">
            <Link
              to="/programs"
              className="px-6 py-3 bg-brand-red hover:bg-red-600 text-white font-bold rounded-full text-xs transition-all shadow-md shadow-brand-red/15"
            >
              Explore Spoken Courses
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-brand-red/10 rounded-3xl blur-3xl -z-10" />
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&auto=format&fit=crop&q=80" 
            alt="Spoken English Group" 
            className="w-full aspect-video rounded-3xl object-cover shadow-lg border border-gray-100 dark:border-gray-800"
          />
        </div>
      </section>

      {/* Core Principles */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Our Speaking Methodologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl space-y-4 shadow-sm card-hover">
                <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">{c.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SpokenEnglish;
