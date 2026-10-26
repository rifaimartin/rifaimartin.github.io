import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2, 
  TrendingUp, TrendingDown, ShieldAlert, AlertTriangle, CheckCircle2, 
  Flame, RefreshCw, ZoomIn, Sparkles, Award, Cpu, BookOpen, 
  Compass, ArrowRight, DollarSign, Activity, Percent, Code2, 
  Terminal, Brain, Heart, Layers, Bot, Wand2, MapPin, Coffee, Rocket, Globe, Zap,
  Users, Trophy, GraduationCap, Lightbulb, ExternalLink
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
    badge: 'THE CURIOUS BUILDER',
    title: 'Halo, Saya Rifai: Suka Mencoba & Belajar Hal Baru',
    subtitle: 'Mengenal saya di balik terminal: bukan tentang menjadi yang terpintar, melainkan tentang rasa penasaran tak terbatas, gairah mengulik hal baru, dan dorongan untuk terus berevolusi.'
  },
  {
    id: 'curiosity-milestones',
    number: '02',
    badge: 'CURIOSITY MILESTONES',
    title: 'Buah Rasa Ingin Tahu: Juara 1 Stacks Bitcoin & Instruktur Java Ladies',
    subtitle: 'Ketika hobi belajar hal baru membawa hasil tak terduga: dari memenangkan kompetisi developer Bitcoin, hingga diminta jadi instruktur komunitas Java Ladies.'
  },
  {
    id: 'crypto-ambition',
    number: '03',
    badge: 'THE GREED ILLUSION',
    title: 'Kelinci Lubang Kripto: Dari Ingin Tahu ke Ilusi Cepat Kaya',
    subtitle: 'Ketika rasa penasaran blockchain bergeser menjadi obsesi instan: volatilitas 24/7, ilusi cepat kaya dalam semalam, dan bahaya leverage yang mengaburkan akal sehat.'
  },
  {
    id: 'margin-call-crucible',
    number: '04',
    badge: 'THE -100M CRUCIBLE',
    title: 'Kuliah Termahal: Riwayat Likuidasi Binance Futures -100 Juta',
    subtitle: 'Bukti otentik email likuidasi: Menghadapi kehancuran modal, matematika kejam drawdown, dan titik balik dari spekulan menuju risk manager yang disiplin.'
  },
  {
    id: 'simulator',
    number: '05',
    badge: 'INTERACTIVE LAB',
    title: 'Futures & Leverage Lab: Simulasi Kalkulator Rupiah (BTC, ETH, HBAR, SOL)',
    subtitle: 'Eksplorasi interaktif bagaimana leverage melipatgandakan profit sekaligus mempersempit batas likuidasi hingga melenyapkan modal dalam hitungan detik.'
  },
  {
    id: 'vibe-coding-nemo',
    number: '06',
    badge: 'THE AI RENAISSANCE',
    title: 'Jatuh Cinta pada Vibe Coding: Hingga Melahirkan Nemo 🐙',
    subtitle: 'Dari luka pasar kembali ke gairah murni membangun: era vibe coding dengan generative AI, flow state tanpa hambatan, dan lahirnya personal AI agent Nemo.'
  },
  {
    id: 'explorer-manifesto',
    number: '07',
    badge: 'EXPLORER & STOIC',
    title: 'The Explorer Spirit: Tempat Baru, Stoikisme & Compounding 1%',
    subtitle: 'Eksplorasi tempat kerja & suasana baru, kedamaian lewat dikotomi kendali Seneca, dan filosofi bertumbuh 1% setiap hari.'
  }
];

const ASSETS = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC/USDT', icon: '₿', color: '#f7931a', defaultPrice: 1500000000 },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH/USDT', icon: 'Ξ', color: '#627eea', defaultPrice: 55000000 },
  { id: 'HBAR', name: 'Hedera', symbol: 'HBAR/USDT', icon: 'ℏ', color: '#00a3e0', defaultPrice: 3200 },
  { id: 'SOL', name: 'Solana', symbol: 'SOL/USDT', icon: '◎', color: '#14f195', defaultPrice: 3100000 }
];

const formatIDR = (num) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(num);
};

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

  // Simulator State
  const [selectedAsset, setSelectedAsset] = useState(ASSETS[0]);
  const [initialMargin, setInitialMargin] = useState(10000000); // 10 Juta Rupiah
  const [leverage, setLeverage] = useState(10); // 10x
  const [positionType, setPositionType] = useState('LONG'); // 'LONG' | 'SHORT'
  const [priceChangePercent, setPriceChangePercent] = useState(5); // +5%

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

  // Simulator Calculation Logic
  const positionMultiplier = positionType === 'LONG' ? 1 : -1;
  const rawRoePercent = priceChangePercent * leverage * positionMultiplier;
  const isLiquidated = rawRoePercent <= -100;
  const roePercent = isLiquidated ? -100 : rawRoePercent;
  const totalPositionSize = initialMargin * leverage;
  const pnlIDR = isLiquidated ? -initialMargin : initialMargin * (roePercent / 100);
  const finalEquity = Math.max(0, initialMargin + pnlIDR);
  const liquidationBufferPercent = 100 / leverage;

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

          {/* SLIDE 1: Buah Rasa Ingin Tahu: Juara 1 Stacks Bitcoin & Instruktur Java Ladies */}
          {safeSlideIndex === 1 && (
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

          {/* SLIDE 2: Kelinci Lubang Kripto: Dari Ingin Tahu ke Ilusi Cepat Kaya */}
          {safeSlideIndex === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Visual 4-Stage Mindset Trap */}
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
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Mulai dari eksplorasi smart contract, desentralisasi, dan teknologi blockchain yang revolusioner.
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
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Merasakan profit cepat 2x lipat. Otak mulai meyakini: <em>"Ternyata cari uang di market itu mudah!"</em>
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
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#f59e0b' }}>The Greed Trap</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Keinginan cepat kaya mendominasi. Mulai membuka posisi Futures dengan leverage 20x hingga 50x.
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
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444' }}>The Margin Call</div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Satu sumbu candle berlawanan arah. Saldo margin terhapus bersih dalam hitungan detik.
                  </p>
                </div>
              </div>

              {/* Takeaway Insight Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'var(--surface-card-subtle)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertTriangle size={20} color="#f59e0b" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Pelajaran Psikologis: Ilusi Superioritas Trader Pemula
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.4 }}>
                    Market selalu memberikan keuntungan di awal untuk membuat kita merasa jenius, sebelum akhirnya mengambil semuanya ketika kita menaikkan taruhan karena rasa serakah.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Kuliah Termahal: Riwayat Likuidasi Binance Futures -100 Juta */}
          {safeSlideIndex === 3 && (
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
                      Total kerugian kumulatif menembus angka <strong>-100 Juta Rupiah</strong>.
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
                      Dari spekulan ceroboh menjadi praktisi yang menaruh <strong>manajemen risiko di atas segalanya</strong>. Pelajaran ini terbawa ke cara saya merancang arsitektur sistem backend hari ini.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Futures & Leverage Lab: Simulasi Kalkulator Rupiah */}
          {safeSlideIndex === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Asset Selector Chips */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginRight: '4px' }}>
                  PILIH ASET:
                </span>
                {ASSETS.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      soundFx.playCardClick();
                      setSelectedAsset(asset);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: selectedAsset.id === asset.id ? 'var(--surface-sunken)' : 'transparent',
                      border: selectedAsset.id === asset.id ? `1.5px solid ${asset.color}` : '1px solid var(--card-border)',
                      color: selectedAsset.id === asset.id ? asset.color : 'var(--ink-body)',
                      fontWeight: selectedAsset.id === asset.id ? 700 : 500,
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{asset.icon}</span>
                    <span>{asset.name}</span>
                  </button>
                ))}
              </div>

              {/* Simulator Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '18px'
                }}
              >
                {/* Control Panel */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Parameter Posisi Futures
                  </span>

                  {/* Margin Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Modal Margin Awal:</span>
                      <span style={{ fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>{formatIDR(initialMargin)}</span>
                    </div>
                    <input
                      type="range"
                      min="1000000"
                      max="50000000"
                      step="1000000"
                      value={initialMargin}
                      onChange={(e) => setInitialMargin(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
                    />
                  </div>

                  {/* Leverage Input */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Leverage Pengali:</span>
                      <span style={{ fontWeight: 800, color: leverage > 20 ? '#ef4444' : '#f59e0b', fontFamily: 'var(--font-mono)' }}>{leverage}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      style={{ width: '100%', accentColor: leverage > 20 ? '#ef4444' : '#f59e0b', cursor: 'pointer' }}
                    />
                  </div>

                  {/* Position Type Selector */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => { soundFx.playCardClick(); setPositionType('LONG'); }}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        background: positionType === 'LONG' ? 'rgba(16, 185, 129, 0.2)' : 'var(--surface-sunken)',
                        border: positionType === 'LONG' ? '1.5px solid #10b981' : '1px solid var(--card-border)',
                        color: positionType === 'LONG' ? '#10b981' : 'var(--ink-muted)',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      🟢 LONG (Beli / Bullish)
                    </button>
                    <button
                      onClick={() => { soundFx.playCardClick(); setPositionType('SHORT'); }}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        background: positionType === 'SHORT' ? 'rgba(239, 68, 68, 0.2)' : 'var(--surface-sunken)',
                        border: positionType === 'SHORT' ? '1.5px solid #ef4444' : '1px solid var(--card-border)',
                        color: positionType === 'SHORT' ? '#ef4444' : 'var(--ink-muted)',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      🔴 SHORT (Jual / Bearish)
                    </button>
                  </div>

                  {/* Price Move Slider */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                      <span style={{ color: 'var(--ink-muted)' }}>Pergerakan Harga Pasar:</span>
                      <span style={{ fontWeight: 800, color: priceChangePercent >= 0 ? '#10b981' : '#ef4444', fontFamily: 'var(--font-mono)' }}>
                        {priceChangePercent >= 0 ? `+${priceChangePercent}%` : `${priceChangePercent}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      step="0.5"
                      value={priceChangePercent}
                      onChange={(e) => setPriceChangePercent(Number(e.target.value))}
                      style={{ width: '100%', accentColor: priceChangePercent >= 0 ? '#10b981' : '#ef4444', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: isLiquidated ? 'rgba(239, 68, 68, 0.08)' : 'var(--surface-card-subtle)',
                    border: isLiquidated ? '1.5px solid rgba(239, 68, 68, 0.6)' : '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                      Hasil Simulasi PnL (Rupiah)
                    </span>
                    {isLiquidated && (
                      <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', background: '#ef4444', color: '#fff' }}>
                        💥 TERLIKUIDASI (-100%)
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Ukuran Posisi:</span>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)', fontFamily: 'var(--font-mono)' }}>
                        {formatIDR(totalPositionSize)}
                      </div>
                    </div>

                    <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>ROE (% Profit/Loss):</span>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: roePercent >= 0 ? '#10b981' : '#ef4444', fontFamily: 'var(--font-mono)' }}>
                        {roePercent >= 0 ? `+${roePercent.toFixed(1)}%` : `${roePercent.toFixed(1)}%`}
                      </div>
                    </div>

                    <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Untung / Rugi Bersih:</span>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: pnlIDR >= 0 ? '#10b981' : '#ef4444', fontFamily: 'var(--font-mono)' }}>
                        {formatIDR(pnlIDR)}
                      </div>
                    </div>

                    <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Sisa Modal:</span>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: finalEquity > 0 ? '#10b981' : '#ef4444', fontFamily: 'var(--font-mono)' }}>
                        {formatIDR(finalEquity)}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      fontSize: '11.5px',
                      color: 'var(--ink-body)'
                    }}
                  >
                    ⚠️ Pada leverage <strong>{leverage}x</strong>, pergerakan harga berlawanan sebesar hanya <strong>{liquidationBufferPercent.toFixed(1)}%</strong> sudah cukup melenyapkan seluruh modal!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: Jatuh Cinta pada Vibe Coding: Hingga Melahirkan Nemo 🐙 */}
          {safeSlideIndex === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Pillar 1 */}
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
                    Flow State Tanpa Hambatan
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Dari mengetik boilerplate manual ke mengarahkan model AI sebagai perpanjangan pikiran. Kecepatan iterasi ide meningkat 10x lipat.
                  </p>
                </div>

                {/* Pillar 2 */}
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
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wand2 size={18} color="#8b5cf6" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Lahirnya Project Nemo 🐙
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Project Nemo lahir dari hasrat membangun AI personal agent yang mandiri: mampu meneliti, mengeksekusi script, dan menjadi partner diskusi cerdas.
                  </p>
                </div>

                {/* Pillar 3 */}
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
                    <Rocket size={18} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    The Art of Pure Creation
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Kembali ke hakikat membangun: menciptakan hal-hal yang bermanfaat, memecahkan masalah nyata, dan menikmati proses tanpa tekanan spekulasi.
                  </p>
                </div>
              </div>

              {/* Quote Card */}
              <div
                style={{
                  padding: '14px 20px',
                  borderRadius: '14px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px dashed rgba(139, 92, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Sparkles size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '12.5px', color: 'var(--ink-body)', fontStyle: 'italic' }}>
                  "Vibe coding bukan tentang malas coding, melainkan tentang membebaskan otak dari kelelahan sintaks sehingga bisa fokus 100% pada logika arsitektur dan visi produk."
                </span>
              </div>
            </div>
          )}

          {/* SLIDE 6: The Explorer Spirit: Tempat Baru, Stoikisme & Compounding */}
          {safeSlideIndex === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Spirit 1 */}
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
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Compass size={18} color="#f59e0b" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Mencoba Tempat Baru (Nomadic Spirit)
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Hobi berpindah cafe, coworking space baru, atau suasana kerja berbeda. Perubahan lingkungan visual memicu perspektif segar dan mencegah kejenuhan berpikir.
                  </p>
                </div>

                {/* Spirit 2 */}
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
                    <Heart size={18} color="#3b82f6" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Stoikisme: Dikotomi Kendali
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    Pelajaran Seneca: Kita tidak bisa mengontrol market atau opini orang lain, yang bisa kita kontrol adalah usaha, etika, dan reaksi kita terhadap ketidakpastian.
                  </p>
                </div>

                {/* Spirit 3 */}
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
                    <TrendingUp size={18} color="#10b981" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Compounding 1% Setiap Hari
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.4 }}>
                    1.01 pangkat 365 = <strong>37.8x</strong> kemajuan dalam 1 tahun. Belajar satu hal kecil setiap hari melahirkan lompatan besar di masa depan.
                  </p>
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
                    <RefreshCw size={12} />
                    <span>Ulangi Presentasi</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Keynote Controller Footer */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isFullscreen ? '16px 36px' : '12px 24px',
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
                padding: '6px 14px',
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

      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            background: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
            <img
              src={previewImage}
              onError={(e) => {
                if (typeof previewImage === 'string' && e.currentTarget.src.indexOf('/assets/') === -1) {
                  const cleaned = previewImage.replace(/^\.\//, '').replace(/^\//, '');
                  e.currentTarget.src = './assets/' + cleaned;
                }
              }}
              alt="High resolution preview"
              style={{
                maxWidth: '100%',
                maxHeight: '82vh',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)'
              }}
            />
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}>
              Klik di luar gambar atau tekan [Esc] untuk menutup
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
