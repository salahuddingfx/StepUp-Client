import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogCardSkeleton } from '../components/Skeleton';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockBlogs = [
    { _id: 'b1', title: '5 Essential Rules to Speak English Confidently', slug: 'speak-confidently-rules', content: 'Speaking English can be challenging. Here are 5 tips...', coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60', author: { name: 'Dr. Sarah Rahman' }, createdAt: '2026-06-01T10:00:00Z', tags: ['Spoken English', 'Speaking Tips'] },
    { _id: 'b2', title: 'HSC English Preposition Masterclass Hacks', slug: 'hsc-preposition-hacks', content: 'Prepositions are critical for board exams. Let\'s unpack...', coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60', author: { name: 'Anisul Islam' }, createdAt: '2026-06-05T10:00:00Z', tags: ['HSC Prep', 'Grammar'] },
    { _id: 'b3', title: 'How Phonics Help Kids Pronounce Words Faster', slug: 'phonics-for-kids', content: 'Teaching phonics creates a strong speech baseline...', coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60', author: { name: 'James Miller' }, createdAt: '2026-06-08T10:00:00Z', tags: ['Kids English', 'Phonics'] }
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs?isPublished=true');
        if (res.success && res.blogs.length > 0) {
          setBlogs(res.blogs);
        } else {
          setBlogs(mockBlogs);
        }
      } catch (err) {
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">English Learning Blog</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Tips, study guides, and grammatical rules published by our expert coaches.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <div key={blog._id} className="bg-white dark:bg-brand-darkGray border border-gray-200/50 dark:border-gray-800/50 rounded-3xl overflow-hidden flex flex-col justify-between card-hover">
              <div className="space-y-4">
                <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags?.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-brand-red/10 text-[9px] font-bold text-brand-red rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm font-bold leading-snug">{blog.title}</h3>
                  <div className="flex items-center text-[10px] text-gray-400 space-x-3 pt-2">
                    <span className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{blog.author?.name}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link 
                  to={`/blog/${blog._id}`} 
                  className="text-xs font-bold text-brand-red flex items-center space-x-1 hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
