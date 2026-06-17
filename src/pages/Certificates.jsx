import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { Award, Download, AlertCircle, RefreshCw, ExternalLink, X, Loader2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchCerts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/certificates/my');
      if (res.success) {
        setCerts(res.certificates);
      } else {
        throw new Error(res.message || 'Failed to load certificates');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleView = (cert) => {
    setPreview(cert);
  };

  const handleDownload = (cert) => {
    if (cert.pdfUrl) {
      window.open(cert.pdfUrl, '_blank');
    } else {
      toast.error('Certificate PDF not available');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">My Certificates</h2>
          <p className="text-xs text-gray-500">Certificates awarded upon course completion</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2].map(i => (
            <div key={i} className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-6 space-y-4 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">My Certificates</h2>
          <p className="text-xs text-gray-500">Certificates awarded upon course completion</p>
        </div>
        <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-12 text-center space-y-4">
          <AlertCircle className="h-10 w-10 mx-auto text-red-400" />
          <p className="text-sm text-gray-500">{error}</p>
          <button onClick={fetchCerts} className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-red text-white rounded-full text-xs font-bold hover:bg-red-600 transition-colors">
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">My Certificates</h2>
        <p className="text-xs text-gray-500">Certificates are auto-issued when you complete 100% of a course</p>
      </div>

      {certs.length === 0 ? (
        <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-12 text-center space-y-4">
          <Award className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600" />
          <h3 className="text-sm font-bold text-brand-black dark:text-white">No certificates yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">Complete all lessons in a course to earn your completion certificate. Keep learning!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map(cert => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-6 space-y-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full text-[9px] font-bold uppercase tracking-wider">Verified</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-brand-black dark:text-white">{cert.courseTitle || cert.course?.title}</h3>
                <p className="text-[10px] text-gray-400 font-mono">ID: {cert.certificateId}</p>
                <p className="text-[10px] text-gray-400">Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                {cert.grade && <p className="text-[10px] text-gray-400">Grade: <span className="font-bold text-amber-600">{cert.grade}</span></p>}
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => handleView(cert)}
                  className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-brand-red hover:bg-red-600 text-white rounded-xl text-[10px] font-bold transition-all"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>View Certificate</span>
                </button>
                <button
                  onClick={() => handleDownload(cert)}
                  className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-bold text-gray-500 hover:border-brand-red hover:text-brand-red transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {preview && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setPreview(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 shadow-2xl max-w-3xl w-full overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-black dark:text-white">{preview.certificateId}</h3>
                    <p className="text-[10px] text-gray-400">{preview.courseTitle || preview.course?.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(preview)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-red hover:bg-red-600 text-white rounded-lg text-[10px] font-bold transition-all"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Open in Browser</span>
                    </button>
                    <button onClick={() => setPreview(null)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-brand-black/30 flex justify-center">
                  {preview.pdfUrl ? (
                    <iframe
                      src={preview.pdfUrl}
                      title="Certificate Preview"
                      className="w-full h-[500px] rounded-2xl border border-gray-200 dark:border-gray-800"
                      style={{ maxWidth: '800px' }}
                    />
                  ) : (
                    <div className="text-center py-12 text-gray-400 text-xs">Certificate preview not available</div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
