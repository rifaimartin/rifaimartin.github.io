import React from 'react';
import { soundFx } from '../../utils/audio';
import { Cpu, Network, Activity, QrCode, Shuffle, FileCheck, CreditCard, ShieldCheck, Database } from 'lucide-react';

const iconMap = {
  Cpu,
  Network,
  Activity,
  QrCode,
  Shuffle,
  FileCheck,
  CreditCard,
  ShieldCheck,
  Database
};

export default function CaseStudyItem({ study, onOpen }) {
  const handleClick = (e) => {
    e.preventDefault();
    soundFx.playCardClick();
    if (onOpen) {
      onOpen(study);
    }
  };

  return (
    <li className="case" onClick={handleClick} onMouseEnter={() => soundFx.playHover()}>
      {/* 3D Stacked Screenshot Cards with Hover Spread Effect */}
      <div className="case-shots" aria-hidden="true">
        {study.shots.map((shot, idx) => {
          const IconComponent = iconMap[shot.icon] || Cpu;
          return (
            <div
              key={idx}
              className="cs-shot"
              style={{ backgroundColor: shot.color }}
            >
              <IconComponent size={14} />
            </div>
          );
        })}
      </div>

      {/* Case Study Meta */}
      <div className="case-text">
        <span className="case-category">{study.category}</span>
        <h4 className="case-title">{study.title}</h4>
        <p className="case-desc">{study.desc}</p>
        {study.metrics && (
          <span className="case-metrics">{study.metrics}</span>
        )}
      </div>
    </li>
  );
}
