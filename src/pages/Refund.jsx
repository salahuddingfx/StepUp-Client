import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { GenericPageSkeleton } from '../components/Skeleton';

const Refund = () => {
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
          <RefreshCcw className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Refund Policy</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Please read our 7-day money-back guarantee details for program course enrollments.</p>
      </div>

      <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-150 dark:border-gray-800/80 space-y-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">1. Money-Back Guarantee Window</h2>
          <p>
            We offer a **7-day money-back guarantee** on all course tracks. If you are not satisfied with the video lesson quality or live schedule match, you can submit a refund claim within 7 calendar days from your payment date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">2. Ineligibility Triggers</h2>
          <p>
            Refund claims will be disqualified if the student profile has already:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Completed more than 3 video lessons.</li>
              <li>Downloaded more than 2 supplementary PDF booklets or notes.</li>
              <li>Generated a completion certificate from the system.</li>
            </ul>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm sm:text-base font-extrabold text-brand-black dark:text-white">3. Claim Processing</h2>
          <p>
            To lodge a request, email us at `refunds@englishstepup.com` with your Student Name, registered Email, and payment Transaction ID. Valid claims are credited back to the original funding wallet (bKash/Nagad/Rocket/Bank) within 7 business days.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Refund;
