import React from 'react';

export function ArticleCharacter({ id, size = 'card' }) {
  const isModal = size === 'modal';
  const width = isModal ? 120 : 64;
  const height = isModal ? 120 : 64;

  switch (id) {
    case 'ini-bukan-akhir':
      // Aviator Developer with Rocket & Clouds (Telkom Journey)
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="url(#grad-telkom)" />
          {/* Cloud Layer */}
          <path d="M22 68 C22 62, 28 58, 35 60 C38 52, 48 50, 54 56 C58 52, 68 53, 70 60 C76 61, 80 66, 78 72 C78 76, 72 80, 68 80 L28 80 C23 80, 20 74, 22 68 Z" fill="#ffffff" fillOpacity="0.85" />
          {/* Character Head */}
          <circle cx="50" cy="40" r="16" fill="#fde047" />
          {/* Aviator Goggles & Cap */}
          <path d="M35 34 C35 24, 65 24, 65 34 L35 34 Z" fill="#3b82f6" />
          <rect x="38" y="32" width="10" height="7" rx="3.5" fill="#1e293b" />
          <rect x="52" y="32" width="10" height="7" rx="3.5" fill="#1e293b" />
          <path d="M48 35 L52 35" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="43" cy="35.5" r="2" fill="#38bdf8" />
          <circle cx="57" cy="35.5" r="2" fill="#38bdf8" />
          {/* Smiling Face */}
          <path d="M46 47 Q50 51 54 47" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          {/* Character Body / Pilot Jacket */}
          <path d="M36 56 C36 52, 64 52, 64 56 L68 76 L32 76 Z" fill="#2563eb" />
          {/* Red Tie / Telkom Red Accent */}
          <polygon points="50,56 53,68 50,74 47,68" fill="#ef4444" />
          {/* Mini Rocket Trail */}
          <path d="M72 32 L82 22 M80 32 L88 28 M72 40 L82 38" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="grad-telkom" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" />
              <stop offset="1" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'belajar-dari-tech-lead':
      // Presenting Architect with Lightbulb & Whiteboard Chart
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="url(#grad-techlead)" />
          {/* Mini Whiteboard Backing */}
          <rect x="22" y="24" width="34" height="24" rx="4" fill="#ffffff" fillOpacity="0.9" />
          <path d="M26 38 L32 32 L38 36 L48 28" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="28" r="2.5" fill="#ef4444" />
          {/* Glowing Lightbulb */}
          <circle cx="74" cy="28" r="8" fill="#fbbf24" />
          <path d="M72 36 L76 36 M73 38 L75 38" stroke="#d97706" strokeWidth="1.5" />
          <path d="M74 15 L74 18 M63 22 L66 24 M85 22 L82 24" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          {/* Character Head */}
          <circle cx="54" cy="52" r="15" fill="#fde047" />
          {/* Smart Glasses */}
          <rect x="44" y="48" width="9" height="7" rx="2" fill="#0f172a" />
          <rect x="55" y="48" width="9" height="7" rx="2" fill="#0f172a" />
          <line x1="53" y1="51" x2="55" y2="51" stroke="#0f172a" strokeWidth="2" />
          <circle cx="48.5" cy="51.5" r="1.5" fill="#ffffff" />
          <circle cx="59.5" cy="51.5" r="1.5" fill="#ffffff" />
          {/* Smile */}
          <path d="M51 60 Q54 63 57 60" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          {/* Body */}
          <path d="M40 68 C40 64, 68 64, 68 68 L72 86 L36 86 Z" fill="#059669" />
          <defs>
            <linearGradient id="grad-techlead" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'message-broker-otak':
      // Mindful Tech Character with Brain Synapse & Glowing Kafka Stream
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="url(#grad-brain)" />
          {/* Kafka Event Nodes Orbiting */}
          <circle cx="28" cy="30" r="6" fill="#38bdf8" />
          <circle cx="72" cy="32" r="7" fill="#a855f7" />
          <circle cx="76" cy="66" r="5" fill="#34d399" />
          <path d="M28 30 Q50 18 72 32" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M72 32 Q82 50 76 66" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
          {/* Character Head */}
          <circle cx="50" cy="46" r="16" fill="#fde047" />
          {/* Futuristic Brain Band / Headset */}
          <path d="M34 42 C34 30, 66 30, 66 42" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
          <circle cx="34" cy="44" r="5" fill="#4338ca" />
          <circle cx="66" cy="44" r="5" fill="#4338ca" />
          {/* Zen Eyes (Meditating) */}
          <path d="M43 46 Q46 49 49 46" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          <path d="M51 46 Q54 49 57 46" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          {/* Peaceful Smile */}
          <path d="M47 54 Q50 57 53 54" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          {/* Zen Robe / Body */}
          <path d="M35 64 C35 58, 65 58, 65 64 L70 82 L30 82 Z" fill="#6d28d9" />
          <defs>
            <linearGradient id="grad-brain" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#818cf8" />
              <stop offset="1" stopColor="#4c1d95" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'podcast-indonesia-belajar':
      // Broadcaster Coder with Studio Headphones & Microphone
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="url(#grad-podcast)" />
          {/* Sound Waves */}
          <path d="M18 42 C14 47, 14 53, 18 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M82 42 C86 47, 86 53, 82 58" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Character Head */}
          <circle cx="48" cy="42" r="16" fill="#fde047" />
          {/* Studio Headphones */}
          <path d="M32 38 C32 24, 64 24, 64 38" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" />
          <rect x="29" y="36" width="6" height="12" rx="3" fill="#ea580c" />
          <rect x="61" y="36" width="6" height="12" rx="3" fill="#ea580c" />
          {/* Eyes & Smile */}
          <circle cx="43" cy="42" r="2.5" fill="#0f172a" />
          <circle cx="53" cy="42" r="2.5" fill="#0f172a" />
          <path d="M44 49 Q48 54 52 49" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          {/* Retro Studio Mic */}
          <rect x="66" y="52" width="10" height="15" rx="5" fill="#94a3b8" />
          <line x1="71" y1="67" x2="71" y2="76" stroke="#475569" strokeWidth="3" />
          <path d="M68 56 L74 56 M68 60 L74 60" stroke="#0f172a" strokeWidth="1.5" />
          {/* Body */}
          <path d="M34 60 C34 56, 62 56, 62 60 L66 80 L30 80 Z" fill="#ea580c" />
          <defs>
            <linearGradient id="grad-podcast" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fb923c" />
              <stop offset="1" stopColor="#c2410c" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'meeting-sampe-sahur':
    default:
      // Midnight Sprint Coder with Coffee & Crescent Moon
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="url(#grad-sahur)" />
          {/* Crescent Moon & Stars */}
          <path d="M76 22 C70 24, 68 32, 72 38 C75 42, 80 43, 84 41 C82 46, 76 50, 70 48 C62 46, 58 38, 60 30 C62 24, 68 20, 76 22 Z" fill="#fef08a" />
          <circle cx="30" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="44" cy="18" r="1.5" fill="#ffffff" />
          <circle cx="24" cy="34" r="1.5" fill="#ffffff" />
          {/* Character Head */}
          <circle cx="48" cy="46" r="16" fill="#fde047" />
          {/* Tired Focused Eyes */}
          <line x1="40" y1="44" x2="46" y2="44" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="50" y1="44" x2="56" y2="44" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M44 52 Q48 55 52 52" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          {/* Steaming Coffee Mug */}
          <rect x="68" y="58" width="12" height="14" rx="3" fill="#ffffff" />
          <path d="M80 62 C83 62, 84 68, 80 68" stroke="#ffffff" strokeWidth="2" />
          {/* Steam */}
          <path d="M71 54 Q74 50 71 46" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
          <path d="M76 54 Q79 50 76 46" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
          {/* Hoodie Body */}
          <path d="M34 62 C34 58, 62 58, 62 62 L66 82 L30 82 Z" fill="#334155" />
          <defs>
            <linearGradient id="grad-sahur" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e1b4b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
}
