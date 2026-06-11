import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ProfileSkeleton } from '../components/Skeleton';

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProfileSkeleton />
      </div>
    );
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent! We will contact you shortly.');
    e.target.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-brand-black dark:text-white sm:text-4xl">Get in Touch</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Have questions about our course tracks or enrollments? Send us a message.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 space-y-8 bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold">Contact Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400">Office Location</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  House 12, Road 4, Sector 7, Uttara, Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400">Call Us</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">+880 1712-345678</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-400">Email Address</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">info@englishstepup.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7 bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-8 rounded-3xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold">Your Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-xs focus:border-brand-red focus:outline-none" 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-xs focus:border-brand-red focus:outline-none" 
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Subject</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-xs focus:border-brand-red focus:outline-none" 
                placeholder="Inquiry about courses"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold">Message</label>
              <textarea 
                rows="4" 
                required 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent text-xs focus:border-brand-red focus:outline-none resize-none" 
                placeholder="Write your details..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-red hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Section */}
      <div className="bg-white dark:bg-brand-darkGray border border-gray-150/50 dark:border-gray-800/80 p-4 rounded-3xl shadow-sm overflow-hidden h-96 transition-all duration-300">
        <iframe 
          title="StepUp Office Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.3976378413247!2d90.39572627606346!3d23.875508824256247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3757c5ef44c7b8d3%3A0xb7f516a2d9c02581!2sRoad%204%2C%20Sector%207%2C%20Uttara%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1718105740000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '1.25rem' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Contact;
