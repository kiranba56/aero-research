import React from 'react';
import { 
  Plane, 
  Wind, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Gauge, 
  FileDown, 
  Zap, 
  ShieldCheck, 
  Radio
} from 'lucide-react';
import { AircraftSilhouette } from './AircraftSilhouettes';
import { AIRCRAFT_DATA } from '../data/aircraftData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  onOpenPdfModal: () => void;
  onSelectAircraft: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onNavigate, 
  onOpenPdfModal, 
  onSelectAircraft 
}) => {
  // Feature 4 landmark aircraft in quick hero highlights
  const featuredAircraft = [
    AIRCRAFT_DATA.find(a => a.id === 'wright-flyer')!,
    AIRCRAFT_DATA.find(a => a.id === 'sr71-blackbird')!,
    AIRCRAFT_DATA.find(a => a.id === 'boeing-787')!,
    AIRCRAFT_DATA.find(a => a.id === 'x59-quesst')!
  ];

  return (
    <div className="relative overflow-hidden border-b border-cyan-500/20 aerospace-grid">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/15 via-blue-600/10 to-teal-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>AEROSPACE RESEARCH & ENGINEERING PORTAL</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ISA-1976 DYNAMICS COMPUTATION ACTIVE</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              The History & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent glow-cyan">
                Evolution of Aircraft
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              From the 12-horsepower wood and muslin biplane that flew 120 feet in 1903 to Mach 3.3 titanium recon ships and zero-carbon blended wing bodies. Explore 120+ years of aerodynamics, sound barrier breakthroughs, and thermodynamic propulsion evolution.
            </p>

            {/* Quick Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('hangar')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-heading font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <Plane className="w-4 h-4" />
                <span>Explore Aircraft Hangar</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('simulator')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 font-mono text-sm transition-all cursor-pointer"
              >
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>Launch Wind Tunnel Lab</span>
              </button>

              <button
                onClick={onOpenPdfModal}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-950/60 hover:bg-teal-900/60 text-teal-300 border border-teal-500/40 font-mono text-sm transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-teal-400" />
                <span>Export Research PDF</span>
              </button>
            </div>
          </div>

          {/* Right Hero Tactical HUD Card */}
          <div className="lg:col-span-5">
            <div className="hud-panel p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 text-cyan-400">
                  <Gauge className="w-4 h-4" />
                  MACRO FLIGHT EVOLUTION
                </span>
                <span className="text-slate-500">1903 - 2030+</span>
              </div>

              {/* Macro metrics comparative grid */}
              <div className="grid grid-cols-2 gap-4 my-5">
                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Max Velocity</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-2xl text-cyan-300">48 → 3,540+</span>
                    <span className="text-[10px] font-mono text-slate-400">km/h</span>
                  </div>
                  <span className="text-[10px] text-cyan-400/80 font-mono">0.04M to Mach 3.32</span>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Flight Ceiling</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-2xl text-teal-300">9m → 25.9 km</span>
                  </div>
                  <span className="text-[10px] text-teal-400/80 font-mono">30 ft to 85,000+ ft</span>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Power / Thrust</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-2xl text-amber-300">12 hp → 312 kN</span>
                  </div>
                  <span className="text-[10px] text-amber-400/80 font-mono">Piston to Afterburning Jet</span>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20">
                  <span className="text-[11px] font-mono text-slate-400 uppercase">Airframe Matrix</span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-heading font-bold text-lg text-white">Muslin → Carbon</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Stressed-Skin to PRSEUS</span>
                </div>
              </div>

              {/* Interactive Quick Aircraft Strip */}
              <div className="pt-2 border-t border-cyan-500/20">
                <span className="text-[11px] font-mono text-slate-400 block mb-2">
                  CLICK ICON TO INSPECT HISTORIC AIRFRAME:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {featuredAircraft.map(ac => (
                    <button
                      key={ac.id}
                      onClick={() => onSelectAircraft(ac.id)}
                      className="p-2 rounded bg-black/40 hover:bg-cyan-950/50 border border-cyan-500/20 hover:border-cyan-400 flex flex-col items-center justify-center transition-all group cursor-pointer"
                    >
                      <AircraftSilhouette type={ac.svgType} className="w-10 h-10 group-hover:scale-110 transition-transform" />
                      <span className="text-[9px] font-mono text-slate-300 group-hover:text-cyan-300 mt-1 truncate max-w-full">
                        {ac.name.split(' ')[0]}
                      </span>
                      <span className="text-[8px] font-mono text-cyan-500">{ac.year}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Nav Badges across Eras */}
        <div className="mt-12 pt-8 border-t border-cyan-500/10">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-3">
            Exploration Epochs:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { era: 'Pioneer (1903-1914)', note: 'Wing-Warping & Channels' },
              { era: 'WWI & Interwar (1914-1938)', note: 'DC-3 & Transatlantic' },
              { era: 'WWII & Piston Peak (1939-1945)', note: 'Merlin, B-29 & Me 262' },
              { era: 'Jet & Supersonic Dawn (1946-1969)', note: 'Bell X-1, SR-71 & Concorde' },
              { era: 'Widebody & Fly-by-Wire (1970-1999)', note: 'B747, F-16 & Stealth B-2' },
              { era: 'Composites & Stealth (2000-2025)', note: 'B787, F-22 & F-35' },
              { era: 'Future Horizons (2026+)', note: 'X-59 Low-Boom & BWB' },
            ].map((epoch, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('timeline')}
                className="p-2.5 rounded-lg bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group"
              >
                <span className="text-[11px] font-mono font-bold text-cyan-400 group-hover:text-cyan-300 block truncate">
                  {epoch.era.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-400 group-hover:text-slate-300 block mt-0.5 truncate">
                  {epoch.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

