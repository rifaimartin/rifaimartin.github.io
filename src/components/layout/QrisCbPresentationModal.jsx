import React, { useState, useEffect, useRef } from 'react';
import {
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2,
  ShieldAlert, RefreshCw, Zap, Server, Activity, Database, CheckCircle2,
  XCircle, AlertTriangle, Layers, Terminal, FileDown, Cpu, ArrowRightLeft,
  Flame, Gauge, Radio, Sparkles, Filter, Bug, FastForward
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { HystrixVsResilience4jVisualizer, CircuitBreakerFuseVisualizer, FailoverPacketFlowVisualizer } from '../illustrations/CircuitBreakerInteractiveAnimations';

const ACCENT = '#00a4e4'; // Digital Blue (blu by BCA Digital)
const ACCENT_GREEN = '#10b981';
const ACCENT_RED = '#ef4444';
const ACCENT_ORANGE = '#f59e0b';
const ACCENT_PURPLE = '#8b5cf6';

const CHAPTERS = [
  {
    id: 'history',
    number: '01',
    badge: 'HISTORY & EVOLUTION',
    title: 'The Evolution of Resilience: Dari Netflix Hystrix ke Resilience4j',
    subtitle: 'Menelusuri sejarah lahirnya Circuit Breaker: dari buku "Release It!" (2007), era keemasan Netflix Hystrix (2012), hingga mengapa industri beralih ke Resilience4j (2018+).'
  },
  {
    id: 'fundamentals',
    number: '02',
    badge: 'CORE PHILOSOPHY & DECISION MATRIX',
    title: 'Circuit Breaker & Resilience4j: Kapan Perlu, Kapan Anti-Pattern?',
    subtitle: 'Memahami filosofi perlindungan microservice: analogi sekering listrik, state machine Resilience4j, dan boundary kapan wajib vs dilarang menggunakan CB.'
  },
  {
    id: 'problem',
    number: '03',
    badge: 'DISTRIBUTED SYSTEMS CHALLENGE',
    title: 'The Multi-Pod Problem: Mengapa In-Memory Circuit Breaker Saja Gagal?',
    subtitle: 'Di balik deployment Kubernetes 4-pod high-throughput QRIS MPM: bahaya asimetri status CB lokal, cascading failure, dan failover latency.'
  },
  {
    id: 'architecture',
    number: '04',
    badge: '2-LAYER FAILOVER ARCHITECTURE',
    title: 'Arsitektur 2-Layer CB: Global Switcher vs Granular NNS Isolation',
    subtitle: 'Mencegah pemadaman massal dengan isolasi kegagalan bertingkat: saat Bank X gangguan di ALTO, hanya rute Bank X yang dialihkan ke RINTIS.'
  },
  {
    id: 'redis-sync',
    number: '05',
    badge: 'REDIS DUAL-TIER SYNC',
    title: 'Redis Dual-Tier: Real-Time Event Pub/Sub & Fleet Snapshot Aggregator',
    subtitle: 'Dua kecepatan sinkronisasi: broadcast instan zero-delay via Redis Pub/Sub dan snapshot agregasi periodik worst-wins untuk observability.'
  },
  {
    id: 'reactive-setup',
    number: '06',
    badge: 'REACTIVE SETUP & DYNAMIC BREAKERS',
    title: 'Implementasi Reactive: Resilience4j WebFlux & Dynamic Breakers On-the-Fly',
    subtitle: 'Setup non-blocking di Spring WebFlux, registrasi dinamis breaker L2 per-bank tanpa restart aplikasi, dan isolasi multi-service Redis.'
  },
  {
    id: 'testing-runbook',
    number: '07',
    badge: 'TESTING & OPERATIONAL RUNBOOK',
    title: 'Testing Automation, Observability & Self-Healing Operational Runbook',
    subtitle: 'Simulasi via Redis CLI, script otomasi pengujian, MDC context logging untuk audit ELK, dan siklus pemulihan otomatis (self-healing).'
  }
];

const PDF_TITLE = 'QRIS MPM - 2-Layer Circuit Breaker & Redis Sync Architecture';

const PRINT_CSS = `
.qris-cb-print-root { display: none; }
@media print {
  @page { size: 13.333in 7.5in; margin: 0; }
  html, body { overflow: visible !important; height: auto !important; background: var(--bg) !important; }
  body > *:not(.qris-cb-print-root) { display: none !important; }
  .qris-cb-print-root {
    display: block;
    font-family: var(--font-sans);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .qris-cb-print-slide {
    box-sizing: border-box;
    width: 13.333in;
    min-height: 7.5in;
    padding: 0.35in 0.55in 0.25in;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: var(--bg);
    break-after: page;
    page-break-after: always;
  }
  .qris-cb-print-slide:last-child { break-after: auto; page-break-after: auto; }
}
`;

const cardStyle = {
  padding: '16px 18px',
  borderRadius: '14px',
  background: 'var(--surface-sunken)',
  border: '1px solid var(--card-border)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const monoLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.5px'
};

const bodyText = { fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.6 };

function CardTitle({ icon: Icon, color = ACCENT, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Icon size={17} color={color} />
      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--folio-ink)' }}>{children}</h4>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul style={{ ...bodyText, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', margin: 0 }}>
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function CodeSnippet({ code, title = 'TERMINAL / LOG' }) {
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--card-border)', background: '#090d16' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 12px', background: '#131b2e', borderBottom: '1px solid #1f2a44' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>{title}</span>
        <div style={{ display: 'flex', gap: '5px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
        </div>
      </div>
      <pre style={{ margin: 0, padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: '#38bdf8', overflowX: 'auto', lineHeight: 1.5 }}>
        {code}
      </pre>
    </div>
  );
}

export default function QrisCbPresentationModal({ isOpen, onClose, initialFullscreen = false }) {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (isOpen && initialFullscreen) {
      const isCurrentlyFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isCurrentlyFs) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) elem.requestFullscreen().catch(() => {});
        else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      }
    }
  }, [isOpen, initialFullscreen]);

  useEffect(() => {
    let interval = null;
    if (isOpen) {
      interval = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
    } else {
      setElapsedSeconds(0);
      setCurrentSlide(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    soundFx.playCardClick();
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) await elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen toggle issue:', err);
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

  const handleExportPdf = () => {
    soundFx.playCardClick();
    const previousTitle = document.title;
    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener('afterprint', restoreTitle);
    };
    document.title = PDF_TITLE;
    window.addEventListener('afterprint', restoreTitle);
    window.print();
  };

  const nextSlide = () => {
    if (currentSlide < CHAPTERS.length - 1) {
      soundFx.playCardClick();
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      soundFx.playCardClick();
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (idx) => {
    soundFx.playCardClick();
    setCurrentSlide(idx);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement && !document.webkitFullscreenElement) {
        handleClose();
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (e.key === ' ') e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
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
  }, [isOpen, currentSlide, isFullscreen]);

  if (!isOpen) return null;

  const currentChapter = CHAPTERS[currentSlide];

  return (
    <>
      <style>{PRINT_CSS}</style>

      {/* Screen Presentation Modal */}
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 160,
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
            borderRadius: isFullscreen ? 0 : '20px',
            width: isFullscreen ? '100vw' : '100%',
            maxWidth: isFullscreen ? '100vw' : '1280px',
            height: isFullscreen ? '100vh' : '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: isFullscreen ? 'none' : '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <header
            style={{
              padding: '12px 20px',
              borderBottom: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              background: 'var(--surface-sunken)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: `${ACCENT}22`,
                  border: `1px solid ${ACCENT}55`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ACCENT
                }}
              >
                <ShieldAlert size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ ...monoLabel, color: ACCENT }}>FINTECH RESILIENCE ARCHITECTURE</span>
                  <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>•</span>
                  <span style={{ fontSize: '11.5px', color: 'var(--ink-muted)' }}>QRIS MPM Middleware</span>
                </div>
                <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--folio-ink)', margin: 0 }}>
                  2-Layer Circuit Breaker & Distributed Redis State Sync
                </h3>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                <Clock size={13} color="var(--ink-muted)" />
                <span style={{ ...monoLabel, color: 'var(--folio-ink)' }}>{formatTimer(elapsedSeconds)}</span>
              </div>
              <button
                type="button"
                onClick={handleExportPdf}
                title="Unduh / Print Slide sebagai PDF Widescreen"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--surface-card)', color: 'var(--folio-ink)', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
              >
                <FileDown size={14} color={ACCENT} />
                <span>PDF Export</span>
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                title="Layar Penuh (F)"
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--surface-card)', color: 'var(--folio-ink)', cursor: 'pointer' }}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                type="button"
                onClick={handleClose}
                title="Tutup (Esc)"
                style={{ padding: '6px', borderRadius: '6px', border: '1px solid var(--card-border)', background: 'var(--surface-card)', color: 'var(--folio-ink)', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>
          </header>

          {/* Slide Progress Indicator Bar */}
          <div style={{ height: '3px', background: 'var(--card-border)', width: '100%' }}>
            <div
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${ACCENT}, #38bdf8)`,
                width: `${((currentSlide + 1) / CHAPTERS.length) * 100}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          {/* Main Slide Content Canvas */}
          <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Slide Title Header */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ ...monoLabel, color: ACCENT, padding: '2px 8px', borderRadius: '4px', background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40` }}>
                  CHAPTER {currentChapter.number} • {currentChapter.badge}
                </span>
                <span style={{ ...monoLabel, color: 'var(--ink-muted)' }}>Slide {currentSlide + 1} of {CHAPTERS.length}</span>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--folio-ink)', margin: '4px 0 0', lineHeight: 1.3 }}>
                {currentChapter.title}
              </h2>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-muted)', margin: 0, lineHeight: 1.5 }}>
                {currentChapter.subtitle}
              </p>
            </div>

                                    {/* Slide 1: History & Evolution (Hystrix to Resilience4j) */}
            {currentSlide === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Interactive History Timeline & Comparison */}
                <HystrixVsResilience4jVisualizer />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_RED}` }}>
                    <CardTitle icon={AlertTriangle} color={ACCENT_RED}>Mengapa Netflix Hystrix Ditinggalkan?</CardTitle>
                    <BulletList
                      items={[
                        'Thread-Pool Overhead: Hystrix membungkus setiap breaker ke dalam thread pool OS terpisah. Pada 50+ endpoint, ratusan thread memicu CPU thrashing akibat context-switching.',
                        'Inkompatibel dengan Reactive: Arsitektur Netty / Spring WebFlux dirancang single-thread event loop per core. Memasang blocking thread pool Hystrix di atas WebFlux adalah arsitektural anti-pattern.',
                        'Monolithic & Deprecated: Netflix menghentikan pembaruan pada 2018 karena kompleksitas internal dan dependensi RxJava 1.x legacy.'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={CheckCircle2} color={ACCENT_GREEN}>Kemenangan Arsitektur Resilience4j</CardTitle>
                    <BulletList
                      items={[
                        'Zero-Thread Lock-Free: Menggunakan in-memory Atomic RingBitSet yang mengevaluasi failure rate di CPU L1/L2 cache tanpa context-switch OS.',
                        'WebFlux-Native: Dirancang khusus untuk functional reactive stream (Mono / Flux) tanpa memblokir thread I/O server Netty.',
                        'Modular & Ringan: Zero third-party dependencies, hanya mengimpor modul yang dibutuhkan (core, circuitbreaker, timelimiter).'
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Circuit Breaker & Resilience4j Fundamentals */}
            {currentSlide === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Interactive Animated Electric Fuse Schematic */}
                <CircuitBreakerFuseVisualizer />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={CheckCircle2} color={ACCENT_GREEN}>Kapan WAJIB Menggunakan Circuit Breaker?</CardTitle>
                    <BulletList
                      items={[
                        'Remote External Downstream: Transaksi ke Payment Switcher (ALTO/RINTIS), Core Banking, atau API Pihak Ketiga yang SLA jaringannya di luar kendali kita.',
                        'High-Latency Danger: Pemanggilan synchronous yang jika lambat (>2000ms) akan menahan thread server (Netty worker) hingga menyebabkan thread starvation.',
                        'Adanya Jalur Alternatif (Fallback): Sistem memiliki rute cadangan (misal: jika ALTO trip OPEN, traffic otomatis dialihkan ke RINTIS).',
                        'Cascading Failure Protection: Menjaga core microservice gateway tetap hidup melayani fitur lain meskipun downstream tertentu down.'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_RED}` }}>
                    <CardTitle icon={XCircle} color={ACCENT_RED}>Kapan JANGAN Menggunakan (Anti-Pattern)?</CardTitle>
                    <BulletList
                      items={[
                        'Internal Database Queries (PostgreSQL / MySQL): Jangan pasang CB pada database lokal! Gunakan Database Connection Pooling (HikariCP/R2DBC) & Query Timeout.',
                        'In-Memory Cache Lokal (Redis / Caffeine): Akses cache lokal berkecepatan sub-milidetik (<1ms). Memasang CB hanya menambah CPU overhead dan kompleksitas percuma.',
                        'Asynchronous Event / Queue (Kafka Consumers): Pada message consumer, gunakan Retry Topics dan Dead Letter Queue (DLQ), bukan Circuit Breaker.',
                        'Stateless Non-Critical Ops: Pemanggilan yang murni idempotent dan cepat di mana simple retry sudah cukup menyelesaikan masalah.'
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: The Multi-Pod Problem */}
            {currentSlide === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_RED}` }}>
                    <CardTitle icon={AlertTriangle} color={ACCENT_RED}>The In-Memory Isolation Trap</CardTitle>
                    <BulletList
                      items={[
                        'Resilience4j menyimpan metrik (call counter, sliding window, failure rate) secara murni di JVM Heap lokal masing-masing Pod.',
                        'Di Kubernetes cluster dengan 4 pods aktif, Ingress Load Balancer membagi traffic secara Round-Robin atau Least-Connections.',
                        'Ketika Switcher ALTO mendadak putus koneksi, hanya Pod 1 yang mendeteksi failure threshold (>90%) dan CB lokalnya berubah menjadi OPEN.',
                        'Pod 2, Pod 3, dan Pod 4 masih CLOSED karena kuota sliding window lokal mereka belum terpenuhi!'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_ORANGE}` }}>
                    <CardTitle icon={Flame} color={ACCENT_ORANGE}>Dampak Fatal jika Tanpa State Sync</CardTitle>
                    <BulletList
                      items={[
                        'Cascading Failure: Jutaan nasabah blue/BCA Digital tetap diarahkan oleh LB ke Pod 2, 3, dan 4.',
                        'Resource Starvation: Thread reactor & socket connection di Pod 2, 3, 4 terkunci menunggu timeout downstream (2-5 detik per request).',
                        'Inconsistent Failover: Nasabah yang kebetulan masuk Pod 1 langsung failover ke RINTIS, sedangkan nasabah di Pod 2 stuck dan transaksi gagal.',
                        'Solusi Wajib: Distributed State Propagation dengan latensi mendekati nol (< 5 milidetik).'
                      ]}
                    />
                  </div>
                </div>

                <div style={cardStyle}>
                  <CardTitle icon={ArrowRightLeft} color={ACCENT}>Visualisasi Asimetri Multi-Pod Tanpa Sync</CardTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '4px' }}>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#ef444415', border: '1px solid #ef444440', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: ACCENT_RED }}>POD 1 (Detector)</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: ACCENT_RED, margin: '6px 0' }}>OPEN (Trip)</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Failover ke RINTIS aktif ✅</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#38bdf810', border: '1px solid #38bdf830', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: '#38bdf8' }}>POD 2 (Blind)</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8', margin: '6px 0' }}>CLOSED ⚠️</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Masih menembak ALTO mati ❌</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#38bdf810', border: '1px solid #38bdf830', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: '#38bdf8' }}>POD 3 (Blind)</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8', margin: '6px 0' }}>CLOSED ⚠️</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Masih menembak ALTO mati ❌</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#38bdf810', border: '1px solid #38bdf830', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: '#38bdf8' }}>POD 4 (Blind)</div>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#38bdf8', margin: '6px 0' }}>CLOSED ⚠️</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Masih menembak ALTO mati ❌</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4: 2-Layer CB Architecture */}
            {currentSlide === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Interactive Animated Packet Flow Visualizer */}
                <FailoverPacketFlowVisualizer />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderTop: `4px solid ${ACCENT}` }}>
                    <CardTitle icon={Layers} color={ACCENT}>Layer 1: Global Switcher CB</CardTitle>
                    <div style={{ ...monoLabel, color: ACCENT }}>Breaker: "alto" | "rintis"</div>
                    <BulletList
                      items={[
                        'Scope Makro: Melindungi core network fisik & VPN tunnel switcher.',
                        'Dampak Trip: Jika L1 Global ALTO OPEN, sistem membelokkan 100% volume pembayaran QRIS ke switcher RINTIS.',
                        'Fast Fail: Menghilangkan overhead connection timeout jaringan 3000ms menjadi fast-switch < 1ms.'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderTop: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={Cpu} color={ACCENT_GREEN}>Layer 2: Granular NNS CB</CardTitle>
                    <div style={{ ...monoLabel, color: ACCENT_GREEN }}>{'Breaker: "alto-nns-{nns}" | "rintis-nns-{nns}"'}</div>
                    <BulletList
                      items={[
                        'Scope Mikro: Melindungi transaksi spesifik per Bank Issuer (NNS 8 digit: Mandiri 93600008, BCA 93600014).',
                        'Fault Isolation: Jika Bank Mandiri gangguan di ALTO, hanya breaker "alto-nns-93600008" yang trip ke OPEN!',
                        'High Availability: Transaksi ke BCA & BRI TETAP normal via ALTO. Hanya Mandiri yang dialihkan ke RINTIS!'
                      ]}
                    />
                  </div>
                </div>

                <div style={cardStyle}>
                  <CardTitle icon={Activity} color={ACCENT_PURPLE}>Hierarchical Evaluation di QrMpmPaymentFailoverService</CardTitle>
                  <CodeSnippet
                    title="DECISION ENGINE EVALUATION ORDER"
                    code={`// 1. Periksa L1 Global CB untuk ALTO
CircuitBreaker altoGlobal = getCircuitBreaker("alto");
// 2. Periksa L2 Granular NNS CB untuk Bank Issuer tujuan
CircuitBreaker altoNns = getCircuitBreaker("alto-nns-" + nns);

if (altoGlobal.getState() == OPEN || altoNns.getState() == OPEN) {
    log.warn("ALTO breaker is OPEN (Global={} / NNS={}) - activating failover to RINTIS",
             altoGlobal.getState(), altoNns.getState());
    return executePaymentViaRintis(request, nns); // Otomatis Failover ke Secondary
}
return executePaymentViaAlto(request, nns); // Jalur Utama`}
                  />
                </div>
              </div>
            )}

            {/* Slide 5: Redis Dual-Tier Sync */}
            {currentSlide === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT}` }}>
                    <CardTitle icon={Radio} color={ACCENT}>Tier 1: Instant State Sync (Redis Pub/Sub)</CardTitle>
                    <BulletList
                      items={[
                        'Channel: "qris:cb:state:events" (Zero-delay push notifications).',
                        'Payload Format: "<cbName>:<targetState>:<sourcePod>" (misal: "alto:OPEN:orch-qris-pod-1").',
                        'Self-Echo Prevention: Setiap pod memeriksa sourcePod. Jika pesan berasal dari dirinya sendiri (this.podName.equals(sourcePod)), broadcast diabaikan untuk memutus infinite broadcast loop.',
                        'Instant Cut-Off: Pod lain yang subscribe langsung memanggil cb.transitionToOpenState() seketika!'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={Database} color={ACCENT_GREEN}>Tier 2: Fleet Metric Snapshot (Redis Hash)</CardTitle>
                    <BulletList
                      items={[
                        'Key Pattern: "cb:snapshot:{podName}" dengan TTL 15 detik.',
                        'Interval Publish: Setiap 5000ms menulis seluruh metrik registry pod ke dalam Redis Hash.',
                        'Aggregator Endpoint: GET /orch/qris/api/v1/circuit-breaker/status memindai seluruh pod aktif via SCAN cb:snapshot:*.',
                        'Worst-Wins Rule: Menjumlahkan calls, menghitung ulang failure rate gabungan, dan menetapkan status terburuk (jika ada 1 pod OPEN, armada = OPEN).'
                      ]}
                    />
                  </div>
                </div>

                <div style={cardStyle}>
                  <CardTitle icon={Terminal} color={ACCENT_GREEN}>Uji Empiris Bukti Sinkronisasi Lintas Pod (Live Terminal Log)</CardTitle>
                  <CodeSnippet
                    title="HASIL UJI PUBLISH REDIS CLI vs SUBSCRIBER LOG POD"
                    code={`# 1. Trigger broadcast dari Redis CLI:
10.121.89.9:7967> AUTH redorch Bcabca01
10.121.89.9:7967> PUBLISH qris:cb:state:events "alto:OPEN:cli-test-pod"
(integer) 2   <-- Diterima oleh 2 Pod yang sedang listen!

# 2. Log Pod Kubernetes (orch-qris-77bc6c8786-5gjbm):
10:37:10.892 WARN [CB-SYNC] Received remote trip event from pod='cli-test-pod' for breaker='alto'. Transitioning local CB to OPEN!
10:37:10.905 WARN [CB-SYNC] Local breaker 'alto' tripped to OPEN! Broadcasting to Redis channel='qris:cb:state:events': alto:OPEN:orch-qris-77bc6c8786-5gjbm`}
                  />
                </div>
              </div>
            )}

            {/* Slide 6: Reactive Setup & Dynamic Breakers */}
            {currentSlide === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT}` }}>
                    <CardTitle icon={Zap} color={ACCENT}>Non-Blocking Reactive Setup (Spring WebFlux)</CardTitle>
                    <BulletList
                      items={[
                        'Zero-Blocking Core: Terintegrasi murni di reactive stream (Mono / Flux) tanpa memanggil .block() atau .get() yang dapat mengunci event-loop Netty.',
                        'Dedicated Schedulers: Listener Pub/Sub Redis dan eksekusi event publisher dijalankan di Schedulers.boundedElastic() agar IO thread tetap responsif.',
                        'Resilient Subscription: Redis listener dilengkapi auto-retry dan onErrorResume() sehingga koneksi Pub/Sub pulih otomatis saat Redis restart.',
                        'Self-Echo Prevention: Pod mengabaikan pesan dari podName dirinya sendiri untuk memutus infinite broadcast loop di cluster.'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={Cpu} color={ACCENT_GREEN}>Dynamic L2 NNS Registration On-The-Fly</CardTitle>
                    <BulletList
                      items={[
                        'Tanpa Pre-Config YAML: Ratusan NNS bank penerima (93600008, 93600014, dll.) tidak perlu didaftarkan secara statis di application.yaml.',
                        'On-Demand Instantiation: Saat transaksi pembayaran masuk, getOrCreateNnsBreaker(nns) memeriksa registry; jika belum ada, instance di-spawn dinamis dari template config L1.',
                        'Lifecycle Auto-Binding: Setiap breaker dinamis yang lahir langsung terikat ke listener sinkronisasi via registry.getEventPublisher().onEntryAdded().',
                        'Fleet-Wide Auto Snapshot: Snapshot publisher (Flux.interval 5s) otomatis mengiterasi seluruh dynamic breaker yang aktif untuk diunggah ke Redis Hash.'
                      ]}
                    />
                  </div>
                </div>

                <div style={cardStyle}>
                  <CardTitle icon={Layers} color={ACCENT_PURPLE}>Multi-Service Namespace & Sliding Window Parameters</CardTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <div style={{ ...monoLabel, color: ACCENT }}>Sliding Window Config</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-body)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span>• Type: <strong>COUNT_BASED</strong> (300 calls)</span>
                        <span>• Min Calls: <strong>3 calls</strong> (Fast Trip)</span>
                        <span>• Threshold: <strong>90.0%</strong> failure rate</span>
                        <span>• Wait Duration: <strong>15-30s</strong> in OPEN</span>
                      </div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <div style={{ ...monoLabel, color: ACCENT_GREEN }}>QRIS MPM Namespace</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-body)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span>• Channel: <code style={{ color: '#38bdf8' }}>qris:cb:state:events</code></span>
                        <span>• Snapshot: <code style={{ color: '#38bdf8' }}>cb:snapshot:orch-qris-*</code></span>
                        <span>• L1 Breakers: <code style={{ color: '#38bdf8' }}>alto, rintis</code></span>
                        <span>• L2 Breakers: <code style={{ color: '#38bdf8' }}>alto-nns-*, rintis-nns-*</code></span>
                      </div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <div style={{ ...monoLabel, color: ACCENT_ORANGE }}>Fund Transfer Namespace</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-body)', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <span>• Channel: <code style={{ color: '#f59e0b' }}>ft:cb:state:events</code></span>
                        <span>• Snapshot: <code style={{ color: '#f59e0b' }}>cb:ft:snapshot:*</code></span>
                        <span>• L1 Breakers: <code style={{ color: '#f59e0b' }}>online-switching-alto, rintis, bifast</code></span>
                        <span>• L2 Breakers: <code style={{ color: '#f59e0b' }}>online-switching-alto-bank-*</code></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 7: Testing & Operational Runbook */}
            {currentSlide === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT}` }}>
                    <CardTitle icon={Terminal} color={ACCENT}>Simulasi Uji Coba Tanpa Mengorbankan Partner</CardTitle>
                    <BulletList
                      items={[
                        'Zero Partner Outage: Pengujian failover dapat dilakukan kapan pun di environment live tanpa harus mematikan koneksi fisik/VPN switcher ALTO & RINTIS.',
                        'Simulasi Redis CLI: Mengirim event trip secara langsung: PUBLISH qris:cb:state:events "alto:OPEN:cli-test-pod". Seluruh pod langsung sinkron dalam < 5ms.',
                        'Control Panel Manual Override: UI menyediakan tombol Force Open & Reset untuk kebutuhan mitigasi insiden operasional tim IT Ops.',
                        'Verifikasi Snapshot: Metrik HGET cb:snapshot:<pod> alto langsung mencerminkan state OPEN secara real-time.'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={Activity} color={ACCENT_GREEN}>Automated Verification & Banking Log Audit</CardTitle>
                    <BulletList
                      items={[
                        'Script Otomasi Mandiri (automate-cb-sync.js): Menjalankan full cycle test otomatis: Discovery Pods (KEYS) ➔ Inspect HGETALL ➔ Publish Trip ➔ Verify Sync ➔ Auto-Restore ke CLOSED.',
                        'MDC Context Injection: Memasang MDC.put("elkFlag", "ELKORCH1") pada thread context agar log [CB-SYNC] lolos filter dan tercatat permanen di transaction.log.',
                        'Audit Trail Perbankan: Setiap transisi status memiliki timestamp ISO-8601, pod sumber, dan identitas trigger untuk kebutuhan audit regulasi perbankan.',
                        'Cluster Aggregation Endpoint: GET /api/v1/circuit-breaker/status menerapkan logika "Worst-Wins" (jika 1 pod OPEN, seluruh cluster dilaporkan OPEN).'
                      ]}
                    />
                  </div>
                </div>

                <div style={cardStyle}>
                  <CardTitle icon={RefreshCw} color={ACCENT_PURPLE}>Siklus Self-Healing Otomatis (Auto-Recovery Lifecycle)</CardTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#10b98115', border: '1px solid #10b98140', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: ACCENT_GREEN }}>FASE 1: NORMAL</div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: ACCENT_GREEN, margin: '6px 0' }}>CLOSED</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>100% Traffic dialirkan ke ALTO (Primary).</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#ef444415', border: '1px solid #ef444440', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: ACCENT_RED }}>FASE 2: TRIP & FAILOVER</div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: ACCENT_RED, margin: '6px 0' }}>OPEN (Sync)</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Failure rate &gt; 90%. 100% dialihkan ke RINTIS.</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#f59e0b15', border: '1px solid #f59e0b40', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: ACCENT_ORANGE }}>FASE 3: TEST PROBE</div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: ACCENT_ORANGE, margin: '6px 0' }}>HALF-OPEN</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Setelah 15s, kirim 10 panggilan uji ke ALTO.</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: '#38bdf815', border: '1px solid #38bdf840', textAlign: 'center' }}>
                      <div style={{ ...monoLabel, color: '#38bdf8' }}>FASE 4: SELF-HEAL</div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#38bdf8', margin: '6px 0' }}>AUTO RECOVER</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>Jika probe sukses, otomatis kembali ke CLOSED!</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Bottom Navigation & Chapter Thumbnails Bar */}
          <footer
            style={{
              padding: '12px 24px',
              borderTop: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              background: 'var(--surface-sunken)'
            }}
          >
            {/* Chapter Thumbnails */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
              {CHAPTERS.map((ch, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: isActive ? `${ACCENT}25` : 'var(--surface-card)',
                      border: isActive ? `1.5px solid ${ACCENT}` : '1px solid var(--card-border)',
                      color: isActive ? ACCENT : 'var(--ink-muted)',
                      fontSize: '12px',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>{ch.number}</span>
                    <span style={{ fontSize: '11px', opacity: 0.85 }}>{ch.badge.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--card-border)',
                  background: currentSlide === 0 ? 'transparent' : 'var(--surface-card)',
                  color: currentSlide === 0 ? 'var(--ink-faint)' : 'var(--folio-ink)',
                  cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 600
                }}
              >
                <ChevronLeft size={16} />
                <span>Prev</span>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentSlide === CHAPTERS.length - 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: currentSlide === CHAPTERS.length - 1 ? 'var(--surface-card)' : ACCENT,
                  color: currentSlide === CHAPTERS.length - 1 ? 'var(--ink-faint)' : '#ffffff',
                  cursor: currentSlide === CHAPTERS.length - 1 ? 'not-allowed' : 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  boxShadow: currentSlide === CHAPTERS.length - 1 ? 'none' : `0 4px 14px ${ACCENT}55`
                }}
              >
                <span>{currentSlide === CHAPTERS.length - 1 ? 'Selesai' : 'Next Slide'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* Print-Only Widescreen Slide Deck Layout */}
      <div className="qris-cb-print-root">
        {CHAPTERS.map((ch, idx) => (
          <div key={ch.id} className="qris-cb-print-slide">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
              <span style={{ ...monoLabel, color: ACCENT }}>QRIS MPM ARCHITECTURE • CHAPTER {ch.number}</span>
              <span style={{ ...monoLabel, color: '#64748b' }}>BCA Digital • Technical Sharing Session</span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0', color: '#0f172a' }}>{ch.title}</h2>
            <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 10px' }}>{ch.subtitle}</p>

            {idx === 6 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={AlertTriangle} color={ACCENT_RED}>The In-Memory Isolation Trap</CardTitle>
                  <BulletList items={['Resilience4j menyimpan metrik lokal di JVM masing-masing Pod.', 'Load Balancer me-route traffic secara round-robin ke 4 pods.', 'Saat ALTO mati, hanya Pod 1 yang trip ke OPEN; Pod 2, 3, dan 4 masih CLOSED!', 'Nasabah di Pod 2-4 tetap menembak ALTO dan mengalami latency timeout parah.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={Flame} color={ACCENT_ORANGE}>Dampak Fatal & Solusi</CardTitle>
                  <BulletList items={['Cascading failure & thread exhaustion di pod-pod yang blind.', 'Inkonsistensi failover per nasabah.', 'Solusi: Distributed state propagation instan via Redis Pub/Sub dalam hitungan milidetik.']} />
                </div>
              </div>
            )}

                                    {idx === 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={AlertTriangle} color={ACCENT_RED}>Sejarah: Mengapa Hystrix Dipensiunkan</CardTitle>
                  <BulletList items={['2007: Michael Nygard memperkenalkan pola Circuit Breaker di buku Release It!.', '2012: Netflix merilis Hystrix, namun bergantung pada dedicated thread pool per breaker.', 'Thread-pool isolation memicu CPU context switching berat dan tidak cocok untuk stack reactive.', '2018: Netflix resmi memensiunkan Hystrix dan menyarankan migrasi ke Resilience4j.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={CheckCircle2} color={ACCENT_GREEN}>Keunggulan Modern Resilience4j</CardTitle>
                  <BulletList items={['Lock-free Atomic RingBitSet: Evaluasi failure rate di in-memory cache tanpa thread pool tambahan.', 'Reactive-native: Kompatibel sempurna dengan Spring WebFlux (Mono/Flux) dan Netty event loop.', 'Zero third-party dependencies, modular, dan standar resmi Spring Cloud CircuitBreaker.']} />
                </div>
              </div>
            )}

            {idx === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={ShieldAlert} color={ACCENT}>Filosofi Sekering & Mengapa Resilience4j</CardTitle>
                  <BulletList items={['Analogi sekering: Memutus aliran request sebelum seluruh sistem thread starvation.', 'Fail-fast: Menolak dalam 1ms daripada menahan thread berdetik-detik.', 'Modern reactive library untuk Spring WebFlux (penerus resmi Hystrix).']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={CheckCircle2} color={ACCENT_GREEN}>Kapan Perlu vs Anti-Pattern</CardTitle>
                  <BulletList items={['WAJIB: Remote external payment switcher (ALTO/RINTIS) & downstream dengan fallback.', 'ANTI-PATTERN: Internal database (gunakan pool/timeout), cache in-memory lokal (Redis <1ms), dan async queue (Kafka DLQ).']} />
                </div>
              </div>
            )}

            {idx === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Layers} color={ACCENT}>Layer 1: Global Switcher CB</CardTitle>
                  <BulletList items={['Scope Makro: Melindungi core network switcher ("alto" / "rintis").', 'Jika ALTO down total, 100% pembayaran dialihkan ke RINTIS.', 'Fast Fail: Mencegah delay timeout 3000ms menjadi fast-switch < 1ms.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={Cpu} color={ACCENT_GREEN}>Layer 2: Granular NNS CB</CardTitle>
                  <BulletList items={['Scope Mikro: Melindungi transaksi per Bank Issuer ("alto-nns-{nns}").', 'Jika Bank Mandiri gangguan di ALTO, hanya NNS Mandiri yang trip OPEN.', 'Transaksi ke BCA, BRI, BNI tetap normal via ALTO. Hanya Mandiri yang failover ke RINTIS!']} />
                </div>
              </div>
            )}

            {idx === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Radio} color={ACCENT}>Tier 1: Real-Time Event Pub/Sub</CardTitle>
                  <BulletList items={['Channel: qris:cb:state:events.', 'Payload: <cbName>:OPEN:<sourcePod>.', 'Self-filtering mencegah echo broadcast loop.', 'Pod penerima langsung memaksa CB lokalnya OPEN dalam milidetik.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={Database} color={ACCENT_GREEN}>Tier 2: Fleet Snapshot Aggregator</CardTitle>
                  <BulletList items={['Key: cb:snapshot:{podName} (TTL 15s).', 'Publish tiap 5000ms untuk observability.', 'GET /api/v1/circuit-breaker/status menggabungkan seluruh pod dengan aturan worst-wins.']} />
                </div>
              </div>
            )}

            {idx === 4 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Zap} color={ACCENT}>Non-Blocking Reactive Setup</CardTitle>
                  <BulletList items={['Murni non-blocking di pipeline Mono/Flux tanpa pemanggilan .block() atau .get().', 'Schedulers.boundedElastic() untuk Redis subscriber & event publisher.', 'Self-echo prevention memutus infinite broadcast loop di K8s cluster.', 'Isolasi namespace Redis memisahkan QRIS MPM (qris:cb:*) dan Fund Transfer (ft:cb:*).']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={Cpu} color={ACCENT_GREEN}>Dynamic L2 NNS Registration</CardTitle>
                  <BulletList items={['Ratusan NNS bank penerima di-spawn secara dinamis saat transaksi masuk (on-demand).', 'Tidak memerlukan deklarasi statis di application.yaml ataupun container restart.', 'Instance baru otomatis terikat ke sync listener via onEntryAdded().', 'Fleet snapshot periodik otomatis mengunggah metrik seluruh dynamic breaker ke Redis.']} />
                </div>
              </div>
            )}

            {idx === 5 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Terminal} color={ACCENT}>Simulasi Uji Coba & Automation</CardTitle>
                  <BulletList items={['Simulasi via Redis CLI: PUBLISH qris:cb:state:events "alto:OPEN:cli-test-pod" tanpa mematikan partner live.', 'Script otomasi automate-cb-sync.js: Scan pods, check metrik, publish trip, verifikasi, dan auto-restore.', 'Control Panel visual trigger untuk tim operasional IT Ops saat mitigasi insiden.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={Activity} color={ACCENT_GREEN}>Banking Audit Log & Self-Healing</CardTitle>
                  <BulletList items={['Injeksi MDC elkFlag=ELKORCH1 memastikan log [CB-SYNC] tercatat di transaction.log.', 'Audit trail lengkap dengan ISO-8601 timestamp dan pod identifier untuk compliance perbankan.', 'Self-healing otomatis: CLOSED -> OPEN -> HALF-OPEN (probe test) -> CLOSED tanpa intervensi manual.', 'API status cluster aggregator mengadopsi prinsip "Worst-Wins" untuk observability Control Panel.']} />
                </div>
              </div>
            )}

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', borderTop: '1px solid #cbd5e1', paddingTop: '6px' }}>
              <span>Slide {idx + 1} of {CHAPTERS.length}</span>
              <span>Muhammad Rifai • Junior IT Middleware Developer • blu by BCA Digital</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
