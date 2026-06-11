import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Calendar, User, ArrowLeft, BookOpen, Clock, Tag } from 'lucide-react';
import { Skeleton } from '../components/Skeleton';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // High Quality Mock details fallback
  const mockBlogs = [
    { 
      _id: 'b1', 
      title: '5 Essential Rules to Speak English Confidently', 
      slug: 'speak-confidently-rules', 
      content: 'Speaking English confidently requires consistent dedication rather than pure list memorization. First, focus on sentence flow over grammar perfection—native speakers prioritize context over textbook rules in everyday dialogue. Second, active speaking is key; read books aloud to warm up throat muscle memory. Third, practice interactive accents listening via podcasts. Fourth, record your speeches on a phone to evaluate voice tonalities and self-correct pauses. Finally, find a partner or join English StepUp labs to establish confidence in dynamic groups!', 
      coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80', 
      author: { name: 'Dr. Sarah Rahman', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60' }, 
      createdAt: '2026-06-01T10:00:00Z', 
      tags: ['Spoken English', 'Speaking Tips'],
      readTime: '5 mins'
    },
    { 
      _id: 'b2', 
      title: 'HSC English Preposition Masterclass Hacks', 
      slug: 'hsc-preposition-hacks', 
      content: 'Prepositions represent the highest failure rate in college board grammar questions. To master prepositions, stop memorizing arbitrary tables and study "appropriate prepositions" in contextual reading blocks. Understand the spatial relationships: "in" denotes static boundaries, "on" denotes contact surfaces, and "at" marks exact coordinates. Practice active parsing on past board questions, highlighting prepositions within compound sentences. Secure your A+ score by checking out our board evaluation programs!', 
      coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80', 
      author: { name: 'Anisul Islam', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60' }, 
      createdAt: '2026-06-05T10:00:00Z', 
      tags: ['HSC Prep', 'Grammar'],
      readTime: '8 mins'
    },
    { 
      _id: 'b3', 
      title: 'How Phonics Help Kids Pronounce Words Faster', 
      slug: 'phonics-for-kids', 
      content: 'Phonics form the absolute foundation of early childhood literacy. Rather than dictating words letter by letter, teach kids to map letters to phonemic sound blocks. Standard phonics charts allow children to decode unfamiliar read words automatically. Start with simple consonant-vowel-consonant (CVC) sounds like "cat" and "dog", then advance to vowel digraphs like "boat". StepUp interactive audio flashcards and sound tables accelerate vocabulary metrics within weeks!', 
      coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80', 
      author: { name: 'James Miller', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=60' }, 
      createdAt: '2026-06-08T10:00:00Z', 
      tags: ['Kids English', 'Phonics'],
      readTime: '4 mins'
    }
  ];

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        if (res.success && res.blog) {
          setBlog(res.blog);
        } else {
          const matched = mockBlogs.find(b => b._id === id);
          setBlog(matched || mockBlogs[0]);
        }
      } catch (err) {
        const matched = mockBlogs.find(b => b._id === id);
        setBlog(matched || mockBlogs[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
          <div className="space-y-2 pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-xs text-gray-500">
        Article not found. <Link to="/blog" className="text-brand-red font-bold hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Return Controls */}
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-brand-red transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Articles</span>
      </button>

      {/* Cover Banner */}
      <div className="h-64 sm:h-96 w-full overflow-hidden rounded-3xl shadow-md border border-gray-150/50 dark:border-gray-800/80 relative">
        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
          {blog.tags?.map((t, idx) => (
            <span key={idx} className="px-3 py-1 bg-brand-red text-white text-[9px] sm:text-[10px] font-bold rounded-full uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Article Details & Text (Col span 8) */}
        <article className="lg:col-span-8 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-black dark:text-white leading-tight">
            {blog.title}
          </h1>

          {/* Author metadata panel */}
          <div className="flex items-center space-x-4 py-4 border-y border-gray-100 dark:border-gray-800 text-xs text-gray-500">
            <img 
              src={blog.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
              alt={blog.author?.name} 
              className="h-10 w-10 rounded-full object-cover border border-brand-red/20" 
            />
            <div>
              <h4 className="font-bold text-brand-black dark:text-white">{blog.author?.name}</h4>
              <div className="flex items-center space-x-3 text-[10px] text-gray-400 mt-0.5">
                <span className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{blog.readTime || '5 mins'} read</span>
                </span>
              </div>
            </div>
          </div>

          {/* Article Text Content */}
          <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 font-medium">
            <p>{blog.content}</p>
            <blockquote className="border-l-4 border-brand-red bg-gray-50 dark:bg-brand-black/20 p-4 rounded-r-xl italic my-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              "Understanding prepositions and grammar logic in visual chunks is the fastest method to ensure board preps success grades."
            </blockquote>
            <p>
              To explore more details and take practice boards tests or MCQ assessment quizzes, join English StepUp courses catalog.
            </p>
          </div>
        </article>

        {/* Right Side: Support Card (Col span 4) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-brand-black text-white p-6 rounded-3xl border border-gray-805 space-y-4 text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-brand-red/10 blur-2xl" />
            <BookOpen className="h-8 w-8 text-brand-red mx-auto" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-red">Empower Your English</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Register profiles to download dynamic PDF booklets and study with native tutors.
            </p>
            <Link 
              to="/programs" 
              className="inline-block w-full py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all shadow-md"
            >
              Browse Programs
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
