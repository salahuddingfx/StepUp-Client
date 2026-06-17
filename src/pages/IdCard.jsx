import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, AlertCircle, RefreshCw, Smartphone, Building2, GraduationCap, Calendar, Mail, BookOpen, Award, ChevronRight } from 'lucide-react';
import api from '../services/api';

const IdCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIdCard = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/students/id-card');
      if (res.success) {
        setData(res.data);
      } else {
        throw new Error(res.message || 'Failed to load ID card');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIdCard(); }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Student ID Card - ${data?.name}</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f5f5f5; }
            .card { width: 340px; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12); }
            .header { background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 24px; text-align: center; color: white; }
            .header img { width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.4); object-fit: cover; margin-bottom: 8px; }
            .header h2 { margin: 4px 0; font-size: 18px; }
            .header p { margin: 2px 0; font-size: 11px; opacity: 0.85; }
            .body { padding: 16px 20px; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; font-size: 12px; }
            .row:last-child { border-bottom: none; }
            .label { color: #888; }
            .value { font-weight: bold; color: #222; }
            .footer { background: #fafafa; padding: 10px 20px; text-align: center; font-size: 9px; color: #aaa; border-top: 1px solid #eee; }
            .badge { display: inline-block; background: #dc2626; color: white; padding: 3px 10px; border-radius: 20px; font-size: 9px; font-weight: bold; letter-spacing: 1px; margin-top: 6px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <img src="${data?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60'}" alt="${data?.name}" />
              <h2>${data?.name}</h2>
              <p>${data?.targetClass}</p>
              <div class="badge">${data?.studentId}</div>
            </div>
            <div class="body">
              <div class="row"><span class="label">Email</span><span class="value">${data?.email}</span></div>
              <div class="row"><span class="label">Student ID</span><span class="value">${data?.studentId}</span></div>
              <div class="row"><span class="label">Class</span><span class="value">${data?.targetClass}</span></div>
              <div class="row"><span class="label">Enrolled Courses</span><span class="value">${data?.coursesEnrolled}</span></div>
              <div class="row"><span class="label">Completed</span><span class="value">${data?.completedCourses}</span></div>
              <div class="row"><span class="label">Member Since</span><span class="value">${data?.memberSince ? new Date(data.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span></div>
            </div>
            <div class="footer">English StepUp — Empowering Growth</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-12 text-center space-y-4">
        <AlertCircle className="h-10 w-10 mx-auto text-red-400" />
        <div>
          <h3 className="text-sm font-bold text-brand-black dark:text-white">Failed to load ID card</h3>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
        <button onClick={fetchIdCard} className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-red text-white rounded-full text-xs font-bold hover:bg-red-600 transition-colors">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Student ID Card</h2>
          <p className="text-xs text-gray-500">Your official identification card</p>
        </div>
        <button onClick={handlePrint} className="flex items-center space-x-2 px-4 py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-md">
          <Download className="h-4 w-4" />
          <span>Print / Download</span>
        </button>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* ID Card Front */}
          <div className="bg-white dark:bg-brand-darkGray rounded-3xl border border-gray-200/50 dark:border-gray-800/80 overflow-hidden shadow-xl">
            {/* Card Header with Gradient */}
            <div className="bg-gradient-to-r from-brand-red to-red-700 p-6 text-center text-white space-y-3">
              <div className="mx-auto">
                <div className="h-20 w-20 rounded-full border-4 border-white/30 mx-auto overflow-hidden shadow-lg">
                  <img
                    src={data.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60'}
                    alt={data.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold tracking-wide">{data.name}</h3>
                <p className="text-xs text-white/80 font-medium">{data.targetClass}</p>
              </div>
              <div className="inline-flex px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-[10px] font-bold tracking-widest">
                {data.studentId}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium flex items-center"><Mail className="h-3.5 w-3.5 mr-2" />Email</span>
                  <span className="text-xs font-bold text-brand-black dark:text-white truncate max-w-[180px]">{data.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium flex items-center"><GraduationCap className="h-3.5 w-3.5 mr-2" />Student ID</span>
                  <span className="text-xs font-bold text-brand-black dark:text-white font-mono">{data.studentId}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium flex items-center"><Building2 className="h-3.5 w-3.5 mr-2" />Class</span>
                  <span className="text-xs font-bold text-brand-black dark:text-white">{data.targetClass}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium flex items-center"><BookOpen className="h-3.5 w-3.5 mr-2" />Enrolled</span>
                  <span className="text-xs font-bold text-brand-black dark:text-white">{data.coursesEnrolled} Courses</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-400 font-medium flex items-center"><Award className="h-3.5 w-3.5 mr-2" />Completed</span>
                  <span className="text-xs font-bold text-emerald-500">{data.completedCourses} Courses</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-xs text-gray-400 font-medium flex items-center"><Calendar className="h-3.5 w-3.5 mr-2" />Member Since</span>
                  <span className="text-xs font-bold text-brand-black dark:text-white">{data.memberSince ? new Date(data.memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}</span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-gray-50 dark:bg-brand-black/30 px-6 py-3 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-[9px] text-gray-400 font-semibold tracking-wider">English StepUp — Empowering Growth</p>
            </div>
          </div>

          {/* Download Hint */}
          <div className="mt-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 rounded-xl p-3 flex items-start space-x-2.5">
            <Smartphone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-amber-700 dark:text-amber-300">Click "Print / Download" to save your ID card as PDF or take a screenshot for mobile use.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IdCard;
