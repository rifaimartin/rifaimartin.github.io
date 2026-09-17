import React, { useState, useEffect } from 'react';
import { X, ExternalLink, RotateCcw, Smartphone, Monitor, Landmark, Heart, Brain, Layers } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function TpdBiModal({ isOpen, onClose, initialTrack = 'all' }) {
  const [deviceMode, setDeviceMode] = useState('wide'); // 'wide' | 'mobile'
  const [iframeKey, setIframeKey] = useState(0);
  const [activeTrack, setActiveTrack] = useState(initialTrack);

  useEffect(() => {
    if (initialTrack) {
      setActiveTrack(initialTrack);
    }
  }, [initialTrack]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReload = () => {
    soundFx.playCardClick();
    setIframeKey((prev) => prev + 1);
  };

  const handleTrackChange = (track) => {
    soundFx.playCardClick();
    setActiveTrack(track);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.84)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: '24px',
          maxWidth: deviceMode === 'mobile' ? '480px' : '1080px',
          width: '100%',
          height: '92vh',
          maxHeight: '880px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(244, 63, 94, 0.15)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'max-width 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div
          style={{
            padding: '12px 18px',
            borderBottom: '1px solid var(--card-border)',
            background: 'var(--surface-sunken)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 2px 8px rgba(244, 63, 94, 0.3)',
                flexShrink: 0
              }}
            >
              <Heart size={18} fill="#ffffff" />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800, fontSize: '14.5px', color: 'var(--folio-ink)' }}>
                  Zahra BI Learning Suite
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    background: 'rgba(244, 63, 94, 0.15)',
                    color: '#f43f5e',
                    fontWeight: 700,
                    border: '1px solid rgba(244, 63, 94, 0.25)'
                  }}
                >
                  PCPM 2026 ❤️
                </span>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--folio-mute)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                TPD Experd & Pengetahuan Umum PCPM Bank Indonesia
              </div>
            </div>
          </div>

          {/* Quick Track Switcher Pills */}
          <div
            style={{
              display: 'flex',
              background: 'var(--surface-chip)',
              borderRadius: '8px',
              padding: '2px',
              border: '1px solid var(--card-border)',
              gap: '2px'
            }}
          >
            <button
              onClick={() => handleTrackChange('tpd')}
              style={{
                border: 'none',
                background: activeTrack === 'tpd' ? '#ec4899' : 'transparent',
                color: activeTrack === 'tpd' ? '#ffffff' : 'var(--folio-mute)',
                borderRadius: '6px',
                padding: '4px 9px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                transition: 'all 0.15s'
              }}
              title="Filter ke Modul TPD Experd"
            >
              <Brain size={12} />
              <span>TPD</span>
            </button>
            <button
              onClick={() => handleTrackChange('tpu')}
              style={{
                border: 'none',
                background: activeTrack === 'tpu' ? '#f59e0b' : 'transparent',
                color: activeTrack === 'tpu' ? '#ffffff' : 'var(--folio-mute)',
                borderRadius: '6px',
                padding: '4px 9px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                transition: 'all 0.15s'
              }}
              title="Filter ke Modul Pengetahuan Umum BI"
            >
              <Landmark size={12} />
              <span>Pengetahuan Umum</span>
            </button>
            <button
              onClick={() => handleTrackChange('all')}
              style={{
                border: 'none',
                background: activeTrack === 'all' ? 'var(--folio-blue)' : 'transparent',
                color: activeTrack === 'all' ? '#ffffff' : 'var(--folio-mute)',
                borderRadius: '6px',
                padding: '4px 9px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontWeight: 700,
                transition: 'all 0.15s'
              }}
              title="Tampilkan Semua Soal (Tryout Lengkap)"
            >
              <Layers size={12} />
              <span>Semua</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Device Switcher */}
            <div
              style={{
                display: 'flex',
                background: 'var(--surface-chip)',
                borderRadius: '8px',
                padding: '2px',
                border: '1px solid var(--card-border)'
              }}
            >
              <button
                onClick={() => {
                  soundFx.playHover();
                  setDeviceMode('wide');
                }}
                style={{
                  border: 'none',
                  background: deviceMode === 'wide' ? 'var(--folio-blue)' : 'transparent',
                  color: deviceMode === 'wide' ? '#ffffff' : 'var(--folio-mute)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
                title="Expanded Desktop Exam View"
              >
                <Monitor size={12} />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => {
                  soundFx.playHover();
                  setDeviceMode('mobile');
                }}
                style={{
                  border: 'none',
                  background: deviceMode === 'mobile' ? 'var(--folio-blue)' : 'transparent',
                  color: deviceMode === 'mobile' ? '#ffffff' : 'var(--folio-mute)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
                title="Mobile View"
              >
                <Smartphone size={12} />
                <span>Mobile</span>
              </button>
            </div>

            {/* Reload Frame Button */}
            <button
              onClick={handleReload}
              style={{
                border: '1px solid var(--card-border)',
                background: 'var(--surface-chip)',
                color: 'var(--folio-ink)',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Reset / Reload App"
            >
              <RotateCcw size={13} />
            </button>

            {/* Open in New Tab */}
            <a
              href={`./tpd-bi/?track=${activeTrack}`}
              target="_blank"
              rel="noreferrer noopener"
              style={{
                border: '1px solid var(--card-border)',
                background: 'var(--surface-chip)',
                color: 'var(--folio-ink)',
                borderRadius: '8px',
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 600
              }}
              title="Buka di Tab Penuh"
            >
              <ExternalLink size={12} />
              <span>Full Tab</span>
            </a>

            {/* Close Modal */}
            <button
              onClick={onClose}
              style={{
                border: 'none',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                borderRadius: '8px',
                padding: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Tutup Modal"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Iframe Viewport */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            background: deviceMode === 'mobile' ? '#0b0f19' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: deviceMode === 'mobile' ? '16px' : '0',
              overflow: 'hidden',
              boxShadow: deviceMode === 'mobile' ? '0 8px 32px rgba(0,0,0,0.5)' : 'none',
              border: deviceMode === 'mobile' ? '1px solid rgba(255,255,255,0.08)' : 'none'
            }}
          >
            <iframe
              key={`${iframeKey}-${activeTrack}`}
              src={`./tpd-bi/?track=${activeTrack}`}
              title="Zahra BI — PCPM Bank Indonesia Simulator"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                display: 'block'
              }}
              allow="clipboard-write"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
