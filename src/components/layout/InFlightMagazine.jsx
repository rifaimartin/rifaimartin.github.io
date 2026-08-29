import React from 'react';
import { profileData } from '../../data/profileData';
import { BookOpen, ArrowUpRight, Clock, Bookmark } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function InFlightMagazine() {
  if (!profileData.articles || profileData.articles.length === 0) return null;

  return (
    <section id="in-flight-magazine" className="magazine-section reveal">
      {/* Editorial Aviation Header */}
      <div className="magazine-head">
        <div className="magazine-title-wrap">
          <BookOpen size={16} color="var(--folio-blue)" />
          <h2 className="magazine-title">In-Flight Reading & Engineering Notes</h2>
        </div>
        <span className="magazine-sub">Selected technical essays, system design teardowns & reflections</span>
      </div>

      {/* Grid of Articles */}
      <div className="magazine-grid">
        {profileData.articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noreferrer noopener"
            className="magazine-card"
            onMouseEnter={() => soundFx.playHover()}
            onClick={() => soundFx.playCardClick()}
          >
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
              <ArrowUpRight size={15} className="mag-arrow" />
            </h3>

            {/* Excerpt */}
            <p className="mag-desc">{article.desc}</p>

            {/* Tag Pills */}
            <div className="mag-tags">
              {article.tags.map((t, idx) => (
                <span key={idx} className="mag-tag-chip">
                  #{t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
