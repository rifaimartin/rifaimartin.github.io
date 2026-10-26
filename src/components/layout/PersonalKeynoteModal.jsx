import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2, 
  TrendingUp, TrendingDown, ShieldAlert, AlertTriangle, CheckCircle2, 
  RefreshCw, ZoomIn, Sparkles, Cpu, BookOpen, 
  Compass, Heart, Layers, Bot, Wand2, Rocket, Zap,
  Trophy, GraduationCap, Workflow, Play, ShieldCheck, Box, Terminal, Code2,
  Activity, ArrowRight, MapPin, Coffee, Flame, Globe, Lightbulb, Brain
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import introImg from '../../assets/images/rifaimartin-introduction.jpeg';
import stacksWinnerImg from '../../assets/images/stacks-bitcoin-winner.jpg';
import instructorImg from '../../assets/images/instructor-java-ladies.jpg';
import marginCallImg from '../../assets/images/margin-call-history.png';

const CHAPTERS = [
  {
    id: 'intro-curiosity',
    number: '01',
    badge: 'THE CURIOUS EXPLORER',
    title: 'Halo, Saya Rifai: Suka Mencoba & Belajar Hal Baru',
    subtitle: 'Mengenal saya di balik terminal: bukan tentang menjadi yang terpintar, melainkan tentang rasa penasaran tak terbatas, hobi mengulik hal baru, dan dorongan tiada henti untuk berevolusi.'
  },
  {
    id: 'crypto-rabbit-hole',
    number: '02',
    badge: 'THE CRYPTO ADVENTURE',
    title: 'Belajar Hal Baru: Terpikat Kripto hingga Terjebak Ilusi Cepat Kaya',
    subtitle: 'Dari rasa penasaran mengulik teknologi blockchain & smart contracts, berkembang menjadi hasrat instan: volatilitas pasar 24/7 dan godaan ingin cepat kaya.'
  },
  {
    id: 'margin-call-crucible',
    number: '03',
    badge: 'BAD EXPERIENCE // -100M LIQUIDATION',
    title: 'Kuliah Termahal: Bad Experience & Likuidasi Ratusan Juta (Haha!) 💸',
    subtitle: 'Kenyataan pahit Binance Futures: bukti otentik margin call senilai -100 juta rupiah, kehancuran modal dalam semalam, dan titik balik kedewasaan mental seorang engineer.'
  },
  {
    id: 'ai-agent-vibe-coding',
    number: '04',
    badge: 'THE AGENTIC SHIFT',
    title: 'Mengenal AI Agent: LLM + Harness + Execution Tools & Vibe Coding 🤖',
    subtitle: 'Babak baru eksplorasi: menyadari bahwa autonomous agent bukan sekadar prompt chat, melainkan sinergi antara LLM (Reasoner), Agentic Harness, dan Tool Execution.'
  },
  {
    id: 'curiosity-milestones',
    number: '05',
    badge: 'CURIOSITY MILESTONES',
    title: 'Buah Rasa Ingin Tahu: Juara 1 Stacks Bitcoin & Instruktur Java Ladies 🏆',
    subtitle: 'Ketika hobi belajar hal baru membawa hasil tak terduga: dari memenangkan kompetisi developer Bitcoin, hingga diminta jadi instruktur komunitas Java Ladies.'
  },
  {
    id: 'explorer-manifesto',
    number: '06',
    badge: 'EXPLORER & STOIC',
    title: 'The Explorer Spirit: Tempat Baru, Stoikisme & Compounding 1% 🌱',
    subtitle: 'Eksplorasi tempat kerja baru setiap minggu, ketenangan lewat stoikisme Seneca, dan komitmen bertumbuh 1% setiap hari.'
  }
];

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function PersonalKeynoteModal({ isOpen, onClose, initialFullscreen = false }) {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  // Presenter Timer
  useEffect(() => {
    let interval = null;
    if (isOpen) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  // Fullscreen event listener
  useEffect(() => {
    const handleFsChange = () => {
      const activeFs = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(activeFs);
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    soundFx.playCardClick();
    if (!isFullscreen) {
      const el = containerRef.current || document.documentElement;
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => {});
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const handleClose = () => {
    soundFx.playCardClick();
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      try {
        if (document.exitFullscreen) document.exitFullscreen();
      } catch (e) {}
    }
    onClose();
  };

  // Keyboard Navigation: Space / Arrows / F / Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (previewImage) {
        if (e.key === 'Escape') setPreviewImage(null);
        return;
      }

      if (e.key === 'Escape' && !document.fullscreenElement && !document.webkitFullscreenElement) {
        handleClose();
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (e.key === ' ') e.preventDefault();
        handleNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentSlide, isFullscreen, previewImage]);

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentSlide((prev) => {
      if (prev < CHAPTERS.length - 1) {
        soundFx.playCardClick();
        return prev + 1;
      }
      return prev;
    });
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => {
      if (prev > 0) {
        soundFx.playCardClick();
        return prev - 1;
      }
      return 0;
    });
  };

  const goToSlide = (idx) => {
    soundFx.playCardClick();
    setCurrentSlide(Math.max(0, Math.min(CHAPTERS.length - 1, idx)));
  };

  // Safe Slide Bounds & Chapter
  const safeSlideIndex = Math.max(0, Math.min(CHAPTERS.length - 1, currentSlide));
  const activeChapter = CHAPTERS[safeSlideIndex] || CHAPTERS[0];

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isFullscreen ? 0 : '16px',
        backgroundColor: isFullscreen ? '#060609' : 'rgba(5, 5, 8, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.25s ease-out'
      }}
      onClick={isFullscreen ? undefined : handleClose}
      role="dialog"
      aria-modal="true"
    >
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(245, 158, 11, 0.4); box-shadow: 0 0 15px rgba(245, 158, 11, 0.15); }
          50% { border-color: rgba(245, 158, 11, 0.8); box-shadow: 0 0 25px rgba(245, 158, 11, 0.35); }
        }
        @keyframes pulseGreen {
          0%, 100% { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 15px rgba(16, 185, 129, 0.15); }
          50% { border-color: rgba(16, 185, 129, 0.8); box-shadow: 0 0 25px rgba(16, 185, 129, 0.35); }
        }
        @keyframes pulseRed {
          0%, 100% { border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 0 15px rgba(239, 68, 68, 0.2); }
          50% { border-color: rgba(239, 68, 68, 0.85); box-shadow: 0 0 30px rgba(239, 68, 68, 0.45); }
        }
        @keyframes pulsePurple {
          0%, 100% { border-color: rgba(139, 92, 246, 0.4); box-shadow: 0 0 15px rgba(139, 92, 246, 0.15); }
          50% { border-color: rgba(139, 92, 246, 0.8); box-shadow: 0 0 25px rgba(139, 92, 246, 0.35); }
        }
        @keyframes candlePump {
          0% { transform: scaleY(0.7); }
          100% { transform: scaleY(1.06); }
        }
        @keyframes wickFlicker {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); filter: drop-shadow(0 0 12px rgba(239, 68, 68, 0.9)); }
        }
        @keyframes radarPing {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.35); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }
        .interactive-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .interactive-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.35);
        }
      `}</style>

      <div
        style={{
          background: isFullscreen ? 'var(--bg)' : 'var(--surface-card)',
          border: isFullscreen ? 'none' : '1px solid var(--card-border)',
          borderRadius: isFullscreen ? 0 : '24px',
          maxWidth: isFullscreen ? '100vw' : '1100px',
          width: '100%',
          height: isFullscreen ? '100vh' : '92vh',
          maxHeight: isFullscreen ? '100vh' : '880px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: isFullscreen ? 'none' : '0 32px 96px rgba(0,0,0,0.7)',
          position: 'relative',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Keynote Navbar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isFullscreen ? '18px 36px' : '14px 24px',
            borderBottom: '1px solid var(--card-border)',
            background: 'var(--surface-card-subtle)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              <Tv size={12} />
              <span>{isFullscreen ? 'FULLSCREEN KEYNOTE' : 'KEYNOTE #02: PERSONAL STORY'}</span>
            </div>

            {/* Presenter Clock Timer */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 9px',
                borderRadius: '999px',
                background: 'var(--surface-sunken)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--ink-body)'
              }}
              title="Presentation Elapsed Time"
            >
              <Clock size={11} color="#f59e0b" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
          </div>

          {/* Chapter Quick Selector Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => goToSlide(idx)}
                style={{
                  width: idx === safeSlideIndex ? '36px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  border: 'none',
                  background: idx === safeSlideIndex ? '#f59e0b' : 'var(--card-border)',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 0
                }}
                title={`Go to Chapter ${ch.number}: ${ch.title}`}
              />
            ))}
          </div>

          {/* Control Actions: Fullscreen & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleFullscreen}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--ink)',
                transition: 'transform 0.15s'
              }}
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen Mode (F)'}
            >
              {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            <button
              onClick={handleClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--ink)',
                transition: 'transform 0.15s'
              }}
              title="Close Presentation (Esc)"
            >
              <X size={15} />
            </button>
          </div>
        </header>

        {/* Slide Header Hero */}
        <div
          style={{
            padding: isFullscreen ? '22px 40px 12px 40px' : '16px 28px 10px 28px',
            borderBottom: '1px solid var(--card-border)',
            background: 'var(--surface-card)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 800,
                color: '#f59e0b',
                letterSpacing: '1px'
              }}
            >
              CHAPTER {activeChapter.number} // {activeChapter.badge}
            </span>
          </div>
          <h2
            style={{
              fontSize: isFullscreen ? '21px' : '18px',
              fontWeight: 800,
              color: 'var(--folio-ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              marginBottom: '3px'
            }}
          >
            {activeChapter.title}
          </h2>
          <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', lineHeight: 1.4, margin: 0 }}>
            {activeChapter.subtitle}
          </p>
        </div>

        {/* Scrollable Slide Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isFullscreen ? '28px 40px' : '20px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* SLIDE 0: Halo, Saya Rifai: Suka Mencoba & Belajar Hal Baru */}
          {safeSlideIndex === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '18px',
                  alignItems: 'stretch'
                }}
              >
                {/* Left Column: Framed Introduction Photo */}
                <div
                  className="interactive-card"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--surface-card-subtle)',
                    border: '1.5px solid rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'pulseBorder 4s infinite ease-in-out'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: '#090d16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setPreviewImage(introImg || './rifaimartin-introduction.jpeg')}
                    title="Klik untuk memperbesar foto profil"
                  >
                    <img
                      src={introImg || './rifaimartin-introduction.jpeg'}
                      onError={(e) => {
                        if (e.currentTarget.src.indexOf('/assets/') === -1) {
                          e.currentTarget.src = './assets/rifaimartin-introduction.jpeg';
                        }
                      }}
                      alt="Muhamad Rifai (Rifai Martin)"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <ZoomIn size={12} color="#f59e0b" />
                      <span>Zoom Photo</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Muhamad Rifai
                      </span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontFamily: 'var(--font-mono)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10b981',
                          fontWeight: 700
                        }}
                      >
                        ● ACTIVE LEARNER
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0 }}>
                      Backend Engineer • Polyglot Tinkerer • Lifelong Curious Soul
                    </p>
                  </div>
                </div>

                {/* Right Column: Visual Punchy Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Card 1: Core Trait */}
                  <div
                    className="interactive-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={16} color="#f59e0b" />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        DNA: Rasa Penasaran Tak Terbatas
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.5 }}>
                      Bagi saya, hal paling menyenangkan di dunia ini adalah <strong>menemukan sesuatu yang belum saya mengerti, lalu membongkarnya sampai paham</strong>. Mulai dari distributed systems, smart contracts, AI agent orchestration, hingga liquidation di crypto ratusan juta.
                    </p>
                  </div>

                  {/* Card 2: Interactive Dopamine Loop */}
                  <div
                    className="interactive-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--folio-ink)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <RefreshCw size={14} color="#3b82f6" />
                        Siklus Eksplorasi (Continuous Dopamine Loop)
                      </span>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>4 TAHAPAN</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--surface-sunken)', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', marginBottom: '2px' }}>🔍</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--folio-ink)' }}>1. Penasaran</div>
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>Spot new tech</div>
                      </div>
                      <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--surface-sunken)', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', marginBottom: '2px' }}>⚡</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>2. Deep Dive</div>
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>Ulik habis</div>
                      </div>
                      <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--surface-sunken)', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', marginBottom: '2px' }}>🛠️</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>3. Bangun</div>
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>Build prototype</div>
                      </div>
                      <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--surface-sunken)', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', marginBottom: '2px' }}>🚀</div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#8b5cf6' }}>4. Bagikan</div>
                        <div style={{ fontSize: '9.5px', color: 'var(--ink-muted)' }}>Share & repeat</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Quick Quote Badge */}
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: 'rgba(245, 158, 11, 0.08)',
                      border: '1px dashed rgba(245, 158, 11, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <Zap size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--ink-body)' }}>
                      "Keahlian terbaik seorang engineer bukan hafal satu framework, tapi keberanian untuk merasa bodoh lagi saat mempelajari hal baru."
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1 (Chapter 02): Belajar Hal Baru: Terpikat Kripto hingga Terjebak Ilusi Cepat Kaya */}
          {safeSlideIndex === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Visual Candlestick & Rollercoaster Simulation Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(239, 68, 68, 0.1) 100%)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={16} color="#f59e0b" />
                    </div>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.8px' }}>
                      THE PSYCHOLOGICAL ROLLERCOASTER
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                      Euphoria Pump (+280%)
                    </span>
                    <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                      Fatal Wick (-100%)
                    </span>
                  </div>
                </div>

                {/* Candlestick & Rollercoaster Visualizer */}
                <div
                  style={{
                    height: '110px',
                    background: 'rgba(5, 5, 8, 0.65)',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* SVG Curve Background */}
                  <svg
                    viewBox="0 0 800 90"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25, pointerEvents: 'none' }}
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0,65 Q 150,60 250,20 T 450,15 T 600,10 L 680,85 L 800,85"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>

                  {/* Step 1 Visual Node */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                    <div style={{ height: '32px', width: '8px', background: '#3b82f6', borderRadius: '3px', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '-6px', left: '3px', width: '2px', height: '44px', background: '#3b82f6', opacity: 0.6 }}></div>
                    </div>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#3b82f6', fontWeight: 700 }}>Curiosity</span>
                    <span style={{ fontSize: '9px', color: 'var(--ink-muted)' }}>Belajar Web3</span>
                  </div>

                  {/* Arrow connector */}
                  <ArrowRight size={14} color="var(--ink-faint)" />

                  {/* Step 2 Visual Node (Green Pump) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                    <div
                      style={{
                        height: '56px',
                        width: '12px',
                        background: '#10b981',
                        borderRadius: '3px',
                        position: 'relative',
                        boxShadow: '0 0 14px rgba(16, 185, 129, 0.6)',
                        animation: 'candlePump 2s ease-in-out infinite alternate'
                      }}
                    >
                      <div style={{ position: 'absolute', top: '-10px', left: '5px', width: '2px', height: '76px', background: '#10b981' }}></div>
                    </div>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#10b981', fontWeight: 800 }}>+280% PROFIT</span>
                    <span style={{ fontSize: '9px', color: '#10b981' }}>Dopamine Spike</span>
                  </div>

                  {/* Arrow connector */}
                  <ArrowRight size={14} color="var(--ink-faint)" />

                  {/* Step 3 Visual Node (Leverage 50x) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                    <div
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: 'rgba(245, 158, 11, 0.2)',
                        border: '1px solid #f59e0b',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        animation: 'pulseBorder 2.5s infinite ease-in-out'
                      }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>50x LEVERAGE</span>
                      <span style={{ fontSize: '8.5px', color: 'var(--ink-body)' }}>"Mau Cepat Kaya"</span>
                    </div>
                    <span style={{ fontSize: '9px', color: '#f59e0b' }}>The Greed Trap</span>
                  </div>

                  {/* Arrow connector */}
                  <ArrowRight size={14} color="#ef4444" />

                  {/* Step 4 Visual Node (Fatal Red Wick Dump) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                    <div
                      style={{
                        height: '62px',
                        width: '12px',
                        background: '#ef4444',
                        borderRadius: '3px',
                        position: 'relative',
                        boxShadow: '0 0 18px rgba(239, 68, 68, 0.8)',
                        animation: 'wickFlicker 1.8s infinite ease-in-out'
                      }}
                    >
                      <div style={{ position: 'absolute', top: '-14px', left: '5px', width: '2px', height: '90px', background: '#ef4444' }}></div>
                    </div>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#ef4444', fontWeight: 800 }}>-100% MARGIN CALL</span>
                    <span style={{ fontSize: '9px', color: '#ef4444' }}>💥 Saldo Lenyap</span>
                  </div>
                </div>
              </div>

              {/* 4 Cards Grid with Personal Storytelling */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px'
                }}
              >
                {/* Step 1 */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#3b82f6', fontWeight: 700 }}>STAGE 01</span>
                    <span style={{ fontSize: '16px' }}>🌱</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>Curiosity & Web3</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Bermula dari rasa penasaran: mengulik smart contracts, desentralisasi, dan teknologi blockchain. Murni eksplorasi tech.
                  </p>
                </div>

                {/* Step 2 */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#10b981', fontWeight: 700 }}>STAGE 02</span>
                    <span style={{ fontSize: '16px' }}>🤑</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>First Euphoria</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Merasakan cuan cepat beberapa kali lipat. Otak langsung terkena bias: <em>"Ternyata cari uang di market itu mudah!"</em> Cek chart tiap 3 menit.
                  </p>
                </div>

                {/* Step 3 */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700 }}>STAGE 03</span>
                    <span style={{ fontSize: '16px' }}>🎰</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#f59e0b' }}>Ilusi Ingin Cepat Kaya</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Profit puluhan persen terasa lambat. Beralih ke Binance Futures, naikin leverage 20x sampai 50x. Berkhayal minggu depan beli mobil baru.
                  </p>
                </div>

                {/* Step 4 */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1.5px solid rgba(239, 68, 68, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    animation: 'pulseRed 4s infinite ease-in-out'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#ef4444', fontWeight: 700 }}>STAGE 04</span>
                    <span style={{ fontSize: '16px' }}>💥</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444' }}>The Fatal Wick</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Satu sumbu candle merah panjang menusuk stop loss. Saldo margin tersedot habis hingga $0.00 dalam hitungan detik.
                  </p>
                </div>
              </div>

              {/* Takeaway Insight Banner with Dramatic Transition */}
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <AlertTriangle size={20} color="#ef4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.45 }}>
                  <strong>Alarm Jam 3 Pagi:</strong> Notifikasi email Binance berbunyi di saat tidur pulas... membawa saya langsung ke kuliah termahal seharga <strong>-100 Juta Rupiah</strong> di slide berikutnya.
                </span>
              </div>
            </div>
          )}

          {/* SLIDE 2 (Chapter 03): Kuliah Termahal: Bad Experience & Likuidasi Ratusan Juta (Haha!) */}
          {safeSlideIndex === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '18px',
                  alignItems: 'stretch'
                }}
              >
                {/* Left: Authentic Evidence Image */}
                <div
                  className="interactive-card"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--surface-card-subtle)',
                    border: '1.5px solid rgba(239, 68, 68, 0.45)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'pulseRed 4s infinite ease-in-out'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: '#090d16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setPreviewImage(marginCallImg || './margin-call-history.png')}
                    title="Klik untuk melihat bukti otentik email likuidasi"
                  >
                    <img
                      src={marginCallImg || './margin-call-history.png'}
                      onError={(e) => {
                        if (e.currentTarget.src.indexOf('/assets/') === -1) {
                          e.currentTarget.src = './assets/margin-call-history.png';
                        }
                      }}
                      alt="Bukti Otentik Riwayat Likuidasi Margin Call Binance"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <ShieldAlert size={13} />
                      <span>BUKTI OTENTIK (REAL EVIDENCE)</span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <ZoomIn size={12} color="#ef4444" />
                      <span>Zoom Bukti</span>
                    </div>
                  </div>

                  <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444' }}>
                      Binance Futures Liquidation Call Notification
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>
                      Total kerugian kumulatif menembus angka <strong>-100 Juta Rupiah</strong> (Haha!).
                    </span>
                  </div>
                </div>

                {/* Right: 3 Visual Takeaways */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div
                    className="interactive-card"
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#f59e0b' }}>
                        1. Matematika Kejam Drawdown
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.4 }}>
                      Rugi 50% butuh profit 100% hanya untuk kembali impas. Rugi 90% butuh profit 900%. Sekali terkena likuidasi total (100%), modal menjadi nol selamanya.
                    </span>
                  </div>

                  <div
                    className="interactive-card"
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#ef4444' }}>
                        2. Leverage Mengamplifikasi Ego, Bukan Skill
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.4 }}>
                      Leverage tinggi tidak pernah membuat seorang trader lebih pintar; ia hanya mempercepat datangnya kehancuran saat ego menolak memotong kerugian (cut loss).
                    </span>
                  </div>

                  <div
                    className="interactive-card"
                    style={{
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#10b981' }}>
                        3. Titik Balik Menuju Risk Manager
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.4 }}>
                      Dari spekulan ceroboh menjadi praktisi yang menaruh <strong>manajemen risiko di atas segalanya</strong>. Pelajaran ini terbawa langsung ke cara saya merancang arsitektur sistem backend hari ini.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3 (Chapter 04): Mengenal AI Agent: LLM + Harness + Execution Tools & Vibe Coding */}
          {safeSlideIndex === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Equation Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.15))',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={16} color="#8b5cf6" />
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8b5cf6', fontWeight: 800, letterSpacing: '0.8px' }}>
                    THE REAL AGENTIC FORMULA
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: 'var(--folio-ink)',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: 1.4,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{ color: '#3b82f6', background: 'rgba(59, 130, 246, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>LLM (Reasoner)</span>
                  <span>+</span>
                  <span style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>Harness (Context & Loop)</span>
                  <span>+</span>
                  <span style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>Execution Tools (CLI / APIs)</span>
                  <span>=</span>
                  <span style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>Autonomous Agent</span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                  AI Agent bukan sekadar text prompt satu arah. Agent adalah sistem otonom berlapis yang berpikir, mengambil keputusan, dan mengeksekusi aksi nyata di komputer.
                </span>
              </div>

              {/* 3 Pillars of AI Agent Architecture */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Pillar 1: LLM */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={18} color="#3b82f6" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    1. The LLM (Cognitive Brain)
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Sebagai mesin penalaran (reasoner) tingkat tinggi. Menganalisis masalah rumit, menyusun rencana langkah demi langkah, dan mengevaluasi hasil tanpa langsung terjebak eksekusi mentah.
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: '#3b82f6', fontWeight: 600 }}>Reasoning</span>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Planning</span>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Reflection</span>
                  </div>
                </div>

                {/* Pillar 2: Harness */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    animation: 'pulsePurple 5s infinite ease-in-out'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Layers size={18} color="#8b5cf6" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#8b5cf6' }}>
                    2. The Harness (Middleware & Loop)
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Jantung dari sistem agentic: mengelola siklus putaran (Plan ➔ Act ➔ Observe ➔ Adjust), context window, persistent state, guardrails keamanan, serta orchestrasi memori antar task.
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6', fontWeight: 600 }}>State Machine Loop</span>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Context Engine</span>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Guardrails</span>
                  </div>
                </div>

                {/* Pillar 3: Execution Tools & Vibe Coding */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Terminal size={18} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    3. Execution Tools & Vibe Coding
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                    Tangan & mata sang agent di dunia nyata: eksekusi shell, compile test, manipulasi file, dan API calls. Ini melahirkan era <strong>Vibe Coding</strong> — memprogram lewat orkestrasi tools secara otonom.
                  </p>
                  <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 600 }}>Vibe Coding</span>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Shell & FS Tools</span>
                    <span style={{ fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Autonomous Execution</span>
                  </div>
                </div>
              </div>

              {/* Vibe Coding Insight Card */}
              <div
                style={{
                  padding: '14px 20px',
                  borderRadius: '14px',
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px dashed rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Sparkles size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '12.5px', color: 'var(--ink-body)', fontStyle: 'italic' }}>
                  "Vibe coding bersama autonomous agent mengubah peran engineer: kita berfokus pada arsitektur, boundary, dan visi produk, sementara harness dan execution tools mengeksekusi implementasi secara presisi."
                </span>
              </div>
            </div>
          )}

          {/* SLIDE 4 (Chapter 05): Buah Rasa Ingin Tahu: Juara 1 Stacks Bitcoin & Instruktur Java Ladies */}
          {safeSlideIndex === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '20px',
                  alignItems: 'stretch'
                }}
              >
                {/* Milestone 1: Juara 1 Stacks Bitcoin Developer Challenge */}
                <div
                  className="interactive-card"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--surface-card-subtle)',
                    border: '1.5px solid rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    animation: 'pulseBorder 5s infinite ease-in-out'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: '#090d16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setPreviewImage(stacksWinnerImg || './stacks-bitcoin-winner.jpg')}
                    title="Klik untuk memperbesar sertifikat Juara 1 Stacks Bitcoin"
                  >
                    <img
                      src={stacksWinnerImg || './stacks-bitcoin-winner.jpg'}
                      onError={(e) => {
                        if (e.currentTarget.src.indexOf('/assets/') === -1) {
                          e.currentTarget.src = './assets/stacks-bitcoin-winner.jpg';
                        }
                      }}
                      alt="1st Winner Build on Bitcoin Developer Challenge by Stacks Indonesia"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        color: '#000000',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
                      }}
                    >
                      <Trophy size={13} />
                      <span>JUARA 1 (1ST WINNER)</span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <ZoomIn size={12} color="#f59e0b" />
                      <span>Zoom Sertifikat</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Build on Bitcoin Challenge by Stacks
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.5 }}>
                      Berawal dari rasa penasaran: <em>"Gimana caranya smart contract bisa jalan dengan keamanan Bitcoin?"</em> Saya pelajari Clarity language dari nol, ikut hackathon, dan alhamdulillah <strong>berhasil meraih Juara 1</strong>!
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '8px' }}>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontWeight: 600 }}>₿ Bitcoin Layer 2</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Clarity Smart Contracts</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Hackathon Champion</span>
                    </div>
                  </div>
                </div>

                {/* Milestone 2: Instruktur Java Ladies */}
                <div
                  className="interactive-card"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--surface-card-subtle)',
                    border: '1.5px solid rgba(139, 92, 246, 0.4)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                      cursor: 'zoom-in',
                      background: '#090d16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={() => setPreviewImage(instructorImg || './instructor-java-ladies.jpg')}
                    title="Klik untuk memperbesar foto Instruktur Java Ladies"
                  >
                    <img
                      src={instructorImg || './instructor-java-ladies.jpg'}
                      onError={(e) => {
                        if (e.currentTarget.src.indexOf('/assets/') === -1) {
                          e.currentTarget.src = './assets/instructor-java-ladies.jpg';
                        }
                      }}
                      alt="Instructor Java Ladies Community Mentorship"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        boxShadow: '0 4px 12px rgba(236, 72, 153, 0.4)'
                      }}
                    >
                      <GraduationCap size={13} />
                      <span>COMMUNITY MENTOR</span>
                    </div>

                    <div
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '12px',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <ZoomIn size={12} color="#ec4899" />
                      <span>Zoom Foto</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Diminta Jadi Instruktur Java Ladies (Haha!)
                      </span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.5 }}>
                      Karena suka mencoba hal baru dan aktif sharing seputar Java backend, saya tiba-tiba diajak mengajar para programmer perempuan di <strong>Java Ladies</strong>. Pengalaman unik dan sangat seru melatih empati mengajar!
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '8px' }}>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899', fontWeight: 600 }}>☕ Java Programming</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Women in Tech Mentorship</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>Hands-on Workshop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5 (Chapter 06): The Explorer Spirit: Tempat Baru, Stoikisme & Compounding */}
          {safeSlideIndex === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Top Grid: Nomad + Stoikisme on Left, Compounding Graph on Right */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px',
                  alignItems: 'stretch'
                }}
              >
                {/* Left Column: Nomad Spirit & Stoikisme Matrix */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Nomadic Spirit Card */}
                  <div
                    className="interactive-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Compass size={17} color="#f59e0b" />
                        </div>
                        <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                          Mencoba Tempat Baru (Nomadic Spirit)
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          padding: '3px 8px',
                          borderRadius: '999px',
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: '#f59e0b',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b', animation: 'radarPing 2s infinite' }}></span>
                        CAFE HOPPER
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.45 }}>
                      Pikiran tidak boleh terkurung di 4 dinding yang sama. Mencoba cafe, coworking, atau spot kerja baru setiap minggu memicu dopamin perspektif segar dan mencegah kejenuhan berpikir (*burnout*).
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '6px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>☕ Cafe Hopper</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '6px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>🏙️ Coworking Hub</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '6px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>🍵 Warkop Deep Work</span>
                      <span style={{ fontSize: '10.5px', padding: '3px 8px', borderRadius: '6px', background: 'var(--surface-sunken)', color: 'var(--ink-body)' }}>🎧 Ambient Explorer</span>
                    </div>
                  </div>

                  {/* Stoikisme Dikotomi Kendali Matrix */}
                  <div
                    className="interactive-card"
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'var(--surface-card-subtle)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={17} color="#3b82f6" />
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Stoikisme Seneca: Dikotomi Kendali
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {/* Out of Control */}
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(239, 68, 68, 0.08)',
                          border: '1px solid rgba(239, 68, 68, 0.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                      >
                        <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
                          ✕ DI LUAR KENDALI
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--ink-muted)', lineHeight: 1.35 }}>
                          Volatilitas market, crypto crash, down pihak ketiga, dan opini orang lain.
                        </span>
                      </div>

                      {/* In Control */}
                      <div
                        style={{
                          padding: '10px 12px',
                          borderRadius: '10px',
                          background: 'rgba(16, 185, 129, 0.08)',
                          border: '1px solid rgba(16, 185, 129, 0.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                      >
                        <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                          ✓ 100% DI DALAM KENDALI
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--ink-body)', lineHeight: 1.35 }}>
                          Jam terbang belajar, disiplin risiko, ketenangan respon mental, dan baris kode kita.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Compounding Growth Visualizer */}
                <div
                  className="interactive-card"
                  style={{
                    padding: '18px',
                    borderRadius: '18px',
                    background: 'var(--surface-card-subtle)',
                    border: '1.5px solid rgba(16, 185, 129, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                    animation: 'pulseGreen 5s infinite ease-in-out'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={18} color="#10b981" />
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Compounding 1% Setiap Hari
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#10b981' }}>
                      1.01³⁶⁵ = 37.8x
                    </span>
                  </div>

                  {/* SVG Exponential Growth Curve */}
                  <div
                    style={{
                      height: '130px',
                      background: 'rgba(5, 5, 8, 0.65)',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      position: 'relative',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden'
                    }}
                  >
                    <svg
                      viewBox="0 0 300 100"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                      preserveAspectRatio="none"
                    >
                      {/* Baseline 1.00^365 = 1.0 */}
                      <line x1="20" y1="65" x2="280" y2="65" stroke="var(--card-border)" strokeWidth="1.5" strokeDasharray="3 3" />
                      
                      {/* Decay curve 0.99^365 = 0.03 */}
                      <path d="M 20,65 Q 120,67 280,88" fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" />

                      {/* Growth curve 1.01^365 = 37.8 */}
                      <path
                        d="M 20,65 Q 180,60 280,12"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))' }}
                      />
                    </svg>

                    {/* Value Labels */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                        +3,780% KEMAJUAN (37.8x)
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 1, fontSize: '9.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                      <span>Hari ke-1 (Mulai Eksplorasi)</span>
                      <span style={{ color: '#ef4444' }}>0.99³⁶⁵ = 0.03x</span>
                      <span>Hari ke-365 (Lompatan Besar)</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.45 }}>
                    Jangan pernah meremehkan eksperimen 1 jam setiap malam. Dalam 365 hari, akumulasi belajar hal baru melahirkan lompatan eksponensial dalam hidup dan keahlian kita.
                  </p>
                </div>
              </div>

              {/* Food for Thought: Mengapa Peradaban Selalu Bergerak dari Rasa Penasaran? */}
              <div
                className="interactive-card"
                style={{
                  padding: '18px 22px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(245, 158, 11, 0.08) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Globe size={18} color="#8b5cf6" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Food for Thought: Mengapa Peradaban Bergerak dari Rasa Penasaran?
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                        Refleksi Eksistensial: Hal-hal yang dulu mustahil, kini menjadi mungkin karena manusia yang menolak berhenti belajar.
                      </span>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono)',
                      padding: '3px 9px',
                      borderRadius: '999px',
                      background: 'rgba(139, 92, 246, 0.15)',
                      color: '#8b5cf6',
                      fontWeight: 700
                    }}
                  >
                    THE CIVILIZATION ENGINE
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '12px'
                  }}
                >
                  {/* Pillar 1: Dari Mustahil Menjadi Nyata */}
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Rocket size={14} color="#f59e0b" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>
                        Dari Mustahil Menjadi Nyata
                      </span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.45 }}>
                      Manusia tidak punya sayap, tapi kini kita melintasi benua di atas awan. Komputer dulunya sebesar gedung, kini miliaran transistor ada di saku kita. Semua mukjizat teknologi ini berawal dari orang-orang yang berani mencoba hal baru yang pada zamannya ditertawakan.
                    </p>
                  </div>

                  {/* Pillar 2: Mesin Penggerak Zaman */}
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lightbulb size={14} color="#10b981" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>
                        Mesin Penggerak Zaman
                      </span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.45 }}>
                      Peradaban tidak pernah dimajukan oleh orang-orang yang merasa sudah tahu segalanya atau puas dengan status quo. Peradaban selalu melonjak setiap kali ada orang yang rela merasa bodoh lagi demi mencari jawaban atas satu pertanyaan sederhana: <em>"Bagaimana jika...?"</em>
                    </p>
                  </div>

                  {/* Pillar 3: Sepenting Apa Bagi Diri Kita? */}
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Brain size={14} color="#3b82f6" />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6' }}>
                        Sepenting Apa Bagi Diri Kita?
                      </span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', margin: 0, lineHeight: 1.45 }}>
                      Belajar hal baru bukan sekadar soal karir atau menaikkan gaji — ini adalah cara kita menjaga api kesadaran di dalam kepala. Hari ketika kita berhenti penasaran dan menolak mencoba hal baru adalah hari ketika kita memutuskan untuk berhenti berevolusi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Closing Manifesto */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(139, 92, 246, 0.12))',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    "Tetaplah penasaran, berani gagal, dan nikmati setiap baris perjalanan."
                  </span>
                  <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>
                    — Muhamad Rifai (Rifai Martin)
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => { soundFx.playCardClick(); setCurrentSlide(0); }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: 'var(--folio-ink)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Mulai Ulang (Slide 1)</span>
                  </button>
                  <button
                    onClick={handleClose}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: '#f59e0b',
                      border: 'none',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#000000',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Selesai Menyimak</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Bar */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isFullscreen ? '14px 40px' : '12px 24px',
            borderTop: '1px solid var(--card-border)',
            background: 'var(--surface-card-subtle)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
              SLIDE {safeSlideIndex + 1} / {CHAPTERS.length}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>• Gunakan [Space] atau [Panah]</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrev}
              disabled={safeSlideIndex === 0}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--card-border)',
                color: safeSlideIndex === 0 ? 'var(--ink-faint)' : 'var(--ink-body)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: safeSlideIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={14} />
              <span>Prev</span>
            </button>

            <button
              onClick={handleNext}
              disabled={safeSlideIndex === CHAPTERS.length - 1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 16px',
                borderRadius: '8px',
                background: safeSlideIndex === CHAPTERS.length - 1 ? 'var(--surface-sunken)' : '#f59e0b',
                border: 'none',
                color: safeSlideIndex === CHAPTERS.length - 1 ? 'var(--ink-faint)' : '#000000',
                fontSize: '12px',
                fontWeight: 700,
                cursor: safeSlideIndex === CHAPTERS.length - 1 ? 'not-allowed' : 'pointer',
                boxShadow: safeSlideIndex === CHAPTERS.length - 1 ? 'none' : '0 2px 8px rgba(245, 158, 11, 0.35)'
              }}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </footer>
      </div>

      {/* Fullscreen Image Preview Lightbox */}
      {previewImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out'
          }}
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview Evidence"
            style={{
              maxWidth: '92vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
            }}
          />
        </div>
      )}
    </div>
  );
}
