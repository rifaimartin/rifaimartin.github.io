import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, ChevronLeft, ChevronRight, Tv, Clock, Maximize2, Minimize2,
  FlaskConical, GitBranch, Ruler, BarChart3, Lightbulb, Users,
  CheckCircle2, XCircle, AlertTriangle, Network, Search, FileText, FileDown
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const ACCENT = '#a855f7';
const BASELINE_COLOR = '#38bdf8';
const GRAPHIFY_COLOR = '#a855f7';

const CHAPTERS = [
  {
    id: 'background',
    number: '01',
    badge: 'POC SETUP',
    title: 'Graphify vs Baseline: Apakah Knowledge Graph Membantu Cursor Agent?',
    subtitle: 'Dua salinan repo frontend internal pada commit yang sama. Satu dilengkapi knowledge graph graphify, satu tanpa graph. Semua faktor lain dibuat identik.'
  },
  {
    id: 'method',
    number: '02',
    badge: 'METODOLOGI',
    title: 'Cara Mengukur: Prompt Sama, Model Sama, Chat Baru',
    subtitle: 'Setiap prompt dijalankan di kedua repo dengan aturan yang sama, lalu dicatat token, jumlah file yang dibaca, tool call, dan akurasi terhadap kunci jawaban.'
  },
  {
    id: 'result',
    number: '03',
    badge: 'HASIL PROMPT #1',
    title: 'Trace Flow Fitur Retry: Hasilnya Seri',
    subtitle: 'Kedua agent menjawab sama akurat. Graphify membaca lebih sedikit file, tetapi total token yang terpakai justru lebih besar.'
  },
  {
    id: 'analysis',
    number: '04',
    badge: 'ANALISIS',
    title: 'Kenapa Bedanya Kecil, dan Di Mana Graph Memberi Nilai',
    subtitle: 'Fitur yang diuji terisolasi dan penamaannya konsisten, sehingga grep biasa sudah cukup. Graph unggul di insight struktural yang tidak terlihat dari satu file.'
  },
  {
    id: 'next',
    number: '05',
    badge: 'REKOMENDASI',
    title: 'Kolaborasi Tim & Langkah Berikutnya',
    subtitle: 'Apa yang di-commit ke repo agar graph bisa dipakai lintas tim, dan pengujian lanjutan sebelum memutuskan adopsi.'
  }
];

const RESULT_METRICS = [
  { label: 'Total token (dashboard)', baseline: 178.3, graphify: 205.4, unit: 'K', lowerIsBetter: true },
  { label: 'File dibaca (Read)', baseline: 10, graphify: 6, unit: '', lowerIsBetter: true },
  { label: 'Total tool call', baseline: 14, graphify: 12, unit: '', lowerIsBetter: true },
  { label: 'Context window terpakai', baseline: 14.2, graphify: 15.2, unit: '%', lowerIsBetter: true }
];

const PDF_TITLE = 'Graphify vs Baseline - POC Report';

// 16:9 pages (PowerPoint widescreen size); color-adjust keeps card backgrounds in the PDF.
const PRINT_CSS = `
.poc-print-root { display: none; }
@media print {
  @page { size: 13.333in 7.5in; margin: 0; }
  html, body { overflow: visible !important; height: auto !important; background: var(--bg) !important; }
  body > *:not(.poc-print-root) { display: none !important; }
  .poc-print-root {
    display: block;
    font-family: var(--font-sans);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .poc-print-slide {
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
  .poc-print-slide:last-child { break-after: auto; page-break-after: auto; }
  .poc-print-footer { margin-top: auto; font-family: var(--font-mono); font-size: 10px; color: var(--ink-faint); }
}
`;

const cardStyle = {
  padding: '18px 20px',
  borderRadius: '16px',
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

function MetricBar({ metric }) {
  const max = Math.max(metric.baseline, metric.graphify);
  const delta = ((metric.graphify - metric.baseline) / metric.baseline) * 100;
  const graphifyWins = metric.lowerIsBetter ? metric.graphify < metric.baseline : metric.graphify > metric.baseline;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--folio-ink)' }}>{metric.label}</span>
        <span style={{ ...monoLabel, color: graphifyWins ? '#10b981' : '#f59e0b' }}>
          Graphify {delta > 0 ? '+' : ''}{delta.toFixed(0)}%
        </span>
      </div>
      {[
        { name: 'Baseline', value: metric.baseline, color: BASELINE_COLOR },
        { name: 'Graphify', value: metric.graphify, color: GRAPHIFY_COLOR }
      ].map((row) => (
        <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ ...monoLabel, width: '68px', color: 'var(--ink-muted)' }}>{row.name}</span>
          <div style={{ flex: 1, height: '14px', borderRadius: '999px', background: 'var(--surface-card)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(row.value / max) * 100}%`,
                height: '100%',
                borderRadius: '999px',
                background: row.color,
                transition: 'width 0.4s ease'
              }}
            />
          </div>
          <span style={{ ...monoLabel, width: '64px', textAlign: 'right', color: 'var(--folio-ink)' }}>
            {row.value}{metric.unit}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function GraphifyPocReportModal({ isOpen, onClose, initialFullscreen = false }) {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (isOpen && initialFullscreen) {
      const isCurrentlyFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      if (!isCurrentlyFs) {
        const elem = containerRef.current || document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
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

  const handleExportPdf = () => {
    soundFx.playCardClick();
    // Browsers use document.title as the default PDF file name.
    const previousTitle = document.title;
    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener('afterprint', restoreTitle);
    };
    document.title = PDF_TITLE;
    window.addEventListener('afterprint', restoreTitle);
    window.print();
  };

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

  const goToSlide = (index) => {
    soundFx.playCardClick();
    setCurrentSlide(index);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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
  }, [isOpen, currentSlide, isFullscreen]);

  if (!isOpen) return null;

  const chapter = CHAPTERS[currentSlide];
  const isLast = currentSlide === CHAPTERS.length - 1;

  return (
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
          borderRadius: isFullscreen ? 0 : '24px',
          maxWidth: isFullscreen ? '100vw' : '1080px',
          width: '100%',
          height: isFullscreen ? '100vh' : '92vh',
          maxHeight: isFullscreen ? '100vh' : '880px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: isFullscreen ? 'none' : '0 32px 96px rgba(0,0,0,0.7)',
          position: 'relative'
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
                background: 'rgba(168, 85, 247, 0.12)',
                color: ACCENT,
                border: '1px solid rgba(168, 85, 247, 0.35)',
                ...monoLabel
              }}
            >
              <Tv size={12} />
              <span>{isFullscreen ? 'PRESENTATION MODE' : 'POC REPORT'}</span>
            </div>
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
              <Clock size={11} color={ACCENT} />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => goToSlide(idx)}
                style={{
                  width: idx === currentSlide ? '36px' : '10px',
                  height: '10px',
                  borderRadius: '999px',
                  backgroundColor: idx === currentSlide ? ACCENT : 'var(--card-border)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  padding: 0
                }}
                title={`Chapter ${idx + 1}: ${ch.title}`}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handleExportPdf}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: 'var(--surface-sunken)',
                color: 'var(--folio-ink)',
                border: '1px solid var(--card-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="Export semua slide ke PDF (pilih 'Save as PDF' di dialog print)"
            >
              <FileDown size={13} />
              <span>Export PDF</span>
            </button>
            <button
              onClick={toggleFullscreen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: isFullscreen ? 'rgba(168, 85, 247, 0.18)' : 'var(--surface-sunken)',
                color: isFullscreen ? ACCENT : 'var(--folio-ink)',
                border: isFullscreen ? `1px solid ${ACCENT}` : '1px solid var(--card-border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer'
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
                color: 'var(--ink)'
              }}
              title="Close Presentation (Esc)"
            >
              <X size={15} />
            </button>
          </div>
        </header>

        {/* Main Presentation Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: isFullscreen ? '40px max(32px, 8vw)' : '32px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: isFullscreen ? '1280px' : '100%',
            width: '100%',
            margin: isFullscreen ? '0 auto' : '0'
          }}
        >
          <ChapterHeader chapter={chapter} large={isFullscreen} />
          <SlideBody index={currentSlide} />
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
              opacity: currentSlide === 0 ? 0.4 : 1
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-muted)', fontWeight: 600 }}>
            Chapter {currentSlide + 1} of {CHAPTERS.length}
          </span>

          <button
            onClick={handleNext}
            disabled={isLast}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '10px',
              background: isLast ? 'var(--surface-card)' : ACCENT,
              border: '1px solid var(--card-border)',
              color: isLast ? 'var(--ink-faint)' : '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: isLast ? 'not-allowed' : 'pointer',
              opacity: isLast ? 0.4 : 1,
              boxShadow: isLast ? 'none' : '0 4px 14px rgba(168, 85, 247, 0.35)'
            }}
          >
            <span>Next Chapter</span>
            <ChevronRight size={16} />
          </button>
        </footer>
      </div>

      {/* All slides stacked one per page; only visible when printing */}
      {createPortal(
        <div className="poc-print-root" aria-hidden="true">
          <style>{PRINT_CSS}</style>
          {CHAPTERS.map((ch, idx) => (
            <section key={ch.id} className="poc-print-slide">
              <ChapterHeader chapter={ch} large />
              <SlideBody index={idx} />
              <div className="poc-print-footer">
                Graphify vs Baseline · POC Report — {idx + 1} / {CHAPTERS.length}
              </div>
            </section>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

function ChapterHeader({ chapter, large }) {
  return (
    <div>
      <span style={{ ...monoLabel, fontSize: '12px', color: ACCENT, letterSpacing: '1px' }}>
        CHAPTER {chapter.number} • {chapter.badge}
      </span>
      <h2
        style={{
          fontSize: large ? 'clamp(24px, 3.4vw, 36px)' : 'clamp(20px, 3.2vw, 28px)',
          fontWeight: 800,
          color: 'var(--folio-ink)',
          lineHeight: 1.3,
          margin: '8px 0'
        }}
      >
        {chapter.title}
      </h2>
      <p style={{ fontSize: large ? '16px' : '14.5px', color: 'var(--ink-body)', lineHeight: 1.6, maxWidth: '960px' }}>
        {chapter.subtitle}
      </p>
    </div>
  );
}

function SlideBody({ index }) {
  return (
    <>
          {/* SLIDE 1: Background & Setup */}
          {index === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT}` }}>
                <CardTitle icon={FlaskConical}>Pertanyaan POC</CardTitle>
                <p style={{ ...bodyText, fontSize: '14px' }}>
                  Kalau sebuah repo dilengkapi <strong>knowledge graph</strong> hasil graphify (peta relasi antar file,
                  modul, dan simbol), apakah Cursor agent menjadi <strong>lebih hemat token</strong>, <strong>lebih cepat</strong>,
                  dan <strong>lebih akurat</strong> dibanding agent yang hanya mengandalkan grep dan baca file?
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ ...cardStyle, border: `1.5px solid ${BASELINE_COLOR}` }}>
                  <CardTitle icon={GitBranch} color={BASELINE_COLOR}>Repo A: Baseline</CardTitle>
                  <BulletList
                    items={[
                      'Clone dari commit yang sama',
                      'Folder graphify-out/ dan rule graphify dihapus',
                      'Agent menjelajah codebase dengan Grep, Glob, dan Read'
                    ]}
                  />
                </div>
                <div style={{ ...cardStyle, border: `1.5px solid ${GRAPHIFY_COLOR}` }}>
                  <CardTitle icon={Network} color={GRAPHIFY_COLOR}>Repo B: Graphify</CardTitle>
                  <BulletList
                    items={[
                      'Graph: 1.532 node, 4.417 edge, 76 komunitas',
                      'Rule Cursor mewajibkan agent membaca graph sebelum source',
                      'Agent membuka GRAPH_REPORT.md dan graph.json lebih dulu'
                    ]}
                  />
                </div>
              </div>

              <div style={cardStyle}>
                <CardTitle icon={CheckCircle2} color="#10b981">Faktor yang dibuat identik</CardTitle>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Commit yang sama', 'Rule arsitektur yang sama', 'Model Claude Opus 5.5 (Medium)', 'Mode Agent', 'Chat baru per prompt', 'Prompt identik'].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: 'var(--surface-card)',
                        border: '1px solid var(--card-border)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11.5px',
                        color: 'var(--ink-body)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Methodology */}
          {index === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {[
                  { icon: BarChart3, name: 'Token', how: 'Cursor dashboard → Usage. Jumlahkan semua baris request milik satu prompt.' },
                  { icon: Clock, name: 'Waktu', how: 'Stopwatch dari prompt dikirim sampai agent selesai.' },
                  { icon: FileText, name: 'File dibaca', how: 'Hitung langkah "Read" yang tampil di chat agent.' },
                  { icon: Search, name: 'Grep / Glob', how: 'Hitung langkah pencarian, termasuk pencarian ke file graph.' },
                  { icon: Network, name: 'Pakai graph?', how: 'Khusus repo graphify: apakah agent membuka GRAPH_REPORT.md atau graph.json.' },
                  { icon: Ruler, name: 'Akurasi', how: 'Skor 0–5 terhadap kunci jawaban yang diverifikasi langsung dari source code.' }
                ].map((m) => (
                  <div key={m.name} style={cardStyle}>
                    <CardTitle icon={m.icon}>{m.name}</CardTitle>
                    <p style={{ ...bodyText, fontSize: '12.5px' }}>{m.how}</p>
                  </div>
                ))}
              </div>

              <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT}` }}>
                <span style={{ ...monoLabel, color: ACCENT }}>PROMPT #1 — TRACE FLOW</span>
                <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--folio-ink)', lineHeight: 1.7 }}>
                  "Trace alur lengkap ketika user membuka halaman ValasRetry dan melakukan retry: mulai dari komponen,
                  action yang di-dispatch, saga, sampai service/API yang dipanggil. Sebutkan file dan nama fungsi di
                  setiap langkah. Jangan ubah kode apa pun."
                </p>
              </div>

              <div style={{ ...cardStyle, background: 'var(--surface-card-subtle)' }}>
                <CardTitle icon={AlertTriangle} color="#f59e0b">Pelajaran dari pencatatan</CardTitle>
                <BulletList
                  items={[
                    'Jam di dashboard memakai UTC, jadi 02:21 di dashboard sama dengan 09:21 WIB.',
                    'Satu prompt agent bisa tercatat sebagai beberapa baris request.',
                    'Beri jeda 2–3 menit antar run dan jangan memakai model yang sama di chat lain selama tes, supaya baris di dashboard tidak tercampur.'
                  ]}
                />
              </div>
            </div>
          )}

          {/* SLIDE 3: Result */}
          {index === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { label: 'Akurasi', value: '5/5 vs 5/5', note: 'Sama-sama benar, tanpa halusinasi', color: '#10b981' },
                  { label: 'File dibaca', value: '−40%', note: '10 → 6 file', color: '#10b981' },
                  { label: 'Total token', value: '+15%', note: '178,3K → 205,4K', color: '#f59e0b' },
                  { label: 'Biaya', value: 'US$0,34', note: 'Sama untuk kedua run', color: 'var(--ink-muted)' }
                ].map((s) => (
                  <div key={s.label} style={{ ...cardStyle, alignItems: 'flex-start' }}>
                    <span style={{ ...monoLabel, color: 'var(--ink-muted)' }}>{s.label.toUpperCase()}</span>
                    <span style={{ fontSize: '26px', fontWeight: 800, color: s.color, lineHeight: 1.1 }}>{s.value}</span>
                    <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{s.note}</span>
                  </div>
                ))}
              </div>

              <div style={{ ...cardStyle, gap: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <CardTitle icon={BarChart3}>Perbandingan per metrik (lebih kecil lebih baik)</CardTitle>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {[{ n: 'Baseline', c: BASELINE_COLOR }, { n: 'Graphify', c: GRAPHIFY_COLOR }].map((l) => (
                      <span key={l.n} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', ...monoLabel, color: 'var(--ink-muted)' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.c }} />
                        {l.n}
                      </span>
                    ))}
                  </div>
                </div>
                {RESULT_METRICS.map((metric) => (
                  <MetricBar key={metric.label} metric={metric} />
                ))}
              </div>

              <p style={{ fontSize: '12px', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
                Waktu eksekusi belum dicatat pada run ini. Persentase context hanya ukuran context window; token yang ditagih diambil dari dashboard.
              </p>
            </div>
          )}

          {/* SLIDE 4: Analysis */}
          {index === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={Search} color={BASELINE_COLOR}>Kenapa baseline tetap unggul di token</CardTitle>
                  <BulletList
                    items={[
                      'Fitur yang diuji terisolasi dalam satu folder dan penamaannya konsisten, sehingga satu grep langsung menemukan semua file terkait.',
                      'File graph.json berukuran 2,2 MB. Hasil grep ke file itu panjang dan ikut masuk ke context.',
                      'Rule graphify selalu di-load di setiap chat, sehingga menambah token tetap.'
                    ]}
                  />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={Network} color={GRAPHIFY_COLOR}>Di mana graph memberi nilai</CardTitle>
                  <BulletList
                    items={[
                      'Agent langsung tahu file mana yang relevan, sehingga membaca 4 file lebih sedikit.',
                      'Agent menemukan import cycle (saga → store → root saga) yang tercatat di GRAPH_REPORT.md. Insight struktural seperti ini tidak terlihat dari membaca satu file.',
                      'Jawaban menyebutkan commit tempat graph dibangun, sehingga kesegaran data bisa dicek.'
                    ]}
                  />
                </div>
              </div>

              <div style={{ ...cardStyle, background: 'linear-gradient(135deg, rgba(44, 111, 255, 0.08), rgba(168, 85, 247, 0.08))', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
                <CardTitle icon={Lightbulb} color="#f59e0b">Hipotesis</CardTitle>
                <p style={{ ...bodyText, fontSize: '14px' }}>
                  Untuk pertanyaan yang <strong>terlokalisasi dan mudah di-grep</strong>, graph belum memberi keuntungan token.
                  Graph seharusnya baru unggul di pertanyaan <strong>lintas modul</strong>, misalnya <em>impact analysis</em>
                  ("kalau reducer X diubah, apa saja yang terdampak?") dan onboarding arsitektur, karena jawabannya
                  bergantung pada relasi antar file, bukan pada satu kata kunci.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 5: Team collaboration & next steps */}
          {index === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={cardStyle}>
                  <CardTitle icon={CheckCircle2} color="#10b981">Di-commit ke repo</CardTitle>
                  <BulletList
                    items={[
                      'GRAPH_REPORT.md: ringkasan untuk manusia dan agent',
                      'graph.json: data graph lengkap',
                      '.graphify_analysis.json dan .graphify_labels.json: dipakai rule Cursor',
                      '.cursor/rules/graphify.mdc: supaya agent di laptop siapa pun memakai graph yang sama'
                    ]}
                  />
                </div>
                <div style={cardStyle}>
                  <CardTitle icon={XCircle} color="#ef4444">Tidak di-commit (.gitignore)</CardTitle>
                  <BulletList
                    items={[
                      'Vault Obsidian: satu file per node, diff besar, rawan conflict',
                      'cache/, .graphify_root, .graphify_python: berisi path lokal mesin',
                      'graph.html: 1,6 MB, hanya untuk visual'
                    ]}
                  />
                </div>
              </div>

              <div style={cardStyle}>
                <CardTitle icon={Users}>Agar bisa dipakai lintas tim</CardTitle>
                <BulletList
                  items={[
                    'Rebuild graph di CI setiap merge ke branch utama, bukan oleh masing-masing developer, supaya hanya ada satu sumber yang menulis graph dan tidak terjadi merge conflict.',
                    'Rapikan rule agar agent membaca GRAPH_REPORT.md dan .graphify_analysis.json lebih dulu, dan hanya meng-grep graph.json dengan pola yang sempit.'
                  ]}
                />
              </div>

              <div style={{ ...cardStyle, borderLeft: `4px solid ${ACCENT}` }}>
                <CardTitle icon={FlaskConical}>Pengujian lanjutan sebelum keputusan adopsi</CardTitle>
                <BulletList
                  items={[
                    'Prompt impact analysis lintas modul dan prompt alur auth/token.',
                    'Satu task nyata yang mengubah kode, lalu bandingkan diff dan hasil build.',
                    'Ulangi setiap prompt 2 kali per repo dan catat waktu eksekusi.'
                  ]}
                />
              </div>
            </div>
          )}
    </>
  );
}
