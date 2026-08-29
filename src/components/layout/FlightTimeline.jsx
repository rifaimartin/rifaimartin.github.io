import React, { useRef, useEffect, useState } from 'react';
import { profileData } from '../../data/profileData';
import CaseStudyItem from './CaseStudyItem';
import { Plane, ExternalLink, CheckCircle } from 'lucide-react';
import '../../styles/timeline.css';

export default function FlightTimeline({ onOpenCase }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the timeline track has been scrolled
      const trackTop = rect.top;
      const trackHeight = rect.height;
      
      const startOffset = windowHeight * 0.7;
      const progress = Math.min(1, Math.max(0, (startOffset - trackTop) / trackHeight));
      
      setScrollProgress(progress);
      trackRef.current.style.setProperty('--rail-p', progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="folio-track" ref={trackRef}>
      {/* Flight Plan Header with Floating Airplane */}
      <div className="plan-head reveal" aria-hidden="true">
        <span className="plan-label">Flight Plan</span>
        <Plane className="plan-plane" size={16} />
      </div>

      {/* Dynamic Flight Path Line */}
      <div className="folio-path" aria-hidden="true">
        <div className="path-rail" />
        <div className="path-lit" />
      </div>

      {/* Timeline Entries */}
      <ol className="folio-timeline">
        {profileData.experiences.map((exp, idx) => {
          const isLit = scrollProgress >= (idx / profileData.experiences.length) * 0.8;
          return (
            <li key={exp.id} className="tl-entry reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              {/* Year & Route Badge on Left */}
              <div className="tl-year">
                <span className="tl-route">{exp.route}</span>
                <span className="tl-yearnum">{exp.year}</span>
              </div>

              {/* Glowing Waypoint Dot on Rail */}
              <div className={`tl-dot ${isLit ? 'is-lit' : ''}`} />

              {/* Company & Role Header */}
              <div className="tl-head">
                <span style={{ fontSize: '18px', marginRight: '4px' }}>{exp.logo}</span>
                <a
                  className="tl-company"
                  href={exp.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {exp.company}
                </a>
                {exp.current && (
                  <span className="tl-badge">CURRENT</span>
                )}
              </div>

              <div className="tl-role">
                {exp.role} • <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px', color: 'var(--folio-mute)' }}>{exp.period}</span>
              </div>

              <p className="tl-desc">
                {exp.desc}
              </p>

              {/* Highlights */}
              {exp.highlights && (
                <ul className="tl-highlights">
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span style={{ color: 'var(--folio-blue)', flexShrink: 0, marginTop: '2px' }}>▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                {exp.stack.map((st, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'var(--surface-sunken)',
                      color: 'var(--ink-faint)'
                    }}
                  >
                    {st}
                  </span>
                ))}
              </div>

              {/* Sub Case Studies with 3D Preview Cards */}
              {exp.cases && exp.cases.length > 0 && (
                <ul className="tl-cases">
                  {exp.cases.map((cs) => (
                    <CaseStudyItem
                      key={cs.id}
                      study={cs}
                      onOpen={onOpenCase}
                    />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
