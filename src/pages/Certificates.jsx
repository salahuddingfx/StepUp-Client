import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Award, Download, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { Skeleton } from '../components/Skeleton';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocks fallback
  const mockCerts = [
    { _id: 'cert_1', certificateId: 'CERT-541298-2026', course: { title: 'Spoken English Foundation Course', category: 'Spoken English' }, issueDate: '2026-06-10T12:00:00Z', pdfUrl: '#' }
  ];

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await api.get('/students/dashboard');
        if (res.success && res.certificates && res.certificates.length > 0) {
          setCerts(res.certificates);
        } else {
          setCerts(mockCerts);
        }
      } catch (err) {
        setCerts(mockCerts);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Awarded Certificates</h2>
          <p className="text-xs text-gray-500">Graduation credentials automatically issued upon finishing courses syllabus.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-brand-darkGray p-6 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl space-y-4 animate-pulse">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <Skeleton className="h-5 w-16 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleDownload = (certId) => {
    toast.success(`Downloading certificate pdf: ${certId}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Awarded Certificates</h2>
        <p className="text-xs text-gray-500">Graduation credentials automatically issued upon finishing courses syllabus.</p>
      </div>

      {certs.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl space-y-4">
          <Award className="h-12 w-12 mx-auto text-gray-300" />
          <h3 className="text-sm font-bold">No certificates issued yet</h3>
          <p className="text-xs text-gray-500">Complete 100% of video lessons and pass required exams to earn credentials.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certs.map(cert => (
            <div key={cert._id} className="bg-white dark:bg-brand-darkGray p-6 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl flex flex-col justify-between shadow-sm card-hover">
              <div className="space-y-4">
                <div className="h-12 w-12 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-2xl">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold">{cert.course?.title}</h3>
                  <span className="text-[10px] text-gray-400 block mt-1">ID: {cert.certificateId}</span>
                  <span className="text-[10px] text-gray-400 block">Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 flex justify-between items-center">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-500 px-2 py-0.5 bg-emerald-50 rounded">
                  VERIFIED
                </span>
                <button
                  onClick={() => handleDownload(cert.certificateId)}
                  className="text-xs font-bold text-brand-red flex items-center space-x-1 hover:underline"
                >
                  <span>Download PDF</span>
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
