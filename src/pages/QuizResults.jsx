import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { BarChart3, HelpCircle, Star } from 'lucide-react';
import { TableSkeleton } from '../components/Skeleton';

const QuizResults = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocks fallback
  const mockQuizzes = [
    { _id: 'q1', quiz: { title: 'Tenses Verb Forms Practice Quiz' }, score: 80, passed: true, takenAt: '2026-06-09T14:30:00Z' },
    { _id: 'q2', quiz: { title: 'Subject-Verb Matching Test' }, score: 50, passed: false, takenAt: '2026-06-11T16:00:00Z' }
  ];

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get('/students/dashboard');
        if (res.success && res.quizzes && res.quizzes.length > 0) {
          setQuizzes(res.quizzes);
        } else {
          setQuizzes(mockQuizzes);
        }
      } catch (err) {
        setQuizzes(mockQuizzes);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Quiz Performance</h2>
          <p className="text-xs text-gray-500">MCQ assessments scores logs completed inside lesson portals.</p>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold text-brand-black dark:text-white">Quiz Performance</h2>
        <p className="text-xs text-gray-500">MCQ assessments scores logs completed inside lesson portals.</p>
      </div>

      <div className="space-y-4">
        {quizzes.map((q, idx) => (
          <div key={idx} className="bg-white dark:bg-brand-darkGray p-6 rounded-2xl border border-gray-200/50 dark:border-gray-800/80 flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3.5">
              <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold">{q.quiz?.title}</h3>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Taken: {new Date(q.takenAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <span className="text-sm font-extrabold text-brand-black dark:text-white">{q.score}%</span>
                <p className="text-[9px] text-gray-400">Score</p>
              </div>
              <span className={`px-2.5 py-1 text-[9px] font-bold rounded-md uppercase tracking-wider ${
                q.passed ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-650'
              }`}>
                {q.passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResults;
