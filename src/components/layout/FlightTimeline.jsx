import React, { useRef, useEffect, useState, useCallback } from 'react';
import { profileData } from '../../data/profileData';
import CaseStudyItem from './CaseStudyItem';
import { ExternalLink, CheckCircle } from 'lucide-react';
import '../../styles/timeline.css';

const DESKTOP_CURVE = "M43 0V7.3A39 39 0 0 1 21.71 42.05A39 39 0 0 0 0.5 76.75V110";

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

// Render Company Logo Avatars with Hover Elevation & Tooltips
function CompanyLogoAvatars({ logos = [], fallbackEmoji, company }) {
  if (!logos || logos.length === 0) {
    return <span style={{ fontSize: '18px', marginRight: '4px' }}>{fallbackEmoji}</span>;
  }

  return (
    <div className="tl-logos" title={company}>
      {logos.map((logo, idx) => (
        <span key={idx} className="tl-avatar t-avatar" title={logo.name || company}>
          <span className="tl-logo">
            {logo.src ? (
              <img
                src={logo.src}
                alt={logo.name || company}
                draggable="false"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <span style={{ fontSize: '14px' }}>{logo.fallback || fallbackEmoji}</span>
            )}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function FlightTimeline({ onOpenCase }) {
  const trackRef = useRef(null);
  const pathSvgRef = useRef(null);
  const pathDotsRef = useRef(null);
  const pathLitRef = useRef(null);
  const railRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic S-curve calculation ensuring seamless connection to the airplane tail on all devices
  const updateCurve = useCallback(() => {
    if (!trackRef.current || !pathSvgRef.current || !pathDotsRef.current || !pathLitRef.current) return;
    
    const isMobile = window.innerWidth <= 760;
    
    if (!isMobile) {
      pathSvgRef.current.setAttribute("viewBox", "0 0 44 110");
      pathSvgRef.current.style.width = "44px";
      pathSvgRef.current.style.height = "110px";
      pathDotsRef.current.setAttribute("d", DESKTOP_CURVE);
      pathLitRef.current.setAttribute("d", DESKTOP_CURVE);
    } else {
      const plane = trackRef.current.querySelector(".plan-plane");
      const rail = railRef.current;
      if (!plane || !rail) return;
      
      const planeRect = plane.getBoundingClientRect();
      const railRect = rail.getBoundingClientRect();
      const dx = Math.max(60, (planeRect.left + planeRect.width / 2) - (railRect.left + railRect.width / 2));
      
      const height = 75;
      const wi = 15;
      const Ge = 30;
      const t = dx + 0.5;
      const curveD = `M${t} 0V${wi}A${Ge} ${Ge} 0 0 1 ${t - Ge} ${wi + Ge}H${0.5 + Ge}A${Ge} ${Ge} 0 0 0 0.5 ${height}`;
      
      pathSvgRef.current.setAttribute("viewBox", `0 0 ${dx + 1} ${height}`);
      pathSvgRef.current.style.width = `${dx + 1}px`;
      pathSvgRef.current.style.height = `${height}px`;
      pathDotsRef.current.setAttribute("d", curveD);
      pathLitRef.current.setAttribute("d", curveD);
    }
  }, []);

  useEffect(() => {
    updateCurve();
    window.addEventListener('resize', updateCurve);
    return () => window.removeEventListener('resize', updateCurve);
  }, [updateCurve]);

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
        {/* Slanted Curved Path originating right under the plane tail */}
        <svg className="path-curve" ref={pathSvgRef} viewBox="0 0 44 110" fill="none">
          <path className="pc-dots" ref={pathDotsRef} d={DESKTOP_CURVE} />
          <path className="pc-lit" ref={pathLitRef} d={DESKTOP_CURVE} pathLength="1" />
        </svg>

        {/* Straight Vertical Rail continuing from the curve */}
        <div className="path-rail" ref={railRef}>
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

              {/* Company Logo Avatars */}
              <CompanyLogoAvatars logos={exp.logos} fallbackEmoji={exp.logo} company={exp.company} />

              {/* Company & Role Header */}
              <div className="tl-head">
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
                  <span key={i} className="skill-tag" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {st}
                  </span>
                ))}
              </div>

              {/* Deep Dive Case Study Cards */}
              {exp.cases && exp.cases.length > 0 && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--folio-mute)',
                    letterSpacing: '0.8px'
                  }}>
                    Featured Flight Systems & Architecture Cases:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {exp.cases.map((study) => (
                      <CaseStudyItem
                        key={study.id}
                        study={study}
                        onOpen={() => onOpenCase(study)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
