import React, { useState, useEffect, useRef } from 'react';
import {
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2,
  ShieldAlert, RefreshCw, Zap, Server, Activity, Database, CheckCircle2,
  XCircle, AlertTriangle, Layers, Terminal, FileDown, Cpu, ArrowRightLeft,
  Flame, Gauge, Radio, Sparkles, Filter, Bug, FastForward
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const ACCENT = '#00a4e4'; // Digital Blue (blu by BCA Digital)
const ACCENT_GREEN = '#10b981';
const ACCENT_RED = '#ef4444';
const ACCENT_ORANGE = '#f59e0b';
const ACCENT_PURPLE = '#8b5cf6';

const CHAPTERS = [
  {
    id: 'problem',
    number: '01',
    badge: 'DISTRIBUTED SYSTEMS CHALLENGE',
    title: 'The Multi-Pod Problem: Mengapa In-Memory Circuit Breaker Saja Gagal?',
    subtitle: 'Di balik deployment Kubernetes 4-pod high-throughput QRIS MPM: bahaya asimetri status CB lokal dan cascading failover latency.'
  },
  {
    id: 'architecture',
    number: '02',
    badge: '2-LAYER FAILOVER ARCHITECTURE',
    title: 'Arsitektur 2-Layer CB: Global Switcher vs Granular NNS Isolation',
    subtitle: 'Mencegah pemadaman massal dengan isolasi kegagalan bertingkat: saat Bank X gangguan di ALTO, hanya rute Bank X yang dialihkan ke RINTIS.'
  },
  {
    id: 'redis-sync',
    number: '03',
    badge: 'REDIS DUAL-TIER SYNC',
    title: 'Redis Dual-Tier: Real-Time Event Pub/Sub & Fleet Snapshot Aggregator',
    subtitle: 'Dua kecepatan sinkronisasi: broadcast instan zero-delay via Redis Pub/Sub dan snapshot agregasi periodik worst-wins untuk observability.'
  },
  {
    id: 'post-mortem',
    number: '04',
    badge: 'ROOT CAUSE ANALYSIS & PERF TUNING',
    title: 'Post-Mortem: Bug Prefix Memory Leak & 20ms Latency Tuning',
    subtitle: 'Pembedahan bug regex alternation (cb-|cb-qris-) yang melahirkan instance memory qris-qris-alto, serta optimasi fast-return & in-memory caching.'
  },
  {
    id: 'guidelines',
    number: '05',
    badge: 'PRODUCTION INVARIANTS',
    title: 'Key Invariants: Log Hygiene & Operational Excellence',
    subtitle: 'Pembersihan 50KB log noise GET NNS, audit trail write ops, dan 5 hukum invariansi distributed resilience untuk payment gateway modern.'
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

            {/* Slide 1: The Multi-Pod Problem */}
            {currentSlide === 0 && (
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

            {/* Slide 2: 2-Layer CB Architecture */}
            {currentSlide === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderTop: `4px solid ${ACCENT}` }}>
                    <CardTitle icon={Layers} color={ACCENT}>Layer 1: Global Switcher CB</CardTitle>
                    <div style={{ ...monoLabel, color: ACCENT }}>Breaker: "alto" | "rintis"</div>
                    <BulletList
                      items={[
                        'Scope Makro: Melindungi core network, VPN tunnel, dan infrastruktur fisik switcher.',
                        'Threshold: slidingWindow=300 calls, failureRateThreshold=90%, minimumCalls=3.',
                        'Dampak Trip: Jika L1 Global ALTO OPEN, sistem langsung membelokkan seluruh volume pembayaran QRIS ke switcher RINTIS tanpa mencoba ALTO sama sekali.',
                        'Fast Fail: Menghilangkan overhead connection timeout jaringan 3000ms menjadi fast-switch < 1ms.'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderTop: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={Cpu} color={ACCENT_GREEN}>Layer 2: Granular NNS CB</CardTitle>
                    <div style={{ ...monoLabel, color: ACCENT_GREEN }}>Breaker: "alto-nns-{nns}" | "rintis-nns-{nns}"</div>
                    <BulletList
                      items={[
                        'Scope Mikro: Melindungi transaksi spesifik per Bank Issuer / Acquirer via National Numbering System (NNS 8 digit).',
                        'Contoh NNS: 93600008 (Mandiri), 93600014 (BCA), 93600002 (BRI), 93600009 (BNI).',
                        'Fault Isolation: Jika Bank Mandiri mengalami gangguan internal di switcher ALTO, hanya breaker "alto-nns-93600008" yang trip ke OPEN!',
                        'High Availability: Transaksi nasabah ke BCA, BRI, dan BNI TETAP diproses lewat ALTO. Hanya transaksi Mandiri yang dialihkan ke RINTIS!'
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
    return executePaymentViaRintis(request, nns); // Otomatis Failover
}
return executePaymentViaAlto(request, nns); // Jalur Utama`}
                  />
                </div>
              </div>
            )}

            {/* Slide 3: Redis Dual-Tier Sync */}
            {currentSlide === 2 && (
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

            {/* Slide 4: Root Cause Analysis & Perf Tuning */}
            {currentSlide === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_RED}` }}>
                    <CardTitle icon={Bug} color={ACCENT_RED}>Bug: The Prefix Alternation Regex Leak</CardTitle>
                    <BulletList
                      items={[
                        'Gejala: Setiap klik Force Open/Reset di dashboard Control Panel, muncul instance liar baru: "qris-alto", "qris-qris-alto", dst.',
                        'Root Cause: Backend Control Panel menggunakan regex: id.replaceAll("^(cb-|cb-qris-)", "").',
                        'Karena "cb-" diletakkan di depan "cb-qris-", engine regex mencocokkan "cb-" duluan! String "cb-qris-alto" hanya dipotong "cb-", menyisakan "qris-alto".',
                        'Spring Actuator otomatis meng-instantiate breaker baru bernama "qris-alto" di memory microservice!'
                      ]}
                    />
                  </div>

                  <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT_GREEN}` }}>
                    <CardTitle icon={CheckCircle2} color={ACCENT_GREEN}>Solusi: Hierarchical Trimming & Sanitasi</CardTitle>
                    <BulletList
                      items={[
                        'Metode extractCleanName(id): Mengecek prefix spesifik (cb-qris-, cb-ft-) terlebih dahulu sebelum prefix umum (cb-).',
                        'Defensive Regex Cleanup: clean.replaceAll("^(qris-)+(alto|rintis.*)", "$2") menormalkan instance tercemar kembali ke "alto".',
                        'Dashboard Filtering: Otomatis men-skip instance berawalan "qris-alto" atau "qris-qris-" dari response UI.',
                        'Auto-Flush Lifecycle: Pod menghapus key snapshot dirinya di Redis saat shutdown (@PreDestroy) & startup.'
                      ]}
                    />
                  </div>
                </div>

                <div style={cardStyle}>
                  <CardTitle icon={FastForward} color={ACCENT}>Optimasi Latensi Dashboard: Dari 4000ms Menjadi &lt; 20ms</CardTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <div style={{ ...monoLabel, color: ACCENT_RED }}>Problem #1: Double-Fetch</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-body)', marginTop: '4px' }}>
                        performOverride memanggil getInstances() sinkron, lalu frontend memanggilnya lagi. <strong>Solusi: Fast-Return DTO instan tanpa re-query.</strong>
                      </div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <div style={{ ...monoLabel, color: ACCENT_RED }}>Problem #2: FT Timeout</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-body)', marginTop: '4px' }}>
                        Tembakan ke service Fund Transfer yang mati menunggu 2000ms. <strong>Solusi: Filter target service (hanya tembak QRIS saat di tab QRIS).</strong>
                      </div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <div style={{ ...monoLabel, color: ACCENT_RED }}>Problem #3: Heavy Master Data</div>
                      <div style={{ fontSize: '12px', color: 'var(--ink-body)', marginTop: '4px' }}>
                        Query ratusan NNS & tabel bank_codes tiap klik. <strong>Solusi: In-Memory Caching dengan TTL 5 menit (refresh on-demand).</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 5: Production Invariants */}
            {currentSlide === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={cardStyle}>
                    <CardTitle icon={Filter} color={ACCENT}>Log Hygiene: Takeout Masif GET NNS</CardTitle>
                    <BulletList
                      items={[
                        'InboundRequestLoggingFilter sebelumnya mencetak seluruh payload GET /api/v1/nns (+50KB JSON dump berisi ratusan bank) ke log console/ELK.',
                        'Dampak buruk: Memboroskan storage log aggregator, membuat lag container I/O, dan mengotori investigasi log transaksi riil.',
                        'Solusi Bersih: Query GET /nns di-bypass dari logging INBOUND & OUTBOUND. Internal logger diturunkan ke DEBUG.',
                        'Audit Trail Utuh: Operasi mutasi POST (Create), PUT (Update), dan DELETE TETAP dicatat 100% lengkap dengan request body & response.'
                      ]}
                    />
                  </div>

                  <div style={cardStyle}>
                    <CardTitle icon={ShieldAlert} color={ACCENT_GREEN}>5 Invariant Rules untuk Distributed CB</CardTitle>
                    <BulletList
                      items={[
                        'Rule 1: In-Memory CB lokal wajib dipasangkan dengan real-time distributed broadcast (Redis Pub/Sub).',
                        'Rule 2: Desain bertingkat (Layer 1 Global vs Layer 2 Granular) wajib dimiliki untuk mencegah pemadaman massal saat hanya 1 partner yang down.',
                        'Rule 3: Pisahkan jalur Fast State Synchronization (milidetik) dari jalur Full Metric Observability (detik).',
                        'Rule 4: Jangan izinkan Actuator endpoint membuat dynamic breaker secara tak terbatas tanpa input sanitization.',
                        'Rule 5: Semua read data master di dashboard manajemen harus menggunakan caching untuk melindungi SLA operasi.'
                      ]}
                    />
                  </div>
                </div>

                <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(0, 164, 228, 0.08), rgba(16, 185, 129, 0.08))', border: `1px solid ${ACCENT}40` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)', margin: 0 }}>
                        Siap untuk Sesi Sharing Teknikal &amp; Audit Arsitektur!
                      </h4>
                      <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', margin: '4px 0 0' }}>
                        Tekan tombol <strong>PDF Export</strong> di pojok kanan atas untuk mencetak slide ini ke format 16:9 PDF Widescreen.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ padding: '6px 12px', borderRadius: '8px', background: `${ACCENT}25`, border: `1px solid ${ACCENT}60`, color: ACCENT, fontSize: '12px', fontWeight: 700 }}>
                        QRIS MPM v1.2-STABLE
                      </span>
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

            {idx === 0 && (
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

            {idx === 1 && (
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

            {idx === 2 && (
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

            {idx === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Bug} color={ACCENT_RED}>Bug Regex Prefix Leak</CardTitle>
                  <BulletList items={['Alternation ^(cb-|cb-qris-) memotong cb- lebih dulu, menyisakan qris-alto.', 'Actuator Resilience4j membuat instance liar di runtime.', 'Solusi: extractCleanName berjenjang + sanitasi regex.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={FastForward} color={ACCENT}>Optimasi Latensi Dashboard (&lt; 20ms)</CardTitle>
                  <BulletList items={['Hapus double-fetch getInstances() di performOverride.', 'Eliminasi timeout 2s Fund Transfer.', 'In-memory caching master data NNS & Bank Codes dengan TTL 5 menit.']} />
                </div>
              </div>
            )}

            {idx === 4 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Filter} color={ACCENT}>Clean Log Hygiene</CardTitle>
                  <BulletList items={['Query GET /api/v1/nns (+50KB dump) di-takeout dari filter logging.', 'Hanya operasi mutasi POST, PUT, DELETE yang dicatat penuh untuk audit trail.']} />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={ShieldAlert} color={ACCENT_GREEN}>5 Invariant Rules</CardTitle>
                  <BulletList items={['1. Local CB wajib disinkronkan lintas pod via Redis Pub/Sub.', '2. Isolasi kegagalan bertingkat (L1 & L2) mencegah pemadaman massal.', '3. Pisahkan sinkronisasi cepat dari observability agregat.', '4. Sanitasi ketat input actuator.', '5. Caching master data di border API.']} />
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
