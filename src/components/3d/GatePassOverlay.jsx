import React from 'react';
import AccessPassCard from './AccessPassCard';
import { soundFx } from '../../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, Plane } from 'lucide-react';
import '../../styles/gate.css';

export default function GatePassOverlay({ onGranted, onSkip, isDark, isOpen }) {
  if (!isOpen) return null;

  const handleTap = () => {
    soundFx.playNfcSuccess();
    onGranted();
  };

  return (
    <div className={`gate-overlay ${!isOpen ? 'is-hidden' : ''}`}>
      {/* 3D Canvas Canvas */}
      <div className="gate-canvas-wrap">
        <AccessPassCard onGranted={handleTap} isDark={isDark} />
      </div>

      {/* UI Overlay */}
      <div className="gate-ui">
        <div className="gate-header">
          <div className="gate-logo">
            <Plane size={18} color="var(--folio-blue)" />
            <span>RIFAI AIRWAYS • CHECK-IN</span>
          </div>
          <div className="gate-status-tag">
            <ShieldCheck size={13} style={{ display: 'inline', marginRight: 4 }} />
            BOARDING PASS VERIFICATION
          </div>
        </div>

        <div className="gate-footer">
          <div className="gate-hint">
            <span>👋 Drag pass with cursor, then</span>
            <span className="gate-hint-shimmer">TAP OR CLICK CARD TO BOARD</span>
          </div>

          <div className="gate-actions">
            <button className="gate-tap-btn" onClick={handleTap}>
              <Sparkles size={14} />
              <span>Tap Pass to Enter</span>
            </button>
            <button className="gate-skip-btn" onClick={onSkip}>
              <span>Skip Check-In</span>
              <ArrowRight size={13} style={{ display: 'inline', marginLeft: 4 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
