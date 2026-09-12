import React, { useState, useEffect } from 'react';
import PlaneWindowScene from '../3d/PlaneWindowScene';
import { profileData } from '../../data/profileData';
import { Plane, Clock, Eye, Users, Sparkles } from 'lucide-react';
import { useVisitorCount } from '../../utils/visitorCounter';
import { soundFx } from '../../utils/audio';

export default function HeaderIntro({ isDark, onShadeChange, onShadeDrag, onOpenEvolution }) {
  const [time, setTime] = useState('');
  const { formattedCount, loading } = useVisitorCount();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 3D Airplane Window Frame with Interactive Sliding Shade */}
      <div className="folio-window reveal">
        <PlaneWindowScene isDark={isDark} onShadeChange={onShadeChange} onShadeDrag={onShadeDrag} />
        
        {/* Aviation HUD Overlay */}
        <div className="window-hud">
          <div className="hud-pill">
            <div className="hud-dot" />
            <span>ALT 36,000 FT • {isDark ? 'NIGHT CRUISE' : 'DAYLIGHT CRUISE'}</span>
          </div>

          <div className="hud-pill">
            <Clock size={11} style={{ marginRight: 2 }} />
            <span>{time || '08:30:00 WIB'}</span>
          </div>
        </div>
      </div>

      {/* Intro Header */}
      <div className="folio-intro reveal">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <div className="folio-flight-tag" style={{ marginBottom: 0 }}>
            <Plane size={12} />
            <span>FLIGHT {profileData.flightNumber} • {profileData.status}</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'var(--surface-sunken)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--folio-ink)',
              border: '1px solid var(--card-border)'
            }}
            title="Global Cross-Device Profile Views"
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 6px #10b981'
              }}
            />
            <Eye size={12} color="var(--folio-blue)" />
            <span>{formattedCount} Views</span>
          </div>

          {/* Keynote Presentation Launcher Pill */}
          <button
            onClick={() => {
              soundFx.playCardClick();
              if (onOpenEvolution) onOpenEvolution();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(44, 111, 255, 0.12))',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: '#a855f7',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(168, 85, 247, 0.12)'
            }}
            onMouseEnter={() => soundFx.playHover()}
            title="Open Interactive Keynote: The Evolution of Coding & Agent Harness"
          >
            <Sparkles size={12} color="#a855f7" />
            <span>Keynote: Coding Evolution & Harness</span>
          </button>
        </div>

        <h1 className="folio-tagline">
          {profileData.name}
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px', fontWeight: 600, color: 'var(--folio-blue)', marginBottom: '10px' }}>
          {profileData.title}
        </p>

        <p className="folio-sub">
          {profileData.subTagline}
        </p>

        {/* Core Skills Capsule Badges */}
        <div className="skills-section">
          <div className="skills-title">
            <span>Specialized Architecture & Stack</span>
          </div>
          <div className="skills-tags-wrap">
            {profileData.skills.finance.map((f, i) => (
              <span key={i} className="skill-tag" style={{ borderColor: 'rgba(44,111,255,0.4)', color: 'var(--folio-blue)', fontWeight: 600 }}>
                {f}
              </span>
            ))}
            {profileData.skills.languages.slice(0, 5).map((l, i) => (
              <span key={i} className="skill-tag">
                {l}
              </span>
            ))}
            {profileData.skills.messaging.slice(0, 2).map((m, i) => (
              <span key={i} className="skill-tag">
                {m}
              </span>
            ))}
            {profileData.skills.backend.slice(0, 3).map((b, i) => (
              <span key={i} className="skill-tag">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
