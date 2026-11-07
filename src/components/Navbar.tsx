import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Clock, 
  Wind, 
  BarChart3, 
  Flame, 
  GraduationCap, 
  FileDown, 
  Menu, 
  X, 
  Compass, 
  Activity,
  Layers,
  BookOpen
} from 'lucide-react';
import { calculateAtmosphere } from '../utils/aerodynamics';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPdfModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenPdfModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickerAltitude, setTickerAltitude] = useState(10668); // 35,000 ft standard cruise

  // Live atmospheric telemetry update
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerAltitude(prev => {
        const next = prev + (Math.random() > 0.5 ? 50 : -50);
        return Math.max(0, Math.min(25000, next));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const atmo = calculateAtmosphere(tickerAltitude);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'timeline', label: 'History & Timeline', icon: Clock },
    { id: 'hangar', label: 'Aircraft Hangar', icon: Plane },
    { id: 'simulator', label: 'Wind Tunnel Lab', icon: Wind },
    { id: 'envelopes', label: 'Flight Envelopes', icon: BarChart3 },
    { id: 'propulsion', label: 'Propulsion & Mach', icon: Flame },
    { id: 'paper', label: 'Research Paper', icon: BookOpen },
    { id: 'quiz', label: 'Aero IQ', icon: GraduationCap },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20">
      {/* Top HUD Telemetry Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-black/40 border-b border-cyan-500/10 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            TELEMETRY: ISA-1976 CALIBRATED
          </span>
          <span>ALT: <strong className="text-slate-200">{atmo.altitudeM.toLocaleString()} m</strong> ({atmo.altitudeFt.toLocaleString()} ft)</span>
          <span>TEMP: <strong className="text-slate-200">{atmo.temperatureC}°C</strong> ({atmo.temperatureK} K)</span>
          <span>SPEED OF SOUND (a): <strong className="text-cyan-300">{atmo.speedOfSoundMs} m/s</strong> ({atmo.speedOfSoundKmh} km/h)</span>
          <span>AIR DENSITY (ρ): <strong className="text-slate-200">{atmo.densityKgM3} kg/m³</strong></span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            AERODYNAMIC CORE: OPERATIONAL
          </span>
          <span className="text-cyan-500">v1.2.0 RESEARCH EDITION</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('overview')}
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
              <Plane className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg tracking-wider text-white">
                  AERO<span className="text-cyan-400">RESEARCH</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded">
                  Lab
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                History & Evolution of Aircraft (1903 – 2030+)
              </p>
            </div>
          </div>

          {/* Desktop Tab Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Button: PDF Research Dossier Export */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenPdfModal}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold rounded-md bg-gradient-to-r from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 shadow-md shadow-cyan-900/40 border border-cyan-400/30 transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Export Dossier (PDF)</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenPdfModal}
              className="p-2 text-cyan-400 hover:bg-slate-800 rounded-md"
              title="Export Dossier"
            >
              <FileDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070e1e] border-b border-cyan-500/20 px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onOpenPdfModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono font-semibold rounded-md bg-cyan-600 text-white"
            >
              <FileDown className="w-4 h-4" />
              Download Full Academic Dossier (.PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

