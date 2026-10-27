import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle, CheckCircle2, RefreshCw, Layers, ArrowRight } from 'lucide-react';

const ACCENT = '#00a4e4';
const ACCENT_GREEN = '#10b981';
const ACCENT_RED = '#ef4444';
const ACCENT_ORANGE = '#f59e0b';

/**
 * 1. Interactive Animated Electrical Circuit Breaker (Analogi Sekering Listrik)
 * Allows live toggling of CLOSED, OPEN, and HALF_OPEN states with animated knife switch and electric flow.
 */
export function CircuitBreakerFuseVisualizer() {
  const [state, setState] = useState('CLOSED'); // 'CLOSED' | 'OPEN' | 'HALF_OPEN'
  const [sparkKey, setSparkKey] = useState(0);

  const handleToggle = (newState) => {
    setState(newState);
    if (newState === 'OPEN') {
      setSparkKey((prev) => prev + 1);
    }
  };

  const isClosed = state === 'CLOSED';
  const isOpen = state === 'OPEN';
  const isHalfOpen = state === 'HALF_OPEN';

  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid var(--card-border)',
      background: '#090d16',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} color={isClosed ? ACCENT_GREEN : isOpen ? ACCENT_RED : ACCENT_ORANGE} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
            SIMULASI INTERAKTIF: ANALOGI SEKERING LISTRIK RESILIENCE4J
          </span>
        </div>

        {/* State Toggle Buttons */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => handleToggle('CLOSED')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: isClosed ? `1.5px solid ${ACCENT_GREEN}` : '1px solid #334155',
              background: isClosed ? `${ACCENT_GREEN}25` : '#1e293b',
              color: isClosed ? ACCENT_GREEN : '#94a3b8',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ● CLOSED (Normal)
          </button>
          <button
            type="button"
            onClick={() => handleToggle('OPEN')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: isOpen ? `1.5px solid ${ACCENT_RED}` : '1px solid #334155',
              background: isOpen ? `${ACCENT_RED}25` : '#1e293b',
              color: isOpen ? ACCENT_RED : '#94a3b8',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ⚡ OPEN (Trip / Korslet!)
          </button>
          <button
            type="button"
            onClick={() => handleToggle('HALF_OPEN')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: isHalfOpen ? `1.5px solid ${ACCENT_ORANGE}` : '1px solid #334155',
              background: isHalfOpen ? `${ACCENT_ORANGE}25` : '#1e293b',
              color: isHalfOpen ? ACCENT_ORANGE : '#94a3b8',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            ◐ HALF-OPEN (Probe)
          </button>
        </div>
      </div>

      {/* SVG Circuit Schematic */}
      <div style={{ width: '100%', height: '120px', position: 'relative', overflow: 'hidden' }}>
        <svg viewBox="0 0 760 120" style={{ width: '100%', height: '100%' }}>
          <defs>
            {/* Animated Dash for Electric Flow */}
            <linearGradient id="electricGradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="electricGradOrange" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Wire Background (Cold / Inactive) */}
          <path d="M 50 60 L 260 60" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <path d="M 390 60 L 610 60" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

          {/* Wire Active Animated Current (Only if not fully OPEN) */}
          {!isOpen && (
            <>
              <path
                d="M 50 60 L 260 60"
                stroke={isClosed ? 'url(#electricGradGreen)' : 'url(#electricGradOrange)'}
                strokeWidth="4"
                strokeDasharray="12 6"
                strokeLinecap="round"
                filter="url(#glowGreen)"
                style={{ animation: 'electricFlowAnim 0.7s linear infinite' }}
              />
              <path
                d="M 390 60 L 610 60"
                stroke={isClosed ? 'url(#electricGradGreen)' : 'url(#electricGradOrange)'}
                strokeWidth="4"
                strokeDasharray="12 6"
                strokeLinecap="round"
                filter="url(#glowGreen)"
                style={{ animation: 'electricFlowAnim 0.7s linear infinite' }}
              />
            </>
          )}

          {/* Power Source (Left Box) */}
          <rect x="20" y="32" width="100" height="56" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="70" y="55" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">INCOMING</text>
          <text x="70" y="72" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">TRAFFIC (TPS)</text>

          {/* Contact Node Left */}
          <circle cx="260" cy="60" r="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />

          {/* Contact Node Right */}
          <circle cx="390" cy="60" r="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2" />

          {/* Mechanical Knife Switch Blade */}
          <g transform="translate(260, 60)">
            <line
              x1="0"
              y1="0"
              x2="130"
              y2="0"
              stroke={isClosed ? '#10b981' : isOpen ? '#ef4444' : '#f59e0b'}
              strokeWidth="6"
              strokeLinecap="round"
              filter={isClosed ? 'url(#glowGreen)' : isOpen ? 'url(#glowRed)' : 'none'}
              style={{
                transformOrigin: '0px 0px',
                transform: isClosed ? 'rotate(0deg)' : isOpen ? 'rotate(-36deg)' : 'rotate(-12deg)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          </g>

          {/* Spark Particles when Tripped to OPEN */}
          {isOpen && (
            <g key={sparkKey} transform="translate(370, 42)">
              <circle cx="0" cy="0" r="3" fill="#fbbf24" style={{ animation: 'sparkPop 0.4s ease-out forwards' }} />
              <line x1="-5" y1="-5" x2="-15" y2="-15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="-8" x2="16" y2="-20" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
              <line x1="0" y1="5" x2="6" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Target Downstream Service (Right Box) */}
          <rect
            x="610"
            y="32"
            width="130"
            height="56"
            rx="8"
            fill={isClosed ? '#064e3b' : isOpen ? '#450a0a' : '#451a03'}
            stroke={isClosed ? '#10b981' : isOpen ? '#ef4444' : '#f59e0b'}
            strokeWidth="1.5"
            style={{ transition: 'all 0.3s ease' }}
          />
          <text x="675" y="54" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            {isClosed ? 'PARTNER UP ✅' : isOpen ? 'DOWNSTREAM ❌' : 'PROBING ⚖️'}
          </text>
          <text x="675" y="72" fill={isClosed ? '#34d399' : isOpen ? '#f87171' : '#fbbf24'} fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
            {isClosed ? 'ALTO (ONLINE)' : isOpen ? 'TRIPPED (ISOLATED)' : '10 CALLS TRIAL'}
          </text>
        </svg>
      </div>

      {/* Explanatory Caption */}
      <div style={{
        fontSize: '13px',
        padding: '8px 14px',
        borderRadius: '8px',
        background: isClosed ? '#10b98115' : isOpen ? '#ef444415' : '#f59e0b15',
        border: `1px solid ${isClosed ? '#10b98135' : isOpen ? '#ef444435' : '#f59e0b35'}`,
        color: isClosed ? '#34d399' : isOpen ? '#fca5a5' : '#fde68a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        lineHeight: 1.5
      }}>
        <span>
          <strong>Status Saat Ini: [{state}]</strong> —{' '}
          {isClosed && 'Arus request dialirkan normal. Failure rate < 90%.'}
          {isOpen && 'Sekering terputus! Request ditolak instan dalam 1ms (CallNotPermittedException) tanpa membebani thread.'}
          {isHalfOpen && 'Masa tunggu selesai. Sekering setengah terbuka mengirim 10 request sampel untuk mengecek apakah downstream sudah sembuh.'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', opacity: 0.9, whiteSpace: 'nowrap', marginLeft: '10px' }}>
          {isClosed ? '⚡ Latency: 45ms' : isOpen ? '⚡ Fast-Fail: < 1ms' : '⚡ Trial Probe'}
        </span>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes electricFlowAnim {
          0% { stroke-dashoffset: 36; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes sparkPop {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/**
 * 2. Interactive 2-Layer Failover Packet Flow Visualizer
 * Visualizes incoming QRIS packets branching between:
 * - Layer 1: Global Switcher CB ("alto" / "rintis")
 * - Layer 2: Granular NNS CB Matrix ("qris-alto-{nns}")
 * Demonstrating how Mandiri (93600008) fails over to RINTIS while BCA (93600014) stays on ALTO.
 */
export function FailoverPacketFlowVisualizer() {
  const [scenario, setScenario] = useState('NORMAL'); // 'NORMAL' | 'NNS_DOWN' | 'ALTO_DOWN'

  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid var(--card-border)',
      background: '#090d16',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Header & Scenario Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={16} color={ACCENT} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
            SIMULASI ARSITEKTUR 2-LAYER: GLOBAL SWITCHER &amp; GRANULAR NNS
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setScenario('NORMAL')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: scenario === 'NORMAL' ? `1.5px solid ${ACCENT_GREEN}` : '1px solid #334155',
              background: scenario === 'NORMAL' ? `${ACCENT_GREEN}25` : '#1e293b',
              color: scenario === 'NORMAL' ? ACCENT_GREEN : '#94a3b8',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            1. Normal (L1 &amp; L2 Closed)
          </button>
          <button
            type="button"
            onClick={() => setScenario('NNS_DOWN')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: scenario === 'NNS_DOWN' ? `1.5px solid ${ACCENT_ORANGE}` : '1px solid #334155',
              background: scenario === 'NNS_DOWN' ? `${ACCENT_ORANGE}25` : '#1e293b',
              color: scenario === 'NNS_DOWN' ? ACCENT_ORANGE : '#94a3b8',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            2. Layer 2: Mandiri Down (qris-alto-93600008)
          </button>
          <button
            type="button"
            onClick={() => setScenario('ALTO_DOWN')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: scenario === 'ALTO_DOWN' ? `1.5px solid ${ACCENT_RED}` : '1px solid #334155',
              background: scenario === 'ALTO_DOWN' ? `${ACCENT_RED}25` : '#1e293b',
              color: scenario === 'ALTO_DOWN' ? ACCENT_RED : '#94a3b8',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            3. Layer 1: ALTO Total Down ("alto")
          </button>
        </div>
      </div>

      {/* SVG Routing Schema with Layer 1 and Layer 2 Boxes */}
      <div style={{ width: '100%', height: '220px', position: 'relative' }}>
        <svg viewBox="0 0 920 220" style={{ width: '100%', height: '100%' }}>
          <defs>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowRedSmall" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Static Background Routing Lines */}
          {/* Path 1: Gateway -> L1 Global CB */}
          <path
            d="M 145 110 C 165 110, 165 70, 185 70"
            fill="none"
            stroke={scenario === 'ALTO_DOWN' ? '#ef4444' : '#334155'}
            strokeWidth="2.5"
          />

          {/* Path 2: L1 -> L2 BCA */}
          <path
            d="M 325 70 C 350 70, 350 56, 375 56"
            fill="none"
            stroke={scenario === 'ALTO_DOWN' ? '#334155' : '#334155'}
            strokeWidth="2"
            strokeDasharray={scenario === 'ALTO_DOWN' ? '4 4' : 'none'}
          />

          {/* Path 3: L1 -> L2 Mandiri */}
          <path
            d="M 325 70 C 350 70, 350 94, 375 94"
            fill="none"
            stroke={scenario === 'ALTO_DOWN' ? '#334155' : '#334155'}
            strokeWidth="2"
            strokeDasharray={scenario === 'ALTO_DOWN' ? '4 4' : 'none'}
          />

          {/* Path 4: L2 BCA -> ALTO Switcher */}
          <path
            d="M 645 56 L 695 56"
            fill="none"
            stroke={scenario === 'ALTO_DOWN' ? '#334155' : '#10b981'}
            strokeWidth="2.5"
          />

          {/* Path 5: L2 Mandiri -> ALTO Switcher (Active if NORMAL) */}
          <path
            d="M 645 94 C 665 94, 675 76, 695 76"
            fill="none"
            stroke={scenario === 'NORMAL' ? '#10b981' : '#334155'}
            strokeWidth="2"
            strokeDasharray={scenario === 'NORMAL' ? 'none' : '4 4'}
          />

          {/* Path 6: L2 Mandiri Failover -> RINTIS Switcher (Active if NNS_DOWN) */}
          <path
            d="M 645 94 C 670 94, 665 168, 695 168"
            fill="none"
            stroke={scenario === 'NNS_DOWN' ? '#f59e0b' : '#1e293b'}
            strokeWidth={scenario === 'NNS_DOWN' ? '2.5' : '1.5'}
            strokeDasharray={scenario === 'NNS_DOWN' ? 'none' : '4 4'}
          />

          {/* Path 7: L1 Macro Bypass -> RINTIS Switcher (Active if ALTO_DOWN) */}
          <path
            d="M 145 110 C 220 110, 310 185, 695 185"
            fill="none"
            stroke={scenario === 'ALTO_DOWN' ? '#ef4444' : '#1e293b'}
            strokeWidth={scenario === 'ALTO_DOWN' ? '3' : '1.5'}
            strokeDasharray={scenario === 'ALTO_DOWN' ? 'none' : '4 4'}
          />

          {/* === ANIMATED FLOW PARTICLES === */}
          {/* Scenario 1: NORMAL */}
          {scenario === 'NORMAL' && (
            <>
              {/* BCA Packet (Cyan) */}
              <circle r="4.5" fill="#38bdf8" filter="url(#glowCyan)">
                <animateMotion
                  path="M 145 110 C 165 110, 165 70, 185 70 L 325 70 C 350 70, 350 56, 375 56 L 645 56 L 695 56"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Mandiri Packet (Emerald) */}
              <circle r="4.5" fill="#34d399" filter="url(#glowCyan)">
                <animateMotion
                  path="M 145 110 C 165 110, 165 70, 185 70 L 325 70 C 350 70, 350 94, 375 94 L 645 94 C 665 94, 675 76, 695 76"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Scenario 2: NNS_DOWN (Mandiri Down, BCA Normal) */}
          {scenario === 'NNS_DOWN' && (
            <>
              {/* BCA Packet continues to ALTO */}
              <circle r="4.5" fill="#38bdf8" filter="url(#glowCyan)">
                <animateMotion
                  path="M 145 110 C 165 110, 165 70, 185 70 L 325 70 C 350 70, 350 56, 375 56 L 645 56 L 695 56"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Mandiri Packet diverted at L2 down to RINTIS! */}
              <circle r="5" fill="#f59e0b" filter="url(#glowAmber)">
                <animateMotion
                  path="M 145 110 C 165 110, 165 70, 185 70 L 325 70 C 350 70, 350 94, 375 94 L 645 94 C 670 94, 665 168, 695 168"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Scenario 3: ALTO_DOWN (Macro L1 Cut-off) */}
          {scenario === 'ALTO_DOWN' && (
            <circle r="5.5" fill="#ef4444" filter="url(#glowRedSmall)">
              <animateMotion
                path="M 145 110 C 220 110, 310 185, 695 185"
                dur="1.1s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* === 1. INCOMING GATEWAY BOX (LEFT) === */}
          <rect x="15" y="80" width="130" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="80" y="102" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            QRIS GATEWAY
          </text>
          <text x="80" y="117" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">
            Failover Router
          </text>
          <text x="80" y="130" fill="#38bdf8" fontSize="8.5" textAnchor="middle" fontFamily="var(--font-mono)">
            NNS Extractor
          </text>

          {/* === 2. LAYER 1: GLOBAL SWITCHER CB BOX === */}
          <rect
            x="185"
            y="40"
            width="140"
            height="60"
            rx="8"
            fill={scenario === 'ALTO_DOWN' ? '#450a0a' : '#064e3b30'}
            stroke={scenario === 'ALTO_DOWN' ? '#ef4444' : '#10b981'}
            strokeWidth="1.5"
          />
          <text x="255" y="58" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            LAYER 1: GLOBAL CB
          </text>
          <text x="255" y="73" fill={scenario === 'ALTO_DOWN' ? '#f87171' : '#34d399'} fontSize="11" fontWeight="800" textAnchor="middle" fontFamily="var(--font-mono)">
            CB: "alto"
          </text>
          <text x="255" y="89" fill={scenario === 'ALTO_DOWN' ? '#fca5a5' : '#86efac'} fontSize="8.5" textAnchor="middle" fontFamily="var(--font-mono)">
            {scenario === 'ALTO_DOWN' ? '⚡ OPEN (Trip Macro!)' : '● CLOSED (Healthy)'}
          </text>

          {/* === 3. LAYER 2: GRANULAR NNS CB MATRIX (qris-alto-{nns}) === */}
          {/* Outer Grouping Container */}
          <rect
            x="365"
            y="16"
            width="280"
            height="108"
            rx="8"
            fill="#0b1120"
            stroke={scenario === 'NNS_DOWN' ? '#f59e0b' : '#334155'}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="505" y="32" fill="#93c5fd" fontSize="9.5" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            LAYER 2: GRANULAR NNS BREAKERS (qris-alto-{'{nns}'})
          </text>

          {/* Sub-box A: BCA / blu (qris-alto-93600014) */}
          <rect
            x="378"
            y="40"
            width="254"
            height="31"
            rx="5"
            fill={scenario === 'ALTO_DOWN' ? '#1e293b50' : '#064e3b25'}
            stroke={scenario === 'ALTO_DOWN' ? '#475569' : '#10b981'}
            strokeWidth="1.2"
          />
          <text x="388" y="58" fill="#f8fafc" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)">
            qris-alto-93600014 (BCA/blu)
          </text>
          <text x="620" y="58" fill={scenario === 'ALTO_DOWN' ? '#94a3b8' : '#34d399'} fontSize="9" fontWeight="700" textAnchor="end" fontFamily="var(--font-mono)">
            {scenario === 'ALTO_DOWN' ? 'BYPASS' : 'CLOSED ●'}
          </text>

          {/* Sub-box B: Mandiri (qris-alto-93600008) */}
          <rect
            x="378"
            y="78"
            width="254"
            height="31"
            rx="5"
            fill={scenario === 'ALTO_DOWN' ? '#1e293b50' : scenario === 'NNS_DOWN' ? '#450a0a' : '#064e3b25'}
            stroke={scenario === 'ALTO_DOWN' ? '#475569' : scenario === 'NNS_DOWN' ? '#ef4444' : '#10b981'}
            strokeWidth="1.2"
          />
          <text x="388" y="96" fill="#f8fafc" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)">
            qris-alto-93600008 (Mandiri)
          </text>
          <text
            x="620"
            y="96"
            fill={scenario === 'ALTO_DOWN' ? '#94a3b8' : scenario === 'NNS_DOWN' ? '#f87171' : '#34d399'}
            fontSize="9"
            fontWeight="700"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            {scenario === 'ALTO_DOWN' ? 'BYPASS' : scenario === 'NNS_DOWN' ? 'OPEN ⚡ (Trip!)' : 'CLOSED ●'}
          </text>

          {/* === 4. DESTINATION SWITCHERS (RIGHT) === */}
          {/* ALTO Primary Destination Box */}
          <rect
            x="695"
            y="32"
            width="210"
            height="68"
            rx="8"
            fill={scenario === 'ALTO_DOWN' ? '#450a0a' : scenario === 'NNS_DOWN' ? '#271904' : '#064e3b'}
            stroke={scenario === 'ALTO_DOWN' ? '#ef4444' : scenario === 'NNS_DOWN' ? '#f59e0b' : '#10b981'}
            strokeWidth="1.5"
          />
          <text x="800" y="52" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            SWITCHER ALTO
          </text>
          <text x="800" y="67" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="var(--font-mono)">
            Primary Payment Switcher
          </text>
          <text
            x="800"
            y="85"
            fill={scenario === 'ALTO_DOWN' ? '#fca5a5' : scenario === 'NNS_DOWN' ? '#fde68a' : '#86efac'}
            fontSize="8.5"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {scenario === 'ALTO_DOWN'
              ? '🔴 L1 OPEN (TOTAL CUT-OFF)'
              : scenario === 'NNS_DOWN'
              ? '🟡 BCA Active (Mandiri Diverted)'
              : '🟢 100% Traffic Healthy (Active)'}
          </text>

          {/* RINTIS Secondary Destination Box */}
          <rect
            x="695"
            y="145"
            width="210"
            height="58"
            rx="8"
            fill={scenario === 'NORMAL' ? '#1e293b' : '#064e3b'}
            stroke={scenario === 'NORMAL' ? '#475569' : '#10b981'}
            strokeWidth="1.5"
          />
          <text x="800" y="165" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            SWITCHER RINTIS
          </text>
          <text x="800" y="179" fill="#94a3b8" fontSize="8.5" textAnchor="middle" fontFamily="var(--font-mono)">
            Secondary Fallback Switcher
          </text>
          <text
            x="800"
            y="194"
            fill={scenario === 'NORMAL' ? '#94a3b8' : '#86efac'}
            fontSize="8.5"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {scenario === 'NORMAL'
              ? '⚪ STANDBY (Idle - 0 TPS)'
              : scenario === 'NNS_DOWN'
              ? '🟢 FAILOVER (Mandiri 93600008 Only)'
              : '🟢 100% TRAFFIC FAILOVER ACTIVE'}
          </text>
        </svg>
      </div>

      {/* Dynamic Scenario Legend */}
      <div style={{
        fontSize: '13px',
        padding: '10px 16px',
        borderRadius: '8px',
        background: '#1e293b',
        border: '1px solid #334155',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        lineHeight: 1.55
      }}>
        <span>
          {scenario === 'NORMAL' && (
            <>
              <strong>🟢 Kondisi Normal:</strong> L1 Global (<code>alto</code>) = CLOSED &amp; L2 Granular (<code>qris-alto-{'{nns}'}</code>) = CLOSED. Seluruh transaksi dialirkan ke ALTO.
            </>
          )}
          {scenario === 'NNS_DOWN' && (
            <>
              <strong>🟡 Isolasi Granular L2:</strong> L1 Global (<code>alto</code>) tetap CLOSED. Hanya <code>qris-alto-93600008</code> (Mandiri) yang trip OPEN ⚡! Transaksi Mandiri otomatis reroute ke RINTIS, sedangkan BCA (<code>qris-alto-93600014</code>) tetap di ALTO.
            </>
          )}
          {scenario === 'ALTO_DOWN' && (
            <>
              <strong>🔴 Pemadaman Makro L1:</strong> L1 Global (<code>alto</code>) trip OPEN ⚡ (VPN / core network switcher down). 100% volume pembayaran QRIS langsung dialihkan ke RINTIS tanpa memeriksa L2.
            </>
          )}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: '#38bdf8', whiteSpace: 'nowrap', marginLeft: '12px' }}>
          Decision Latency: &lt; 0.5ms
        </span>
      </div>
    </div>
  );
}


/**
 * 3. Interactive Evolution Visualizer: Netflix Hystrix vs Resilience4j
 * Shows the history timeline from Michael Nygard (2007) to Netflix Hystrix (2012)
 * to Hystrix Deprecation (2018) and Modern Resilience4j architecture.
 */
export function HystrixVsResilience4jVisualizer() {
  const [era, setEra] = useState('MODERN'); // '2007' | '2012' | '2018' | 'MODERN'

  const ERAS = [
    { id: '2007', label: '2007: Release It!', title: 'Kelahiran Konsep (Michael Nygard)' },
    { id: '2012', label: '2012: Netflix Hystrix', title: 'Era Hystrix (Thread-Pool Isolation)' },
    { id: '2018', label: '2018: Hystrix EOL', title: 'Netflix Deprecates Hystrix' },
    { id: 'MODERN', label: '2026: Resilience4j ⚡', title: 'Modern Non-Blocking & Functional Standard' }
  ];

  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid var(--card-border)',
      background: '#090d16',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }}>
      {/* Header & Era Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={16} color={ACCENT} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>
            SEJARAH &amp; EVOLUSI: DARI NETFLIX HYSTRIX MENUJU RESILIENCE4J
          </span>
        </div>

        {/* Timeline Buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {ERAS.map((e) => {
            const active = era === e.id;
            const isModern = e.id === 'MODERN';
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => setEra(e.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: active ? `1.5px solid ${isModern ? ACCENT_GREEN : ACCENT}` : '1px solid #334155',
                  background: active ? (isModern ? `${ACCENT_GREEN}25` : `${ACCENT}25`) : '#1e293b',
                  color: active ? (isModern ? ACCENT_GREEN : '#38bdf8') : '#94a3b8',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {e.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Era Display Card */}
      {era === '2007' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ color: ACCENT, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>ORIGIN STORY</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Buku Legendaris "Release It!" (2007)</div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              Michael T. Nygard memformalkan pola <strong>Circuit Breaker</strong> untuk rekayasa perangkat lunak enterprise. Filosofi dasarnya diadaptasi dari saklar sekering listrik: kegagalan di satu komponen terisolasi tidak boleh memadamkan seluruh sistem.
            </p>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ color: ACCENT_ORANGE, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>PROBLEMATIKA UTAMA</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Mencegah Cascading Outages</div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              Sebelum adanya Circuit Breaker, sistem backend rontok massal saat satu API downstream lambat (&gt; 2000ms), mengunci seluruh worker threads server hingga terjadi pemadaman total (resource starvation).
            </p>
          </div>
        </div>
      )}

      {era === '2012' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#1e293b', border: '1px solid #ef444455' }}>
            <div style={{ color: ACCENT_RED, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>ERA NETFLIX OSS (2012)</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Netflix Hystrix: Pelopor Circuit Breaker Microservices</div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              Netflix mempopulerkan toleransi kegagalan cloud dengan merilis Hystrix. Sangat berjasa memperkenalkan fail-fast, fallback otomatis, dan dashboard telemetry real-time (Turbine).
            </p>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#450a0a25', border: '1px solid #ef444440' }}>
            <div style={{ color: ACCENT_RED, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>BATASAN TEKNIKAL HYSTRIX ⚠️</div>
            <div style={{ fontSize: '13px', color: '#fca5a5', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span>• <strong>Thread-Pool Isolation Overhead:</strong> Tiap breaker membutuhkan OS thread pool terpisah (~1MB JVM stack per thread).</span>
              <span>• <strong>CPU Context-Switch Thrashing:</strong> Ratusan thread pada puluhan endpoint memicu jutaan switch context OS di traffic tinggi.</span>
              <span>• <strong>Monolithic &amp; RxJava 1.x Legacy:</strong> Kompleksitas arsitektur internal yang sulit dioptimasi untuk arsitektur modern.</span>
            </div>
          </div>
        </div>
      )}

      {era === '2018' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#1e293b', border: '1px solid #f59e0b55' }}>
            <div style={{ color: ACCENT_ORANGE, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>MILESTONE RESMI (NOVEMBER 2018)</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Netflix Resmi Deprecate Hystrix</div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              Netflix Tech Announcement: <em>"Hystrix is no longer in active development, and is currently in maintenance mode."</em> Netflix secara eksplisit merekomendasikan komunitas Java enterprise bermigrasi ke <strong>Resilience4j</strong>.
            </p>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ color: ACCENT_GREEN, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>PERUBAHAN PARADIGMA ARSITEKTUR</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Transisi ke Arsitektur Asynchronous &amp; Non-Blocking</div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
              Dunia backend bertransformasi dari <em>Thread-per-Request</em> (blocking I/O) menuju runtime <em>Non-blocking Event Loop</em>. Mempertahankan thread-pool isolasi Hystrix menjadi anti-pattern yang membunuh throughput dan latensi.
            </p>
          </div>
        </div>
      )}

      {era === 'MODERN' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#064e3b25', border: '1px solid #10b98155' }}>
            <div style={{ color: ACCENT_GREEN, fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>MODERN STANDARD: RESILIENCE4J ⚡</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Ringan, Modern, dan Cocok untuk Arsitektur Reactive</div>
            <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.5 }}>
              <div>
                <div style={{ fontWeight: 700, color: '#34d399', fontSize: '13px' }}>Tanpa Thread Tambahan</div>
                <div style={{ color: '#cbd5e1' }}>Resilience4j tidak membuat thread pool sendiri seperti Hystrix. Circuit breaker berjalan langsung pada thread yang sedang memproses request sehingga lebih ringan dan efisien.</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#34d399', fontSize: '13px' }}>Mendukung Pemrograman Modern Java</div>
                <div style={{ color: '#cbd5e1' }}>Dirancang untuk Java 8+, Lambda, CompletableFuture, dan framework reactive seperti Spring WebFlux sehingga mudah diintegrasikan dengan aplikasi modern.</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#34d399', fontSize: '13px' }}>Modular dan Ringan</div>
                <div style={{ color: '#cbd5e1' }}>Hanya menambahkan komponen yang dibutuhkan, seperti Circuit Breaker, Retry, Rate Limiter, atau Bulkhead, sehingga jejak memori dan dependency tetap minimal.</div>
              </div>
            </div>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: '8px', background: '#1e293b', border: '1px solid #334155' }}>
            <div style={{ color: '#38bdf8', fontSize: '12px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>MODERN MICROSERVICES &amp; SPRING</div>
            <div style={{ fontSize: '15.5px', fontWeight: 700, color: '#f8fafc', margin: '4px 0' }}>Ekosistem Fault Tolerance Terintegrasi</div>
            <p style={{ fontSize: '13.5px', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Saat ini Resilience4j banyak digunakan pada sistem transaksi dan microservices modern karena menyediakan <strong>Circuit Breaker</strong>, <strong>Retry</strong>, <strong>Rate Limiter</strong>, <strong>Bulkhead</strong>, dan <strong>Time Limiter</strong> yang terintegrasi dengan ekosistem Spring.
            </p>
          </div>
        </div>
      )}

      {/* Side-by-Side Quick Comparison Table */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.5fr 1.5fr',
        gap: '8px',
        fontSize: '12.5px',
        background: '#0d1322',
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #1f2a44',
        lineHeight: 1.45
      }}>
        <div style={{ fontWeight: 700, color: '#94a3b8' }}>Parameter</div>
        <div style={{ fontWeight: 700, color: '#ef4444' }}>Netflix Hystrix (Legacy 2012)</div>
        <div style={{ fontWeight: 700, color: '#10b981' }}>Resilience4j (Modern Standard) ⚡</div>

        <div style={{ color: '#cbd5e1' }}>Thread Model</div>
        <div style={{ color: '#fca5a5' }}>ThreadPool per Breaker (Heavy Context Switch)</div>
        <div style={{ color: '#86efac' }}>Lock-Free Atomic RingBitSet (0 Extra Threads)</div>

        <div style={{ color: '#cbd5e1' }}>Concurrency Model</div>
        <div style={{ color: '#fca5a5' }}>Blocking Thread-per-Command (RxJava 1.x)</div>
        <div style={{ color: '#86efac' }}>Non-Blocking Asynchronous &amp; Functional Decorator</div>

        <div style={{ color: '#cbd5e1' }}>Status Industri</div>
        <div style={{ color: '#fca5a5' }}>Deprecated (Maintenance Mode sejak Nov 2018)</div>
        <div style={{ color: '#86efac' }}>Standar De-Facto Industri Perbankan &amp; Cloud</div>
      </div>
    </div>
  );
}
