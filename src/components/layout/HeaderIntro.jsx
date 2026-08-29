import React, { useState, useEffect } from 'react';
import PlaneWindowScene from '../3d/PlaneWindowScene';
import { profileData } from '../../data/profileData';
import { Plane, Clock, Eye, Users } from 'lucide-react';
import { useVisitorCount } from '../../utils/visitorCounter';

export default function HeaderIntro({ isDark, onShadeChange }) {
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
        <div className="window-inner">
          <PlaneWindowScene isDark={isDark} onShadeChange={onShadeChange} />
        </div>
        
        {/* Aviation HUD Overlay */}
        <div className="window-hud">
          <div className="hud-pill">
            <div className="hud-dot" />
            <span>ALT 36,000 FT • {isDark ? 'NIGHT CRUISE' : 'DAYLIGHT CRUISE'}</span>
          </div>

          <div className="hud-pill" title="Global Profile Views (All Devices)">
            <Eye size={11} style={{ marginRight: 2, color: '#38bdf8' }} />
            <span>PAX #{formattedCount}</span>
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
