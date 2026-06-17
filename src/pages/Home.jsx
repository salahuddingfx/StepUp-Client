import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Star, ShieldCheck, Award, GraduationCap, Play, Users, MessageCircle } from 'lucide-react';
import { HeroSkeleton } from '../components/Skeleton';
import api from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [dbCourses, setDbCourses] = useState([]);
  const [dbTeachers, setDbTeachers] = useState([]);
  const [dbTestimonials, setDbTestimonials] = useState([]);
  const [settings, setSettings] = useState(null);

  const defaultSlides = [
    {
      badge: "Welcome To English StepUp",
      titleStart: "Master English With ",
      titleHighlight: "Confidence",
      titleEnd: "",
      desc: "Empowering Growth Through Modern English Learning. Join custom programs designed by industry specialists for children, academic candidates, and professionals.",
      ctaText: "Get Started",
      ctaLink: "/programs",
      glowClass: "bg-brand-red/5"
    },
    {
      badge: "Target High Grades",
      titleStart: "Ace Your ",
      titleHighlight: "SSC & HSC",
      titleEnd: " Examinations",
      desc: "Secure GPA 5.00 grade targets with modifiers shortcut sheets, tenses drills, past board paper solutions, and regular exam-simulated checks.",
      ctaText: "Explore Exam Prep",
      ctaLink: "/programs",
      glowClass: "bg-blue-500/5"
    },
    {
      badge: "Speak Like a Pro",
      titleStart: "Communicate ",
      titleHighlight: "Fluently & Naturally",
      titleEnd: "",
      desc: "Eradicate conversational fear, neutralize accent barriers, and learn vocabulary in contexts structured for global workplaces.",
      ctaText: "Join Spoken Course",
      ctaLink: "/programs",
      glowClass: "bg-emerald-500/5"
    }
  ];

  const heroSlides = (settings?.heroSlides && settings.heroSlides.length > 0) ? settings.heroSlides : defaultSlides;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/courses?isPublished=true');
        if (res.success && res.courses) {
          setDbCourses(res.courses);
        }
      } catch (err) {
        console.error('Failed to fetch db courses:', err);
      }

      try {
        const res = await api.get('/teachers');
        if (res.success && res.teachers) {
          setDbTeachers(res.teachers);
        }
      } catch (err) {
        console.error('Failed to fetch db teachers:', err);
      }

      try {
        const res = await api.get('/testimonials/approved');
        if (res.success && res.testimonials) {
          setDbTestimonials(res.testimonials);
        }
      } catch (err) {
        console.error('Failed to fetch db testimonials:', err);
      }

      try {
        const res = await api.get('/settings');
        if (res.success && res.data) {
          setSettings(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [loading]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSkeleton />
      </div>
    );
  }
  // Mock Data
  const stats = [
    { number: '15K+', label: 'Happy Students', icon: Users },
    { number: '50+', label: 'Native Trainers', icon: GraduationCap },
    { number: '98%', label: 'Success Rate', icon: Award },
    { number: '120+', label: 'Course Hours', icon: Play }
  ];

  const programs = [
    { id: 'english-phonics-masterclass', title: 'Kids English', desc: 'Fun interactive games, basic vocab & phonics for younger levels.', level: 'Ages 5-10', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=60' },
    { id: 'interactive-grammar-vocabulary', title: 'Junior English', desc: 'Grammar essentials, writing compositions & speaking fluency.', level: 'Class 6-8', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&auto=format&fit=crop&q=60' },
    { id: 'ssc-academic-prep-suite', title: 'SSC Prep', desc: 'Intensive academic syllabus preparation and mock exams.', level: 'Class 9-10', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=60' },
    { id: 'hsc-target-a-grammar', title: 'HSC Prep', desc: 'Advanced literature review and grammar patterns for candidates.', level: 'Class 11-12', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format&fit=crop&q=60' },
    { id: 'fluent-spoken-english-workshop', title: 'Spoken English', desc: 'Practical communication skills, IELTS support, and career dialogue.', level: 'Job Seekers & Adults', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60' }
  ];

  const teachers = [
    { name: 'Dr. Sarah Rahman', role: 'Chief Instructor (Ex-IELTS Examiner)', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=60' },
    { name: 'James Miller', role: 'Native Spoken Trainer (UK Certified)', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=60' },
    { name: 'Anisul Islam', role: 'SSC & HSC Grammar Specialist', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=60' }
  ];

  const testimonials = [
    { name: 'Tahmid Hasan', role: 'HSC Candidate', rating: 5, quote: 'English StepUp transformed my HSC Prep. The structured notes and daily feedback helped me secure an A+ in English!' },
    { name: 'Nusrat Jahan', role: 'Spoken English Learner', rating: 5, quote: 'I used to struggle speaking in corporate meetings. The spoken course gave me the confidence to communicate fluently.' }
  ];

  const faqs = [
    { q: 'What age groups do you support?', a: 'We offer courses for children starting at class 1 up to high school candidates, as well as separate corporate spoken modules for adult students.' },
    { q: 'Do you offer certificates?', a: 'Yes! Upon finishing 100% of course materials and passing all final quizzes, digital completion certificates will automatically issue.' },
    { q: 'How do I join the live classes?', a: 'Live video lecture meeting links are published inside your student portal under the active courses viewer.' }
  ];

  const displayPrograms = dbCourses.length > 0
    ? dbCourses.slice(0, 3).map(c => ({
        id: c.slug || c._id,
        title: c.title,
        desc: c.description,
        level: c.level || 'Program',
        image: c.thumbnail || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=60'
      }))
    : programs;

  const displayTeachers = dbTeachers.length > 0
    ? dbTeachers.slice(0, 3).map(t => ({
        name: t.user?.name || 'Expert Coach',
        role: t.expertise?.join(', ') || 'English Instructor',
        image: t.user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=60'
      }))
    : teachers;

  const displayTestimonials = dbTestimonials.length > 0
    ? dbTestimonials.slice(0, 2).map(t => ({
        name: t.student?.name || 'Verified Learner',
        role: 'Student',
        rating: t.rating || 5,
        quote: t.content
      }))
    : testimonials;

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-28 min-h-[480px]">
        {/* Animated Glow Background matching current slide color */}
        {heroSlides[currentSlide]?.image && (
          <div className="absolute inset-0 -z-20">
            <img src={heroSlides[currentSlide].image} alt="" className="w-full h-full object-cover opacity-15" />
          </div>
        )}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl rounded-full blur-3xl -z-10 transition-colors duration-1000 ${heroSlides[currentSlide].glowClass}`} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center space-y-6 max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-brand-red/10 text-brand-red border border-brand-red/20 shadow-sm">
                <Sparkles className="h-4 w-4 mr-1 text-brand-red animate-pulse" />
                {heroSlides[currentSlide].badge}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-black dark:text-white leading-tight">
                {heroSlides[currentSlide].titleStart}
                <span className="text-brand-red">{heroSlides[currentSlide].titleHighlight}</span>
                {heroSlides[currentSlide].titleEnd}
              </h1>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {heroSlides[currentSlide].desc}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to={heroSlides[currentSlide].ctaLink}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-red text-white text-sm font-bold shadow-lg shadow-brand-red/25 hover:bg-red-600 hover:shadow-xl hover:shadow-brand-red/30 transition-all flex items-center justify-center space-x-2"
                >
                  <span>{heroSlides[currentSlide].ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gray-200 dark:border-gray-800 text-brand-black dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-brand-darkGray/40 transition-colors flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 pt-6">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-brand-red' : 'w-2 bg-gray-300 dark:bg-gray-750'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl shadow-xl">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="text-center space-y-2 p-4 border-r last:border-0 border-gray-100 dark:border-gray-800">
                <div className="mx-auto h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-3xl font-extrabold text-brand-black dark:text-white">{s.number}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Programs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Structured Learning Programs</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Discover tailored learning syllabi structured for each educational benchmark.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPrograms.map((p, idx) => (
            <div key={idx} className="group flex flex-col bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden card-hover">
              <div className="h-48 overflow-hidden relative">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute bottom-4 left-4 bg-brand-red text-white text-[10px] font-bold px-3 py-1 rounded-full">{p.level}</span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold hover:text-brand-red transition-colors">
                    <Link to={`/programs/${p.id}`}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
                <Link to={`/programs/${p.id}`} className="text-xs font-bold text-brand-red flex items-center space-x-1 hover:underline">
                  <span>View Details</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Introduction Video Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-black text-white rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold tracking-wide text-brand-red uppercase">Meet Our Founder</span>
              <h2 className="text-2xl md:text-3xl font-extrabold">Empowering Growth through Modern Methods</h2>
              <blockquote className="text-sm italic text-gray-300 border-l-2 border-brand-red pl-4 leading-relaxed">
                "{settings?.founderQuote || 'Our philosophy is simple: language learning should not be boring list cramming. We teach English by communicating, practicing, and building vocabulary in context.'}"
              </blockquote>
              <div>
                <p className="text-sm font-bold text-white">{settings?.founderName || 'Ahmed Shahriar'}</p>
                <p className="text-xs text-gray-400">{settings?.founderRole || 'Founder & CEO, English StepUp'}</p>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative flex justify-center w-full">
              <div className="w-full aspect-video md:max-w-md bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 flex items-center justify-center group relative cursor-pointer">
                {isPlayingVideo ? (
                  <video 
                    src={settings?.introVideoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'}
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center" onClick={() => setIsPlayingVideo(true)}>
                    <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80" alt="Video cover" className="w-full h-full object-cover opacity-60 group-hover:scale-102 transition-all" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute h-14 w-14 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg shadow-brand-red/40 group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Our Expert Teachers</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Learn from native speakers and academic specialists who understand how to unlock your potential.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTeachers.map((t, idx) => (
            <div key={idx} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 p-6 rounded-3xl flex flex-col items-center text-center space-y-4 card-hover">
              <img src={t.image} alt={t.name} className="h-28 w-28 rounded-full object-cover border-4 border-brand-red/20 shadow-md" />
              <div>
                <h3 className="text-base font-bold">{t.name}</h3>
                <p className="text-xs text-brand-red font-semibold">{t.role}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Dedicated instructor aiding speaking workshops and mock examinations feedback review.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories & Student Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">What Our Students Say</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Hear directly from students who achieved their target band scores and academic results.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayTestimonials.map((test, idx) => (
            <div key={idx} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 p-8 rounded-3xl shadow-md flex flex-col justify-between space-y-6 card-hover">
              <div className="space-y-4">
                <div className="flex text-yellow-400">
                  {[...Array(test.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-brand-red/10 flex items-center justify-center font-bold text-brand-red">
                  {test.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold">{test.name}</h4>
                  <p className="text-[10px] text-gray-500 capitalize">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <h2 className="text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-6 rounded-2xl">
              <h3 className="text-sm font-bold mb-2 flex items-center text-brand-black dark:text-white">
                <span className="h-2 w-2 rounded-full bg-brand-red mr-2" />
                {faq.q}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 pl-4 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-red text-white p-8 md:p-16 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-xl shadow-brand-red/20">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-xl mx-auto leading-tight">Ready to Unleash Your Communication Potential?</h2>
          <p className="text-xs text-red-100 max-w-md mx-auto leading-relaxed">
            Create a free student profile, register for mock courses assessments, and test your current spoken fluency band.
          </p>
          <div className="pt-4">
            <Link
              to="/register"
              className="inline-flex px-8 py-3.5 rounded-full bg-brand-black hover:bg-gray-800 text-white text-xs font-bold transition-all shadow-md"
            >
              Sign Up For Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
