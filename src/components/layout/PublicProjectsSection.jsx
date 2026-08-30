import React from 'react';
import { profileData } from '../../data/profileData';
import { Globe, ExternalLink, Sparkles, CheckCircle2, ShoppingBag, Camera } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function PublicProjectsSection() {
  if (!profileData.publicProjects || profileData.publicProjects.length === 0) return null;

  return (
    <section className="folio-section reveal" style={{ marginTop: '56px' }}>
      {/* Section Header */}
      <div className="section-head" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Globe size={18} style={{ color: 'var(--folio-blue)' }} />
          <h2 style={{
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--folio-blue)',
            margin: 0
          }}>
            Public Ventures & Web Productions
          </h2>
        </div>
        <p style={{
          fontSize: '13px',
          color: 'var(--folio-mute)',
          margin: 0,
          fontFamily: 'var(--font-sans)'
        }}>
          Live production platforms, digital marketplaces & international e-commerce ecosystems engineered for commercial scale.
        </p>
      </div>

      {/* Public Projects Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {profileData.publicProjects.map((proj) => {
          const isPotretin = proj.id === 'potretin';
          return (
            <div
              key={proj.id}
              className="public-project-card"
              onMouseEnter={() => soundFx.playHover()}
              style={{
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--card-border)',
                borderRadius: '18px',
                padding: '24px 22px',
                boxShadow: '0 4px 20px rgba(var(--shadow-rgb), 0.04)',
                position: 'relative',
                transition: 'all 0.25s var(--ease-out)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              {/* Header Row: Title, Status Badge, Live Link */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: isPotretin ? 'rgba(37, 99, 235, 0.1)' : 'rgba(22, 163, 74, 0.1)',
                      color: isPotretin ? '#2563eb' : '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isPotretin ? <Camera size={16} /> : <ShoppingBag size={16} />}
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color: proj.badgeColor || 'var(--folio-blue)'
                    }}>
                      {proj.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--folio-ink)',
                    margin: '4px 0 6px',
                    lineHeight: 1.35
                  }}>
                    {proj.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: 'var(--folio-mute)',
                    margin: 0
                  }}>
                    {proj.tagline}
                  </p>
                </div>

                {/* Live Status & External Link CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      boxShadow: '0 0 6px #10b981'
                    }} />
                    {proj.status}
                  </span>

                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => soundFx.playCardClick()}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--surface-sunken)',
                      color: 'var(--folio-ink)',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      border: '1px solid var(--card-border)',
                      transition: 'all 0.2s ease'
                    }}
                    className="p-btn-secondary"
                  >
                    <span>{proj.domain}</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: 'var(--folio-body)',
                margin: 0
              }}>
                {proj.desc}
              </p>

              {/* Architectural Highlights */}
              <div style={{
                backgroundColor: 'var(--surface-sunken)',
                borderRadius: '10px',
                padding: '12px 14px',
                border: '1px solid var(--card-border)'
              }}>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  color: 'var(--folio-mute)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <CheckCircle2 size={12} style={{ color: proj.badgeColor }} />
                  <span>Key Architectural Milestones:</span>
                </div>

                <ul style={{
                  margin: 0,
                  paddingLeft: '16px',
                  fontSize: '12.5px',
                  lineHeight: 1.55,
                  color: 'var(--folio-body)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {proj.tech.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--surface-chip)',
                      color: 'var(--folio-ink)'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
