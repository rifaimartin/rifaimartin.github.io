import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, Lightbulb, ExternalLink } from 'lucide-react';

export default function CaseStudyModal({ study, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!study) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface-card)',
          border: '1px solid var(--card-border)',
          borderRadius: '20px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.3)',
          position: 'relative',
          color: 'var(--ink)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--surface-chip)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--ink)'
          }}
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              color: 'var(--folio-blue)',
              letterSpacing: '1px'
            }}
          >
            {study.category}
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '6px 0 10px' }}>
            {study.title}
          </h2>
          {study.metrics && (
            <div
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              {study.metrics}
            </div>
          )}
        </div>

        {/* Deep Dive Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '14.5px', lineHeight: 1.6 }}>
          {study.deepDive?.overview && (
            <div>
              <h4 style={{ fontWeight: 600, fontSize: '15px', color: 'var(--folio-ink)', marginBottom: '4px' }}>
                Architecture Overview
              </h4>
              <p style={{ color: 'var(--ink-body)' }}>{study.deepDive.overview}</p>
            </div>
          )}

          {study.deepDive?.challenge && (
            <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--surface-sunken)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#f59e0b', marginBottom: '4px' }}>
                <AlertTriangle size={16} />
                <span>Technical Challenge</span>
              </div>
              <p style={{ color: 'var(--ink-body)', fontSize: '13.5px' }}>{study.deepDive.challenge}</p>
            </div>
          )}

          {study.deepDive?.solution && (
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(44,111,255,0.06)', border: '1px solid rgba(44,111,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--folio-blue)', marginBottom: '4px' }}>
                <CheckCircle2 size={16} />
                <span>Engineered Solution</span>
              </div>
              <p style={{ color: 'var(--ink-body)', fontSize: '13.5px' }}>{study.deepDive.solution}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
