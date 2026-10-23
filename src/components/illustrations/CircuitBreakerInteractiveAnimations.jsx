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
              fontSize: '11px',
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
              fontSize: '11px',
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
              fontSize: '11px',
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
        fontSize: '11.5px',
        padding: '6px 12px',
        borderRadius: '6px',
        background: isClosed ? '#10b98115' : isOpen ? '#ef444415' : '#f59e0b15',
        border: `1px solid ${isClosed ? '#10b98135' : isOpen ? '#ef444435' : '#f59e0b35'}`,
        color: isClosed ? '#34d399' : isOpen ? '#fca5a5' : '#fde68a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>
          <strong>Status Saat Ini: [{state}]</strong> —{' '}
          {isClosed && 'Arus request dialirkan normal. Failure rate < 90%.'}
          {isOpen && 'Sekering terputus! Request ditolak instan dalam 1ms (CallNotPermittedException) tanpa membebani thread.'}
          {isHalfOpen && 'Masa tunggu selesai. Sekering setengah terbuka mengirim 10 request sampel untuk mengecek apakah downstream sudah sembuh.'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', opacity: 0.8 }}>
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
 * Visualizes incoming QRIS packets branching between ALTO (Primary) and RINTIS (Secondary),
 * demonstrating Global Switcher vs Granular NNS rerouting.
 */
export function FailoverPacketFlowVisualizer() {
  const [scenario, setScenario] = useState('NORMAL'); // 'NORMAL' | 'ALTO_DOWN' | 'NNS_DOWN'

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
            SIMULASI ARSITEKTUR 2-LAYER: PACKET ROUTING &amp; FAILOVER
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setScenario('NORMAL')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: scenario === 'NORMAL' ? `1.5px solid ${ACCENT_GREEN}` : '1px solid #334155',
              background: scenario === 'NORMAL' ? `${ACCENT_GREEN}25` : '#1e293b',
              color: scenario === 'NORMAL' ? ACCENT_GREEN : '#94a3b8',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            1. Normal (ALTO 100%)
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
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            2. Layer 2: Mandiri Down
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
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            3. Layer 1: ALTO Total Down
          </button>
        </div>
      </div>

      {/* SVG Routing Schema */}
      <div style={{ width: '100%', height: '140px', position: 'relative' }}>
        <svg viewBox="0 0 760 140" style={{ width: '100%', height: '100%' }}>
          {/* Incoming Source */}
          <rect x="20" y="45" width="130" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="85" y="67" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">QRIS GATEWAY</text>
          <text x="85" y="83" fill="#94a3b8" fontSize="9.5" textAnchor="middle" fontFamily="var(--font-mono)">Decision Engine</text>

          {/* Upper Route: ALTO (Primary) */}
          <path
            d="M 150 70 C 230 70, 260 35, 340 35 L 560 35"
            fill="none"
            stroke={scenario === 'ALTO_DOWN' ? '#ef4444' : '#334155'}
            strokeWidth="3"
            strokeDasharray={scenario === 'ALTO_DOWN' ? '6 6' : 'none'}
          />

          {/* Lower Route: RINTIS (Secondary) */}
          <path
            d="M 150 70 C 230 70, 260 105, 340 105 L 560 105"
            fill="none"
            stroke={scenario === 'NORMAL' ? '#334155' : '#10b981'}
            strokeWidth="3"
          />

          {/* Moving Animated Packets to ALTO (if normal or partial) */}
          {scenario === 'NORMAL' && (
            <circle r="5" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)">
              <animateMotion
                path="M 150 70 C 230 70, 260 35, 340 35 L 560 35"
                dur="1.2s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* Scenario NNS DOWN: Split routing */}
          {scenario === 'NNS_DOWN' && (
            <>
              {/* BCA / BRI packet to ALTO */}
              <circle r="4.5" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)">
                <animateMotion
                  path="M 150 70 C 230 70, 260 35, 340 35 L 560 35"
                  dur="1.3s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Mandiri packet diverted to RINTIS */}
              <circle r="5.5" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)">
                <animateMotion
                  path="M 150 70 C 230 70, 260 105, 340 105 L 560 105"
                  dur="1.1s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* Scenario ALTO TOTAL DOWN: All packets to RINTIS */}
          {scenario === 'ALTO_DOWN' && (
            <circle r="5.5" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)">
              <animateMotion
                path="M 150 70 C 230 70, 260 105, 340 105 L 560 105"
                dur="1.0s"
                repeatCount="indefinite"
              />
            </circle>
          )}

          {/* ALTO Destination Box */}
          <rect
            x="560"
            y="12"
            width="170"
            height="46"
            rx="8"
            fill={scenario === 'ALTO_DOWN' ? '#450a0a' : scenario === 'NNS_DOWN' ? '#311d04' : '#064e3b'}
            stroke={scenario === 'ALTO_DOWN' ? '#ef4444' : scenario === 'NNS_DOWN' ? '#f59e0b' : '#10b981'}
            strokeWidth="1.5"
          />
          <text x="645" y="32" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            SWITCHER ALTO
          </text>
          <text
            x="645"
            y="47"
            fill={scenario === 'ALTO_DOWN' ? '#fca5a5' : scenario === 'NNS_DOWN' ? '#fde68a' : '#6ee7b7'}
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {scenario === 'ALTO_DOWN' ? '🔴 L1 OPEN (CUT-OFF)' : scenario === 'NNS_DOWN' ? '🟡 L2 Mandiri OPEN' : '🟢 ALL CLOSED (Active)'}
          </text>

          {/* RINTIS Destination Box */}
          <rect
            x="560"
            y="82"
            width="170"
            height="46"
            rx="8"
            fill={scenario === 'NORMAL' ? '#1e293b' : '#064e3b'}
            stroke={scenario === 'NORMAL' ? '#475569' : '#10b981'}
            strokeWidth="1.5"
          />
          <text x="645" y="102" fill="#f8fafc" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="var(--font-mono)">
            SWITCHER RINTIS
          </text>
          <text
            x="645"
            y="117"
            fill={scenario === 'NORMAL' ? '#94a3b8' : '#6ee7b7'}
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            {scenario === 'NORMAL' ? 'STANDBY (Idle)' : scenario === 'NNS_DOWN' ? '🟢 FAILOVER (Mandiri Only)' : '🟢 100% TRAFFIC FAILOVER'}
          </text>
        </svg>
      </div>

      {/* Scenario Legend */}
      <div style={{
        fontSize: '11.5px',
        padding: '6px 12px',
        borderRadius: '6px',
        background: '#1e293b',
        border: '1px solid #334155',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span>
          {scenario === 'NORMAL' && '🟢 Kondisi Normal: Seluruh pembayaran QRIS dialirkan ke ALTO sebagai primary switcher.'}
          {scenario === 'NNS_DOWN' && '🟡 Isolasi Granular: Bank Mandiri (93600008) gangguan di ALTO. Hanya transaksi Mandiri yang dialihkan ke RINTIS! BCA & BRI tetap di ALTO.'}
          {scenario === 'ALTO_DOWN' && '🔴 Pemadaman Makro: ALTO down total. L1 Global CB trip OPEN, 100% volume pembayaran instan dialihkan ke RINTIS!'}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: '#38bdf8' }}>
          Decision Latency: &lt; 0.5ms
        </span>
      </div>
    </div>
  );
}
