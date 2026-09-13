import React, { useState } from 'react';
import { 
  X, Tv, Monitor, Sparkles, Clock, Layers, ChevronRight, 
  Play, BookOpen, Calendar, CheckCircle2, ArrowRight, PlusCircle, AlertCircle
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

export const PRESENTATIONS_DATA = [
  {
    id: 'coding-evolution-harness',
    number: '01',
    title: 'The Evolution of Coding & Agent Harness',
    subtitle: 'Dari Menulis Instruksi ke Mengorkestrasi Agent & Formalisasi Tuple H = (E, T, C, S, L, V)',
    status: 'available', // 'available' | 'upcoming' | 'draft'
    statusLabel: 'Ready to Present',
    statusColor: '#10b981',
    badge: 'KEYNOTE ESSAY',
    chaptersCount: 5,
    estimatedMinutes: 15,
    date: 'April 2026',
    tags: ['Agent Harness', 'Formal Tuple', 'Google AGY', 'Graphify', 'Software 3.0'],
    description: 'Evolusi peran software engineer di era agentic AI, pembedahan empiris kegagalan vibe coding, arsitektur formal 6-elemen harness (Meng et al., 2026), guardrails hooks Google AGY, dan visualisasi memori Graphify.',
    chapters: [
      { num: '01', name: 'The Evolution of Coding (4 Era Komputasi)' },
      { num: '02', name: 'Formalisasi 6 Elemen Harness: H = (E, T, C, S, L, V)' },
      { num: '03', name: 'Arsitektur Google Antigravity (AGY) & Lifecycle Gates' },
      { num: '04', name: 'Cara Kerja Graphify: AST & GraphRAG di Codebase' },
      { num: '05', name: 'Masa Depan Software Engineering: The Invariant Designer' }
    ]
  },
  {
    id: 'behind-the-terminal',
    number: '02',
    title: 'Behind the Terminal: Systems, Markets & The -100M Crucible',
    subtitle: 'Dari Benih IT di SMK & 1 Tahun Magang di Ink & Canvas ke Pasar Kripto: Pelajaran Mengenal Diri, Pengalaman Minus 100 Juta, dan Lab Simulator Leverage Rupiah',
    status: 'available', // 'available' | 'upcoming' | 'draft'
    statusLabel: 'Ready to Present',
    statusColor: '#f59e0b',
    badge: 'PERSONAL KEYNOTE',
    chaptersCount: 5,
    estimatedMinutes: 18,
    date: 'April 2026',
    tags: ['Personal Story', 'SMK to Dev', 'Futures Trading', 'Crypto Leverage', 'Risk Management', 'Self Mastery'],
    description: 'Kisah awal mula mengenal dunia IT dari bangku SMK, tempaan 1 tahun magang di Ink & Canvas Bogor, transisi ke pasar probabilistik futures, pelajaran berharga mengenal ego dan emosi diri, bukti otentik likuidasi Rp 100 juta di Binance, serta kalkulator interaktif leverage Rupiah.',
    chapters: [
      { num: '01', name: 'Origin Story: Benih IT di SMK & 1 Tahun Magang di Ink & Canvas' },
      { num: '02', name: 'Melangkah ke Pasar Finansial: Cermin Paling Jujur Mengenal Diri Sendiri' },
      { num: '03', name: 'Kuliah Termahal: Riwayat Margin Call Binance Futures -100 Juta' },
      { num: '04', name: 'Futures & Leverage Lab: Simulasi Kalkulator Rupiah (BTC, ETH, HBAR, SOL)' },
      { num: '05', name: 'Personal Manifesto: Stoikisme, Damai dalam Ketidakpastian & Compounding' }
    ]
  },
  {
    id: 'multi-agent-coordination',
    number: '03',
    title: 'Multi-Agent Coordination & Communication Protocols',
    subtitle: 'Deep-dive protokol inter-agent: Anthropic MCP vs Google A2A dalam sistem terdistribusi',
    status: 'upcoming',
    statusLabel: 'Upcoming Talk',
    statusColor: '#38bdf8',
    badge: 'DEEP DIVE',
    chaptersCount: 4,
    estimatedMinutes: 20,
    date: 'Q2 2026',
    tags: ['Multi-Agent', 'Anthropic MCP', 'Google A2A', 'Distributed Consensus'],
    description: 'Analisis mendalam komunikasi heterogen antar subagent: perbandingan latensi MCP (2-15ms) vs A2A (50-200ms), isolasi workspace berbasis branch git, dan invariant verification pada multi-agent pipeline.',
    chapters: [
      { num: '01', name: 'Arsitektur Skuadron Agen: Topology & Role Delegation' },
      { num: '02', name: 'Standard Protocols: Model Context Protocol (MCP) vs A2A' },
      { num: '03', name: 'Workspace Isolation: Worktree Branching & Shared State' },
      { num: '04', name: 'Consensus & Rollback Mechanisms pada Kegagalan Eksekusi' }
    ]
  },
  {
    id: 'next-presentation-slot',
    number: '03',
    title: '+ Slot Presentasi Berikutnya',
    subtitle: 'Slot presentasi baru yang siap dikonfigurasi untuk topik riset, workshop, atau presentasi Anda selanjutnya',
    status: 'draft',
    statusLabel: 'Draft Slot',
    statusColor: '#a855f7',
    badge: 'MODULAR TEMPLATE',
    chaptersCount: 'TBA',
    estimatedMinutes: '-',
    date: 'Ready to Draft',
    tags: ['Custom Topic', 'Modular Slide', 'Presenter Mode'],
    description: 'Template presentasi modular siap pakai yang dapat diisi topik baru kapan saja. Mendukung true browser fullscreen, countdown timer, dan navigasi keyboard terintegrasi.',
    chapters: []
  }
];

export default function PresentationHubModal({ isOpen, onClose, onLaunchPresentation }) {
  const [selectedPres, setSelectedPres] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    soundFx.playCardClick();
    setSelectedPres(null);
    onClose();
  };

  const handleOpenPres = (pres) => {
    soundFx.playCardClick();
    setSelectedPres(pres);
  };

  const handleSelectMode = (mode) => {
    soundFx.playCardClick();
    const presId = selectedPres ? selectedPres.id : 'coding-evolution-harness';
    setSelectedPres(null);
    onClose();
    if (onLaunchPresentation) {
      onLaunchPresentation(presId, mode);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(5, 5, 8, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--card-border)',
          borderRadius: '24px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 32px 96px rgba(0,0,0,0.7)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hub Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 26px',
            borderBottom: '1px solid var(--card-border)',
            background: 'var(--surface-card-subtle)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a855f7'
              }}
            >
              <Tv size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                  Presentations & Talks Hub
                </h3>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: 'rgba(168, 85, 247, 0.12)',
                    color: '#a855f7',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    fontWeight: 700
                  }}
                >
                  KEYNOTE CATALOG
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                Pilih presentasi teknis di bawah ini untuk memulai dalam mode layar penuh atau modal interaktif.
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'var(--surface-sunken)',
              border: '1px solid var(--card-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
              transition: 'transform 0.15s'
            }}
            title="Close (Esc)"
          >
            <X size={16} />
          </button>
        </header>

        {/* Hub Scrollable Content */}
        <div
          style={{
            padding: '24px 26px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {PRESENTATIONS_DATA.map((pres) => {
            const isReady = pres.status === 'available';

            return (
              <div
                key={pres.id}
                onClick={() => handleOpenPres(pres)}
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  background: isReady ? 'var(--surface-card-subtle)' : 'var(--surface-sunken)',
                  border: isReady ? '1.5px solid rgba(168, 85, 247, 0.4)' : '1px dashed var(--card-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={() => soundFx.playHover()}
              >
                {/* Top Badge & Status Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 800,
                        color: isReady ? '#a855f7' : 'var(--ink-faint)'
                      }}
                    >
                      KEYNOTE #{pres.number}
                    </span>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: isReady ? 'rgba(168, 85, 247, 0.12)' : 'var(--surface-card)',
                        color: isReady ? '#a855f7' : 'var(--ink-faint)',
                        border: '1px solid var(--card-border)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10.5px',
                        fontWeight: 700
                      }}
                    >
                      {pres.badge}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', color: pres.statusColor, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: pres.statusColor,
                          boxShadow: `0 0 8px ${pres.statusColor}`
                        }}
                      />
                      <span>{pres.statusLabel}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                      <Clock size={12} />
                      <span>{pres.estimatedMinutes} mins</span>
                    </div>
                  </div>
                </div>

                {/* Presentation Title & Subtitle */}
                <div>
                  <h4 style={{ fontSize: '16.5px', fontWeight: 800, color: 'var(--folio-ink)', marginBottom: '4px' }}>
                    {pres.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.5 }}>
                    {pres.subtitle}
                  </p>
                </div>

                {/* Tags & Action Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {pres.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '3px 9px',
                          borderRadius: '6px',
                          background: 'var(--surface-sunken)',
                          border: '1px solid var(--card-border)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--ink-muted)'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: isReady ? '#a855f7' : 'var(--surface-sunken)',
                      color: isReady ? '#ffffff' : 'var(--ink-faint)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      boxShadow: isReady ? '0 4px 14px rgba(168, 85, 247, 0.3)' : 'none'
                    }}
                  >
                    <span>{isReady ? 'Pilih Mode Presentasi' : 'Lihat Detail Slot'}</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode Selection Popup Modal */}
      {selectedPres && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 0.15s ease-out'
          }}
          onClick={() => setSelectedPres(null)}
        >
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--card-border)',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              padding: '26px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 24px 72px rgba(0,0,0,0.85)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mode Modal Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#a855f7',
                    letterSpacing: '0.5px'
                  }}
                >
                  PILIH MODE TAMPILAN
                </span>
                <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--folio-ink)', marginTop: '2px' }}>
                  {selectedPres.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedPres(null)}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--ink)'
                }}
              >
                <X size={14} />
              </button>
            </div>

            {selectedPres.status === 'available' ? (
              <>
                <p style={{ fontSize: '13px', color: 'var(--ink-body)', lineHeight: 1.5 }}>
                  Pilih bagaimana Anda ingin membuka presentasi ini:
                </p>

                {/* Option 1: True Browser Fullscreen Mode */}
                <div
                  onClick={() => handleSelectMode('fullscreen')}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(44, 111, 255, 0.08))',
                    border: '2px solid rgba(168, 85, 247, 0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: '#a855f7',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Tv size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '14px', color: 'var(--folio-ink)' }}>
                        Mode Presentasi (Fullscreen)
                      </strong>
                      <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', background: '#a855f7', color: '#fff', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        RECOMMENDED
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '3px', lineHeight: 1.4 }}>
                      Layar penuh sejati (Chrome/taskbar hilang), presenter timer berjalan, navigasi Spasi/Panah.
                    </p>
                  </div>
                  <ChevronRight size={18} color="#a855f7" />
                </div>

                {/* Option 2: Interactive Windowed Mode */}
                <div
                  onClick={() => handleSelectMode('windowed')}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '14px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'var(--surface-card)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--folio-ink)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Monitor size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '14px', color: 'var(--folio-ink)' }}>
                      Mode Modal Interaktif (Windowed)
                    </strong>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '3px', lineHeight: 1.4 }}>
                      Membuka slide dalam modal popup di atas web portofolio.
                    </p>
                  </div>
                  <ChevronRight size={18} color="var(--ink-faint)" />
                </div>

                {/* Chapter Outline Preview */}
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--surface-sunken)',
                    border: '1px solid var(--card-border)',
                    fontSize: '11.5px',
                    color: 'var(--ink-muted)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--folio-ink)' }}>Daftar Bab:</span>
                  {selectedPres.chapters.map((ch, i) => (
                    <div key={i} style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#a855f7' }}>{ch.num}.</span>
                      <span>{ch.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Notice for upcoming / draft slot */
              <div
                style={{
                  padding: '18px',
                  borderRadius: '14px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--card-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: selectedPres.statusColor }}>
                  <AlertCircle size={18} />
                  <strong style={{ fontSize: '13.5px' }}>
                    {selectedPres.status === 'upcoming' ? 'Materi Sedang Disiapkan' : 'Slot Presentasi Kosong'}
                  </strong>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--ink-body)', lineHeight: 1.6 }}>
                  {selectedPres.description}
                </p>
                <button
                  onClick={() => setSelectedPres(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--card-border)',
                    color: 'var(--folio-ink)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  Kembali ke Daftar Presentasi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
