import React, { useRef, useEffect, useState } from 'react';
import { profileData } from '../../data/profileData';
import CaseStudyItem from './CaseStudyItem';
import { ExternalLink, CheckCircle } from 'lucide-react';
import '../../styles/timeline.css';

const CURVE_PATH = "M43 0V7.3A39 39 0 0 1 21.71 42.05A39 39 0 0 0 0.5 76.75V110";

function FlightPlaneIcon() {
  return (
    <svg className="plan-plane" viewBox="0 0 16 15" fill="none" aria-hidden="true">
      <path
        d="M8 0c.73 0 1.32 1.05 1.32 2.35v2.2l6.13 3.54c.25.14.4.4.4.69v1.1a.44.44 0 0 1-.56.42L9.32 8.5v3.06l1.9 1.33c.15.11.24.28.24.47v.79a.44.44 0 0 1-.56.42L8 13.79l-2.9.78a.44.44 0 0 1-.56-.42v-.79c0-.19.09-.36.24-.47l1.9-1.33V8.5L.71 10.3a.44.44 0 0 1-.56-.42v-1.1c0-.29.15-.55.4-.69l6.13-3.54v-2.2C6.68 1.05 7.27 0 8 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FlightTimeline({ onOpenCase }) {
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const trackTop = rect.top;
      const trackHeight = rect.height;
      
      const startOffset = windowHeight * 0.75;
      const progress = Math.min(1, Math.max(0, (startOffset - trackTop) / (trackHeight + 100)));
      
      setScrollProgress(progress);
      
      // Calculate curve lighting vs vertical rail lighting
      const curveProgress = Math.min(1, Math.max(0, progress / 0.12));
      const railProgress = Math.min(1, Math.max(0, (progress - 0.1) / 0.9));
      
      trackRef.current.style.setProperty('--curve-p', curveProgress.toFixed(4));
      trackRef.current.style.setProperty('--rail-p', railProgress.toFixed(4));
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
        <FlightPlaneIcon />
      </div>

      {/* Dynamic Curved & Straight Flight Path Line */}
      <div className="folio-path" aria-hidden="true">
        {/* Slanted Curved Path originating right under the plane tail at (43, 0) */}
        <svg className="path-curve" viewBox="0 0 44 110" fill="none">
          <path className="pc-dots" d={CURVE_PATH} />
          <path className="pc-lit" d={CURVE_PATH} pathLength="1" />
        </svg>

        {/* Straight Vertical Rail continuing from y=110 */}
        <div className="path-rail">
          <div className="path-lit" />
        </div>

        {/* Arrowhead chevron tip at bottom */}
        <svg className="path-tip" viewBox="0 0 7 3" fill="none">
          <path d="M0.5 0.5 3.5 2.5 6.5 0.5" />
        </svg>
      </div>

      {/* Timeline Entries */}
      <ol className="folio-timeline">
        {profileData.experiences.map((exp, idx) => {
          const isLit = scrollProgress >= 0.1 + (idx / profileData.experiences.length) * 0.8;
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
