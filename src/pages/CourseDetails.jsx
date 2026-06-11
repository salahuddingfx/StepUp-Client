import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import toast from 'react-hot-toast';
import { Play, BookOpen, GraduationCap, Clock, Award, CheckCircle2, ChevronRight, ArrowLeft, Tag, ShieldAlert } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // High Quality Mock courses database fallback
  const mockCourses = [
    { 
      _id: 'c1', 
      title: 'English Phonics Masterclass', 
      category: 'Kids English', 
      price: 1500, 
      duration: '6 Weeks', 
      level: 'Beginner', 
      description: 'Fun interactive speech exercise for kids. Mastering standard sound alphabets, basic reading blocks, and auditory recognition tables.',
      bannerImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
      introVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      outcomes: [
        'Recognize and pronounce standard sounds correctly.',
        'Blend consonant-vowel-consonant (CVC) sounds easily.',
        'Read simple narrative sentences and small stories.',
        'Overcome shyness to speak basic sentences aloud.'
      ],
      curriculum: [
        { title: 'Module 1: Sound Tables & Recognition', desc: 'Understanding basic vowel sounds and phonemic markers.' },
        { title: 'Module 2: Consonants Blend & Auditory Play', desc: 'Active spelling games, pronunciation blends, and sounds structures.' }
      ]
    },
    { 
      _id: 'c2', 
      title: 'Interactive Grammar & Vocabulary', 
      category: 'Junior English', 
      price: 2000, 
      duration: '8 Weeks', 
      level: 'Intermediate', 
      description: 'Enhance your written sentences, narrative prose structures, parts of speech parsing, and dynamic vocabulary blocks.',
      bannerImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
      introVideoUrl: 'https://www.w3schools.com/html/movie.mp4',
      outcomes: [
        'Understand verb agreements and tenses cheat sheets.',
        'Analyze sentence components and clauses.',
        'Write descriptive story compositions and letter reviews.',
        'Accelerate verbal synonyms/antonyms vocabulary sets.'
      ],
      curriculum: [
        { title: 'Module 1: Parts of Speech Mastery', desc: 'Deep dive into nouns, pronouns, adjective placement, and prepositions.' },
        { title: 'Module 2: Tenses & Sentence Formations', desc: 'Cheat sheets review, subject-verb agreement worksheets, and clause parsing.' }
      ]
    },
    { 
      _id: 'c3', 
      title: 'SSC Academic Prep Suite', 
      category: 'SSC English Preparation', 
      price: 3000, 
      duration: '12 Weeks', 
      level: 'Exam Prep', 
      description: 'Complete board question analyses, pre-tests evaluations, mock examinations, and intensive grammar feedback reviews.',
      bannerImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      introVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      outcomes: [
        'Resolve past board examination grammar papers.',
        'Master modifiers, connector links, and direct speech.',
        'Write exam essays with optimized sentence styles.',
        'Perform mock test simulations under exam timers.'
      ],
      curriculum: [
        { title: 'Module 1: board Question Drill & Hack', desc: 'Systematic analysis of past boards questions, rules, and marking secrets.' },
        { title: 'Module 2: Composition & Essay Tactics', desc: 'Developing structured narrative essays, compositions, and paragraphs.' }
      ]
    },
    { 
      _id: 'c4', 
      title: 'HSC Target A+ Grammar', 
      category: 'HSC English Preparation', 
      price: 3500, 
      duration: '12 Weeks', 
      level: 'Exam Prep', 
      description: 'Detailed focus on modifiers, prepositions appropriate, composition summaries writing, and advanced syntax parsing.',
      bannerImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
      introVideoUrl: 'https://www.w3schools.com/html/movie.mp4',
      outcomes: [
        'Master HSC Board prepositions and connector tricks.',
        'Synthesize complex modifiers and pronoun agreements.',
        'Compose highly polished formal emails and reports.',
        'Secure GPA 5.00 grade guidelines in board mocks.'
      ],
      curriculum: [
        { title: 'Module 1: Modifiers & Prepositions Core', desc: 'Detailed spatial relation rules, cheat sheets, and active practice modules.' },
        { title: 'Module 2: Summary Writing & Comprehensions', desc: 'Locating core themes, summarizing compositions, and writing optimized board answers.' }
      ]
    },
    { 
      _id: 'c5', 
      title: 'Fluent Spoken English Workshop', 
      category: 'Spoken English', 
      price: 2500, 
      duration: '8 Weeks', 
      level: 'Advanced', 
      description: 'Overcoming stage fear, corporate accent neutralisation, global workplace conversation setups, and mock speaking tests.',
      bannerImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      introVideoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      outcomes: [
        'Deliver verbal presentations confidently in front of crowds.',
        'Neutralise accent barriers and speak standard English.',
        'Negotiate deals and lead corporate workplace dialogues.',
        'Ace verbal interviews and mock speaking sessions.'
      ],
      curriculum: [
        { title: 'Module 1: Accent & Vocal Warmups', desc: 'Vocal cord exercises, accent neutralizing, and pronunciation tools.' },
        { title: 'Module 2: Presentation & Corporate Speak', desc: 'Public presentation techniques, resume interviews, and dialogue practices.' }
      ]
    }
  ];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        const matched = mockCourses.find(c => c._id === id) || mockCourses[0];
        if (res.success && res.course) {
          setCourse({
            ...matched,
            ...res.course,
            outcomes: res.course.outcomes || matched.outcomes,
            curriculum: res.course.curriculum || matched.curriculum,
            bannerImage: res.course.bannerImage || matched.bannerImage,
            introVideoUrl: res.course.introVideoUrl || matched.introVideoUrl
          });
        } else {
          setCourse(matched);
        }
      } catch (err) {
        const matched = mockCourses.find(c => c._id === id) || mockCourses[0];
        setCourse(matched);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to enroll in courses');
      navigate('/login');
      return;
    }

    try {
      const res = await api.post('/students/enroll', { courseId: course._id });
      if (res.success) {
        toast.success('Enrolled successfully! Redirecting to dashboard...');
        navigate('/dashboard/courses');
      }
    } catch (err) {
      toast.error(err.message || 'Enrollment failed');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-40 w-full rounded-3xl" />
            <div className="space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <Skeleton className="h-72 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-xs text-gray-500">
        Course not found. <Link to="/programs" className="text-brand-red font-bold hover:underline">Back to Programs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 select-none">
      {/* Back to Catalog */}
      <button 
        onClick={() => navigate('/programs')}
        className="flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-brand-red transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Programs</span>
      </button>

      {/* Main Course Details Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Specifications & Outcomes (Col span 8) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-4">
            {/* Category */}
            <span className="inline-flex items-center px-3 py-1 rounded-md text-[10px] font-extrabold bg-brand-red/10 text-brand-red uppercase tracking-wider">
              {course.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black dark:text-white leading-tight">
              {course.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              {course.description}
            </p>
          </div>

          {/* Intro Video Preview Container */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-md border border-gray-150 dark:border-gray-800 bg-brand-black">
            {isPlaying ? (
              <video 
                src={course.introVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 cursor-pointer group" onClick={() => setIsPlaying(true)}>
                <img 
                  src={course.bannerImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/40 group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 bg-brand-black/60 backdrop-blur-sm text-[9px] font-extrabold px-3 py-1.5 rounded-full text-white uppercase tracking-widest">
                  Watch Intro Promo Video
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 rounded-2xl text-center">
            <div className="space-y-1">
              <Clock className="h-4.5 w-4.5 text-brand-red mx-auto" />
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Duration</span>
              <span className="text-xs font-bold text-brand-black dark:text-white">{course.duration}</span>
            </div>
            <div className="space-y-1 border-x border-gray-100 dark:border-gray-850">
              <GraduationCap className="h-4.5 w-4.5 text-brand-red mx-auto" />
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Level</span>
              <span className="text-xs font-bold text-brand-black dark:text-white">{course.level}</span>
            </div>
            <div className="space-y-1">
              <Award className="h-4.5 w-4.5 text-brand-red mx-auto" />
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Certificate</span>
              <span className="text-xs font-bold text-brand-black dark:text-white">Verified</span>
            </div>
          </div>

          {/* Outcomes */}
          <div className="space-y-4">
            <h2 className="text-sm sm:text-base font-extrabold">What you will learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.outcomes?.map((out, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{out}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="space-y-4">
            <h2 className="text-sm sm:text-base font-extrabold">Course Curriculum</h2>
            <div className="space-y-3">
              {course.curriculum?.map((cur, idx) => {
                const isOpen = activeModule === idx;
                return (
                  <div key={idx} className="border border-gray-150 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-brand-darkGray/40 transition-all duration-300">
                    <button
                      onClick={() => setActiveModule(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-brand-black dark:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <ChevronRight className={`h-4 w-4 text-brand-red transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        {cur.title}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-[11px] text-gray-500 leading-relaxed border-t border-gray-50 dark:border-gray-800/40">
                        {cur.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Checkout Sidebar (Col span 4) */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-brand-darkGray p-6 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 space-y-6 shadow-md lg:sticky lg:top-20">
            <div>
              <span className="text-[10px] text-gray-400 block font-bold uppercase">Course Fee</span>
              <span className="text-2xl font-black text-brand-black dark:text-white">৳{course.price}</span>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500">
              <div className="flex justify-between items-center">
                <span>Access Window</span>
                <span className="font-bold text-brand-black dark:text-white">Lifetime Access</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Modules</span>
                <span className="font-bold text-brand-black dark:text-white">{course.curriculum?.length || 2} Modules</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Video Lectures</span>
                <span className="font-bold text-brand-black dark:text-white">Full Length HD</span>
              </div>
            </div>

            <button
              onClick={handleEnroll}
              className="w-full py-3 bg-brand-red hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-brand-red/15 hover:shadow-lg hover:shadow-brand-red/25 flex items-center justify-center space-x-1.5"
            >
              <BookOpen className="h-4 w-4" />
              <span>Enroll In Program</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
