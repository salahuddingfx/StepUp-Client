import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1600; // Complete loading in 1.6s
    const steps = 100;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      if (current >= steps) {
        setProgress(steps);
        clearInterval(timer);
      } else {
        setProgress(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Format progress with leading zeros
  const formattedProgress = progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress;

  // SVG parameters
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // 402.12
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        opacity: 0,
        transition: { 
          duration: 1.1, 
          ease: [0.76, 0, 0.24, 1], // cinematic bezier curve
          when: "afterChildren"
        }
      }}
      className="fixed inset-0 z-[9999] bg-[#070A13] flex flex-col items-center justify-center text-white select-none overflow-hidden"
    >
      {/* Dynamic radial glow background */}
      <div className="absolute h-[600px] w-[600px] rounded-full bg-brand-red/5 blur-[120px] -z-10" />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute h-[350px] w-[350px] rounded-full bg-brand-red/10 blur-[85px] -z-10"
      />

      <div className="relative flex flex-col items-center space-y-10">
        
        {/* Animated Radial HUD System */}
        <div className="relative h-44 w-44 flex items-center justify-center">
          
          {/* Inner Rotating Helper Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute h-[150px] w-[150px] rounded-full border border-dashed border-brand-red/10"
          />

          {/* Outer Dashed Rotating Orbit */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute h-[190px] w-[190px] rounded-full border border-dotted border-white/5"
          />

          {/* Main SVG Circular Progress Ring */}
          <svg className="absolute w-44 h-44 transform -rotate-90">
            {/* Background Track Circle */}
            <circle
              cx="88"
              cy="88"
              r={radius}
              className="stroke-brand-black/50 dark:stroke-gray-900/50"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Animated Loading Circle */}
            <motion.circle
              cx="88"
              cy="88"
              r={radius}
              className="stroke-brand-red"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ ease: "easeInOut", duration: 0.1 }}
              strokeLinecap="round"
            />
          </svg>

          {/* Central Logo and HUD */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center space-y-1 z-10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-16 w-16 rounded-[20px] bg-gradient-to-br from-brand-red to-[#C40E14] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-brand-red/30 border border-white/10"
            >
              ES
            </motion.div>
          </motion.div>
        </div>

        {/* Brand Text Elements with Cinematic Reveal */}
        <div className="text-center space-y-3">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-black tracking-[0.15em] uppercase"
            >
              English <span className="text-brand-red">StepUp</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400"
            >
              Empowering Growth
            </motion.p>
          </div>
        </div>

        {/* Digital Counter Display */}
        <div className="flex flex-col items-center space-y-1">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="text-xs font-mono font-bold tracking-[0.4em] text-brand-red"
          >
            SYSTEM_SYNC
          </motion.div>
          <div className="text-2xl font-mono tracking-widest font-black text-white/90">
            {formattedProgress}%
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default IntroLoader;
