import React, { useState, useEffect } from 'react';
import { X, ExternalLink, RotateCcw, Smartphone, Monitor, Sparkles, Dumbbell } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function OpenGymModal({ isOpen, onClose }) {
  const [deviceMode, setDeviceMode] = useState('mobile'); // 'mobile' | 'wide'
  const [iframeKey, setIframeKey] = useState(0);

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
        backgroundColor: 'rgba(0, 0, 0, 0.82)',
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
          border: '1px solid var(--card-border)',
          borderRadius: '24px',
          maxWidth: deviceMode === 'mobile' ? '460px' : '920px',
          width: '100%',
          height: '90vh',
          maxHeight: '840px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
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
            padding: '14px 18px',
            borderBottom: '1px solid var(--card-border)',
            background: 'var(--surface-sunken)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                flexShrink: 0
              }}
            >
              <Dumbbell size={16} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--folio-ink)' }}>openGym</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    fontWeight: 600
                  }}
                >
                  LIVE DEMO
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--folio-mute)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                Interactive Workout & Weight Tracker
              </div>
            </div>
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
                title="Expanded Tablet View"
              >
                <Monitor size={12} />
                <span>Expanded</span>
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
              href="./opengym/"
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
                fontSize: '11px',
                fontWeight: 600,
                textDecoration: 'none'
              }}
              title="Open full page in new tab"
            >
              <ExternalLink size={13} />
              <span>Full Tab</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                soundFx.playCardClick();
                onClose();
              }}
              style={{
                border: 'none',
                background: 'var(--surface-chip)',
                color: 'var(--folio-ink)',
                borderRadius: '8px',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Close (Esc)"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Device Frame Viewport */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            background: '#0c0e12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: deviceMode === 'mobile' ? '12px' : '0'
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
              key={iframeKey}
              src="./opengym/"
              title="openGym Live Application"
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
