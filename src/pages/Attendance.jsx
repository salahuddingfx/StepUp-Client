import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import { TableSkeleton } from '../components/Skeleton';

const Attendance = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Attendance Logs</h2>
          <p className="text-xs text-gray-500">View logged attendance checks registered during classroom meetings.</p>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  const attendanceLogs = [
    { date: '2026-06-11', status: 'present' },
    { date: '2026-06-10', status: 'present' },
    { date: '2026-06-09', status: 'present' },
    { date: '2026-06-08', status: 'absent' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Attendance Logs</h2>
        <p className="text-xs text-gray-500">View logged attendance checks registered during classroom meetings.</p>
      </div>

      <div className="bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/80 space-y-6 shadow-sm">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4">
          <div>
            <span className="text-[10px] text-gray-400 block font-semibold uppercase">Monthly Attendance Rate</span>
            <span className="text-xl font-extrabold text-brand-black dark:text-white">92%</span>
          </div>
          <Calendar className="h-6 w-6 text-brand-red" />
        </div>

        <div className="space-y-3">
          {attendanceLogs.map((log, idx) => (
            <div key={idx} className="flex justify-between items-center p-3.5 border border-gray-50 dark:border-gray-800 rounded-xl">
              <span className="text-xs font-bold">{new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              
              <div className="flex items-center space-x-1.5">
                {log.status === 'present' ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Present</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-[10px] font-bold text-amber-600 uppercase">Absent</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
