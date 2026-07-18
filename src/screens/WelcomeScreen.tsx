import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    // Triggers music play due to interaction
    document.dispatchEvent(new Event('start-music'));
    navigate('/game');
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-10 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/50 via-white/20 to-transparent pointer-events-none" />
      
      <motion.div 
        className="relative z-20 flex flex-col items-center text-center px-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div 
          className="mb-4 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="h-[1px] w-12 bg-pink-300"></span>
          <span className="text-[11px] uppercase tracking-[0.4em] text-pink-500 font-semibold">A Magical 20 Year Journey</span>
          <span className="h-[1px] w-12 bg-pink-300"></span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-8xl editorial-serif font-black text-slate-900 leading-none mb-4 italic"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Happy 20<sup className="text-2xl md:text-4xl">th</sup>
        </motion.h1>
        
        <motion.h2 
          className="text-4xl md:text-6xl editorial-serif font-light text-slate-800 tracking-tighter"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Birthday Hanene
        </motion.h2>

        <motion.p 
          className="mt-8 max-w-md text-sm md:text-base text-slate-500 font-light leading-relaxed tracking-wide italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          This little adventure was created specifically for you. Collect twenty cakes to unlock your special surprise. Every step is a year of your beautiful life.
        </motion.p>
        
        <motion.button
          onClick={handleStart}
          className="mt-12 group relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-200 bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none shadow-[0_10px_20px_rgba(236,72,153,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">Start Journey</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
