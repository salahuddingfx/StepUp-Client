import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { GenericPageSkeleton } from '../components/Skeleton';

const Terms = () => {
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
          <FileText className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Terms of Service</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Please review terms of account registrations, classroom rules, and syllabus usage limits.</p>
      </div>

      <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-150 dark:border-gray-800/80 space-y-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">1. Account Security</h2>
          <p>
            When creating profiles on English StepUp, you agree to safeguard your passwords credentials. Sharing student logins, certificates verification identifiers, or download credentials is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">2. Content Usage & Intellectual Property</h2>
          <p>
            All video lectures, PDF booklets, cheat sheets, and board question review materials are copyrighted properties of English StepUp. Re-publishing, distributing, or hosting these videos on external portals is strictly illegal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">3. Code of Conduct</h2>
          <p>
            We maintain positive, safe online speech circles. Cyberbullying, harassing instructors during live meets, or submitting inappropriate media files in homework assignments will result in account suspension without warning.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">4. Account Moderation</h2>
          <p>
            Administrator panel reserves full authority to suspend, moderate, or freeze student accounts found violating standard guidelines or attempting code exploits inside payment modules.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
