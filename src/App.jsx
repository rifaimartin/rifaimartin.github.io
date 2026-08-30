import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import HeaderIntro from './components/layout/HeaderIntro';
import FlightTimeline from './components/layout/FlightTimeline';
import EducationSection from './components/layout/EducationSection';
import ProjectList from './components/layout/ProjectList';
import InFlightMagazine from './components/layout/InFlightMagazine';
import ArticleModal from './components/layout/ArticleModal';
import OpenGymModal from './components/layout/OpenGymModal';
import MemoriesPolaroid from './components/layout/MemoriesPolaroid';
import ProgressiveBlurDock from './components/layout/ProgressiveBlurDock';
import CaseStudyModal from './components/layout/CaseStudyModal';
import GatePassOverlay from './components/3d/GatePassOverlay';
import { profileData } from './data/profileData';
import './styles/main.css';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [gateOpen, setGateOpen] = useState(() => {
    try {
      return localStorage.getItem('rifai_pass_granted') !== 'true';
    } catch {
      return true;
    }
  });

  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const [isOpenGymOpen, setIsOpenGymOpen] = useState(false);
  const [shadeProgress, setShadeProgress] = useState(() => (isDark ? 1 : 0));

  // Sync theme attribute with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    setShadeProgress(isDark ? 1 : 0);
  }, [isDark]);

  const handleGrantAccess = () => {
    try {
      localStorage.setItem('rifai_pass_granted', 'true');
    } catch {}
    
    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2c6fff', '#38bdf8', '#10b981', '#ffffff']
    });

    setGateOpen(false);
  };

  const handleResetGate = () => {
    try {
      localStorage.removeItem('rifai_pass_granted');
    } catch {}
    setGateOpen(true);
  };

  return (
    <div className="folio">
      {/* Dynamic Cabin Ambient Darkening Backdrop during Window Shade Drag */}
      <div
        className="folio-ambient-dim"
        style={{
          opacity: shadeProgress * 0.96,
          pointerEvents: 'none'
        }}
      />

      {/* 3D Gate Boarding Pass Verification Screen */}
      <GatePassOverlay
        isOpen={gateOpen}
        onGranted={handleGrantAccess}
        onSkip={handleGrantAccess}
        isDark={isDark}
      />

      {/* Sticky Aviation Vertical Indicator (Desktop) */}
      <aside className="folio-sticky" aria-hidden="true">
        <div className="fs-rail" />
        <div className="fs-lines">
          <span className="fs-name">{profileData.name}</span>
          <br />
          <span>MIDDLEWARE • SYS ARCH</span>
          <br />
          <span>{profileData.location}</span>
        </div>
      </aside>

      {/* Main Single-Column Portfolio Content */}
      <main className="folio-col">
        {/* 3D Airplane Window & Intro Bio */}
        <HeaderIntro
          isDark={isDark}
          onShadeChange={(dark) => {
            setIsDark(dark);
            setShadeProgress(dark ? 1 : 0);
          }}
          onShadeDrag={(shade) => {
            setShadeProgress(shade);
            if (shade > 0.65 && !isDark) setIsDark(true);
            else if (shade < 0.35 && isDark) setIsDark(false);
          }}
        />

        {/* Flight Path Career Timeline */}
        <FlightTimeline onOpenCase={(study) => setActiveCaseStudy(study)} />

        {/* Flight Academy & Academic Foundations */}
        <EducationSection />

        {/* Open Source & Systems Research */}
        <ProjectList onOpenOpenGym={() => setIsOpenGymOpen(true)} />

        {/* In-Flight Magazine & Technical Essays */}
        <InFlightMagazine onOpenArticle={(article) => setActiveArticle(article)} />

        {/* Polaroid Memories Fan Outro */}
        <MemoriesPolaroid />
      </main>

      {/* Deep Dive Case Study Lightbox Modal */}
      <CaseStudyModal
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />

      {/* Article Reader Lightbox Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />

      {/* openGym Interactive In-App Simulator Modal */}
      <OpenGymModal
        isOpen={isOpenGymOpen}
        onClose={() => setIsOpenGymOpen(false)}
      />

      {/* Floating Progressive Multi-Blur Dock */}
      <ProgressiveBlurDock
        onResetGate={handleResetGate}
        onOpenOpenGym={() => setIsOpenGymOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />
    </div>
  );
}
