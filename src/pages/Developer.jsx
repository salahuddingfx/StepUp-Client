import React, { useState, useEffect } from 'react';
import { Sparkles, Code, Globe, Github, Twitter, Linkedin, Facebook, Mail, ExternalLink } from 'lucide-react';
import { ProfileSkeleton } from '../components/Skeleton';

const Developer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProfileSkeleton />
      </div>
    );
  }
  const skills = [
    'React.js / Next.js', 'Node.js / Express', 'MongoDB / Mongoose', 
    'Tailwind CSS', 'Framer Motion / GSAP', 'Socket.IO / WebSockets',
    'Enterprise Cloud Hosting', 'API Gateway Design'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 select-none">
      {/* Profile Header Cards */}
      <div className="bg-brand-black text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl -z-0" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
          {/* Developer Profile Image */}
          <img 
            src="https://github.com/salahuddingfx.png" 
            alt="Salah uddin Kader" 
            className="h-28 w-28 rounded-2xl object-cover border-2 border-brand-red/40 shadow-lg shadow-brand-red/20 shrink-0" 
          />

          <div className="space-y-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-red/10 text-brand-red border border-brand-red/20">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Lead Developer
            </span>
            
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <a 
                href="https://salahuddin.codes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-red transition-colors flex items-center justify-center md:justify-start gap-2"
              >
                <span>Salah uddin Kader</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </h1>
            
            <p className="text-xs text-brand-red font-bold uppercase tracking-wider">
              Founder & Director,{' '}
              <a 
                href="https://nextorastudio.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Nextora Studio
              </a>
            </p>
            
            <p className="text-xs text-gray-400 leading-relaxed max-w-lg">
              Lead systems architect specialized in crafting enterprise SaaS products, interactive coaching portals, and custom API gateways.
            </p>

            {/* Developer Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <a href="https://github.com/salahuddingfx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-4.5 w-4.5" />
              </a>
              <a href="https://linkedin.com/in/salahuddingfx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a href="https://twitter.com/salahuddingfx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Agency Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/80 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold">Nextora Studio</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Nextora Studio is an elite digital engineering agency crafting cutting-edge applications, responsive Web interfaces, and robust systems backend setups.
            </p>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase">Agency Socials:</span>
            <a href="https://facebook.com/nextorastudio.bd" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-red transition-colors">
              <Facebook className="h-4.5 w-4.5" />
            </a>
            <a href="https://linkedin.com/company/nextorastudio.bd" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-red transition-colors">
              <Linkedin className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-brand-darkGray p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/80 space-y-4 shadow-sm">
          <div className="h-10 w-10 bg-brand-red/10 text-brand-red flex items-center justify-center rounded-xl">
            <Code className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-gray-100 dark:bg-brand-black/40 text-[10px] text-gray-500 rounded font-semibold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Agency Callout CTA */}
      <div className="border border-brand-red/20 bg-brand-red/5 p-8 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
        <h3 className="text-sm font-extrabold text-brand-black dark:text-white">Let's Craft Something Premium</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Contact Nextora Studio for premium full-stack software development, custom SaaS product launches, and interactive UX designs.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="https://nextorastudio.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-1.5 px-6 py-2.5 bg-brand-red hover:bg-red-600 text-white rounded-full text-xs font-bold transition-all shadow-md shadow-brand-red/10"
          >
            <span>Visit nextorastudio.tech</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="mailto:contact@nextorastudio.tech"
            className="inline-flex items-center justify-center space-x-1.5 px-6 py-2.5 border border-gray-250 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-brand-black text-brand-black dark:text-white rounded-full text-xs font-bold transition-all"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email Nextora</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
