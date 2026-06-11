import React, { useState, useEffect } from 'react';
import { FileText, Download, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { TableSkeleton } from '../components/Skeleton';

const Notes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <TableSkeleton />
      </div>
    );
  }
  const booklets = [
    { title: 'Tense structure charts cheatsheet.pdf', size: '2.4 MB', tag: 'Spoken English' },
    { title: 'SSC grammar board question analyzer.pdf', size: '5.1 MB', tag: 'SSC Prep' },
    { title: 'Prepositions list with example sentences.pdf', size: '1.8 MB', tag: 'General English' }
  ];

  const handleDownload = (filename) => {
    toast.success(`Starting download: ${filename}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">PDF Booklets & Class Notes</h2>
        <p className="text-xs text-gray-500">Download supplementary study guides compiled by our instructors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {booklets.map((note, idx) => (
          <div key={idx} className="bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 flex items-center justify-between shadow-sm card-hover">
            <div className="flex items-center space-x-3.5">
              <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold truncate max-w-[200px] sm:max-w-[300px]">{note.title}</h3>
                <span className="text-[10px] text-gray-400 block mt-0.5">{note.size}</span>
              </div>
            </div>
            <button
              onClick={() => handleDownload(note.title)}
              className="p-2.5 bg-gray-150 hover:bg-brand-red text-gray-600 hover:text-white dark:bg-brand-black/40 rounded-xl transition-all"
              title="Download Notes"
            >
              <Download className="h-4.5 w-4.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
