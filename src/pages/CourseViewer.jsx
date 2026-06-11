import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { 
  Play, BookOpen, Download, CheckCircle, 
  HelpCircle, ChevronRight, ChevronDown, Video, 
  FileText, ClipboardList, Loader2 
} from 'lucide-react';
import { CourseViewerSkeleton } from '../components/Skeleton';

const CourseViewer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [structure, setStructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedModules, setExpandedModules] = useState({});

  // Mock Fallback structures
  const mockStructure = [
    {
      _id: 'm1',
      title: 'Module 1: Foundations of Speech',
      description: 'Understanding phonetic sounds',
      lessons: [
        { _id: 'l1', title: 'Lesson 1.1: Vocal Cord Warmups', duration: '15 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', content: 'Warm up your throat and mouth before talking.', pdfNotesUrl: '#' },
        { _id: 'l2', title: 'Lesson 1.2: Consonants Pronunciation', duration: '20 mins', videoUrl: 'https://www.w3schools.com/html/movie.mp4', content: 'Mastering consonant voice points.', pdfNotesUrl: '#' }
      ]
    },
    {
      _id: 'm2',
      title: 'Module 2: Structural Grammar',
      description: 'Arranging sentences correctly',
      lessons: [
        { _id: 'l3', title: 'Lesson 2.1: Simple vs Complex Sentences', duration: '30 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', content: 'Understand basic compound layouts.', pdfNotesUrl: '#' }
      ]
    }
  ];

  useEffect(() => {
    const fetchCourseStructure = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        if (res.success) {
          setCourse(res.course);
          setStructure(res.structure || []);
          
          // Set active lesson
          if (res.structure && res.structure.length > 0 && res.structure[0].lessons.length > 0) {
            setActiveLesson(res.structure[0].lessons[0]);
          }
        }
      } catch (err) {
        // Fallback
        setCourse({ title: 'Interactive Grammar & Vocabulary Course' });
        setStructure(mockStructure);
        setActiveLesson(mockStructure[0].lessons[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseStructure();
  }, [id]);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const markComplete = async () => {
    if (!activeLesson) return;
    
    try {
      const res = await api.post('/students/progress', {
        courseId: id,
        lessonId: activeLesson._id
      });
      if (res.success) {
        toast.success('Lesson marked as completed!');
        setCompletedLessons(prev => [...prev, activeLesson._id]);
      }
    } catch (err) {
      // Offline fallback
      setCompletedLessons(prev => [...prev, activeLesson._id]);
      toast.success('Completed! (Mock Progress Recorded)');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <CourseViewerSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Center/Left: Video Player and Lesson Info (Col span 8) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Video Player Box */}
        <div className="aspect-video bg-brand-black rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 relative">
          {activeLesson?.videoUrl ? (
            <video 
              key={activeLesson._id}
              src={activeLesson.videoUrl} 
              controls 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
              <Video className="h-12 w-12 text-gray-600 animate-pulse" />
              <p className="text-xs">No video lecture published for this lesson</p>
            </div>
          )}
        </div>

        {/* Lesson Metadata */}
        <div className="bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-150/50 dark:border-gray-800/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-brand-black dark:text-white">{activeLesson?.title}</h2>
              <span className="text-[10px] text-gray-400 font-bold uppercase">{activeLesson?.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {completedLessons.includes(activeLesson?._id) ? (
                <span className="inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full text-[10px] font-bold">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Completed
                </span>
              ) : (
                <button
                  onClick={markComplete}
                  className="px-4 py-2 bg-brand-red text-white text-[10px] font-bold rounded-full hover:bg-red-600 transition-all flex items-center space-x-1"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Mark Complete</span>
                </button>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-gray-400">Class Notes & Contents</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {activeLesson?.content || 'Study notes are loaded for this session. Use the links to download attachments.'}
            </p>
          </div>

          {/* Resources triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            {/* PDF Notes */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); toast.success('Downloading lecture PDF...'); }}
              className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 hover:border-brand-red rounded-xl text-left transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-brand-red" />
                <span className="text-[11px] font-bold">Lecture PDF</span>
              </div>
              <Download className="h-3.5 w-3.5 text-gray-400" />
            </a>

            {/* Quiz link */}
            <Link
              to="/dashboard/quizzes"
              className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 hover:border-brand-red rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-brand-red" />
                <span className="text-[11px] font-bold">Practice MCQ</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>

            {/* Assignment link */}
            <Link
              to="/dashboard/assignments"
              className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 hover:border-brand-red rounded-xl transition-colors"
            >
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-4 w-4 text-brand-red" />
                <span className="text-[11px] font-bold">Submit homework</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Modules and Lessons sidebar (Col span 4) */}
      <div className="lg:col-span-4 bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-6">
        <h3 className="text-sm font-bold">Syllabus Index</h3>

        <div className="space-y-4">
          {structure.map((mod, modIdx) => {
            const isExpanded = !expandedModules[mod._id]; // default expanded
            return (
              <div key={mod._id} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(mod._id)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-brand-black/20 text-left"
                >
                  <div>
                    <h4 className="text-xs font-bold leading-tight">{mod.title}</h4>
                    <span className="text-[9px] text-gray-400 font-medium">{mod.description}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>

                {/* Lessons List */}
                {isExpanded && (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {mod.lessons?.map((lesson) => {
                      const isActive = activeLesson?._id === lesson._id;
                      const isDone = completedLessons.includes(lesson._id);
                      return (
                        <button
                          key={lesson._id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full flex items-center justify-between p-3.5 text-left transition-colors text-xs font-semibold ${
                            isActive 
                              ? 'text-brand-red bg-brand-red/5' 
                              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-brand-black/10'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <Play className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-brand-red' : 'text-gray-400'}`} />
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          {isDone && <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
