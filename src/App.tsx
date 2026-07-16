/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import MusicPlayer from './components/MusicPlayer';
import Particles from './components/Particles';

import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import GameScreen from './screens/GameScreen';
import CongratulationsScreen from './screens/CongratulationsScreen';
import SurpriseScreen from './screens/SurpriseScreen';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <SplashScreen />
          </PageTransition>
        } />
        <Route path="/welcome" element={
          <PageTransition>
            <WelcomeScreen />
          </PageTransition>
        } />
        <Route path="/game" element={
          <PageTransition>
            <GameScreen />
          </PageTransition>
        } />
        <Route path="/congratulations" element={
          <PageTransition>
            <CongratulationsScreen />
          </PageTransition>
        } />
        <Route path="/letter" element={
          <PageTransition>
            <SurpriseScreen />
          </PageTransition>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFE4E1] to-[#F5F5F5] text-slate-800">
        <Particles />
        <AnimatedRoutes />
        <MusicPlayer />
      </div>
    </Router>
  );
}
