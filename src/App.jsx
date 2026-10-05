import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import HeaderIntro from './components/layout/HeaderIntro';
import FlightTimeline from './components/layout/FlightTimeline';
import EducationSection from './components/layout/EducationSection';
import PublicProjectsSection from './components/layout/PublicProjectsSection';
import ProjectList from './components/layout/ProjectList';
import InFlightMagazine from './components/layout/InFlightMagazine';
import ArticleModal from './components/layout/ArticleModal';
import OpenGymModal from './components/layout/OpenGymModal';
import PsikotestModal from './components/layout/PsikotestModal';
import TpdBiModal from './components/layout/TpdBiModal';
import ZahraBiToastSelector from './components/layout/ZahraBiToastSelector';
import ZahraEncouragementModal from './components/layout/ZahraEncouragementModal';
import MemoriesPolaroid from './components/layout/MemoriesPolaroid';
import ProgressiveBlurDock from './components/layout/ProgressiveBlurDock';
import CaseStudyModal from './components/layout/CaseStudyModal';
import GatePassOverlay from './components/3d/GatePassOverlay';
import EvolutionPresentationModal from './components/layout/EvolutionPresentationModal';
import PersonalKeynoteModal from './components/layout/PersonalKeynoteModal';
import PresentationHubModal from './components/layout/PresentationHubModal';
import { profileData } from './data/profileData';
import './styles/main.css';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [gateOpen, setGateOpen] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('read') || params.get('article') || window.location.hash.includes('read')) {
        return false; // Automatically bypass gate for direct deep links from WA/social
      }
      return localStorage.getItem('rifai_pass_granted') !== 'true';
    } catch {
      return true;
    }
  });

  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeArticle, setActiveArticle] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const readId = params.get('read') || params.get('article');
      if (readId && profileData.articles) {
        const found = profileData.articles.find((a) => a.id === readId && !a.isPresentation);
        if (found) return found;
      }
      const hash = window.location.hash;
      if (hash.startsWith('#read/') || hash.startsWith('#read=')) {
        const id = hash.replace(/^#read[/=]/, '');
        const found = profileData.articles.find((a) => a.id === id && !a.isPresentation);
        if (found) return found;
      }
    } catch {}
    return null;
  });
  const [isOpenGymOpen, setIsOpenGymOpen] = useState(false);
  const [isPsikotestOpen, setIsPsikotestOpen] = useState(false);
  const [isTpdBiOpen, setIsTpdBiOpen] = useState(false);
  const [isZahraToastOpen, setIsZahraToastOpen] = useState(false);
  const [isZahraEncouragementOpen, setIsZahraEncouragementOpen] = useState(false);
  const [zahraSelectedTrack, setZahraSelectedTrack] = useState('tpu');
  const [zahraSelectedTrackTitle, setZahraSelectedTrackTitle] = useState('Tes Pengetahuan Umum (PCPM BI)');
  const [isPresentationHubOpen, setIsPresentationHubOpen] = useState(false);
  const [isEvolutionOpen, setIsEvolutionOpen] = useState(false);
  const [isPersonalKeynoteOpen, setIsPersonalKeynoteOpen] = useState(false);
  const [presentationFullscreen, setPresentationFullscreen] = useState(false);
  const [shadeProgress, setShadeProgress] = useState(() => (isDark ? 1 : 0));

  const handleOpenZahraBi = () => {
    setIsZahraToastOpen(true);
  };

  const handleSelectZahraTrack = (trackId, trackTitle) => {
    setZahraSelectedTrack(trackId);
    setZahraSelectedTrackTitle(trackTitle);
    setIsZahraToastOpen(false);
    setIsZahraEncouragementOpen(true);
  };

  const handleStartTestAfterEncouragement = () => {
    setIsZahraEncouragementOpen(false);
    setIsTpdBiOpen(true);
  };

  const handleBackToZahraSelector = () => {
    setIsZahraEncouragementOpen(false);
    setIsZahraToastOpen(true);
  };

  const handleOpenArticle = (article) => {
    if (article.isPresentation) {
      setIsPresentationHubOpen(true);
    } else {
      setActiveArticle(article);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('read', article.id);
        window.history.pushState({ articleId: article.id }, '', url.toString());
      } catch {}
    }
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('read');
      url.searchParams.delete('article');
      if (url.hash.includes('read')) {
        url.hash = '';
      }
      window.history.pushState(null, '', url.pathname + (url.search ? url.search : ''));
    } catch {}
  };

  // Handle popstate for deep-linked read articles (e.g. mobile Back button)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const readId = params.get('read') || params.get('article');
        if (readId && profileData.articles) {
          const found = profileData.articles.find((a) => a.id === readId && !a.isPresentation);
          if (found) {
            setActiveArticle(found);
            setGateOpen(false);
            return;
          }
        }
        setActiveArticle(null);
      } catch {}
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic page title when reading article
  useEffect(() => {
    if (activeArticle) {
      document.title = `${activeArticle.title} — Muhammad Rifai`;
    } else {
      document.title = 'Muhammad Rifai — Junior IT Middleware Developer';
    }
  }, [activeArticle]);

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

  const handleLaunchPresentation = (presentationId, mode) => {
    if (mode === 'fullscreen') {
      setPresentationFullscreen(true);
      try {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch {}
    } else {
      setPresentationFullscreen(false);
    }

    if (presentationId === 'coding-evolution-harness') {
      setIsEvolutionOpen(true);
    } else if (presentationId === 'behind-the-terminal') {
      setIsPersonalKeynoteOpen(true);
    }
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
          <span>JUNIOR IT MIDDLEWARE</span>
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

        {/* Public Ventures & Web Productions (Potretin & AlamNatura) */}
        <PublicProjectsSection />

        {/* Open Source & Systems Research */}
        <ProjectList
          onOpenOpenGym={() => setIsOpenGymOpen(true)}
          onOpenPsikotest={() => setIsPsikotestOpen(true)}
          onOpenTpdBi={handleOpenZahraBi}
          onOpenZahraBi={handleOpenZahraBi}
        />

        {/* In-Flight Magazine & Technical Essays */}
        <InFlightMagazine
          onOpenArticle={handleOpenArticle}
        />

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
        onClose={handleCloseArticle}
      />

      {/* openGym Interactive In-App Simulator Modal */}
      <OpenGymModal
        isOpen={isOpenGymOpen}
        onClose={() => setIsOpenGymOpen(false)}
      />

      {/* Psikotest Bank Interactive In-App Simulator Modal */}
      <PsikotestModal
        isOpen={isPsikotestOpen}
        onClose={() => setIsPsikotestOpen(false)}
      />

      {/* Zahra BI Selector Toast / Popover */}
      <ZahraBiToastSelector
        isOpen={isZahraToastOpen}
        onClose={() => setIsZahraToastOpen(false)}
        onSelectTrack={handleSelectZahraTrack}
        isDark={isDark}
      />

      {/* Special Encouragement Modal for Zahra Sayang before Test */}
      <ZahraEncouragementModal
        isOpen={isZahraEncouragementOpen}
        trackTitle={zahraSelectedTrackTitle}
        onStart={handleStartTestAfterEncouragement}
        onBack={handleBackToZahraSelector}
        onClose={() => setIsZahraEncouragementOpen(false)}
        isDark={isDark}
      />

      {/* Zahra BI / TPD Bank Indonesia Interactive Simulator Modal */}
      <TpdBiModal
        isOpen={isTpdBiOpen}
        onClose={() => setIsTpdBiOpen(false)}
        initialTrack={zahraSelectedTrack}
      />

      {/* Technical Keynotes & Talks Catalog Hub Modal */}
      <PresentationHubModal
        isOpen={isPresentationHubOpen}
        onClose={() => setIsPresentationHubOpen(false)}
        onLaunchPresentation={handleLaunchPresentation}
      />

      {/* The Evolution of Coding & Agent Harness Interactive Presentation Modal */}
      <EvolutionPresentationModal
        isOpen={isEvolutionOpen}
        initialFullscreen={presentationFullscreen}
        onClose={() => {
          setIsEvolutionOpen(false);
          setPresentationFullscreen(false);
        }}
      />

      {/* Behind the Terminal: Systems, Markets & -100M Crucible Personal Keynote Modal */}
      <PersonalKeynoteModal
        isOpen={isPersonalKeynoteOpen}
        initialFullscreen={presentationFullscreen}
        onClose={() => {
          setIsPersonalKeynoteOpen(false);
          setPresentationFullscreen(false);
        }}
      />

      {/* Floating Progressive Multi-Blur Dock */}
      <ProgressiveBlurDock
        onResetGate={handleResetGate}
        onOpenOpenGym={() => setIsOpenGymOpen(true)}
        onOpenPsikotest={() => setIsPsikotestOpen(true)}
        onOpenTpdBi={handleOpenZahraBi}
        onOpenZahraBi={handleOpenZahraBi}
        onOpenPresentations={() => setIsPresentationHubOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />
    </div>
  );
}
