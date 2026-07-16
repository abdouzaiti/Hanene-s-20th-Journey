import { useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

let globalHowl: Howl | null = null;

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!globalHowl) {
      globalHowl = new Howl({
        // A reliable public domain/CC0 soft music track
        src: ['https://upload.wikimedia.org/wikipedia/commons/0/02/Happy_Birthday_to_You.ogg'],
        loop: true,
        volume: 0.5,
        html5: true,
        onloaderror: () => console.log('Audio load error'),
        onplayerror: () => {
          globalHowl?.once('unlock', () => {
            globalHowl?.play();
          });
        }
      });
    }

    const handleInteraction = () => {
      if (globalHowl && !globalHowl.playing()) {
        globalHowl.play();
        setIsPlaying(true);
      }
    };
    
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('start-music', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('start-music', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (globalHowl) {
      globalHowl.volume(isMuted ? 0 : volume);
    }
    Howler.mute(isMuted);
    Howler.volume(isMuted ? 0 : volume);
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-50 glass-card rounded-full px-3 py-1.5 flex items-center gap-2 transition-all scale-90 origin-top-right"
    >
      <button 
        onClick={toggleMute}
        className="p-1.5 hover:bg-pink-100 rounded-full transition-colors text-pink-600 focus:outline-none"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16 accent-pink-500 h-1 bg-pink-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
      />
    </motion.div>
  );
}
