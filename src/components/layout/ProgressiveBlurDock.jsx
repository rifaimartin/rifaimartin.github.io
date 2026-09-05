import React from 'react';
import { soundFx } from '../../utils/audio';
import { useVisitorCount } from '../../utils/visitorCounter';
import { Sun, Moon, Sparkles, Mail, ArrowUp, BookOpen, Eye, Dumbbell, Award, Landmark } from 'lucide-react';

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function ProgressiveBlurDock({ onResetGate, onOpenOpenGym, onOpenPsikotest, onOpenTpdBi, isDark, onToggleTheme }) {
  const { formattedCount } = useVisitorCount();

  const scrollToTop = () => {
    soundFx.playCardClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToMagazine = () => {
    soundFx.playCardClick();
    const el = document.getElementById('in-flight-magazine');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Multi-layered Progressive Glass Blur */}
      <div className="folio-footer-fx" aria-hidden="true">
        <div className="pb pb1" />
        <div className="pb pb2" />
        <div className="pb pb3" />
        <div className="pb pb4" />
        <div className="pb pb5" />
        <div className="folio-footer-tint" />
      </div>

      {/* Floating Bottom Navigation Capsule */}
      <footer className="folio-footer">
        <div className="folio-footer-inner">
          <nav className="ff-dock" aria-label="Quick Navigation">
            {/* Return to Gate Check-In Button */}
            <button
              className="ff-link"
              onClick={() => {
                soundFx.playCardClick();
                onResetGate();
              }}
              title="Re-open 3D Boarding Pass Gate"
            >
              <Sparkles size={13} color="var(--folio-blue)" />
              <span>Gate</span>
            </button>

            {/* In-Flight Reads shortcut */}
            <button
              className="ff-link"
              onClick={scrollToMagazine}
              title="Jump to In-Flight Reading & Articles"
            >
              <BookOpen size={13} />
              <span>Reads</span>
            </button>

            {/* openGym App direct launcher */}
            <button
              className="ff-link"
              onClick={() => {
                soundFx.playCardClick();
                if (onOpenOpenGym) onOpenOpenGym();
              }}
              title="Launch openGym Interactive App Simulator"
            >
              <Dumbbell size={13} color="#38bdf8" />
              <span>Gym</span>
            </button>

            {/* Psikotest Bank Simulator direct launcher */}
            <button
              className="ff-link"
              onClick={() => {
                soundFx.playCardClick();
                if (onOpenPsikotest) onOpenPsikotest();
              }}
              title="Launch Banking Psychometric Test Simulator"
            >
              <Award size={13} color="#10b981" />
              <span>Psiko</span>
            </button>

            {/* TPD Bank Indonesia Simulator direct launcher */}
            <button
              className="ff-link"
              onClick={() => {
                soundFx.playCardClick();
                if (onOpenTpdBi) onOpenTpdBi();
              }}
              title="Launch TPD Bank Indonesia (PCPM Experd) Simulator"
            >
              <Landmark size={13} color="#f59e0b" />
              <span>TPD BI</span>
            </button>

            <div className="ff-divider" />

            {/* Social & Contact Links */}
            <a
              className="ff-link"
              href="https://github.com/rifaimartin"
              target="_blank"
              rel="noreferrer noopener"
              title="GitHub Profile"
            >
              <GithubIcon size={13} />
              <span className="ff-label-desktop">GitHub</span>
            </a>

            <a
              className="ff-link"
              href="https://www.linkedin.com/in/rifai-martin/"
              target="_blank"
              rel="noreferrer noopener"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={13} />
              <span className="ff-label-desktop">LinkedIn</span>
            </a>

            <a
              className="ff-link"
              href="mailto:rifaimartinjham@gmail.com"
              title="Send Email"
            >
              <Mail size={13} />
              <span className="ff-label-desktop">Contact</span>
            </a>

            <div className="ff-divider" />

            {/* Dark / Light Theme Toggle */}
            <button
              className="ff-link"
              onClick={() => {
                soundFx.playCardClick();
                onToggleTheme();
              }}
              title={isDark ? "Switch to Daylight Mode" : "Switch to Night Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={13} color="#f59e0b" /> : <Moon size={13} color="#6366f1" />}
              <span className="ff-label-desktop">{isDark ? 'Day' : 'Night'}</span>
            </button>

            <div className="ff-divider" />

            {/* Global Live Views Counter Badge */}
            <div
              className="ff-badge-views"
              title="Unique Visitors (Session Deduplicated)"
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  boxShadow: '0 0 6px #10b981',
                  flexShrink: 0
                }}
              />
              <Eye size={12} color="var(--folio-blue)" style={{ flexShrink: 0 }} />
              <span>{formattedCount}</span>
            </div>

            <div className="ff-divider" />

            {/* Scroll to Top */}
            <button
              className="ff-link"
              onClick={scrollToTop}
              title="Ascend to Top of Flight"
            >
              <ArrowUp size={13} />
              <span className="ff-label-desktop">Top</span>
            </button>
          </nav>
        </div>
      </footer>
    </>
  );
}
