import React, { useEffect } from 'react';
import { X, Clock, BookOpen, ArrowLeft } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
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
          borderRadius: '20px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '32px 28px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
          position: 'relative',
          color: 'var(--ink)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'var(--folio-blue)',
                  background: 'var(--surface-chip)',
                  padding: '3px 8px',
                  borderRadius: '4px'
                }}
              >
                {article.category}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--folio-mute)', fontFamily: 'var(--font-mono)' }}>
                {article.date} • <Clock size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} /> {article.readTime}
              </span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1.35, color: 'var(--folio-ink)' }}>
              {article.title}
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playCardClick();
              onClose();
            }}
            style={{
              background: 'var(--surface-chip)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--ink)',
              flexShrink: 0,
              marginLeft: '12px'
            }}
            aria-label="Close article"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--ink-faint)',
                  background: 'var(--surface-sunken)',
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Article Body Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--ink-body)',
            borderTop: '1px solid var(--card-border)',
            paddingTop: '20px'
          }}
        >
          {article.content.split('\n\n').map((paragraph, pIdx) => {
            if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
              return (
                <blockquote
                  key={pIdx}
                  style={{
                    fontStyle: 'italic',
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'var(--folio-ink)',
                    background: 'var(--surface-chip)',
                    borderLeft: '4px solid var(--folio-blue)',
                    padding: '14px 18px',
                    borderRadius: '0 10px 10px 0',
                    margin: '6px 0'
                  }}
                >
                  {paragraph}
                </blockquote>
              );
            }
            return (
              <p key={pIdx} style={{ whiteSpace: 'pre-line' }}>
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Footer Action */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--card-border)',
            paddingTop: '16px',
            marginTop: '10px'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--folio-mute)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            IN-FLIGHT READING • CABIN JOURNAL
          </span>

          <button
            onClick={() => {
              soundFx.playCardClick();
              onClose();
            }}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              background: 'var(--folio-blue)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
