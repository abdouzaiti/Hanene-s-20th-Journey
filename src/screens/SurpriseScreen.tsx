import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function SurpriseScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Explosive confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ffc0cb', '#ff69b4', '#ff1493', '#ffffff']
    });

    setTimeout(() => {
      setShowLetter(true);
    }, 1500);
  };

  const letterText = `Happy 20th Birthday, Hanene!

I wanted to make something truly special for you, something that shows how much you mean to the people around you. 

Twenty is such a beautiful milestone. It's the beginning of a new era, full of dreams waiting to be chased, and moments waiting to turn into memories.

Always remember how incredibly loved you are. Keep shining your beautiful light, keep smiling, and keep being the amazing person you are.

May this year be everything you've ever hoped for and more.

❤️ Made with love, especially for Hanene ❤️`;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-10 px-4">
      <AnimatePresence>
        {!showLetter && (
          <motion.div
            className="cursor-pointer"
            onClick={handleOpen}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="text-9xl drop-shadow-2xl"
              animate={isOpen ? { scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] } : { y: [0, -20, 0] }}
              transition={isOpen ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {isOpen ? '✨' : '🎁'}
            </motion.div>
            {!isOpen && (
              <motion.p 
                className="text-pink-500 font-sans font-medium text-center mt-8 text-xl"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap to open
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="glass-card p-8 md:p-12 rounded-3xl max-w-2xl w-full relative"
          >
            {/* Floating Hearts inside letter container */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -left-6 text-4xl"
            >
              💖
            </motion.div>
            <motion.div 
              animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 text-4xl"
            >
              💖
            </motion.div>

            <div className="flex justify-center items-center gap-4 mb-6">
              <img src="/letter.png" alt="letter" className="w-24 h-24" />
              <img src="/happy.png" alt="happy" className="w-24 h-24" />
            </div>

            <motion.p 
              className="font-handwriting text-xl md:text-3xl text-slate-700 leading-relaxed whitespace-pre-wrap max-h-[70vh] overflow-y-auto pr-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
            >
              {letterText}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
