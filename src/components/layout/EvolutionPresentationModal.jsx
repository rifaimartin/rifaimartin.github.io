import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Sparkles, Cpu, Layers, Network, 
  ShieldCheck, CheckCircle2, AlertTriangle, Terminal, Workflow, 
  Boxes, BookOpen, Compass, Code2, ArrowRight, Play, ExternalLink,
  Maximize2, Minimize2, Tv, Clock, Monitor, ZoomIn, FileText
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const CHAPTERS = [
  {
    id: 'evolution',
    number: '01',
    badge: 'HISTORICAL LINEAGE',
    title: 'The Evolution of Coding: Dari Menulis Instruksi ke Mengorkestrasi Agent',
    subtitle: 'Bagaimana peran software engineer bertransformasi dari sekadar pengetik sintaks menjadi arsitek sistem dan pengarah kecerdasan buatan.'
  },
  {
    id: 'harness',
    number: '02',
    badge: 'THE CORE FORMALISM',
    title: 'Mengapa Prompt Saja Tidak Cukup: Lahirnya Agent Harness H = (E, T, C, S, L, V)',
    subtitle: 'Dari "Vibe Coding" menuju rekayasa perangkat lunak deterministik: telaah formal tuple 6-komponen dan analisis akar penyebab kegagalan agen.'
  },
  {
    id: 'agy-arch',
    number: '03',
    badge: 'SYSTEM INTERNALS & TAXONOMY',
    title: 'Arsitektur Google Antigravity (AGY) & Matriks Kelengkapan',
    subtitle: 'Bedah arsitektur: Surface layer, State Machine (LTS), Progressive Disclosure, dan komparasi 23 sistem pada Completeness Matrix.'
  },
  {
    id: 'graphify',
    number: '04',
    badge: 'KNOWLEDGE GRAPHS',
    title: 'Cara Kerja Graphify: Menavigasi Codebase Raksasa via GraphRAG',
    subtitle: 'Bagaimana AST parser, Louvain clustering, dan GraphRAG memangkas 90% token dan memberi memori spasial arsitektur bagi AI agent.'
  },
  {
    id: 'future',
    number: '05',
    badge: 'MULTI-AGENT & FUTURE',
    title: 'Masa Depan Software Engineering: Multi-Agent Topology & The Invariant Designer',
    subtitle: 'Topologi multi-agent, standardisasi protokol (MCP vs A2A), dan transformasi engineer menjadi perumus batasan dan verifikator sistem.'
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
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'diagram' | 'data'
  const [previewImage, setPreviewImage] = useState(null);

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

  // Reset sub-tab on slide change
  useEffect(() => {
    setActiveSubTab('overview');
  }, [currentSlide]);

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
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

              {/* View Sub-Tabs (Overview vs Official Paper Diagram) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  onClick={() => { soundFx.playCardClick(); setActiveSubTab('overview'); }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    border: '1px solid var(--card-border)',
                    background: activeSubTab === 'overview' ? '#a855f7' : 'var(--surface-sunken)',
                    color: activeSubTab === 'overview' ? '#ffffff' : 'var(--ink-body)',
                    cursor: 'pointer'
                  }}
                >
                  Overview
                </button>
                <button
                  onClick={() => { soundFx.playCardClick(); setActiveSubTab('diagram'); }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    border: '1px solid var(--card-border)',
                    background: activeSubTab === 'diagram' ? '#a855f7' : 'var(--surface-sunken)',
                    color: activeSubTab === 'diagram' ? '#ffffff' : 'var(--ink-body)',
                    cursor: 'pointer'
                  }}
                >
                  Paper Diagram
                </button>
              </div>
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

          {/* SLIDE 1: The Evolution of Coding & Historical Lineages */}
          {currentSlide === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeSubTab === 'diagram' ? (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{ position: 'relative', cursor: 'zoom-in' }}
                    onClick={() => setPreviewImage('./harness/timeline.png')}
                  >
                    <img
                      src="./harness/timeline.png"
                      alt="Historical Evolution of Agent Harnesses"
                      style={{ maxWidth: '100%', maxHeight: '460px', objectFit: 'contain', borderRadius: '12px' }}
                    />
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ZoomIn size={12} /> Click to zoom
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '10px' }}>
                    <strong>Figure 1:</strong> Historical Lineages of Agent Harnesses (JUnit 1997 → OpenAI Gym 2016 → Early LLMs 2023 → Full-Stack 2026). Sumber: Meng et al., 2026.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px'
                    }}
                  >
                    {[
                      {
                        era: '1997 - 2005',
                        title: 'Software Test Harness',
                        tech: 'JUnit, TestNG, xUnit',
                        desc: 'Menstandarkan siklus baku: Setup → Execute → Assert → Teardown dalam sandbox terisolasi.',
                        role: 'Observe-Assert Pattern'
                      },
                      {
                        era: '2016 - 2022',
                        title: 'RL Environment Harness',
                        tech: 'OpenAI Gym, Gymnasium',
                        desc: 'Standarisasi step(), reset(), dan reward signal untuk mengendalikan agen probabilistik liar.',
                        role: 'Interactive Environment Loop'
                      },
                      {
                        era: '2023 - 2024',
                        title: 'Early LLM Agent Frameworks',
                        tech: 'ReAct, Toolformer, LangChain, AutoGPT',
                        desc: 'Tool-use sebagai first-class citizen. Mengintegrasikan reasoning loop, namun masih rapuh.',
                        role: 'Primitive Tool Calling'
                      },
                      {
                        era: '2024 - 2026',
                        title: 'Modern Production Harness',
                        tech: 'MCP, A2A, AGY, Claude Code, OpenHands',
                        desc: 'Sistem lengkap 6-komponen H = (E, T, C, S, L, V) dengan sandboxing, guardrails, dan protokol resmi.',
                        role: 'Full-Stack Agent Governance'
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
                        <h4 style={{ fontSize: '14px', fontWeight: 700, margin: '6px 0', color: 'var(--folio-ink)' }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '12px', color: 'var(--ink-body)', lineHeight: 1.5, marginBottom: '10px' }}>
                          {item.desc}
                        </p>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--ink-faint)' }}>
                          Pattern: <strong style={{ color: 'var(--folio-ink)' }}>{item.role}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Academic Insight Panel */}
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <BookOpen size={18} color="#a855f7" />
                        <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--folio-ink)' }}>
                          Konvergensi Historis 30 Tahun Rekayasa Software
                        </h4>
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10b981', fontWeight: 600 }}>
                        Meng et al., Preprints 2026
                      </span>
                    </div>
                    <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                      Paper survei <em>"Agent Harness for Large Language Model Agents"</em> membuktikan bahwa konsep <strong>Agent Harness</strong> bukanlah tren sesaat, melainkan hasil konvergensi alamiah selama 30 tahun: dari pembuktian deterministik <strong>JUnit</strong>, simulasi kontrol probabilistik <strong>OpenAI Gym</strong>, hingga runtime otonom modern saat ini.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SLIDE 2: Why Prompts Fail & The Harness Tuple H = (E, T, C, S, L, V) */}
          {currentSlide === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeSubTab === 'diagram' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                    <div style={{ position: 'relative', cursor: 'zoom-in' }} onClick={() => setPreviewImage('./harness/root_cause_diagram.png')}>
                      <img src="./harness/root_cause_diagram.png" alt="Root Cause Analysis" style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '12px' }} />
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ZoomIn size={12} /> Click to zoom
                      </div>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '10px' }}>
                      <strong>Fig 2:</strong> Root Cause Analysis (Model vs Harness Binding Constraint).
                    </p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                    <div style={{ position: 'relative', cursor: 'zoom-in' }} onClick={() => setPreviewImage('./harness/architecture_diagram.png')}>
                      <img src="./harness/architecture_diagram.png" alt="H=(E,T,C,S,L,V) Architecture" style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '12px' }} />
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ZoomIn size={12} /> Click to zoom
                      </div>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '10px' }}>
                      <strong>Fig 3:</strong> Formal Tuple H = (E, T, C, S, L, V) Six-Component Architecture.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Empirical Proof Numbers Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: '#a855f7' }}>6.7% → 68.3%</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--ink-body)', marginTop: '2px' }}>Pi Research: Lonjakan SWE-bench murni dari harness redesain.</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: '#3b82f6' }}>1,300 PR/wk</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--ink-body)', marginTop: '2px' }}>Stripe Minions: 0 human code berkat harness-first architecture.</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: '#ef4444' }}>-24.2%</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--ink-body)', marginTop: '2px' }}>METR: Merge gap PR otonom akibat evaluasi harness tanpa pagar.</div>
                    </div>
                    <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 800, color: '#10b981' }}>1M+ LOC</div>
                      <div style={{ fontSize: '11.5px', color: 'var(--ink-body)', marginTop: '2px' }}>OpenAI Codex: Kegagalan berakar dari underspecified environment.</div>
                    </div>
                  </div>

                  {/* Six Component Tuple Grid */}
                  <div style={{ padding: '18px 20px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)' }}>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--folio-ink)', marginBottom: '12px' }}>
                      Definisi Formal: Tuple Enam Komponen H = (E, T, C, S, L, V)
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                      {[
                        { sym: 'E', name: 'Execution Loop', desc: 'Observe-think-act cycle, kondisi terminasi, dan self-healing.' },
                        { sym: 'T', name: 'Tool Registry', desc: 'Typed tool catalog, routing, schema validation, dan tool pruning.' },
                        { sym: 'C', name: 'Context Manager', desc: 'Curation context window, kompresi, GraphRAG retrieval.' },
                        { sym: 'S', name: 'State Store', desc: 'Persistensi status sesi, crash recovery, checkpointing.' },
                        { sym: 'L', name: 'Lifecycle Hooks', desc: 'Policy enforcement (PreToolUse, PostToolUse, Stop assertions).' },
                        { sym: 'V', name: 'Evaluation Interface', desc: 'Trajektori tindakan, intermediate state check, dan validasi.' }
                      ].map((c, i) => (
                        <div key={i} style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 800, color: '#a855f7' }}>[{c.sym}]</span>
                          <strong style={{ fontSize: '13px', marginLeft: '6px', color: 'var(--folio-ink)' }}>{c.name}</strong>
                          <p style={{ fontSize: '11.5px', color: 'var(--ink-body)', marginTop: '4px', lineHeight: 1.4 }}>{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SLIDE 3: AGY Architecture & The Completeness Matrix */}
          {currentSlide === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeSubTab === 'diagram' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                    <div style={{ position: 'relative', cursor: 'zoom-in' }} onClick={() => setPreviewImage('./harness/completeness_heatmap.png')}>
                      <img src="./harness/completeness_heatmap.png" alt="Completeness Heatmap" style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '12px' }} />
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ZoomIn size={12} /> Click to zoom
                      </div>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '10px' }}>
                      <strong>Fig 4:</strong> Harness Completeness Matrix across 23 systems. Meng et al., 2026.
                    </p>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--surface-sunken)', border: '1px solid var(--card-border)', textAlign: 'center' }}>
                    <div style={{ position: 'relative', cursor: 'zoom-in' }} onClick={() => setPreviewImage('./harness/lts_comparison.png')}>
                      <img src="./harness/lts_comparison.png" alt="LTS Comparison" style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '12px' }} />
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ZoomIn size={12} /> Click to zoom
                      </div>
                    </div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '10px' }}>
                      <strong>Fig 5:</strong> Labeled Transition System (LTS) Semantics: Safety vs Liveness Loop.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Layer Selection Tabs */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {[
                      { id: 'surfaces', label: '1. Surfaces Layer' },
                      { id: 'runtime', label: '2. State Machine (LTS)' },
                      { id: 'harness', label: '3. Hook Gates (.agents/hooks.json)' },
                      { id: 'matrix', label: '4. 23-System Completeness Matrix' }
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

                  {activeArchLayer === 'surfaces' && (
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                        Unified Entry Surfaces
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7, marginBottom: '14px' }}>
                        Google Antigravity dirancang agar bisa digunakan di berbagai permukaan kerja:
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                        <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                          <strong style={{ color: '#2c6fff' }}>Antigravity IDE:</strong> Editor VS Code fork dengan Tab Autocomplete dan Code Lenses.
                        </div>
                        <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                          <strong style={{ color: '#a855f7' }}>Antigravity 2.0:</strong> Desktop App untuk orchestrating multi-agents dan background tasks.
                        </div>
                        <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                          <strong style={{ color: '#10b981' }}>Antigravity CLI (agy):</strong> Terminal TUI cepat untuk remote development.
                        </div>
                        <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                          <strong style={{ color: '#f59e0b' }}>Python SDK:</strong> Package google-antigravity untuk headless CI/CD evaluation harness.
                        </div>
                      </div>
                    </div>
                  )}

                  {activeArchLayer === 'runtime' && (
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                        Core Runtime & Labeled Transition System (LTS)
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                        Meng et al. (2026) memformalkan runtime agent sebagai Labeled Transition System:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.8, paddingLeft: '20px', marginTop: '10px' }}>
                        <li><strong>Safety Property:</strong> Membuktikan secara matematis bahwa tidak ada status berbahaya yang dicapai (misal: kebocoran sandbox atau modifikasi file di luar batasan).</li>
                        <li><strong>Liveness Property:</strong> Menjamin bahwa agen tidak terjebak dalam infinite loop pemikiran dan pasti membuat progres menuju gol.</li>
                        <li><strong>Reactive Wakeup:</strong> Begitu background tool selesai, state machine runtime langsung mengalirkan observasi ke model.</li>
                      </ul>
                    </div>
                  )}

                  {activeArchLayer === 'harness' && (
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                        Lifecycle Hooks (.agents/hooks.json) Sebagai Komponen L
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7, marginBottom: '12px' }}>
                        Inilah implementasi langsung dari komponen [L] dan [V] pada proyek ini:
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                        <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', borderLeft: '3px solid #f59e0b' }}>
                          <code style={{ color: '#f59e0b', fontWeight: 700 }}>PreToolUse (Safety Gate)</code>
                          <p style={{ fontSize: '12px', marginTop: '4px' }}>Mencegat tool sebelum jalan (allow, deny, atau ask konfirmasi).</p>
                        </div>
                        <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', borderLeft: '3px solid #10b981' }}>
                          <code style={{ color: '#10b981', fontWeight: 700 }}>PostToolUse (Telemetry)</code>
                          <p style={{ fontSize: '12px', marginTop: '4px' }}>Auto-formatting, linter, dan type-checking otomatis setiap ada file diedit.</p>
                        </div>
                        <div style={{ padding: '12px', borderRadius: '10px', background: 'var(--surface-card)', borderLeft: '3px solid #a855f7' }}>
                          <code style={{ color: '#a855f7', fontWeight: 700 }}>Stop (The Verification Gate)</code>
                          <p style={{ fontSize: '12px', marginTop: '4px' }}>Menolak penghentian tugas jika test suite gagal. Agent dipaksa melakukan self-correction.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeArchLayer === 'matrix' && (
                    <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--surface-card-subtle)', border: '1px solid var(--card-border)' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px', color: 'var(--folio-ink)' }}>
                        Mengapa Hanya Sedikit Sistem yang Siap Produksi?
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                        Berdasarkan evaluasi terhadap 23 sistem agen terkemuka di paper Meng et al.:
                      </p>
                      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface-card)', fontSize: '13px' }}>
                          <strong>Full-Stack Harness (Claude Code, Antigravity, OpenHands, AIOS):</strong> Memenuhi ke-6 komponen (E, T, C, S, L, V). Satu-satunya kategori yang stabil untuk produksi.
                        </div>
                        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface-card)', fontSize: '13px' }}>
                          <strong>Multi-Agent Frameworks (MetaGPT, AutoGen, ChatDev):</strong> Kuat dalam pembagian peran (E, T), namun lemah di Lifecycle Hooks (L) dan Evaluasi Dinamis (V).
                        </div>
                        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface-card)', fontSize: '13px' }}>
                          <strong>General Frameworks (LangChain, LangGraph):</strong> Fleksibel, tetapi menyerahkan tanggung jawab keamanan dan verifikasi sepenuhnya kepada developer.
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* SLIDE 4: How Graphify Works (Context Management & GraphRAG) */}
          {currentSlide === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ fontSize: '13.5px', color: 'var(--ink-body)', lineHeight: 1.7 }}>
                Di paper Meng et al. (Section 6.4 & 6.6), <strong>Runtime Context Management</strong> dan <strong>Memory Architecture</strong> diidentifikasi sebagai tantangan terbesar karena efek <em>"Lost in the Middle"</em>. 
                <strong>Graphify</strong> mengimplementasikan komponen [C] dan [S] melalui graf pengetahuan terstruktur:
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
                    182 Nodes • 483 Edges • 14 Communities
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

          {/* SLIDE 5: Multi-Agent Topology & The Future of Software Engineering */}
          {currentSlide === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {activeSubTab === 'diagram' ? (
                <div
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{ position: 'relative', cursor: 'zoom-in' }}
                    onClick={() => setPreviewImage('./harness/multi_agent_topology.png')}
                  >
                    <img
                      src="./harness/multi_agent_topology.png"
                      alt="Multi-Agent Topology and Protocols"
                      style={{ maxWidth: '100%', maxHeight: '460px', objectFit: 'contain', borderRadius: '12px' }}
                    />
                    <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ZoomIn size={12} /> Click to zoom
                    </div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--ink-faint)', marginTop: '10px' }}>
                    <strong>Figure 6:</strong> Multi-Agent Coordination Topology and Protocols (MCP vs A2A). Sumber: Meng et al., 2026.
                  </p>
                </div>
              ) : (
                <>
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

                  {/* Standard Protocols Matrix */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                    <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <strong style={{ color: '#2c6fff' }}>Anthropic MCP:</strong> Tool-to-Harness standard. Latensi 2–15ms untuk integrasi tool lokal/eksternal.
                    </div>
                    <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--surface-card)', border: '1px solid var(--card-border)' }}>
                      <strong style={{ color: '#a855f7' }}>Google A2A:</strong> Agent-to-Agent standard. Latensi 50–200ms untuk komunikasi otonom antar-agent.
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
                </>
              )}
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

      {/* Image Lightbox Modal for Diagram Zoom */}
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
            alt="Enlarged diagram"
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
            Click anywhere or press Esc to close zoom view
          </span>
        </div>
      )}
    </div>
  );
}
