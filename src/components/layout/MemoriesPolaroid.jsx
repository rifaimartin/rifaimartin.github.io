import React, { useState } from 'react';
import { profileData } from '../../data/profileData';
import { soundFx } from '../../utils/audio';

export default function MemoriesPolaroid() {
  const [activeIdx, setActiveIdx] = useState(null);

  const cardTransforms = [
    { x: -50, y: 2, r: -14, s: 0.95 },
    { x: -18, y: -2, r: -4, s: 1 },
    { x: 18, y: -3, r: 6, s: 1.02 },
    { x: 52, y: 3, r: 15, s: 0.96 }
  ];

  return (
    <div className="folio-outro reveal">
      <div className="outro-text">
        <h3 className="outro-title">Thank you for flying with Rifai.</h3>
        <p className="outro-sub">
          A few milestones between system takeoff, high-scale traffic peaks, and research landings.
        </p>
      </div>

      {/* Polaroid Fan Cards */}
      <div className="memories">
        {profileData.memories.map((mem, idx) => {
          const t = cardTransforms[idx] || cardTransforms[0];
          const isActive = activeIdx === idx;

          return (
            <div
              key={idx}
              className={`mem-card ${isActive ? 'is-active' : ''}`}
              style={{
                '--x': `${t.x}px`,
                '--y': `${t.y}px`,
                '--r': `${t.r}deg`,
                '--s': `${t.s}`,
                zIndex: isActive ? 20 : idx + 1
              }}
              onMouseEnter={() => {
                setActiveIdx(idx);
                soundFx.playHover();
              }}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => soundFx.playCardClick()}
            >
              <span className="mem-year">{mem.year}</span>
              <span className="mem-label">{mem.title}</span>

              {/* Floating Tooltip */}
              {isActive && (
                <div className="mem-tip">
                  <strong>{mem.label}:</strong> {mem.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
