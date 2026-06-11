import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { GenericPageSkeleton } from '../components/Skeleton';

const Privacy = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GenericPageSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Privacy Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Our commitments regarding student data privacy, payment safety, and security details.</p>
      </div>

      <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-150 dark:border-gray-800/80 space-y-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">1. Data We Collect</h2>
          <p>
            We collect data required to create student profiles and log quiz scores. This includes name, email credentials, optional profile images, homework attachments, and course progress tracking details. We do not store credit card passwords or wallet secrets locally.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">2. Cookies Usage</h2>
          <p>
            We use browser local storage and cookies parameters to keep active sessions synced (JSON Web Tokens). This maintains your portal login states and dark/light color preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">3. Third Party Disclosures</h2>
          <p>
            Student metrics and profiles are private. We do not lease, barter, or distribute your email contacts to marketing databases. Database tables are strictly used for your active coaching programs evaluation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">4. Children's Data Safety</h2>
          <p>
            For Primary (Class 1-5) profiles, we advise parent guidance during accounts setup. Account names and homework logs are strictly accessed only by verified English StepUp instructors.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
