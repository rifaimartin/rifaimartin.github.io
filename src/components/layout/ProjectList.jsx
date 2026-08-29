import React from 'react';
import { profileData } from '../../data/profileData';
import { Code2, Star, ExternalLink, Terminal, Play, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ProjectList() {
  return (
    <div className="projects-block reveal">
      <div className="projects-title">
        <Terminal size={15} />
        <span>Open Source & System Research</span>
      </div>

      <div className="projects-grid">
        {profileData.projects.map((proj) => {
          const isInternal = proj.isLocalRoute;
          return (
            <div
              key={proj.id}
              className={`project-card ${proj.featured ? 'featured' : ''}`}
              onMouseEnter={() => soundFx.playHover()}
            >
              <div>
                <div className="p-header">
                  <div className="p-title">
                    {proj.featured ? (
                      <Sparkles size={16} color="#38bdf8" />
                    ) : (
                      <Code2 size={15} color="var(--folio-blue)" />
                    )}
                    <span>{proj.title}</span>
                  </div>
                  <span className={`p-badge ${proj.featured ? 'p-badge-featured' : ''}`}>
                    {proj.stars}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--folio-mute)', marginBottom: '8px' }}>
                  {proj.category}
                </p>
                <p className="p-desc">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="p-tags" style={{ marginBottom: proj.featured || proj.demoUrl ? '12px' : '0' }}>
                  {proj.tech.map((t, idx) => (
                    <span key={idx} className="p-chip">
                      {t}
                    </span>
                  ))}
                </div>

                {proj.featured ? (
                  <div className="p-actions">
                    <a
                      href={proj.demoUrl || proj.repo}
                      className="p-btn-primary"
                      onClick={() => soundFx.playCardClick()}
                    >
                      <Play size={12} fill="currentColor" />
                      <span>Open App</span>
                    </a>
                    {proj.sourceRepo && (
                      <a
                        href={proj.sourceRepo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-btn-secondary"
                        onClick={() => soundFx.playCardClick()}
                      >
                        <ExternalLink size={12} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="p-actions">
                    <a
                      href={proj.repo}
                      target={isInternal ? '_self' : '_blank'}
                      rel={isInternal ? '' : 'noreferrer noopener'}
                      className="p-btn-secondary"
                      onClick={() => soundFx.playCardClick()}
                    >
                      <ExternalLink size={12} />
                      <span>View Project</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
