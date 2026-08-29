import React from 'react';
import { profileData } from '../../data/profileData';
import { Code2, Star, ExternalLink, Terminal } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function ProjectList() {
  return (
    <div className="projects-block reveal">
      <div className="projects-title">
        <Terminal size={15} />
        <span>Open Source & System Research</span>
      </div>

      <div className="projects-grid">
        {profileData.projects.map((proj) => (
          <a
            key={proj.id}
            href={proj.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="project-card"
            onMouseEnter={() => soundFx.playHover()}
          >
            <div>
              <div className="p-header">
                <div className="p-title">
                  <Code2 size={15} color="var(--folio-blue)" />
                  <span>{proj.title}</span>
                </div>
                <span className="p-badge">{proj.stars}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--folio-mute)', marginBottom: '8px' }}>
                {proj.category}
              </p>
              <p className="p-desc">
                {proj.desc}
              </p>
            </div>

            <div className="p-tags">
              {proj.tech.map((t, idx) => (
                <span key={idx} className="p-chip">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
