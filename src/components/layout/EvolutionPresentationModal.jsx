import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Sparkles, Cpu, Layers, Network, 
  ShieldCheck, CheckCircle2, AlertTriangle, Terminal, Workflow, 
  Boxes, BookOpen, Compass, Code2, ArrowRight, Play, ExternalLink,
  Maximize2, Minimize2, Tv, Clock, Monitor
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const CHAPTERS = [
  {
    id: 'evolution',
    number: '01',
    badge: 'PARADIGM SHIFT',
    title: 'The Evolution of Coding: Dari Menulis Instruksi ke Mengorkestrasi Agent',
    subtitle: 'Bagaimana peran software engineer bertransformasi dari sekadar pengetik sintaks menjadi arsitek sistem dan pengarah kecerdasan buatan.'
  },
  {
    id: 'harness',
    number: '02',
    badge: 'THE MISSING PIECE',
    title: 'Mengapa Prompt Saja Tidak Cukup: Lahirnya Agent Harness',
    subtitle: 'Dari "Vibe Coding" menuju rekayasa perangkat lunak deterministik: mengapa agent membutuhkan pagar, test loop, dan verifikasi otomatis.'
  },
  {
    id: 'agy-arch',
    number: '03',
    badge: 'SYSTEM INTERNALS',
    title: 'Arsitektur Google Antigravity (AGY) & Lifecycle Gates',
    subtitle: 'Bedah arsitektur: Surface layer, State Machine, Progressive Disclosure, dan mekanisme Hook Harness (PreToolUse, PostToolUse, Stop).'
  },
  {
    id: 'graphify',
    number: '04',
    badge: 'KNOWLEDGE GRAPHS',
    title: 'Cara Kerja Graphify: Menavigasi Codebase Raksasa',
    subtitle: 'Bagaimana AST parser, algoritma Louvain, dan GraphRAG memangkas ribuan token dan memberi memori spasial bagi AI agent.'
  },
  {
    id: 'future',
    number: '05',
    badge: 'THE NEW ENGINEER',
    title: 'Masa Depan Software Engineering: The Invariant Designer',
    subtitle: 'Saat AI menulis kode lebih cepat dari manusia, nilai tertinggi seorang engineer bergeser ke perumusan batasan, spesifikasi, dan multi-agent orchestration.'
  }
];

export default function EvolutionPresentationModal({ isOpen, onClose }) {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTabSlide1, setActiveTabSlide1] = useState(3);
  const [activeArchLayer, setActiveArchLayer] = useState('harness');
  const [activeGraphStep, setActiveGraphStep] = useState(2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Presenter Elapsed Timer
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

  // Fullscreen event listener across browser prefixes
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

  // Keyboard navigation (Arrows, Space, F, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
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
  }, [isOpen, currentSlide, isFullscreen]);

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

  const goToSlide = (index) => {
    soundFx.playCardClick();
    setCurrentSlide(index);
  };

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
                background: isFullscreen ? 'rgba(168, 85, 247, 0.22)' : 'rgba(168, 85, 247, 0.12)',
                color: '#a855f7',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              <Tv size={12} />
              <span>{isFullscreen ? 'PRESENTATION MODE' : 'KEYNOTE ESSAY'}</span>
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
              <Clock size={11} color="#a855f7" />
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
                  backgroundColor: idx === currentSlide ? '#a855f7' : 'var(--card-border)',
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
            {/* Fullscreen Presentation Mode Button */}
            <button
              onClick={toggleFullscreen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: isFullscreen ? 'rgba(168, 85, 247, 0.18)' : 'var(--surface-sunken)',
                color: isFullscreen ? '#a855f7' : 'var(--folio-ink)',
                border: isFullscreen ? '1px solid #a855f7' : '1px solid var(--card-border)',
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

            {/* Close Button */}
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
          {/* Chapter Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#a855f7',
                  letterSpacing: '1px'
                }}
              >
                CHAPTER {CHAPTERS[currentSlide].number} • {CHAPTERS[currentSlide].badge}
              </span>
            </div>
            <h2
              style={{
                fontSize: isFullscreen ? 'clamp(24px, 3.4vw, 36px)' : 'clamp(20px, 3.2vw, 28px)',
                fontWeight: 800,
                color: 'var(--folio-ink)',
                lineHeight: 1.3,
                marginBottom: '8px'
              }}
            >
              {CHAPTERS[currentSlide].title}
            </h2>
            <p
              style={{
                fontSize: isFullscreen ? '16px' : '14.5px',
                color: 'var(--ink-body)',
                lineHeight: 1.6,
                maxWidth: '960px'
              }}
            >
              {CHAPTERS[currentSlide].subtitle}
            </p>
          </div>

          {/* SLIDE 1: The Evolution of Coding */}
          {currentSlide === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}
              >
                {[
                  {
                    era: '1950s - 1970s',
                    title: 'The Machine Imperative',
                    tech: 'Punch Cards, Assembly, C',
                    desc: 'Manusia memberi instruksi langsung ke register dan memori fisik komputer.',
                    role: 'Human as Calculator'
                  },
                  {
                    era: '1980s - 2000s',
                    title: 'Structured & OOP',
                    tech: 'C++, Java, Python, Design Patterns',
                    desc: 'Membangun hierarki abstraksi untuk mengelola kompleksitas kognitif manusia.',
                    role: 'Human as Code Crafter'
                  },
                  {
                    era: '2010s',
                    title: 'Declarative & Distributed',
                    tech: 'React, Kubernetes, Microservices',
                    desc: 'Menentukan state yang diinginkan (desired state), biarkan engine yang mengurus mutasi.',
                    role: 'Human as System Integrator'
                  },
                  {
                    era: '2024+',
                    title: 'The Agentic Paradigm',
                    tech: 'Autonomous Agents, LLMs, Harness, GraphRAG',
                    desc: 'Manusia mendefinisikan invariant, batasan, dan tes; AI agent mengeksekusi dan mengoreksi diri.',
                    role: 'Human as Orchestrator'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      soundFx.playCardClick();
                      setActiveTabSlide1(idx);
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: activeTabSlide1 === idx ? 'rgba(168, 85, 247, 0.08)' : 'var(--surface-sunken)',
                      border: activeTabSlide1 === idx ? '2px solid #a855f7' : '1px solid var(--card-border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#a855f7', fontWeight: 700 }}>
                      {item.era}
                    </span>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, margin: '6px 0', color: 'var(--folio-ink)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.5, marginBottom: '10px' }}>
                      {item.desc}
                    </p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-faint)' }}>
                      Role: <strong style={{ color: 'var(--folio-ink)' }}>{item.role}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deep Dive Panel */}
              <div
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  background: 'var(--surface-card-subtle)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Code2 size={18} color="#a855f7" />
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                    Pergeseran Mendasar: Dari Sintaks ke Semantik & Invarian
                  </h4>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                  Selama 70 tahun terakhir, seluruh evolusi bahasa pemrograman bertujuan untuk <em>menaikkan level abstraksi</em>. 
                  Dulu kita menghabiskan 80% waktu memikirkan syntax error, pointer arithmetic, atau konfigurasi boilerplate. 
                  Di era agentic, <strong>sintaks telah menjadi komoditas instan</strong>. Nilai tertinggi seorang engineer kini terletak pada kemampuan merumuskan <strong>Domain Invariants</strong> (aturan bisnis yang tidak boleh dilanggar), <strong>Security Boundaries</strong>, dan <strong>Verification Harness</strong>.
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'var(--surface-sunken)',
                    borderLeft: '4px solid #a855f7'
                  }}
                >
                  <span style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--folio-ink)' }}>
                    "Kita tidak lagi menulis kode karakter per karakter; kita menulis spesifikasi, memberi agent alat (tools), lalu memvalidasi hasilnya lewat harness."
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: Why Prompts Fail: The Need for an Agent Harness */}
          {currentSlide === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '16px'
                }}
              >
                {/* Without Harness */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <AlertTriangle size={18} />
                    <h4 style={{ fontWeight: 700, fontSize: '15px' }}>LLM Mentah ("Vibe Coding")</h4>
                  </div>
                  <ul style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.8, paddingLeft: '18px' }}>
                    <li><strong>Tidak Ada Batasan:</strong> Model mengira kodenya benar hanya karena kalimatnya terdengar percaya diri.</li>
                    <li><strong>Silent Hallucinations:</strong> Mengimpor library yang tidak terinstall atau memanggil API yang sudah usang.</li>
                    <li><strong>Perubahan Acak:</strong> Mengubah fungsi A tanpa tahu bahwa fungsi B, C, dan D langsung rusak (blast radius buta).</li>
                    <li><strong>Infinite Loops:</strong> Saat error, agent menebak-nebak tanpa verifikasi hingga token habis.</li>
                  </ul>
                </div>

                {/* With Agent Harness */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(168, 85, 247, 0.05)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7' }}>
                    <ShieldCheck size={18} />
                    <h4 style={{ fontWeight: 700, fontSize: '15px' }}>Agent yang Dibungkus HARNESS</h4>
                  </div>
                  <ul style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.8, paddingLeft: '18px' }}>
                    <li><strong>Pre-Tool Gate:</strong> Perintah berbahaya dicegat sebelum menyentuh shell atau file sensitif.</li>
                    <li><strong>Closed-Loop Feedback:</strong> Hasil compiler dan stderr langsung disuapkan kembali ke memori observasi agent.</li>
                    <li><strong>Deterministic Assertion:</strong> Agent tidak diizinkan berkata "Tugas selesai" sebelum unit test berstatus 100% PASS.</li>
                    <li><strong>Self-Correction:</strong> Agent membaca kegagalan test, merombak kode, dan menjalankan test ulang secara otonom.</li>
                  </ul>
                </div>
              </div>

              {/* The Harness Loop Diagram */}
              <div
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--folio-ink)', marginBottom: '14px' }}>
                  Anatomi Siklus Agent Harness
                </h4>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  {[
                    { step: '1. Goal / Task', sub: 'Instruksi spesifik', icon: Compass },
                    { step: '2. Propose Action', sub: 'Tool call diusulkan', icon: Code2 },
                    { step: '3. PreTool Gate', sub: 'Safety & Policy check', icon: ShieldCheck, color: '#f59e0b' },
                    { step: '4. Execute Sandbox', sub: 'Di terminal / FS aman', icon: Terminal },
                    { step: '5. PostTool Verify', sub: 'Linter & Build check', icon: CheckCircle2, color: '#10b981' },
                    { step: '6. Stop Decision', sub: 'Unit tests verified?', icon: Workflow, color: '#a855f7' }
                  ].map((s, i) => {
                    const IconComp = s.icon;
                    return (
                      <React.Fragment key={i}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '10px 14px',
                            background: 'var(--surface-card)',
                            borderRadius: '12px',
                            border: '1px solid var(--card-border)',
                            minWidth: '120px'
                          }}
                        >
                          <IconComp size={16} color={s.color || 'var(--folio-blue)'} style={{ marginBottom: '4px' }} />
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--folio-ink)' }}>{s.step}</span>
                          <span style={{ fontSize: '10.5px', color: 'var(--ink-muted)' }}>{s.sub}</span>
                        </div>
                        {i < 5 && <ArrowRight size={14} color="var(--ink-faint)" />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: AGY Architecture & Lifecycle Gates */}
          {currentSlide === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Layer Selection Tabs */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'surfaces', label: '1. Surfaces Layer (IDE/CLI/SDK)' },
                  { id: 'runtime', label: '2. Core Runtime & State Machine' },
                  { id: 'harness', label: '3. Harness Gate (hooks.json)' },
                  { id: 'context', label: '4. Progressive Disclosure' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playCardClick();
                      setActiveArchLayer(tab.id);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: activeArchLayer === tab.id ? '#a855f7' : 'var(--surface-sunken)',
                      color: activeArchLayer === tab.id ? '#ffffff' : 'var(--ink)',
                      border: '1px solid var(--card-border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Layer Details Content */}
              {activeArchLayer === 'surfaces' && (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                    Unified Entry Surfaces
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7, marginBottom: '14px' }}>
                    Google Antigravity dirancang agar bisa digunakan di berbagai permukaan kerja tanpa merusak workflow developer:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <strong style={{ color: '#2c6fff' }}>Antigravity IDE:</strong> AI-first editor berbasis VS Code dengan <em>Tab Autocomplete</em>, <em>Inline Command</em> (Ctrl+I), dan <em>Code Lenses</em>.
                    </div>
                    <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <strong style={{ color: '#a855f7' }}>Antigravity 2.0:</strong> Desktop App untuk orchestrating multi-agents, subagent trees, dan scheduled background tasks.
                    </div>
                    <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <strong style={{ color: '#10b981' }}>Antigravity CLI (agy):</strong> Antarmuka terminal TUI cepat untuk lingkungan server atau remote dev.
                    </div>
                    <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <strong style={{ color: '#f59e0b' }}>Python SDK:</strong> Package <code>google-antigravity</code> untuk integrasi programmatic evals dan pipeline CI/CD.
                    </div>
                  </div>
                </div>
              )}

              {activeArchLayer === 'runtime' && (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                    Core Runtime & State Machine
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                    Jantung dari AGY adalah <strong>Autonomous Execution Loop</strong>. Model tidak sekadar menjawab chat; ia menggerakkan mesin status:
                  </p>
                  <ul style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.8, paddingLeft: '20px', marginTop: '10px' }}>
                    <li><strong>State Machine:</strong> Menjaga context antar turn, melacak subagent yang sedang berjalan, dan memantau task di background tanpa blocking polling.</li>
                    <li><strong>Reactive Wakeup:</strong> Begitu background command atau subagent selesai, runtime otomatis membangunkan model untuk memproses output.</li>
                    <li><strong>Tool Protocol:</strong> Standarisasi eksekusi file read/write, terminal bash, web search, dan MCP servers.</li>
                  </ul>
                </div>
              )}

              {activeArchLayer === 'harness' && (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                    Lifecycle Hooks: The Built-in Harness Engine (.agents/hooks.json)
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7, marginBottom: '12px' }}>
                    AGY mengizinkan developer menyisipkan skrip validasi di titik-titik kritis loop:
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', borderLeft: '3px solid #f59e0b' }}>
                      <code style={{ color: '#f59e0b', fontWeight: 700 }}>PreToolUse</code>
                      <p style={{ fontSize: '12px', marginTop: '4px' }}>Mencegat tool sebelum jalan. Bisa return <code>allow</code>, <code>deny</code>, atau <code>ask</code>.</p>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', borderLeft: '3px solid #10b981' }}>
                      <code style={{ color: '#10b981', fontWeight: 700 }}>PostToolUse</code>
                      <p style={{ fontSize: '12px', marginTop: '4px' }}>Menjalankan auto-formatting, linter, atau tipe checker setiap kali file berubah.</p>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', borderLeft: '3px solid #a855f7' }}>
                      <code style={{ color: '#a855f7', fontWeight: 700 }}>Stop (The Gate)</code>
                      <p style={{ fontSize: '12px', marginTop: '4px' }}>Jika unit test gagal, kembalikan <code>decision: "continue"</code>. Agent dipaksa lanjut memperbaiki.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeArchLayer === 'context' && (
                <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                    Progressive Disclosure (Hemat Konteks & Cepat)
                  </h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                    Antigravity memecahkan masalah degradasi performa model dengan <strong>Progressive Disclosure</strong>:
                  </p>
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface-card)', fontSize: '13px' }}>
                      <strong>1. Shallow Indexing:</strong> Hanya nama dan deskripsi singkat dari Rules dan Skills yang dimuat ke dalam prompt utama.
                    </div>
                    <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface-card)', fontSize: '13px' }}>
                      <strong>2. On-Demand Activation:</strong> Isi lengkap instruksi skill baru dimuat saat model (atau user) memutuskan untuk mengaktifkannya.
                    </div>
                    <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface-card)', fontSize: '13px' }}>
                      <strong>3. Deduplication:</strong> Mencegah file aturan dibaca ganda di dalam percakapan yang sama.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SLIDE 4: How Graphify Works */}
          {currentSlide === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                Saat berhadapan dengan repository besar, memberi seluruh kode ke LLM akan menghabiskan puluhan ribu token dan menimbulkan halusinasi. 
                <strong>Graphify</strong> mentransformasikan kode menjadi <em>Knowledge Graph</em> terstruktur:
              </p>

              {/* 5-Step Pipeline Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                {[
                  { step: '1. AST Parser', tool: 'Tree-sitter', desc: 'Ekstraksi fungsi, class, imports secara deterministik (0 token cost).' },
                  { step: '2. Semantics', tool: 'LLM Inferred', desc: 'Menghubungkan pola arsitektur implisit dan rationale desain.' },
                  { step: '3. Clustering', tool: 'Louvain Algorithm', desc: 'Otomatis membagi kode ke dalam klaster komunitas arsitektur.' },
                  { step: '4. GraphRAG', tool: 'BFS / DFS Query', desc: 'Menarik hanya 500 token subgraf yang relevan, bukan 200rb token file.' },
                  { step: '5. Visual Studio', tool: 'Obsidian & HTML', desc: 'Visual interaktif 2D/3D untuk developer dan agent.' }
                ].map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      soundFx.playCardClick();
                      setActiveGraphStep(idx);
                    }}
                    style={{
                      padding: '14px',
                      borderRadius: '14px',
                      background: activeGraphStep === idx ? 'rgba(59, 130, 246, 0.08)' : 'var(--surface-sunken)',
                      border: activeGraphStep === idx ? '2px solid #3b82f6' : '1px solid var(--card-border)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#3b82f6', fontWeight: 700 }}>
                      {p.step}
                    </span>
                    <h5 style={{ fontSize: '13.5px', fontWeight: 700, margin: '4px 0', color: 'var(--folio-ink)' }}>
                      {p.tool}
                    </h5>
                    <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Concrete Example from this Project */}
              <div
                style={{
                  padding: '18px 22px',
                  borderRadius: '16px',
                  background: 'var(--surface-card-subtle)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Network size={16} color="#3b82f6" />
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                      Hasil Nyata di Proyek Ini (rifaimartin.github.io):
                    </h4>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                    81 Nodes • 136 Edges • 10 Communities
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', fontSize: '12.5px', color: 'var(--ink-body)' }}>
                  <div style={{ padding: '10px', background: 'var(--surface-card)', borderRadius: '10px' }}>
                    <strong>PlaneWindowScene.jsx:</strong> Terhubung ke Three.js canvas, shader awan volumetrik, dan audio events.
                  </div>
                  <div style={{ padding: '10px', background: 'var(--surface-card)', borderRadius: '10px' }}>
                    <strong>AccessPassCard.jsx:</strong> Memanggil <code>soundFx.playCardClick()</code> dan terhubung ke GatePassOverlay.
                  </div>
                  <div style={{ padding: '10px', background: 'var(--surface-card)', borderRadius: '10px' }}>
                    <strong>Obsidian Export:</strong> Terbaca secara visual di Obsidian Desktop melalui <code>graph.canvas</code>.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: The Future of Software Engineering */}
          {currentSlide === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}
              >
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
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--ink-faint)' }}>
                    Paradigma Lama (Manual Coding)
                  </h4>
                  <ul style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.8, paddingLeft: '18px' }}>
                    <li>Menulis perulangan, boilerplate, dan CRUD manual.</li>
                    <li>Menghabiskan waktu debugging syntax dan konfigurasi library.</li>
                    <li>Satu orang mengerjakan satu modul secara linier.</li>
                    <li>Dokumentasi arsitektur sering usang dan tidak sinkron dengan kode.</li>
                  </ul>
                </div>

                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    background: 'rgba(168, 85, 247, 0.06)',
                    border: '2px solid rgba(168, 85, 247, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#a855f7' }}>
                    Paradigma Baru (Agentic Engineering)
                  </h4>
                  <ul style={{ fontSize: '13px', color: 'var(--folio-ink)', lineHeight: 1.8, paddingLeft: '18px' }}>
                    <li><strong>Invariant Designer:</strong> Merumuskan batasan bisnis dan aturan integritas data.</li>
                    <li><strong>Harness Engineer:</strong> Membangun test suite dan feedback gates yang ketat.</li>
                    <li><strong>Agent Orchestration:</strong> Membagi tugas ke subagent spesifik (Researcher, Coder, Reviewer).</li>
                    <li><strong>Knowledge Graph Curator:</strong> Memelihara peta mental sistem agar AI dan manusia selaras.</li>
                  </ul>
                </div>
              </div>

              {/* Closing Summary */}
              <div
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(44, 111, 255, 0.08), rgba(168, 85, 247, 0.08))',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <Boxes size={32} color="#a855f7" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--folio-ink)', marginBottom: '4px' }}>
                    Kesimpulan: AI adalah Mesin, Harness adalah Kemudi & Rem
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                    Kecepatan komputasi AI tidak ada artinya tanpa arah dan batasan yang teruji. 
                    Masa depan coding bukan tentang menggantikan manusia, melainkan memberi engineer kekuatan untuk mengorkestrasi satu skuadron agen cerdas di dalam ekosistem yang aman, terverifikasi, dan deterministik.
                  </p>
                </div>
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
              background: currentSlide === CHAPTERS.length - 1 ? 'var(--surface-card)' : '#a855f7',
              border: '1px solid var(--card-border)',
              color: currentSlide === CHAPTERS.length - 1 ? 'var(--ink-faint)' : '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: currentSlide === CHAPTERS.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentSlide === CHAPTERS.length - 1 ? 0.4 : 1,
              transition: 'all 0.15s',
              boxShadow: currentSlide === CHAPTERS.length - 1 ? 'none' : '0 4px 14px rgba(168, 85, 247, 0.35)'
            }}
          >
            <span>Next Chapter</span>
            <ChevronRight size={16} />
          </button>
        </footer>
      </div>
    </div>
  );
}
