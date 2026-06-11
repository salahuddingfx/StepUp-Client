import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { GenericPageSkeleton } from '../components/Skeleton';

const FAQ = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const faqData = [
    {
      q: 'What age groups are these courses designed for?',
      a: 'We have structured tracks for Primary students (Class 1-5), Junior students (Class 6-8), Secondary/Higher candidates (SSC & HSC Board preps), and customized spoken dialogues for corporate adults.'
    },
    {
      q: 'How do I join the live online coaching sessions?',
      a: 'Once enrolled, look under your Student Portal dashboard "My Enrolled Courses". In the Course Viewer, live links and schedules will be published prior to each session.'
    },
    {
      q: 'Are certificates awarded upon completion?',
      a: 'Yes. Completing 100% of the course lectures and achieving passing marks (above 60%) in all quiz modules automatically issues a digital verified completion certificate.'
    },
    {
      q: 'What payment methods do you support?',
      a: 'We support major mobile financial services (bKash, Nagad, Rocket) and credit/debit cards via secure local payment gateways.'
    },
    {
      q: 'Can I access the course resources on a mobile phone?',
      a: 'Yes, our platform is fully responsive and glassmorphism-enhanced for mobile phone browsers, iPads, and desktop screens.'
    }
  ];

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GenericPageSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 select-none">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Frequently Asked Questions</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Find quick answers about course portals, certificates, and billing methods.</p>
      </div>

      <div className="space-y-4">
        {faqData.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div 
              key={idx} 
              className="bg-white dark:bg-brand-darkGray border border-gray-150 dark:border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-xs sm:text-sm text-brand-black dark:text-white"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-brand-red" /> : <ChevronDown className="h-4.5 w-4.5 text-gray-400" />}
              </button>
              
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-gray-50 dark:border-gray-800/60 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
