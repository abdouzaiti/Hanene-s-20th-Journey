import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { EventBus } from '../lib/eventBus';
import initGame from '../game/PhaserGame';

export default function GameScreen() {
  const gameRef = useRef<Phaser.Game | null>(null);
  const navigate = useNavigate();
  const [age, setAge] = useState(0);
  const [isMilestone, setIsMilestone] = useState(false);

  useEffect(() => {
    // Initialize game
    if (!gameRef.current) {
      gameRef.current = initGame('phaser-container');
    }

    const handleAgeUpdate = (newAge: number) => {
      setAge(newAge);
      if ([5, 10, 15].includes(newAge)) {
        setIsMilestone(true);
        setTimeout(() => setIsMilestone(false), 2000);
      }
    };

    const handleGameWin = () => {
      setTimeout(() => {
        navigate('/congratulations');
      }, 3000); // Wait for the ending cinematic in phaser
    };

    EventBus.on('age-updated', handleAgeUpdate);
    EventBus.on('game-win', handleGameWin);

    return () => {
      EventBus.off('age-updated', handleAgeUpdate);
      EventBus.off('game-win', handleGameWin);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-[#87CEEB] overflow-hidden">
      {/* Game Container */}
      <div id="phaser-container" className="absolute inset-0 z-0" />

      <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-center z-50 pointer-events-none">
        <motion.div 
          className="glass-card rounded-full px-4 py-2 md:px-6 flex items-center gap-2 md:gap-4 pointer-events-auto"
          animate={{ scale: isMilestone ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-pink-400 flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-lg">H</div>
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-pink-600 font-semibold">Current Progress</span>
            <span className="text-xs md:text-sm font-bold editorial-serif text-slate-800">Age {age} / 20</span>
          </div>
        </motion.div>
        
        <div className="flex gap-4 pointer-events-auto">
          {/* Pause / Info could go here if needed */}
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-32 bg-amber-900 z-10 md:hidden flex justify-between px-8 items-center">
        <div className="flex gap-4 pointer-events-auto">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">←</div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">→</div>
        </div>
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm pointer-events-auto">↑</div>
      </div>

      <AnimatePresence>
        {isMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-pink-500 text-glow">
              Happy {age}th! 🎉
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
