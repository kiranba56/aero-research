import React from 'react';

interface SilhouetteProps {
  type: 'biplane' | 'monoplane' | 'jet-fighter' | 'widebody' | 'supersonic' | 'stealth' | 'future-bwb';
  className?: string;
  glow?: boolean;
}

export const AircraftSilhouette: React.FC<SilhouetteProps> = ({ type, className = 'w-24 h-24', glow = false }) => {
  const strokeColor = glow ? '#00f0ff' : '#38bdf8';
  const filterId = glow ? 'url(#cyan-glow)' : undefined;

  switch (type) {
    case 'biplane':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Biplane Top View */}
          {/* Fuselage */}
          <ellipse cx="50" cy="50" rx="3.5" ry="32" stroke={strokeColor} fill="rgba(6,182,212,0.1)" />
          {/* Top Wing */}
          <line x1="8" y1="36" x2="92" y2="36" strokeWidth="3" />
          <line x1="12" y1="40" x2="88" y2="40" strokeDasharray="2,2" strokeWidth="1.5" />
          {/* Wing Struts */}
          <line x1="20" y1="36" x2="20" y2="44" />
          <line x1="80" y1="36" x2="80" y2="44" />
          {/* Horizontal Stabilizer Tail */}
          <line x1="34" y1="78" x2="66" y2="78" strokeWidth="2.5" />
          {/* Rudder */}
          <line x1="50" y1="74" x2="50" y2="84" strokeWidth="2.5" />
          {/* Front Propeller */}
          <line x1="38" y1="18" x2="62" y2="18" strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="50" cy="18" r="2.5" fill={strokeColor} />
        </svg>
      );

    case 'monoplane':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Monoplane (e.g. Spitfire / Mustang / DC-3) */}
          {/* Fuselage */}
          <path d="M50 14 C54 22 55 45 54 78 C54 84 50 86 50 86 C50 86 46 84 46 78 C45 45 46 22 50 14 Z" fill="rgba(6,182,212,0.1)" />
          {/* Elliptical / Tapered Wings */}
          <path d="M50 42 C70 42 88 47 94 51 C92 56 70 60 50 58 C30 60 8 56 6 51 C12 47 30 42 50 42 Z" strokeWidth="2" fill="rgba(6,182,212,0.08)" />
          {/* Tailplane */}
          <path d="M50 78 L68 83 C66 86 58 87 50 86 C42 87 34 86 32 83 Z" fill="rgba(6,182,212,0.15)" />
          {/* Nose Spinner */}
          <circle cx="50" cy="13" r="3" fill={strokeColor} />
          {/* Propeller Arc */}
          <line x1="36" y1="13" x2="64" y2="13" strokeDasharray="2,2" />
        </svg>
      );

    case 'jet-fighter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Jet Fighter (F-16 / F-22) */}
          {/* Nose Radome */}
          <path d="M50 10 L54 28 L53 50 L56 75 L50 84 L44 75 L47 50 L46 28 Z" fill="rgba(6,182,212,0.12)" />
          {/* Cockpit Canopy */}
          <ellipse cx="50" cy="30" rx="2.5" ry="7" fill={strokeColor} opacity="0.8" />
          {/* Swept Wings */}
          <path d="M47 38 L14 62 L18 69 L46 64 L46 78 L32 84 L34 88 L50 85 L66 88 L68 84 L54 78 L54 64 L82 69 L86 62 L53 38" fill="rgba(6,182,212,0.08)" />
          {/* Twin / Single Exhaust Nozzles */}
          <rect x="47" y="84" width="6" height="4" fill={strokeColor} />
          <path d="M48 88 L46 95 L54 95 L52 88" strokeWidth="1" strokeDasharray="1,1" />
        </svg>
      );

    case 'widebody':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Commercial Airliner (B747 / B787) */}
          {/* Long Streamlined Fuselage */}
          <path d="M50 8 C53 14 55 35 55 82 C55 88 50 92 50 92 C50 92 45 88 45 82 C45 35 47 14 50 8 Z" fill="rgba(6,182,212,0.1)" />
          {/* Swept High-Aspect Wings */}
          <path d="M50 38 L8 60 L10 65 L48 56 L52 56 L90 65 L92 60 Z" fill="rgba(6,182,212,0.08)" />
          {/* Engine Pods */}
          <rect x="25" y="52" width="4" height="9" rx="1.5" strokeWidth="1.5" fill="rgba(6,182,212,0.3)" />
          <rect x="71" y="52" width="4" height="9" rx="1.5" strokeWidth="1.5" fill="rgba(6,182,212,0.3)" />
          {/* Horizontal Stabilizer Tail */}
          <path d="M50 82 L30 90 L32 94 L50 89 L68 94 L70 90 Z" fill="rgba(6,182,212,0.15)" />
        </svg>
      );

    case 'supersonic':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Supersonic Delta (SR-71 / Concorde / X-59) */}
          {/* Slender Needle Nose */}
          <path d="M50 6 L52 24 L53 50 L54 84 L50 88 L46 84 L47 50 L48 24 Z" fill="rgba(6,182,212,0.15)" />
          {/* Ogival Gothic Delta Wing */}
          <path d="M50 28 C56 42 74 65 88 78 L84 82 L54 78 L54 86 L50 88 L46 86 L46 78 L16 82 L12 78 C26 65 44 42 50 28 Z" fill="rgba(6,182,212,0.08)" />
          {/* Twin Inboard Engines */}
          <ellipse cx="40" cy="74" rx="2.5" ry="6" strokeWidth="1.5" />
          <ellipse cx="60" cy="74" rx="2.5" ry="6" strokeWidth="1.5" />
        </svg>
      );

    case 'stealth':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Flying Wing Stealth (B-2 / F-117) */}
          <path 
            d="M50 18 L94 62 L82 72 L72 66 L62 76 L50 68 L38 76 L28 66 L18 72 L6 62 Z" 
            strokeWidth="2.2" 
            fill="rgba(6,182,212,0.12)" 
          />
          {/* Center cockpit canopy spine */}
          <path d="M50 28 L53 45 L50 54 L47 45 Z" fill={strokeColor} opacity="0.6" />
          {/* Low radar saw-tooth highlights */}
          <line x1="50" y1="18" x2="50" y2="68" strokeDasharray="2,2" strokeWidth="1" />
        </svg>
      );

    case 'future-bwb':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={filterId}>
          {/* Blended Wing Body (JetZero / NASA BWB) */}
          <path 
            d="M50 20 C62 26 84 45 95 62 L90 68 L68 62 L58 66 L50 63 L42 66 L32 62 L10 68 L5 62 C16 45 38 26 50 20 Z" 
            strokeWidth="2.2" 
            fill="rgba(6,182,212,0.15)" 
          />
          {/* Blended Cabin Envelope */}
          <path d="M42 34 C46 30 54 30 58 34 C64 42 64 54 58 58 C54 60 46 60 42 58 C36 54 36 42 42 34 Z" strokeDasharray="3,3" strokeWidth="1.5" />
          {/* Top-Mounted Boundary Layer Ingestion Turbofans */}
          <rect x="42" y="58" width="6" height="8" rx="2" fill={strokeColor} />
          <rect x="52" y="58" width="6" height="8" rx="2" fill={strokeColor} />
        </svg>
      );

    default:
      return null;
  }
};

