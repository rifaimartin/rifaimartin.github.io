import React, { useEffect } from 'react';
import { X, Clock, Calendar, Bookmark, Share2 } from 'lucide-react';
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
    <div className="cs-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cs-modal article-reader-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header Bar */}
        <div className="cs-header">
          <div className="cs-meta">
            <span className="cs-badge">{article.category}</span>
            <div className="mag-meta" style={{ marginTop: 2 }}>
              <span className="mag-date">{article.date}</span>
              <span className="mag-dot">•</span>
              <span className="mag-time">
                <Clock size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
                {article.readTime}
              </span>
            </div>
          </div>

          <button
            className="cs-close"
            onClick={() => {
              soundFx.playCardClick();
              onClose();
            }}
            aria-label="Close article reader"
          >
            <X size={18} />
          </button>
        </div>

        {/* Article Reader Body */}
        <div className="cs-content article-content">
          <h2 className="article-headline">{article.title}</h2>
          
          <div className="article-chips">
            {article.tags.map((t, idx) => (
              <span key={idx} className="mag-tag-chip">
                #{t}
              </span>
            ))}
          </div>

          <div className="article-body-text">
            {article.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('"') && paragraph.endsWith('"')) {
                return (
                  <blockquote key={pIdx} className="article-quote">
                    {paragraph}
                  </blockquote>
                );
              }
              return (
                <p key={pIdx} className="article-p">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="cs-footer">
          <span className="cs-footer-tag">IN-FLIGHT READING • CABIN JOURNAL</span>
          <button
            className="cs-btn-close"
            onClick={() => {
              soundFx.playCardClick();
              onClose();
            }}
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
