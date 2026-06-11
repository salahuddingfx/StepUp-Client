import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="h-9 w-9 rounded-lg bg-brand-red flex items-center justify-center text-white font-extrabold text-xl">ES</span>
              <span className="font-extrabold text-lg tracking-wider text-white">
                English <span className="text-brand-red">StepUp</span>
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Empowering Growth through modern interactive online English coaching programs. Custom fit layouts for primary, secondary, and spoken learners.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/programs" className="hover:text-white">Our Programs</Link></li>
              <li><Link to="/teachers" className="hover:text-white">Our Teachers</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog & News</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support & Info</h3>
            <ul className="space-y-2 text-xs">
              <li><Link to="/contact" className="hover:text-white">Contact Support</Link></li>
              <li><Link to="/success-stories" className="hover:text-white">Success Stories</Link></li>
              <li><Link to="/faq" className="hover:text-white">Frequently Asked Questions</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h3>
            <p className="text-xs text-gray-400 mb-2">
              House 12, Road 4, Sector 7, Uttara, Dhaka, Bangladesh
            </p>
            <p className="text-xs text-gray-400 mb-2">
              Email: info@englishstepup.com
            </p>
            <p className="text-xs text-gray-400">
              Phone: +880 1712-345678
            </p>
          </div>
        </div>

        {/* Bottom Credits Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-850 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} English StepUp. All rights reserved.</p>
          <p>
            Crafted by{' '}
            <a 
              href="https://salahuddin.codes" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-red font-bold hover:underline"
            >
              Salah uddin Kader
            </a>{' '}
            (
            <a 
              href="https://nextorastudio.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-red font-bold hover:underline"
            >
              Nextora Studio
            </a>
            ) | <Link to="/developer" className="hover:text-white transition-colors">Developer Profile</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
