import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import confetti from 'canvas-confetti';

export default function CongratulationsScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ff69b4', '#ff1493']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffc0cb', '#ff69b4', '#ff1493']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 text-center">
      <motion.div
        className="flex flex-col items-center justify-center text-center px-4 max-w-4xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-8xl editorial-serif font-black text-slate-900 leading-none mb-8 italic">
          Happy 20<sup className="text-2xl md:text-4xl">th</sup> <br />
          <span className="font-light tracking-tighter">Birthday Hanene</span>
        </h1>
        
        <motion.p 
          className="mt-8 max-w-2xl text-lg md:text-xl text-slate-500 font-light leading-relaxed tracking-wide italic mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          "May this new chapter bring you happiness, success, beautiful memories, and everything your heart wishes for."
        </motion.p>
        
        <motion.button
          onClick={() => navigate('/letter')}
          className="mt-4 group relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white transition-all duration-200 bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none shadow-[0_10px_20px_rgba(236,72,153,0.3)] text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">💖 Open Your Surprise</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
}
