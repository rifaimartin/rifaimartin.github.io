import React from 'react';
import { profileData } from '../../data/profileData';
import { GraduationCap, Award, BookOpen, MapPin, Calendar, BookMarked, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function EducationSection() {
  return (
    <section className="folio-section reveal" style={{ marginTop: '56px' }}>
      {/* Section Header */}
      <div className="section-head" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <GraduationCap size={18} style={{ color: 'var(--folio-blue)' }} />
          <h2 style={{
            fontSize: '14px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: 'var(--folio-blue)',
            margin: 0
          }}>
            Flight Academy & Academic Foundations
          </h2>
        </div>
        <p style={{
          fontSize: '13px',
          color: 'var(--folio-mute)',
          margin: 0,
          fontFamily: 'var(--font-sans)'
        }}>
          Formal engineering degrees, biological computing research & foundational software training.
        </p>
      </div>

      {/* Academic Cards Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {profileData.education.map((edu) => (
          <div
            key={edu.id}
            onMouseEnter={() => soundFx.playHover()}
            style={{
              padding: '24px',
              borderRadius: '16px',
              backgroundColor: 'var(--surface-card)',
              border: '1px solid var(--card-border)',
              boxShadow: '0 4px 20px rgba(var(--shadow-rgb), 0.04)',
              transition: 'transform 0.25s var(--ease-out), border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out)',
              position: 'relative',
              overflow: 'hidden'
            }}
            className="edu-card"
          >
            {/* Top Row: School, Period & Badge */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: 'var(--folio-ink)',
                    margin: 0
                  }}>
                    {edu.school}
                  </h3>
                  {edu.badge && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '10.5px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      backgroundColor: 'rgba(44, 111, 255, 0.1)',
                      color: 'var(--folio-blue)',
                      border: '1px solid rgba(44, 111, 255, 0.2)'
                    }}>
                      <Sparkles size={10} />
                      {edu.badge}
                    </span>
                  )}
                </div>

                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--folio-blue)',
                  marginTop: '4px'
                }}>
                  {edu.degree}
                </div>
              </div>

              {/* Period & Location Badge */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--folio-mute)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {edu.period}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                  <MapPin size={11} />
                  {edu.location}
                </span>
              </div>
            </div>

            {/* GPA & Faculty Meta Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              fontSize: '12.5px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--folio-mute)',
              padding: '6px 12px',
              backgroundColor: 'var(--surface-sunken)',
              borderRadius: '8px',
              margin: '12px 0 16px',
              border: '1px solid var(--card-border)'
            }}>
              <span>🏛️ {edu.faculty}</span>
              <span>•</span>
              <span style={{ color: 'var(--folio-ink)', fontWeight: 600 }}>
                {edu.gpa.includes('3.') ? `🎯 GPA: ${edu.gpa}` : `🏆 ${edu.gpa}`}
              </span>
            </div>

            {/* Key Academic & Research Highlights */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: 'var(--folio-mute)',
                marginBottom: '8px'
              }}>
                Research Focus & Key Milestones:
              </div>

              <ul style={{
                margin: 0,
                paddingLeft: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {edu.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      color: 'var(--ink-body)'
                    }}
                  >
                    <span style={{ color: 'var(--folio-blue)', flexShrink: 0, marginTop: '2px', fontWeight: 'bold' }}>
                      ▹
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Springer Nature Publication Callout Box (if applicable) */}
            {edu.publications && (
              <div style={{
                padding: '12px 14px',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-card-subtle)',
                border: '1px solid rgba(44, 111, 255, 0.25)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <BookMarked size={16} style={{ color: 'var(--folio-blue)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{
                    fontSize: '10.5px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--folio-blue)',
                    letterSpacing: '0.5px'
                  }}>
                    Published Research Paper • Springer Nature (CCIS)
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--folio-ink)', marginTop: '2px' }}>
                    "{edu.publications[0].title}"
                  </div>
                </div>
              </div>
            )}

            {/* Academic Skill Chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {edu.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '3px 9px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--surface-chip)',
                    color: 'var(--folio-ink)',
                    border: '1px solid var(--card-border)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
