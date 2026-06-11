import React, { useState, useEffect } from 'react';
import { FolderOpen, ExternalLink, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { CourseCardSkeleton } from '../components/Skeleton';

const Resources = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Supplementary Learning Resources</h2>
          <p className="text-xs text-gray-500">External references and diagnostic tools recommended for self-study.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      </div>
    );
  }
  const externalResources = [
    { title: 'Interactive Oxford Vocabulary Practice Suite', link: 'https://oxfordlearnerid.com', desc: 'Online vocab building quiz exercises and cards.' },
    { title: 'BBC Learning English Audio Podcasts Directory', link: 'https://bbc.co.uk/learningenglish', desc: 'Speaking and listening practice guides.' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Supplementary Learning Resources</h2>
        <p className="text-xs text-gray-500">External references and diagnostic tools recommended for self-study.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {externalResources.map((res, idx) => (
          <div key={idx} className="bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 flex flex-col justify-between shadow-sm card-hover">
            <div className="space-y-3">
              <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl">
                <FolderOpen className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold leading-snug">{res.title}</h3>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">{res.desc}</p>
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4">
              <a 
                href={res.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-red flex items-center space-x-1 hover:underline"
              >
                <span>Access External Portal</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
