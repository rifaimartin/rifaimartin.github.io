import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2, 
  TrendingUp, TrendingDown, ShieldAlert, AlertTriangle, CheckCircle2, 
  Flame, RefreshCw, ZoomIn, Sparkles, Award, Cpu, BookOpen, 
  Compass, ArrowRight, DollarSign, Activity, Percent, Code2, 
  Terminal, Brain, Heart, Layers
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const CHAPTERS = [
  {
    id: 'origin',
    number: '01',
    badge: 'FOUNDATIONS & GRIT',
    title: 'Origin Story: Benih IT di SMK & 1 Tahun Magang di Ink & Canvas',
    subtitle: 'Awal mula mengenal baris kode di bangku SMK, tempaan 1 tahun magang di industri nyata (Ink & Canvas), dan pelajaran tentang jam terbang.'
  },
  {
    id: 'into-trading',
    number: '02',
    badge: 'SELF-DISCOVERY',
    title: 'Melangkah ke Pasar Finansial: Cermin Paling Jujur Mengenal Diri Sendiri',
    subtitle: 'Dari kode deterministik menuju pasar probabilistik: bagaimana trading membenturkan logika dengan ego, keserakahan, dan disiplin emosional.'
  },
  {
    id: 'margin-call',
    number: '03',
    badge: 'THE -100M CRUCIBLE',
    title: 'Kuliah Termahal: Riwayat Margin Call Binance Futures -100 Juta',
    subtitle: 'Bukti otentik likuidasi bear market 2022: Mengakui kesalahan, matematika drawdown, dan titik balik menjadi disciplined risk manager.'
  },
  {
    id: 'simulator',
    number: '04',
    badge: 'INTERACTIVE LAB',
    title: 'Futures & Leverage Lab: Simulasi Kalkulator Rupiah (BTC, ETH, HBAR, SOL)',
    subtitle: 'Eksplorasi interaktif bagaimana leverage melipatgandakan profit sekaligus mempersempit batas likuidasi hingga ke titik nol.'
  },
  {
    id: 'manifesto',
    number: '05',
    badge: 'SELF-MASTERY & LIFE',
    title: 'Personal Manifesto: Stoikisme, Damai dalam Ketidakpastian & Compounding',
    subtitle: 'Sintesis antara logika kode dan psikologi pasar: Hidup dengan dikotomi kendali Seneca dan bertumbuh 1% setiap hari.'
  }
];

const ASSETS = [
  { id: 'BTC', name: 'Bitcoin', symbol: 'BTC/USDT', icon: '₿', color: '#f7931a', defaultPrice: 1500000000 },
  { id: 'ETH', name: 'Ethereum', symbol: 'ETH/USDT', icon: 'Ξ', color: '#627eea', defaultPrice: 55000000 },
  { id: 'HBAR', name: 'Hedera', symbol: 'HBAR/USDT', icon: 'ℏ', color: '#00a3e0', defaultPrice: 3200 },
  { id: 'SOL', name: 'Solana', symbol: 'SOL/USDT', icon: '◎', color: '#14f195', defaultPrice: 3100000 }
];

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

  // Auto-launch fullscreen if requested
  useEffect(() => {
    if (isOpen && initialFullscreen) {
      const isCurrentlyFs = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      if (!isCurrentlyFs) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
    }
  }, [isOpen, initialFullscreen]);

  const toggleFullscreen = async () => {
    soundFx.playCardClick();
    try {
      const isCurrentlyFs = Boolean(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      if (!isCurrentlyFs) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          await elem.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen toggle encountered an issue:', err);
    }
  };

  const handleClose = () => {
    soundFx.playCardClick();
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      try {
        if (document.exitFullscreen) document.exitFullscreen();
      } catch {}
    }
    onClose();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const formatIDR = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Keyboard navigation (Arrows, Space, F, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
          return;
        }
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
          handleClose();
        }
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
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Present (F)'}</span>
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
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
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
          {/* SLIDE 0: Origin Story: SMK & 1 Tahun Magang di Ink & Canvas */}
          {currentSlide === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Stage 1: Bangku SMK */}
                <div
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'var(--surface-card-subtle)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: '#f59e0b' }}>
                      FASE 01 • BANGKU SMK
                    </span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'var(--surface-sunken)', color: 'var(--folio-ink)', fontFamily: 'var(--font-mono)' }}>
                      Rekayasa Perangkat Lunak
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Menyemai Benih: Mengenal Logika & Baris Kode Pertama
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65 }}>
                    Tidak berawal dari privilese atau perangkat serba canggih. Perjalanan dimulai dari layar komputer lab SMK. Saat pertama kali mengetikkan tag HTML, CSS, dan algoritma dasar, ada rasa takjub yang mendalam: bagaimana baris-baris teks statis bisa diubah menjadi antarmuka yang hidup dan berinteraksi.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-faint)', lineHeight: 1.6 }}>
                    Rasa ingin tahu yang besar menjadi pendorong utama. Menghabiskan waktu membaca dokumentasi, membedah script open-source sederhana, dan menyadari bahwa di dunia pemrograman, batasan utama hanyalah sejauh mana kita mau belajar dan mencoba.
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {['Dasar Algoritma', 'HTML & CSS', 'JavaScript', 'Logic Building', 'Rasa Ingin Tahu'].map((tag, i) => (
                      <span key={i} style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stage 2: 1 Tahun Magang di Ink & Canvas */}
                <div
                  style={{
                    padding: '22px',
                    borderRadius: '16px',
                    background: 'rgba(245, 158, 11, 0.04)',
                    border: '1.5px solid rgba(245, 158, 11, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: '#f59e0b' }}>
                      FASE 02 • 1 TAHUN MAGANG INDUSTRI
                    </span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      INK & CANVAS (Bogor)
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Kaget Budaya: Dari Teori Sekolah ke Realitas Industri
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.65 }}>
                    Menjalani magang selama hampir 1 tahun penuh di INK & CANVAS (Nov 2017 – Sep 2018). Bukan magang formalitas administrasi, melainkan langsung diterjunkan ke proyek nyata: transformasi digital institusi bahasa LIA, slicing UI responsif, konfigurasi Linux Server, dan DevOps workflow dasar.
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-faint)', lineHeight: 1.6 }}>
                    Perbedaan mendasar langsung terasa: di sekolah, kode salah hanya berakibat nilai merah di rapor; di industri, bug atau server crash berdampak langsung pada pengguna riil dan operasional klien. Di sinilah standar profesional dan tanggung jawab dibentuk.
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {['LIA Digitalization', 'Linux Server', 'DevOps Dasar', 'Responsive UI/UX', 'Produksi Riil'].map((tag, i) => (
                      <span key={i} style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', padding: '2px 7px', borderRadius: '4px', background: 'var(--surface-sunken)', color: 'var(--ink-muted)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Lessons Learned from SMK & Internship */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '14px'
                }}
              >
                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={15} />
                    <span>1. Jam Terbang Mengalahkan Bakat</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Di awal magang sempat merasa minder dan lambat dibanding engineer lain. Pelajaran pentingnya: tidak ada jalan pintas selain melipatgandakan jam terbang. Berjam-jam menatap terminal, membedah error log, dan pantang pulang sebelum solusi ditemukan adalah pembentuk grit sejati.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '13px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Code2 size={15} />
                    <span>2. Craftsmanship di Atas "Asal Jalan"</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    INK & CANVAS menanamkan bahwa kode bukan sekadar tugas yang selesai dikerjakan, melainkan karya kerajinan tangan (*craftsmanship*). Struktur folder yang rapi, clean code, efisiensi konsumsi memori server, dan empati pada developer yang akan membaca kode kita berikutnya.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '13px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Compass size={15} />
                    <span>3. Berani Bertanya & Menurunkan Ego</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Pura-pura paham karena gengsi adalah bahaya terbesar di fase belajar. Belajar cara merumuskan pertanyaan dengan konteks yang jelas, menerima kritik pedas atas pull request dengan lapang dada, dan memandang setiap kegagalan sebagai data poin untuk perbaikan.
                  </p>
                </div>
              </div>

              {/* Reflection Callout */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(56, 189, 248, 0.06))',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <Flame size={26} color="#f59e0b" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '12.5px', color: 'var(--folio-ink)', lineHeight: 1.6 }}>
                  <strong>Prinsip Inti:</strong> Fondasi terkuat seorang engineer tidak ditentukan oleh almamater bergengsi, melainkan oleh ketahanan mental di hadapan tumpukan error, rasa ingin tahu yang tak kunjung padam, dan komitmen untuk terus belajar dari dasar.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 1: Melangkah ke Pasar Finansial: Cermin Paling Jujur Mengenal Diri Sendiri */}
          {currentSlide === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Paradigm Clash: Deterministic Code vs Probabilistic Markets */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Left: Dunia Kode Deterministik */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                    <Terminal size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                      DUNIA KODE • DETERMINISTIK
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Logika Pasti: 1 + 1 Selalu Menghasilkan 2
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Di dunia software engineering, sistem bersifat deterministik. Jika ada bug, ada stack trace dan log error yang bisa di-debug hingga akar masalah. Aturannya pasti: <code>if condition then action</code>.
                  </p>
                  <div style={{ fontSize: '12px', padding: '10px', borderRadius: '8px', background: 'var(--surface-card)', borderLeft: '3px solid #38bdf8', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
                    "Ego seorang engineer seringkali merasa bahwa jika kita menganalisis cukup dalam, kita bisa mengendalikan seluruh sistem."
                  </div>
                </div>

                {/* Right: Dunia Pasar Finansial Probabilistik */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(245, 158, 11, 0.05)',
                    border: '1.5px solid rgba(245, 158, 11, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
                    <Activity size={18} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800 }}>
                      DUNIA TRADING • PROBABILISTIK
                    </span>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Ketidakpastian Mutlak: Setup Sempurna Tetap Bisa Gagal
                  </h4>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Saat melangkah ke pasar kripto dan futures, semua ilusi kontrol runtuh. Pasar tidak memiliki kompilator. Analisis teknikal tercanggih dan indikator paling akurat sekalipun tetap bisa berbalik arah dalam hitungan detik karena arus likuiditas global.
                  </p>
                  <div style={{ fontSize: '12px', padding: '10px', borderRadius: '8px', background: 'var(--surface-card)', borderLeft: '3px solid #f59e0b', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
                    "Pasar tidak peduli seberapa pintar kita menulis kode. Pasar adalah arena psikologi massal jutaan manusia yang bergerak probabilistik."
                  </div>
                </div>
              </div>

              {/* Trading as the Mirror to Self-Discovery */}
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
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Cermin Mengenal Diri Sendiri: 4 Emosi yang Ditelanjangi oleh Pasar
                  </h4>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                  Trading bukan sekadar memencet tombol Buy atau Sell; trading adalah proses psikoanalisis paling intens dan jujur. Di hadapan grafik candlestick yang bergerak cepat, sifat asli manusia yang biasanya tertutup rapat akan keluar ke permukaan:
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '12px'
                  }}
                >
                  {/* 1. Greed & FOMO */}
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      1. Greed & Euphoria (Keserakahan)
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55 }}>
                      Saat menang beruntun, ego membisikkan bahwa kita jenius. Kita memperbesar leverage dan mengabaikan trading plan. Keserakahan adalah awal dari bencana likuidasi.
                    </p>
                  </div>

                  {/* 2. Denial & Hope */}
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      2. Denial & Hope (Penyangkalan)
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55 }}>
                      Saat posisi minus dan menyentuh stop loss, ego coder menolak kalah: <em>"Pasti mantul lagi."</em> Berharap pada keajaiban menggantikan disiplin eksekusi cut loss.
                    </p>
                  </div>

                  {/* 3. Revenge Trading */}
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      3. Revenge Trading (Dendam & Amarah)
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55 }}>
                      Keinginan impulsif untuk "membalas pasar" setelah rugi. Membuka posisi baru tanpa setup yang valid, meningkatkan risiko, dan mempercepat kehancuran portofolio.
                    </p>
                  </div>

                  {/* 4. Humility */}
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <div style={{ color: '#10b981', fontWeight: 800, fontSize: '12.5px', marginBottom: '4px' }}>
                      4. Humility (Kerendahan Hati)
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.55 }}>
                      Pelajaran puncak: berdamai bahwa kita tidak bisa mengontrol pasar. Kemenangan sejati adalah kemampuan mengendalikan diri sendiri, emosi, dan ukuran risiko.
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Epiphany Card */}
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
                <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                  <strong>Lesson Learned:</strong> Musuh terbesar di pasar finansial bukan bandar atau algoritma bursa, melainkan bayangan diri kita sendiri di cermin. Trading mengajarkan bahwa sebelum kita mampu mengelola risiko di pasar, kita harus terlebih dahulu mampu mengelola ego dan impulsivitas di dalam diri.
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
                    <h4 style={{ fontSize: '15.5px', fontWeight: 800 }}>
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

                <p style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                  Email beruntun dari Binance: <em>"The margin ratio of your Binance USDⓈ-M Futures account has reached 80%. To avoid being liquidated..."</em>. Terjadi berulang kali sepanjang market crash 2022 akibat overleveraging dan menolak cut loss.
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
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Kehilangan modal 50% tidak membutuhkan kenaikan 50% untuk balik modal, melainkan butuh <strong>+100% gain</strong>. Saat modal minus 90%, Anda butuh <strong>+900% gain</strong> hanya untuk impas. Menjaga modal (*capital preservation*) adalah hukum nomor satu.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                    2. Leverage Adalah Pisau Bermata Dua
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Di leverage 20x, penurunan harga sekecil 5% sudah melenyapkan 100% margin Anda. Tanpa risk management ketat, leverage bukan alat akselerasi, melainkan mesin likuidasi instan.
                  </p>
                </div>

                <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '13px', marginBottom: '4px' }}>
                    3. Dari Spekulan Menjadi Risk Manager
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Minus Rp 100 juta adalah "uang kuliah termahal" yang mengajarkan kerendahan hati. Sejak saat itu, saya tidak lagi trading dengan nafsu cepat kaya, melainkan dengan kalkulasi probabilitas dan hard stop loss.
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
                  <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                    Konfigurasi Posisi Futures
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
                          fontSize: '12.5px',
                          fontWeight: 800,
                          color: priceChangePercent > 0 ? '#10b981' : priceChangePercent < 0 ? '#ef4444' : 'var(--ink)'
                        }}
                      >
                        {priceChangePercent > 0 ? `+${priceChangePercent}%` : `${priceChangePercent}%`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      step="1"
                      value={priceChangePercent}
                      onChange={(e) => setPriceChangePercent(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)', marginTop: '2px' }}>
                      <span>-20% Crash</span>
                      <span>0% Flat</span>
                      <span>+20% Pump</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Real-Time PnL & Risk Gauge */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: isLiquidated 
                      ? 'rgba(239, 68, 68, 0.08)' 
                      : roePercent >= 0 
                      ? 'rgba(16, 185, 129, 0.06)' 
                      : 'rgba(245, 158, 11, 0.06)',
                    border: isLiquidated 
                      ? '2px solid #ef4444' 
                      : roePercent >= 0 
                      ? '1.5px solid rgba(16, 185, 129, 0.4)' 
                      : '1.5px solid rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                        TOTAL POSITION SIZE:
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                        {formatIDR(totalPositionSize)} ({leverage}x Notional)
                      </span>
                    </div>

                    {/* Big PnL Display */}
                    <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--surface-card)', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--ink-faint)' }}>
                        ESTIMASI PROFIT / LOSS
                      </span>
                      <div
                        style={{
                          fontSize: isFullscreen ? '28px' : '24px',
                          fontWeight: 900,
                          fontFamily: 'var(--font-mono)',
                          color: isLiquidated ? '#ef4444' : roePercent >= 0 ? '#10b981' : '#ef4444',
                          margin: '4px 0'
                        }}
                      >
                        {isLiquidated ? 'LIKUIDASI (Rp 0)' : `${pnlIDR >= 0 ? '+' : ''}${formatIDR(pnlIDR)}`}
                      </div>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: isLiquidated ? '#ef4444' : roePercent >= 0 ? '#10b981' : '#ef4444',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        ROE: {roePercent >= 0 ? `+${roePercent.toFixed(1)}%` : `${roePercent.toFixed(1)}%`}
                      </div>
                    </div>
                  </div>

                  {/* Liquidation Threshold & Safety Warning */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--ink-muted)' }}>Jarak ke Harga Likuidasi:</span>
                        <strong style={{ color: '#ef4444', fontFamily: 'var(--font-mono)' }}>
                          ±{liquidationBufferPercent.toFixed(1)}%
                        </strong>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--ink-faint)', lineHeight: 1.4 }}>
                        Jika harga bergerak berlawanan sebesar <strong>{liquidationBufferPercent.toFixed(1)}%</strong>, seluruh modal {formatIDR(initialMargin)} hangus seketika.
                      </p>
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
                        <span>Posisi Aman: Selalu lindungi modal Anda dengan rencana take profit & cut loss.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: Personal Manifesto: Stoikisme, Damai dalam Ketidakpastian & Compounding */}
          {currentSlide === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Pillar 1: Dikotomi Kendali Seneca */}
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b' }}>
                    <Compass size={18} />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800 }}>
                      1. Dikotomi Kendali (The Stoic Anchor)
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Pelajaran terbesar dari perpaduan IT dan pasar: pisahkan secara tegas antara apa yang bisa kita kontrol (jam belajar, manajemen risiko, kualitas kode, respon emosi) dengan apa yang di luar kendali kita (arah pasar, opini orang lain, kejadian tak terduga). Menaruh kedamaian pada proses, bukan hasil instan.
                  </p>
                </div>

                {/* Pillar 2: Compounding Life */}
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                    <TrendingUp size={18} />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800 }}>
                      2. The Compounding Life (1.01^365 = 37.8)
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Tidak ada kesuksesan yang terjadi dalam satu malam. Menjadi 1% lebih baik setiap hari dalam berpikir sistem, menjaga ketenangan batin, dan merawat kesehatan tubuh menghasilkan pelipatgandaan 37 kali lipat dalam satu tahun. Keunggulan sejati adalah buah dari konsistensi jangka panjang.
                  </p>
                </div>

                {/* Pillar 3: Giving Back & Mentorship */}
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                    <Heart size={18} />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 800 }}>
                      3. Berbagi Pengalaman & Mentorship
                    </h4>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Mengingat kembali orang-orang dan lingkungan yang pernah memberi kesempatan saat saya masih di titik awal SMK. Pengalaman jatuh bangun—termasuk kerugian 100 juta—harus dibagikan agar orang lain bisa belajar tanpa perlu mengulangi kesalahan yang sama.
                  </p>
                </div>
              </div>

              {/* Interdisciplinary Synthesis Banner */}
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
                <p style={{ fontSize: '13px', color: 'var(--folio-ink)', lineHeight: 1.6 }}>
                  <strong>Sintesis Dua Dunia:</strong> Rekayasa perangkat lunak mengajarkan saya cara membangun sistem yang terstruktur dan reliabel di tengah kekacauan. Pasar finansial mengajarkan saya kerendahan hati untuk menerima ketidakpastian tanpa kehilangan integritas diri.
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
                  Muhammad Rifai (Rifai Martin) • Software Engineer & Systems Thinker
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
            <span>Next Chapter</span>
            <ChevronRight size={16} />
          </button>
        </footer>
      </div>

      {/* Image Lightbox Modal for Evidence Zoom */}
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
            alt="Evidence Binance Margin Call"
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
