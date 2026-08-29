import React from 'react';
import { profileData } from '../../data/profileData';
import { BookOpen, Clock, Eye } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { ArticleCharacter } from '../illustrations/ArticleCharacters';

export default function InFlightMagazine({ onOpenArticle }) {
  if (!profileData.articles || profileData.articles.length === 0) return null;

  return (
    <section id="in-flight-magazine" className="magazine-section reveal">
      {/* Editorial Aviation Header */}
      <div className="magazine-head">
        <div className="magazine-title-wrap">
          <BookOpen size={16} color="var(--folio-blue)" />
          <h2 className="magazine-title">In-Flight Reading & Tech Journal</h2>
        </div>
        <span className="magazine-sub">Kumpulan catatan perjalanan, sejarah karier & mindset engineering</span>
      </div>

      {/* Grid of Articles */}
      <div className="magazine-grid">
        {profileData.articles.map((article) => (
          <div
            key={article.id}
            className="magazine-card with-character"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => {
              soundFx.playCardClick();
              if (onOpenArticle) onOpenArticle(article);
            }}
          >
            {/* Left/Main Column: Text & Content */}
            <div className="mag-card-main">
              {/* Top Bar: Category & Read Time */}
              <div className="mag-top">
                <span className="mag-category">{article.category}</span>
                <div className="mag-meta">
                  <span className="mag-date">{article.date}</span>
                  <span className="mag-dot">•</span>
                  <span className="mag-time">
                    <Clock size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Article Headline */}
              <h3 className="mag-heading">
                <span>{article.title}</span>
              </h3>

              {/* Excerpt */}
              <p className="mag-desc">{article.desc}</p>

              {/* Action Bar & Tags */}
              <div className="mag-bottom-bar">
                <div className="mag-tags">
                  {article.tags.map((t, idx) => (
                    <span key={idx} className="mag-tag-chip">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="mag-read-action">
                  <Eye size={12} style={{ marginRight: 4 }} />
                  Read Story
                </span>
              </div>
            </div>

            {/* Right Column: 2D Character Sticker Badge */}
            <div className="mag-character-badge">
              <ArticleCharacter id={article.id} size="card" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
