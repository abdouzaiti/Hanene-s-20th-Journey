import { Howl } from 'howler';

let applause: Howl | null = null;
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (audioCtx && audioCtx.state === 'closed') {
    audioCtx = null;
  }
  if (!audioCtx) {
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playSound = (type: 'jump' | 'collect' | 'win') => {
  try {
    if (type === 'win') {
      if (!applause) {
        applause = new Howl({
          src: ['https://upload.wikimedia.org/wikipedia/commons/8/8e/Applause.ogg'],
          volume: 0.8,
          html5: true
        });
      }
      applause.play();
      return;
    }

    const ctx = getAudioContext();
    if (!ctx) return;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'jump') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'collect') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.setValueAtTime(600, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    console.error('Audio play failed', e);
  }
};
