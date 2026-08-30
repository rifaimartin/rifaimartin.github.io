import React, { useEffect } from 'react';
import { X, Clock, BookOpen } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { ArticleCharacter } from '../illustrations/ArticleCharacters';

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
      className="article-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="article-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with 2D Character Hero */}
        <div className="article-modal-header">
          <div className="article-modal-hero">
            <div className="article-avatar-wrap">
              <ArticleCharacter id={article.id} size="modal" />
            </div>

            <div className="article-header-text">
              <div className="article-meta-row">
                <span className="article-category-badge">
                  {article.category}
                </span>
                <span className="article-time-badge">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={11} />
                    {article.readTime}
                  </span>
                </span>
              </div>

              <h2 className="article-title-heading">
                {article.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playCardClick();
              onClose();
            }}
            className="article-close-btn"
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
