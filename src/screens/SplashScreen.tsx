import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-6 text-glow"
        >
          ✨
        </motion.div>
        <motion.h1 
          className="editorial-serif text-5xl md:text-6xl font-black text-slate-900 tracking-tighter text-center italic"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Hanene's
        </motion.h1>
        <motion.h2 
          className="editorial-serif text-3xl md:text-4xl text-pink-500 mt-2 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          20th Journey
        </motion.h2>
        
        <motion.div 
          className="mt-12 h-1 bg-pink-100 rounded-full overflow-hidden w-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="h-full bg-pink-400 rounded-full box-glow"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
