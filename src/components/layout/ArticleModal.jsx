import React, { useState, useEffect } from 'react';
import { X, Clock, BookOpen, Share2, Check, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { ArticleCharacter } from '../illustrations/ArticleCharacters';

function WhatsAppIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function ArticleModal({ article, onClose }) {
  const [copied, setCopied] = useState(false);

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

  const getShareUrl = () => {
    return `${window.location.origin}${window.location.pathname}?read=${article ? article.id : ''}`;
  };

  const handleShareToWhatsApp = () => {
    if (!article) return;
    soundFx.playCardClick();
    const url = getShareUrl();
    const message = `*${article.title}*\n\n${article.desc}\n\nBaca tulisan lengkapnya di sini:\n${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyLink = async () => {
    if (!article) return;
    soundFx.playCardClick();
    const url = getShareUrl();

    // Use native share if on mobile supported device
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.desc,
          url: url,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback prompt if clipboard fails
      prompt('Salin link artikel ini:', url);
    }
  };

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

        {/* Share Strip for WhatsApp Story & Social Sharing */}
        <div className="article-share-strip">
          <div className="article-share-meta">
            <span className="article-share-label">Bagikan Bacaan:</span>
          </div>

          <div className="article-share-buttons">
            <button
              onClick={handleShareToWhatsApp}
              className="art-share-pill wa-pill"
              title="Bagikan tulisan ini langsung ke WhatsApp Story / Obrolan"
            >
              <WhatsAppIcon size={14} />
              <span>Share ke WA</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="art-share-pill copy-pill"
              title="Salin tautan langsung artikel ini"
            >
              {copied ? (
                <>
                  <Check size={13} color="#10b981" />
                  <span style={{ color: '#10b981', fontWeight: 600 }}>Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          </div>
        </div>

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
            marginTop: '10px',
            gap: '12px',
            flexWrap: 'wrap'
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

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={handleShareToWhatsApp}
              className="art-share-pill wa-pill"
              style={{ padding: '6px 12px' }}
              title="Bagikan ke WhatsApp"
            >
              <WhatsAppIcon size={13} />
              <span>Share WA</span>
            </button>

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
                transition: 'opacity 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Jelajahi Portfolio</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
