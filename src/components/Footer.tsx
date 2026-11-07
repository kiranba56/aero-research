import React from 'react';
import { Plane, Compass, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenPdfModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPdfModal }) => {
  return (
    <footer className="bg-[#02050f] border-t border-cyan-500/20 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-cyan-500/10">
          {/* Col 1: Branding & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-heading font-extrabold text-base tracking-wider">
              <Plane className="w-4 h-4 text-cyan-400 -rotate-45" />
              <span>AERO<span className="text-cyan-400">RESEARCH</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              An interactive academic aerospace research portal exploring 120+ years of aircraft evolution, aerodynamic innovations, thermodynamic propulsion cycles, and future sustainable flight dynamics.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>ISA-1976 CALIBRATED</span>
            </div>
          </div>

          {/* Col 2: Research Modules */}
          <div>
            <span className="font-mono text-xs uppercase text-white font-semibold block mb-3">
              Research Modules
            </span>
            <ul className="space-y-2 text-[11px] font-mono">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Portal Overview & Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('timeline')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Chronological Flight Archives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hangar')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Aircraft Specification Matrix
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('simulator')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Wind Tunnel Aerodynamics Lab
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('envelopes')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Flight Envelopes & Coffin Corner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('propulsion')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Propulsion Cycles & Area Rule
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                  Aero IQ Examination
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic References & Archives */}
          <div>
            <span className="font-mono text-xs uppercase text-white font-semibold block mb-3">
              Academic Citations
            </span>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                NASA Dryden / Armstrong Flight Research Center
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                American Institute of Aeronautics and Astronautics (AIAA)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Smithsonian National Air and Space Museum
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Jane’s All the World’s Aircraft Archives
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                ICAO Standard Atmosphere Document 7488/3
              </li>
            </ul>
          </div>

          {/* Col 4: Fundamental Physical Constants */}
          <div>
            <span className="font-mono text-xs uppercase text-white font-semibold block mb-3">
              Aerodynamic Constants
            </span>
            <div className="p-3 rounded-lg bg-black/50 border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300">
              <div>g = 9.80665 m/s² (Standard Gravity)</div>
              <div>ρ₀ = 1.2250 kg/m³ (Sea Level Density)</div>
              <div>P₀ = 101,325 Pa (Sea Level Pressure)</div>
              <div>T₀ = 288.15 K / 15.0°C (Sea Level Temp)</div>
              <div>R = 287.05 J/(kg·K) (Gas Constant Air)</div>
              <div>γ = 1.40 (Adiabatic Index Air)</div>
            </div>

            <div className="mt-3">
              <button
                onClick={onOpenPdfModal}
                className="w-full py-1.5 px-3 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Research Monograph (PDF)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} AERO RESEARCH LABS. Academic Research & Educational Monograph.
          </p>
          <p className="text-cyan-400">
            ENGINEERED FOR FLIGHT DYNAMICS RESEARCH & PEDAGOGY
          </p>
        </div>
      </div>
    </footer>
  );
};

