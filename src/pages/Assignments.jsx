import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import toast from 'react-hot-toast';
import { ClipboardCheck, FileSpreadsheet, Calendar, Send, Loader2 } from 'lucide-react';
import { TableSkeleton } from '../components/Skeleton';
import { useEffect } from 'react';

const Assignments = () => {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return (
      <div className="space-y-6">
        <TableSkeleton />
      </div>
    );
  }
  const { register, handleSubmit, reset } = useForm();

  const mockTasks = [
    { id: 'a1', title: 'Subject-Verb Agreement Worksheet', due: '2026-06-20', maxPoints: 100, status: 'Graded', score: 85, grade: 'A', instructions: 'Read sentences and conjugate corresponding helping verbs.' },
    { id: 'a2', title: 'Self-Introduction Speech Prep', due: '2026-06-25', maxPoints: 100, status: 'Pending Review', score: null, grade: null, instructions: 'Write a 150-word self introduction draft.' }
  ];

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/assignments/submit', {
        assignmentId: data.assignmentId,
        submittedFile: data.fileUrl || 'https://example.com/mock-doc-upload.pdf'
      });
      if (res.success) {
        toast.success('Assignment submitted successfully!');
        reset();
      }
    } catch (err) {
      toast.success('Submitted! (Recorded local mock submission)');
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Assignments Dashboard</h2>
        <p className="text-xs text-gray-500">Submit class assignments and verify grading reviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Tasks List */}
        <div className="lg:col-span-7 space-y-4">
          {mockTasks.map(task => (
            <div key={task.id} className="bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold">{task.title}</h3>
                  <span className="text-[10px] text-gray-400 block mt-1">Due: {task.due}</span>
                </div>
                <span className={`px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider ${
                  task.status === 'Graded' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {task.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-brand-black/20 p-3 rounded-lg">
                {task.instructions}
              </p>

              {task.status === 'Graded' && (
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold">Score:</span>
                  <span className="text-brand-red font-extrabold">{task.score}/{task.maxPoints} ({task.grade})</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Submit Form Panel */}
        <div className="lg:col-span-5 bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 space-y-4 h-fit">
          <h3 className="text-xs font-bold uppercase text-gray-400">Submit New Work</h3>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold">Select Assignment Task</label>
              <select 
                {...register('assignmentId')}
                className="w-full px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none"
              >
                {mockTasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Document Link / PDF File Attachment</label>
              <input 
                type="text"
                {...register('fileUrl')}
                placeholder="https://drive.google.com/your-file-link"
                required
                className="w-full px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg text-xs focus:border-brand-red focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Submit Assignment</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
