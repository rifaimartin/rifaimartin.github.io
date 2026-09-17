import React, { useEffect } from 'react';
import { Sparkles, Brain, Landmark, Layers, X, Heart, ChevronRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ZahraBiToastSelector({ isOpen, onClose, onSelectTrack, isDark }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tracks = [
    {
      id: 'tpd',
      title: 'Tes Potensi Dasar (TPD)',
      subtitle: 'Standar Experd 2026: Verbal Analogi, Bahasa Buatan, Numerik Deret/Aritmetika, Figural 3x3, Digit Symbol Kecermatan, POF.',
      badge: '86 Soal • TPD Experd',
      badgeColor: '#ec4899',
      icon: Brain,
      iconColor: '#ec4899',
      bgGradient: 'rgba(236, 72, 153, 0.08)'
    },
    {
      id: 'tpu',
      title: 'Tes Pengetahuan Umum (PCPM BI)',
      subtitle: 'Materi Resmi PDF: UU P2SK, Kebijakan Moneter, BI-FAST, QRIS, Pengelolaan Rupiah, Makroprudensial, Syariah, Layanan BICARA.',
      badge: '65 Soal • Materi Resmi PDF',
      badgeColor: '#f59e0b',
      icon: Landmark,
      iconColor: '#f59e0b',
      bgGradient: 'rgba(245, 158, 11, 0.08)'
    },
    {
      id: 'all',
      title: 'Tryout Gabungan (TPD + Pengetahuan Umum)',
      subtitle: 'Simulasi Lengkap CAT: Seluruh subtes potensi dasar dan pengetahuan kebanksentralan Bank Indonesia dalam satu arena.',
      badge: '151 Soal • All-in-One PCPM',
      badgeColor: '#38bdf8',
      icon: Layers,
      iconColor: '#38bdf8',
      bgGradient: 'rgba(56, 189, 248, 0.08)'
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 140,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '16px',
        paddingBottom: '86px',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: isDark ? 'rgba(17, 24, 39, 0.94)' : 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(244, 63, 94, 0.35)',
          borderRadius: '24px',
          maxWidth: '560px',
          width: '100%',
          padding: '22px 24px',
          boxShadow: '0 25px 60px rgba(244, 63, 94, 0.2), 0 10px 30px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          animation: 'zahraToastPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundFx.playCardClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--folio-mute)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          title="Tutup"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.35)',
              flexShrink: 0
            }}
          >
            <Heart size={18} fill="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: 'var(--folio-ink)' }}>
                Zahra BI Learning Hub
              </h3>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  background: 'rgba(244, 63, 94, 0.15)',
                  color: '#f43f5e',
                  border: '1px solid rgba(244, 63, 94, 0.3)'
                }}
              >
                PCPM 2026 ❤️
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--folio-mute)', marginTop: '2px' }}>
              Halo Zahra! Pilih modul tes yang ingin dipelajari hari ini:
            </p>
          </div>
        </div>

        {/* Track selection cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
          {tracks.map((t) => {
            const IconComponent = t.icon;
            return (
              <div
                key={t.id}
                onClick={() => {
                  soundFx.playCardClick();
                  onSelectTrack(t.id, t.title);
                }}
                onMouseEnter={() => soundFx.playHover()}
                style={{
                  padding: '14px 16px',
                  borderRadius: '16px',
                  background: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(248, 250, 252, 0.9)',
                  border: '1px solid var(--card-border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="zahra-track-card"
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: t.bgGradient,
                    border: `1px solid ${t.badgeColor}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: t.iconColor,
                    flexShrink: 0
                  }}
                >
                  <IconComponent size={20} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--folio-ink)' }}>
                      {t.title}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        backgroundColor: `${t.badgeColor}18`,
                        color: t.badgeColor,
                        border: `1px solid ${t.badgeColor}35`
                      }}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: '3px 0 0 0',
                      fontSize: '11.5px',
                      color: 'var(--folio-mute)',
                      lineHeight: 1.45
                    }}
                  >
                    {t.subtitle}
                  </p>
                </div>

                <div style={{ color: 'var(--folio-mute)', flexShrink: 0 }}>
                  <ChevronRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom micro quote */}
        <div
          style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--folio-mute)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={13} color="#f59e0b" />
            <span>Materi Terintegrasi UU P2SK & Experd Assessment</span>
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: '#f43f5e', fontWeight: 600 }}>
            Made with love for Zahra ❤️
          </span>
        </div>
      </div>
    </div>
  );
}
