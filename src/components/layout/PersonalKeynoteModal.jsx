import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2, 
  TrendingUp, TrendingDown, ShieldAlert, AlertTriangle, CheckCircle2, 
  Flame, RefreshCw, ZoomIn, Sparkles, Award, Cpu, BookOpen, 
  Compass, ArrowRight, DollarSign, Activity, Percent, Code2, 
  Terminal, Brain, Heart, Layers, Bot, Wand2, MapPin, Coffee, Rocket, Globe, Zap
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const CHAPTERS = [
  {
    id: 'intro-curiosity',
    number: '01',
    badge: 'THE INQUISITIVE MIND',
    title: 'The Perpetual Learner: Selalu Penasaran & Senang Belajar Hal Baru',
    subtitle: 'Mengenal Rifai Martin di balik terminal: bukan tentang menjadi yang terpintar, melainkan tentang rasa penasaran tak terbatas, hobi membongkar hal baru, dan dorongan untuk terus berevolusi.'
  },
  {
    id: 'crypto-ambition',
    number: '02',
    badge: 'THE GET-RICH ILLUSION',
    title: 'Masuk ke Dunia Kripto: Dari Rasa Ingin Tahu ke Obsesi Ingin Cepat Kaya',
    subtitle: 'Ketika hobi belajar hal baru membawa saya ke pasar blockchain: pesona volatilitas 24/7, ilusi cepat kaya dalam semalam, dan jebakan leverage yang mengikis logika.'
  },
  {
    id: 'margin-call-crucible',
    number: '03',
    badge: 'THE -100M CRUCIBLE',
    title: 'Kuliah Termahal: Riwayat Likuidasi Binance Futures -100 Juta',
    subtitle: 'Bukti otentik email margin call bear market 2022: Menghadapi kehancuran modal, matematika kejam drawdown, dan titik balik dari spekulan menuju disciplined risk manager.'
  },
  {
    id: 'simulator',
    number: '04',
    badge: 'INTERACTIVE LAB',
    title: 'Futures & Leverage Lab: Simulasi Kalkulator Rupiah (BTC, ETH, HBAR, SOL)',
    subtitle: 'Eksplorasi interaktif bagaimana leverage melipatgandakan profit sekaligus mempersempit batas likuidasi hingga melenyapkan modal dalam hitungan detik.'
  },
  {
    id: 'vibe-coding-nemo',
    number: '05',
    badge: 'THE AI RENAISSANCE',
    title: 'Jatuh Cinta pada Vibe Coding: Hingga Melahirkan Nemo 🐙',
    subtitle: 'Dari luka pasar kembali ke gairah murni membangun perangkat lunak: era vibe coding dengan generative AI, coding dalam kondisi flow, dan kelahiran project Nemo.'
  },
  {
    id: 'explorer-manifesto',
    number: '06',
    badge: 'WANDERING & LIFE MASTERY',
    title: 'The Explorer Spirit: Mencoba Tempat Baru, Stoikisme & Compounding',
    subtitle: 'Hidup sebagai penjelajah tanpa henti: eksplorasi tempat kerja & petualangan baru, damai dalam ketidakpastian lewat dikotomi kendali Seneca, dan bertumbuh 1% setiap hari.'
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
    document.addEventListener('MSFullscreenChange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    soundFx.playCardClick();
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle failed:', err);
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
    if (currentSlide < CHAPTERS.length - 1) {
      soundFx.playCardClick();
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      soundFx.playCardClick();
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (idx) => {
    soundFx.playCardClick();
    setCurrentSlide(idx);
  };

  // Simulator Calculation Logic
  const positionMultiplier = positionType === 'LONG' ? 1 : -1;
  const rawRoePercent = priceChangePercent * leverage * positionMultiplier;
  const isLiquidated = rawRoePercent <= -100;
  const roePercent = isLiquidated ? -100 : rawRoePercent;
  const totalPositionSize = initialMargin * leverage;
  const pnlIDR = isLiquidated ? -initialMargin : initialMargin * (roePercent / 100);
  const finalEquity = Math.max(0, initialMargin + pnlIDR);
  const liquidationBufferPercent = 100 / leverage; // Price move that causes 100% loss

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
              <span>{isFullscreen ? 'FULLSCREEN KEYNOTE' : 'KEYNOTE #02: PERSONAL ESSAY'}</span>
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
                  width: idx === currentSlide ? '36px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: idx === currentSlide ? '#f59e0b' : 'var(--card-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  padding: 0
                }}
                title={`Chapter ${idx + 1}: ${ch.title}`}
              />
            ))}
          </div>

          {/* Right Action Controls: Fullscreen & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleFullscreen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: isFullscreen ? 'rgba(245, 158, 11, 0.18)' : 'var(--surface-sunken)',
                color: isFullscreen ? '#f59e0b' : 'var(--folio-ink)',
                border: isFullscreen ? '1px solid #f59e0b' : '1px solid var(--card-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={isFullscreen ? 'Exit Fullscreen (Esc / F)' : 'Enter Fullscreen Presentation Mode (F)'}
            >
              {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
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
            padding: isFullscreen ? '24px 40px 14px 40px' : '18px 28px 12px 28px',
            borderBottom: '1px solid var(--card-border)',
            background: 'var(--surface-card)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 800,
                color: '#f59e0b',
                letterSpacing: '1px'
              }}
            >
              CHAPTER {CHAPTERS[currentSlide].number} // {CHAPTERS[currentSlide].badge}
            </span>
          </div>
          <h2
            style={{
              fontSize: isFullscreen ? '22px' : '18.5px',
              fontWeight: 800,
              color: 'var(--folio-ink)',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              marginBottom: '4px'
            }}
          >
            {CHAPTERS[currentSlide].title}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.5, margin: 0 }}>
            {CHAPTERS[currentSlide].subtitle}
          </p>
        </div>

        {/* Scrollable Slide Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isFullscreen ? '32px 40px' : '22px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
        >
          {/* SLIDE 0: The Perpetual Learner: Selalu Penasaran & Senang Belajar Hal Baru */}
          {currentSlide === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '18px',
                  alignItems: 'stretch'
                }}
              >
                {/* Left Column: Framed Introduction Photo */}
                <div
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                    background: 'var(--surface-card-subtle)',
                    border: '1.5px solid rgba(245, 158, 11, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.35)'
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
                    onClick={() => setPreviewImage('./rifaimartin-introduction.jpeg')}
                    title="Klik untuk memperbesar foto profil"
                  >
                    <img
                      src="./rifaimartin-introduction.jpeg"
                      alt="Muhammad Rifai (Rifai Martin)"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        transition: 'transform 0.3s ease'
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
                      <ZoomIn size={12} />
                      <span>Zoom Foto</span>
                    </div>
                  </div>

                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--surface-sunken)', borderTop: '1px solid var(--card-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        Muhammad Rifai
                      </span>
                      <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontWeight: 700 }}>
                        RIFAI MARTIN
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.45 }}>
                      Junior IT Middleware Developer • blu by BCA Digital
                    </p>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {['Perpetual Learner', 'Explorer', 'Vibe Coder', 'Systems Tinkerer'].map((tag, i) => (
                        <span key={i} style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'var(--surface-card)', color: '#f59e0b', border: '1px solid var(--card-border)' }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: DNA Suka Belajar Hal Baru */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div
                    style={{
                      padding: '20px',
                      borderRadius: '16px',
                      background: 'rgba(245, 158, 11, 0.04)',
                      border: '1.5px solid rgba(245, 158, 11, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
                      <Sparkles size={18} />
                      <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0 }}>
                        Dopamine Terbesar: Hobi Membongkar Hal Baru
                      </h4>
                    </div>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65, margin: 0 }}>
                      Bagi saya, belajar hal baru bukan sekadar tuntutan tugas atau pekerjaan—itu adalah <strong>hobi paling membahagiakan dan sumber dopamine utama</strong>. Dari bangku SMK merakit baris HTML pertama, ngoprek server Linux di Ink &amp; Canvas, arsitektur event-loop perbankan di BCA Digital, hingga generative AI dan agentic workflows.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '18px 20px',
                      borderRadius: '16px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                      <Compass size={18} />
                      <h4 style={{ fontSize: '14.5px', fontWeight: 800, margin: 0 }}>
                        Bukan yang Paling Pintar, Tapi Pantang Berhenti
                      </h4>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                      Saya tidak pernah menganggap diri saya jenius. Namun saya memiliki rasa penasaran yang luar biasa lapar. Ketika melihat sistem kompleks yang belum saya kuasai, naluri saya bukan menghindar, melainkan bertanya: <em>"Bagaimana cara kerjanya di balik layar? Bisakah kita rancang ulang menjadi lebih baik?"</em>
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '18px 20px',
                      borderRadius: '16px',
                      background: 'var(--surface-sunken)',
                      border: '1px solid var(--card-border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                      <MapPin size={18} />
                      <h4 style={{ fontSize: '14.5px', fontWeight: 800, margin: 0 }}>
                        Jiwa Penjelajah: Suka Suasana &amp; Tempat Baru
                      </h4>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                      Kreativitas saya layu jika terperangkap di ruangan yang itu-itu saja. Saya gemar berpindah suasana: mencoba coworking space baru, sudut cafe yang tenang di berbagai sudut kota, atau menantang diri beradaptasi dengan ritme lingkungan baru.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quote Banner */}
              <div
                style={{
                  padding: '14px 20px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(56, 189, 248, 0.06))',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <Flame size={22} color="#f59e0b" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '12.5px', color: 'var(--folio-ink)', lineHeight: 1.6, margin: 0 }}>
                  <strong>Prinsip Penjelajah:</strong> "Zona nyaman adalah pembunuh potensi paling sunyi. Belajar hal baru adalah satu-satunya cara memastikan bahwa diri kita hari ini lebih tangguh daripada kemarin."
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 1: Masuk ke Dunia Kripto: Dari Rasa Ingin Tahu ke Obsesi Ingin Cepat Kaya */}
          {currentSlide === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Left Card: Awal Rasa Ingin Tahu */}
                <div
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                    <Globe size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                      FASE 01 • RASA INGIN TAHU TEKNOLOGI
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)', margin: 0 }}>
                    Pesona Awal Blockchain &amp; Pasar Desentralisasi (2020–2021)
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65, margin: 0 }}>
                    Karena hobi belajar hal baru, perhatian saya terseret ke fenomena Web3 dan pasar kripto global. Saya terpukau oleh konsep desentralisasi, smart contracts, dan likuiditas 24 jam nonstop yang tidak pernah tidur.
                  </p>
                  <div style={{ fontSize: '12px', padding: '10px', borderRadius: '8px', background: 'var(--surface-card)', borderLeft: '3px solid #38bdf8', color: 'var(--ink-muted)' }}>
                    "Awalnya murni eksplorasi teknis: bagaimana arsitektur konsensus Proof of Work dan Proof of Stake memfasilitasi transaksi bernilai triliunan rupiah tanpa perantara."
                  </div>
                </div>

                {/* Right Card: Tergelincir ke Nafsu Cepat Kaya */}
                <div
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1.5px solid rgba(239, 68, 68, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <Flame size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                      FASE 02 • THE GET-RICH-QUICK TRAP
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)', margin: 0 }}>
                    Ego Engineer &amp; Ilusi Menjadi Milyarder Dalam Semalam
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65, margin: 0 }}>
                    Namun ada dorongan manusiawi yang sangat licik: <strong>Nafsu ingin cepat kaya</strong>. Melihat tangkapan layar profit ratusan persen orang lain di media sosial, ego coder saya berbisik: <em>"Gua ngerti logika dan matematika, masa nggak bisa menaklukkan pasar ini?"</em>
                  </p>
                  <div style={{ fontSize: '12px', padding: '10px', borderRadius: '8px', background: 'var(--surface-card)', borderLeft: '3px solid #ef4444', color: '#fca5a5' }}>
                    "Saya meninggalkan spot trading yang konservatif, dan melompat ke jurang Binance Futures dengan daya ungkit (leverage) 10x, 20x, hingga 50x."
                  </div>
                </div>
              </div>

              {/* 4 Siklus Jebakan Mentalitas */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'var(--surface-card-subtle)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Brain size={20} color="#f59e0b" />
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--folio-ink)', margin: 0 }}>
                    Anatomi Ilusi Cepat Kaya: 4 Fase Keruntuhan Logika di Pasar Kripto
                  </h4>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '12px'
                  }}
                >
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      1. Beginner's Luck (Kutukan Awal)
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55, margin: 0 }}>
                      Menang beberapa kali di awal saat market sedang rally. Otak mengira itu keahlian analisa, padahal hanya terbawa arus bull market. Ego membengkak.
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      2. The Leverage Addiction
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55, margin: 0 }}>
                      Untung 5-10% terasa terlalu lambat untuk mimpi cepat kaya. Leverage dinaikkan ke 20x-50x. Nilai posisi menjadi puluhan kali lipat modal asli.
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      3. Denial &amp; Menolak Cut Loss
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55, margin: 0 }}>
                      Saat harga drop menembus level batas, ego coder menolak mengakui salah. Menolak cut loss dengan dalih: <em>"Pasti mantul lagi!"</em> hingga jaminan tersisa 20%.
                    </p>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      4. Revenge Trading (Kemarahan)
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55, margin: 0 }}>
                      Nafsu membabi-buta untuk membalas kerugian seketika. Masuk posisi baru secara impulsif tanpa analisa matang, mempercepat kehancuran portofolio.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reflection Callout */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Sparkles size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                  <strong>Pelajaran Krusial:</strong> Keinginan untuk cepat kaya adalah racun paling mematikan bagi seorang pembelajar. Ketika rasa penasaran murni terdistorsi oleh keserakahan, logika sains terbungkam oleh emosi, dan pintu menuju petaka likuidasi terbuka lebar.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 2: The -100M Crucible & Binance Margin Call History */}
          {currentSlide === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Evidence Snapshot Card */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  background: 'rgba(239, 68, 68, 0.04)',
                  border: '1.5px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <ShieldAlert size={20} />
                    <h4 style={{ fontSize: '15.5px', fontWeight: 800, margin: 0 }}>
                      Bukti Nyata (Evidence): Riwayat Margin Call Binance Futures 2022
                    </h4>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#ef4444',
                      fontWeight: 700
                    }}
                  >
                    REAL HISTORICAL DATA (~Rp 100 JUTA DRAWDOWN)
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                  Email beruntun dari Binance masuk tanpa henti: <em>"The margin ratio of your Binance USDⓈ-M Futures account has reached 80%. To avoid being liquidated..."</em>. Terjadi berulang kali sepanjang market crash 2022 akibat overleveraging dan menolak cut loss hingga modal hangus total <strong>-Rp 100 Juta</strong>.
                </p>

                {/* Framed Image with Zoom */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxHeight: isFullscreen ? '320px' : '220px',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    cursor: 'zoom-in',
                    background: '#09090b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={() => setPreviewImage('./margin-call-history.png')}
                  title="Klik untuk melihat bukti otentik email Binance margin call"
                >
                  <img
                    src="./margin-call-history.png"
                    alt="Binance Margin Call History Rifai Martin"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '12px',
                      background: 'rgba(0, 0, 0, 0.8)',
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
                    <ZoomIn size={12} />
                    <span>Klik untuk Zoom Dokumen Bukti</span>
                  </div>
                </div>
              </div>

              {/* 3 Expensive Lessons */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px'
                }}
              >
                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                    1. Matematika Drawdown Itu Brutal
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Kehilangan modal 50% tidak membutuhkan kenaikan 50% untuk balik modal, melainkan butuh <strong>+100% gain</strong>. Saat modal minus 90%, Anda butuh <strong>+900% gain</strong> hanya untuk impas. Menjaga modal (*capital preservation*) adalah hukum nomor satu.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                    2. Leverage Adalah Mesin Penghancur
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Di leverage 20x, penurunan harga sekecil 5% sudah melenyapkan 100% margin Anda. Tanpa risk management ketat, leverage bukan alat akselerasi, melainkan mesin likuidasi instan.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                    3. Dari Spekulan Menjadi Risk Manager
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Minus Rp 100 juta adalah "uang kuliah termahal" yang mengajarkan kerendahan hati. Sejak saat itu, saya tidak lagi mengejar ilusi cepat kaya, melainkan menghormati kalkulasi probabilitas dan hard stop loss.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: Interactive Futures & Leverage Lab */}
          {currentSlide === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Simulator Controls & Display Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '18px'
                }}
              >
                {/* Left Column: Interactive Inputs */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--folio-ink)', margin: 0 }}>
                    Konfigurasi Posisi Futures (Simulator)
                  </h4>

                  {/* Asset Selector */}
                  <div>
                    <label style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginBottom: '6px', display: 'block' }}>
                      Pilih Aset Kripto:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                      {ASSETS.map((asset) => (
                        <button
                          key={asset.id}
                          onClick={() => {
                            soundFx.playCardClick();
                            setSelectedAsset(asset);
                          }}
                          style={{
                            padding: '8px 4px',
                            borderRadius: '8px',
                            background: selectedAsset.id === asset.id ? 'rgba(245, 158, 11, 0.15)' : 'var(--surface-sunken)',
                            border: selectedAsset.id === asset.id ? '1.5px solid #f59e0b' : '1px solid var(--card-border)',
                            color: selectedAsset.id === asset.id ? '#f59e0b' : 'var(--folio-ink)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px'
                          }}
                        >
                          <span style={{ fontSize: '14px' }}>{asset.icon}</span>
                          <span>{asset.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Margin Input Slider */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                        Modal Awal (Margin IDR):
                      </label>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                        {formatIDR(initialMargin)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      {[1000000, 5000000, 10000000, 50000000, 100000000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            soundFx.playCardClick();
                            setInitialMargin(amt);
                          }}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: initialMargin === amt ? '#f59e0b' : 'var(--surface-sunken)',
                            color: initialMargin === amt ? '#fff' : 'var(--ink-muted)',
                            border: '1px solid var(--card-border)',
                            fontSize: '10.5px',
                            fontFamily: 'var(--font-mono)',
                            cursor: 'pointer'
                          }}
                        >
                          {amt === 100000000 ? '100 Jt' : `${amt / 1000000} Jt`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Position Direction: LONG vs SHORT */}
                  <div>
                    <label style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginBottom: '6px', display: 'block' }}>
                      Arah Posisi (Order Type):
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button
                        onClick={() => {
                          soundFx.playCardClick();
                          setPositionType('LONG');
                        }}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          background: positionType === 'LONG' ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-sunken)',
                          border: positionType === 'LONG' ? '2px solid #10b981' : '1px solid var(--card-border)',
                          color: positionType === 'LONG' ? '#10b981' : 'var(--ink)',
                          fontWeight: 800,
                          fontSize: '12.5px',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <TrendingUp size={16} />
                        <span>LONG (Bullish)</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playCardClick();
                          setPositionType('SHORT');
                        }}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          background: positionType === 'SHORT' ? 'rgba(239, 68, 68, 0.15)' : 'var(--surface-sunken)',
                          border: positionType === 'SHORT' ? '2px solid #ef4444' : '1px solid var(--card-border)',
                          color: positionType === 'SHORT' ? '#ef4444' : 'var(--ink)',
                          fontWeight: 800,
                          fontSize: '12.5px',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <TrendingDown size={16} />
                        <span>SHORT (Bearish)</span>
                      </button>
                    </div>
                  </div>

                  {/* Leverage Selector */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                        Tingkat Leverage:
                      </label>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 800, color: leverage >= 20 ? '#ef4444' : '#f59e0b' }}>
                        {leverage}x
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
                      {[2, 5, 10, 20, 50, 100].map((lev) => (
                        <button
                          key={lev}
                          onClick={() => {
                            soundFx.playCardClick();
                            setLeverage(lev);
                          }}
                          style={{
                            padding: '6px 2px',
                            borderRadius: '6px',
                            background: leverage === lev ? '#f59e0b' : 'var(--surface-sunken)',
                            color: leverage === lev ? '#fff' : 'var(--folio-ink)',
                            border: '1px solid var(--card-border)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {lev}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Movement Slider */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                        Pergerakan Harga {selectedAsset.id}:
                      </label>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '12px',
                          fontWeight: 800,
                          color: priceChangePercent > 0 ? '#10b981' : priceChangePercent < 0 ? '#ef4444' : 'var(--ink-muted)'
                        }}
                      >
                        {priceChangePercent > 0 ? `+${priceChangePercent}%` : `${priceChangePercent}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-25"
                      max="25"
                      step="1"
                      value={priceChangePercent}
                      onChange={(e) => setPriceChangePercent(Number(e.target.value))}
                      style={{
                        width: '100%',
                        cursor: 'pointer',
                        accentColor: priceChangePercent >= 0 ? '#10b981' : '#ef4444'
                      }}
                    />
                  </div>
                </div>

                {/* Right Column: Dynamic Live Calculation & Warning */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: isLiquidated ? 'rgba(239, 68, 68, 0.08)' : 'var(--surface-card-subtle)',
                    border: isLiquidated ? '2px solid #ef4444' : '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: 'var(--ink-muted)' }}>
                        HASIL KALKULASI POSISI
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: isLiquidated ? '#ef4444' : roePercent >= 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: isLiquidated ? '#fff' : roePercent >= 0 ? '#10b981' : '#ef4444',
                          fontWeight: 800
                        }}
                      >
                        {isLiquidated ? 'STATUS: LIKUIDASI' : `ROE: ${roePercent > 0 ? '+' : ''}${roePercent}%`}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
                        <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', display: 'block' }}>
                          Total Ukuran Posisi:
                        </span>
                        <span style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--folio-ink)' }}>
                          {formatIDR(totalPositionSize)}
                        </span>
                      </div>

                      <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
                        <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', display: 'block' }}>
                          Estimasi Profit / Loss:
                        </span>
                        <span
                          style={{
                            fontSize: '15px',
                            fontWeight: 800,
                            fontFamily: 'var(--font-mono)',
                            color: pnlIDR > 0 ? '#10b981' : pnlIDR < 0 ? '#ef4444' : 'var(--folio-ink)'
                          }}
                        >
                          {pnlIDR > 0 ? `+${formatIDR(pnlIDR)}` : formatIDR(pnlIDR)}
                        </span>
                      </div>
                    </div>

                    <div style={{ marginTop: '14px', padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Sisa Saldo Jaminan (Equity):</span>
                        <span style={{ fontSize: '14px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: isLiquidated ? '#ef4444' : 'var(--folio-ink)' }}>
                          {formatIDR(finalEquity)}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: 'var(--card-border)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${Math.max(0, Math.min(100, (finalEquity / initialMargin) * 100))}%`,
                            height: '100%',
                            background: isLiquidated ? '#ef4444' : (finalEquity / initialMargin) < 0.3 ? '#ef4444' : '#10b981',
                            transition: 'width 0.2s ease'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'var(--surface-sunken)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Ambang Batas Likuidasi:</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 800, color: '#f59e0b' }}>
                        ± {liquidationBufferPercent.toFixed(1)}% pergerakan harga
                      </span>
                    </div>

                    {isLiquidated ? (
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '12px', fontWeight: 700 }}>
                        <AlertTriangle size={18} />
                        <span>MARGIN CALL TRIGGERED! Seluruh modal Anda telah terlikuidasi.</span>
                      </div>
                    ) : roePercent <= -70 ? (
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '12px', fontWeight: 700 }}>
                        <ShieldAlert size={18} />
                        <span>PERINGATAN MARGIN 80%: Saldo jaminan hampir habis, segera pasang stop loss!</span>
                      </div>
                    ) : (
                      <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '12px', fontWeight: 700 }}>
                        <CheckCircle2 size={18} />
                        <span>Posisi Aman: Selalu lindungi modal Anda dengan rencana take profit &amp; cut loss.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Jatuh Cinta pada Vibe Coding: Hingga Melahirkan Nemo 🐙 */}
          {currentSlide === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Left Card: The Vibe Coding Revolution */}
                <div
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'rgba(168, 85, 247, 0.05)',
                    border: '1.5px solid rgba(168, 85, 247, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7' }}>
                    <Wand2 size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                      ERA GENERATIVE AI • THE FLOW STATE
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--folio-ink)', margin: 0 }}>
                    Menemukan Kembali Sukacita Berkreasi: Vibe Coding
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65, margin: 0 }}>
                    Setelah melewati luka tempaan pasar kripto, rasa penasaran saya menemukan muara baru yang paling menggetarkan: <strong>Vibe Coding</strong>. Menulis kode bukan lagi proses birokratis yang lambat mengetik ribuan boilerplate berulang.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>
                    Vibe coding adalah kondisi di mana seorang engineer bertindak sebagai <em>arsitek &amp; konduktor ide</em>: berdialog secara intens dengan model AI cerdas, menguji hipotesis dalam hitungan menit, dan merealisasikan prototipe fungsional tanpa hambatan sintaksis.
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {['Flow State', 'Zero Boilerplate', 'Rapid Prototyping', 'AI Pair Programming', 'High Velocity'].map((tag, i) => (
                      <span key={i} style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: '#c084fc' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Card: The Birth of Nemo */}
                <div
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(0, 164, 228, 0.08), rgba(168, 85, 247, 0.08))',
                    border: '1.5px solid rgba(0, 164, 228, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00a4e4' }}>
                      <Bot size={20} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                        PROJECT NEMO 🐙
                      </span>
                    </div>
                    <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: '4px', background: 'rgba(0, 164, 228, 0.15)', color: '#00a4e4', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      PERSONAL AI AGENT
                    </span>
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--folio-ink)', margin: 0 }}>
                    Dari Kecanduan Vibe Coding, Lahirlah "Nemo"
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65, margin: 0 }}>
                    Kecintaan bereksperimen dengan AI melahirkan project <strong>NEMO</strong>: asisten pintar dan sistem agen personal yang saya bangun untuk menemani alur kerja harian. Nemo membantu merapikan catatan riset, mengotomasi workflow repetitif, membedah codebase, hingga mengevaluasi ide-ide baru.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>
                    Nemo adalah bukti nyata: ketika hobi belajar hal baru dipadukan dengan vibe coding, jarak antara ide di kepala dan aplikasi hidup yang bisa digunakan menjadi hampir nol.
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {['Autonomous Agent', 'Workflow Orchestrator', 'Personal Copilot', 'Continuous Tinkering'].map((tag, i) => (
                      <span key={i} style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: '#38bdf8' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Keajaiban Vibe Coding & Nemo */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px'
                }}
              >
                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '13px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={15} />
                    <span>1. Flow State Tanpa Gesekan</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Tidak ada lagi waktu terbuang mencari sintaks regex atau boilerplate class. Pikiran bebas menjelajah desain arsitektur, abstraksi sistem, dan pengalaman pengguna secara murni.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#00a4e4', fontWeight: 800, fontSize: '13px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Rocket size={15} />
                    <span>2. Kecepatan Realisasi Ide</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Ide yang terlintas saat ngopi di pagi hari bisa diuji coba dan dirilis di sore hari. Kecepatan feedback loop ini memicu adiksi belajar hal baru yang semakin membara.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '13px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Heart size={15} />
                    <span>3. Rekan Berpikir Selevel (Thought Partner)</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Nemo bukan pengganti peran developer, melainkan tandem sparring partner yang memperluas kapasitas intelektual dan menantang sudut pandang kita dalam memecahkan masalah.
                  </p>
                </div>
              </div>

              {/* Epiphany Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(0, 164, 228, 0.08))',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Sparkles size={24} color="#a855f7" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '12.5px', color: 'var(--folio-ink)', lineHeight: 1.6, margin: 0 }}>
                  <strong>Sintesis Kreatif:</strong> "Jika pasar finansial mengajarkan saya kerendahan hati dalam mengelola risiko, vibe coding dan Nemo mengembalikan kegembiraan murni masa kecil: bahwa kita bisa menciptakan dunia apa pun yang kita bayangkan di atas terminal."
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 5: The Explorer Spirit: Mencoba Tempat Baru, Stoikisme & Compounding */}
          {currentSlide === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Pillar 1: Suka Tempat Baru & Lingkungan Baru */}
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
                    <Coffee size={18} />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, margin: 0 }}>
                      1. Jiwa Penjelajah: Eksplorasi Tempat Baru
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Saya senang berpindah tempat: mencoba cafe baru dengan playlist akustik yang tenang, coworking space dengan komunitas dinamis, atau sudut kota baru. Berpindah ruang adalah tombol reset mental yang mengikis kejenuhan dan melahirkan perspektif segar.
                  </p>
                </div>

                {/* Pillar 2: Dikotomi Kendali Seneca */}
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                    <Compass size={18} />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, margin: 0 }}>
                      2. Dikotomi Kendali (The Stoic Anchor)
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Pelajaran terbesar dari perpaduan IT dan pasar: pisahkan secara tegas antara apa yang bisa kita kontrol (jam belajar, manajemen risiko, kualitas kode, respon emosi) dengan apa yang di luar kendali kita (arah pasar, opini orang lain). Menaruh kedamaian pada proses, bukan hasil instan.
                  </p>
                </div>

                {/* Pillar 3: Compounding Life */}
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                    <TrendingUp size={18} />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800, margin: 0 }}>
                      3. The Compounding Life (1.01^365 = 37.8)
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6, margin: 0 }}>
                    Menjadi 1% lebih baik setiap hari dalam coding, cara berpikir, dan ketenangan batin menghasilkan pelipatgandaan 37 kali lipat dalam satu tahun. Keunggulan sejati bukan ledakan instan semalam, melainkan buah manis dari konsistensi jangka panjang.
                  </p>
                </div>
              </div>

              {/* Synthesis Banner */}
              <div
                style={{
                  padding: '18px 22px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(56, 189, 248, 0.08))',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Flame size={28} color="#f59e0b" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '13px', color: 'var(--folio-ink)', lineHeight: 1.6, margin: 0 }}>
                  <strong>Manifesto Penutup:</strong> Hidup adalah kanvas eksperimen tanpa batas. Jangan takut menjelajah hal baru, jangan takut mendatangi tempat baru, dan jangan pernah takut pada tempaan kegagalan—karena setiap likuidasi masa lalu adalah batu loncatan menuju versi terbaik diri kita hari ini.
                </p>
              </div>

              {/* Closing Quotation & Signature */}
              <div
                style={{
                  padding: '24px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(168, 85, 247, 0.08))',
                  border: '1.5px solid rgba(245, 158, 11, 0.35)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '13.5px', fontStyle: 'italic', color: 'var(--folio-ink)', maxWidth: '720px', lineHeight: 1.7 }}>
                  "Life is long if you know how to use it… we are not given a short life but we make it short, and wasteful of it." — Seneca
                </span>
                <span style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700, letterSpacing: '0.5px' }}>
                  Muhammad Rifai (Rifai Martin) • Continuous Explorer, Vibe Coder &amp; Systems Builder
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Slide Controller Footer */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isFullscreen ? '16px 36px' : '14px 24px',
            borderTop: '1px solid var(--card-border)',
            background: 'var(--surface-card-subtle)',
            flexShrink: 0
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              background: 'var(--surface-card)',
              border: '1px solid var(--card-border)',
              color: currentSlide === 0 ? 'var(--ink-faint)' : 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
              opacity: currentSlide === 0 ? 0.4 : 1,
              transition: 'all 0.15s'
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          {/* Center Indicator & Key Shortcuts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-muted)', fontWeight: 600 }}>
              Chapter {currentSlide + 1} of {CHAPTERS.length}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--ink-faint)' }}>
              <span>Nav:</span>
              <kbd style={{ padding: '2px 5px', borderRadius: '4px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>Space</kbd>
              <span>/</span>
              <kbd style={{ padding: '2px 5px', borderRadius: '4px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>→</kbd>
              <span>• Fullscreen:</span>
              <kbd style={{ padding: '2px 5px', borderRadius: '4px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>F</kbd>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlide === CHAPTERS.length - 1}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              background: currentSlide === CHAPTERS.length - 1 ? 'var(--surface-card)' : '#f59e0b',
              border: '1px solid var(--card-border)',
              color: currentSlide === CHAPTERS.length - 1 ? 'var(--ink-faint)' : '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: currentSlide === CHAPTERS.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentSlide === CHAPTERS.length - 1 ? 0.4 : 1,
              transition: 'all 0.15s',
              boxShadow: currentSlide === CHAPTERS.length - 1 ? 'none' : '0 4px 14px rgba(245, 158, 11, 0.35)'
            }}
          >
            <span>{currentSlide === CHAPTERS.length - 1 ? 'Selesai' : 'Next Chapter'}</span>
            <ChevronRight size={16} />
          </button>
        </footer>
      </div>

      {/* Image Lightbox Modal for Evidence & Photo Zoom */}
      {previewImage && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setPreviewImage(null)}
        >
          <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 210 }}>
            <button
              onClick={() => setPreviewImage(null)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>
          <img
            src={previewImage}
            alt="Zoomed Preview"
            style={{
              maxWidth: '92vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontFamily: 'var(--font-mono)', marginTop: '12px' }}>
            Klik di mana saja atau tekan Esc untuk menutup
          </span>
        </div>
      )}
    </div>
  );
}
