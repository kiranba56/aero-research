import React, { useState, useMemo } from 'react';
import { 
  Wind, 
  Gauge, 
  AlertTriangle, 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  Zap, 
  Info,
  Maximize2
} from 'lucide-react';
import { computeFlightDynamics } from '../utils/aerodynamics';
import { SimulationParams } from '../types/aircraft';

export const WindTunnelSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    altitudeM: 10000,
    airspeedKmh: 850,
    angleOfAttackDeg: 4.0,
    wingAreaM2: 125,
    aspectRatio: 9.5,
    airfoilCamber: 3.0,
  });

  const results = useMemo(() => computeFlightDynamics(params), [params]);

  // Presets
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'wright':
        setParams({
          altitudeM: 10,
          airspeedKmh: 48,
          angleOfAttackDeg: 5.0,
          wingAreaM2: 47,
          aspectRatio: 3.2,
          airfoilCamber: 5.0,
        });
        break;
      case 'dc3':
        setParams({
          altitudeM: 3000,
          airspeedKmh: 300,
          angleOfAttackDeg: 3.5,
          wingAreaM2: 91,
          aspectRatio: 7.7,
          airfoilCamber: 3.5,
        });
        break;
      case 'b787':
        setParams({
          altitudeM: 11000,
          airspeedKmh: 910,
          angleOfAttackDeg: 2.5,
          wingAreaM2: 325,
          aspectRatio: 10.0,
          airfoilCamber: 2.2,
        });
        break;
      case 'concorde':
        setParams({
          altitudeM: 18000,
          airspeedKmh: 2150,
          angleOfAttackDeg: 1.8,
          wingAreaM2: 358,
          aspectRatio: 1.8,
          airfoilCamber: 1.0,
        });
        break;
      case 'stall':
        setParams({
          altitudeM: 5000,
          airspeedKmh: 220,
          angleOfAttackDeg: 19.5,
          wingAreaM2: 125,
          aspectRatio: 9.0,
          airfoilCamber: 3.0,
        });
        break;
    }
  };

  // Airfoil geometric parameters for SVG drawing
  const chordLength = 320;
  const airfoilRotation = -params.angleOfAttackDeg; // rotate in SVG space
  const camberOffset = params.airfoilCamber * 3.5;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <Wind className="w-4 h-4" />
            <span>Interactive Fluid Dynamics & Aerodynamics Laboratory</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Wind Tunnel & Lift-to-Drag Simulator
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Simulate real-time aerodynamic forces using thin airfoil theory and the 1976 International Standard Atmosphere model. Observe boundary-layer stall and transonic wave drag divergence.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Flight Presets:</span>
          <button
            onClick={() => applyPreset('wright')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
          >
            Wright Flyer
          </button>
          <button
            onClick={() => applyPreset('dc3')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
          >
            DC-3 Cruise
          </button>
          <button
            onClick={() => applyPreset('b787')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 cursor-pointer"
          >
            787 Mach 0.85
          </button>
          <button
            onClick={() => applyPreset('concorde')}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 cursor-pointer"
          >
            Concorde Mach 2
          </button>
          <button
            onClick={() => applyPreset('stall')}
            className="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/40 cursor-pointer"
          >
            Stall Demo
          </button>
        </div>
      </div>

      {/* Main Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive SVG Wind Tunnel Visualizer */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="hud-panel rounded-2xl p-4 sm:p-6 relative overflow-hidden bg-gradient-to-b from-[#050b18] to-[#02050e] border border-cyan-500/30">
            {/* Wind Tunnel Header Status */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-cyan-500/20 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-semibold uppercase">VIRTUAL WIND TUNNEL CHAMBER</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span>FLOW VELOCITY: <strong className="text-white">{params.airspeedKmh} km/h</strong></span>
                <span className={results.machNumber >= 1.0 ? 'text-amber-400 font-bold' : 'text-cyan-400'}>
                  MACH {results.machNumber}
                </span>
              </div>
            </div>

            {/* Stall Warning Alert Banner */}
            {results.isStalled && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-950/90 border-2 border-red-500 text-red-200 font-mono text-xs shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <strong className="tracking-wider">STALL DETECTED: BOUNDARY LAYER SEPARATION</strong>
              </div>
            )}

            {/* Supersonic Shockwave Alert Banner */}
            {results.machNumber >= 1.0 && !results.isStalled && (
              <div className="absolute top-16 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/60 text-amber-300 font-mono text-xs">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>SUPERSONIC REGIME (MACH CONE θ: {results.machAngleDeg}°)</span>
              </div>
            )}

            {/* Interactive SVG Test Section */}
            <div className="w-full h-[360px] relative rounded-xl bg-[#02040a] border border-cyan-500/20 overflow-hidden flex items-center justify-center">
              {/* Wind tunnel grid backdrop */}
              <div className="absolute inset-0 aerospace-grid-dense opacity-40 pointer-events-none" />

              <svg 
                viewBox="0 0 700 360" 
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Suction Gradient (Cyan) */}
                  <linearGradient id="suctionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Pressure Gradient (Amber) */}
                  <linearGradient id="pressureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.0" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.35" />
                  </linearGradient>

                  {/* Airfoil Gradient */}
                  <linearGradient id="airfoilSkin" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>

                {/* Animated Streamlines (Air Flow) */}
                {[50, 90, 130, 160, 180, 200, 230, 270, 310].map((y, idx) => {
                  const isUpper = y < 180;
                  const deflection = (180 - y) * (params.angleOfAttackDeg / 30);
                  const strokeCol = isUpper 
                    ? (results.isStalled ? '#ef4444' : '#00f0ff') 
                    : '#38bdf8';
                  const opacity = results.isStalled && isUpper && y > 100 ? 0.3 : 0.65;

                  // Streamline path curving around wing
                  return (
                    <g key={idx}>
                      <path
                        d={`M 20 ${y} Q 250 ${y - deflection * 0.8} 350 ${y - deflection} T 680 ${y + (results.isStalled && isUpper ? (Math.random() * 20 - 10) : 0)}`}
                        fill="none"
                        stroke={strokeCol}
                        strokeWidth={isUpper && !results.isStalled ? "1.8" : "1.2"}
                        strokeDasharray={results.isStalled && isUpper ? "6,6" : "8,4"}
                        strokeOpacity={opacity}
                      />
                    </g>
                  );
                })}

                {/* Turbulent separation vortex curls if stalled */}
                {results.isStalled && (
                  <g opacity="0.8">
                    <circle cx="390" cy="140" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
                    <circle cx="430" cy="120" r="22" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
                    <circle cx="480" cy="110" r="28" fill="none" stroke="#f87171" strokeWidth="1.2" strokeDasharray="6,4" />
                    <circle cx="530" cy="95" r="32" fill="none" stroke="#fca5a5" strokeWidth="1" strokeDasharray="6,4" />
                  </g>
                )}

                {/* Supersonic Mach Shockwave Cone Lines if M >= 1 */}
                {results.machNumber >= 1.0 && (
                  <g>
                    {/* Upper shock wave */}
                    <line 
                      x1="220" 
                      y1="180" 
                      x2={220 + 350 * Math.cos(((results.machAngleDeg || 45) * Math.PI) / 180)} 
                      y2={180 - 350 * Math.sin(((results.machAngleDeg || 45) * Math.PI) / 180)} 
                      stroke="#f59e0b" 
                      strokeWidth="2.5" 
                      strokeDasharray="4,2"
                    />
                    {/* Lower shock wave */}
                    <line 
                      x1="220" 
                      y1="180" 
                      x2={220 + 350 * Math.cos(((results.machAngleDeg || 45) * Math.PI) / 180)} 
                      y2={180 + 350 * Math.sin(((results.machAngleDeg || 45) * Math.PI) / 180)} 
                      stroke="#f59e0b" 
                      strokeWidth="2.5" 
                      strokeDasharray="4,2"
                    />
                  </g>
                )}

                {/* ROTATING AIRFOIL SECTION */}
                <g transform={`rotate(${airfoilRotation}, 350, 180)`}>
                  {/* Upper Suction Zone Glow */}
                  {!results.isStalled && (
                    <path
                      d="M 220 180 C 260 135 380 130 480 180 C 380 160 260 160 220 180 Z"
                      fill="url(#suctionGradient)"
                    />
                  )}

                  {/* Lower High Pressure Zone Glow */}
                  <path
                    d="M 220 180 C 270 205 380 205 480 180 C 380 190 270 190 220 180 Z"
                    fill="url(#pressureGradient)"
                  />

                  {/* Main Airfoil Body (NACA Cambered Profile) */}
                  <path
                    d={`M 220 180 
                        C 240 ${155 - camberOffset}, 320 ${145 - camberOffset}, 480 180 
                        C 360 ${195 - camberOffset * 0.4}, 250 ${190 - camberOffset * 0.4}, 220 180 Z`}
                    fill="url(#airfoilSkin)"
                    stroke="#00f0ff"
                    strokeWidth="2.5"
                  />

                  {/* Chord line (reference) */}
                  <line 
                    x1="220" 
                    y1="180" 
                    x2="480" 
                    y2="180" 
                    stroke="rgba(255,255,255,0.25)" 
                    strokeWidth="1" 
                    strokeDasharray="4,4" 
                  />

                  {/* Center of Pressure / Lift Vector Arrow */}
                  <g transform="translate(310, 180)">
                    {/* Lift Arrow */}
                    <line 
                      x1="0" 
                      y1="0" 
                      x2="0" 
                      y2={results.isStalled ? -30 : -Math.min(90, Math.max(15, results.liftCoefficient * 45))} 
                      stroke={results.isStalled ? "#ef4444" : "#00f0ff"} 
                      strokeWidth="3" 
                    />
                    <polygon 
                      points={results.isStalled ? "-4,-30 4,-30 0,-38" : `-5,${-Math.min(90, Math.max(15, results.liftCoefficient * 45))} 5,${-Math.min(90, Math.max(15, results.liftCoefficient * 45))} 0,${-Math.min(90, Math.max(15, results.liftCoefficient * 45)) - 8}`} 
                      fill={results.isStalled ? "#ef4444" : "#00f0ff"} 
                    />
                    <text 
                      x="8" 
                      y={-30} 
                      fill="#00f0ff" 
                      fontSize="11" 
                      fontFamily="monospace" 
                      fontWeight="bold"
                    >
                      LIFT ({ (results.liftN / 1000).toFixed(1) } kN)
                    </text>

                    {/* Drag Arrow */}
                    <line 
                      x1="0" 
                      y1="0" 
                      x2={Math.min(90, Math.max(15, results.dragCoefficient * 250))} 
                      y2="0" 
                      stroke="#f59e0b" 
                      strokeWidth="2.5" 
                    />
                    <polygon 
                      points={`${Math.min(90, Math.max(15, results.dragCoefficient * 250))},-4 ${Math.min(90, Math.max(15, results.dragCoefficient * 250))},4 ${Math.min(90, Math.max(15, results.dragCoefficient * 250)) + 8},0`} 
                      fill="#f59e0b" 
                    />
                    <text 
                      x={20} 
                      y="16" 
                      fill="#f59e0b" 
                      fontSize="10" 
                      fontFamily="monospace"
                    >
                      DRAG ({ (results.dragN / 1000).toFixed(1) } kN)
                    </text>
                  </g>
                </g>

                {/* Horizon Line Reference */}
                <line x1="180" y1="180" x2="220" y2="180" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="140" y="184" fill="#64748b" fontSize="10" fontFamily="monospace">HORIZON</text>
              </svg>
            </div>

            {/* Bottom Streamline Legend */}
            <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-cyan-400 rounded-full" /> Low Pressure Suction (Bernoulli)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-amber-400 rounded-full" /> High Pressure Compression
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-red-400 rounded-full" /> Flow Separation / Wake
                </span>
              </div>
              <span className="text-cyan-400 font-semibold">
                Angle of Attack (α): {params.angleOfAttackDeg > 0 ? `+${params.angleOfAttackDeg}` : params.angleOfAttackDeg}°
              </span>
            </div>
          </div>

          {/* Real-time Telemetry Readout Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="hud-panel p-3 rounded-xl border border-cyan-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Lift Force (L)</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-xl text-cyan-300">
                  {(results.liftN / 1000).toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">kN</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400/80">CL = {results.liftCoefficient}</span>
            </div>

            <div className="hud-panel p-3 rounded-xl border border-cyan-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Drag Force (D)</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-xl text-amber-300">
                  {(results.dragN / 1000).toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">kN</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400/80">CD = {results.dragCoefficient}</span>
            </div>

            <div className="hud-panel p-3 rounded-xl border border-cyan-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Glide / Aerodynamic Efficiency</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-xl text-teal-300">
                  {results.liftToDrag}:1
                </span>
                <span className="text-[10px] font-mono text-slate-400">L/D</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400/80">Lift / Drag Ratio</span>
            </div>

            <div className="hud-panel p-3 rounded-xl border border-cyan-500/20">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Dynamic Pressure (q)</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-heading font-extrabold text-xl text-white">
                  {(results.dynamicPressurePa / 1000).toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">kPa</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">0.5 * ρ * V²</span>
            </div>
          </div>
        </div>

        {/* Right: Flight Controls & Atmospheric Inputs */}
        <div className="lg:col-span-4 space-y-4">
          <div className="hud-panel p-5 rounded-2xl border border-cyan-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 text-xs font-mono">
              <span className="text-cyan-300 font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                AERODYNAMIC CONTROLS
              </span>
              <button
                onClick={() => applyPreset('b787')}
                className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                title="Reset to default airliner"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Sliders */}
            <div className="space-y-4 mt-4 font-mono text-xs">
              {/* Angle of Attack */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">Angle of Attack (α):</span>
                  <span className="text-cyan-400 font-bold">{params.angleOfAttackDeg}°</span>
                </div>
                <input
                  type="range"
                  min="-8"
                  max="24"
                  step="0.5"
                  value={params.angleOfAttackDeg}
                  onChange={(e) => setParams({ ...params, angleOfAttackDeg: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>-8° (Dive)</span>
                  <span>0°</span>
                  <span className="text-red-400">16° (Critical Stall)</span>
                </div>
              </div>

              {/* Airspeed */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">True Airspeed (V):</span>
                  <span className="text-white font-bold">{params.airspeedKmh} km/h</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="2400"
                  step="10"
                  value={params.airspeedKmh}
                  onChange={(e) => setParams({ ...params, airspeedKmh: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>40 km/h</span>
                  <span>Mach 1 (~1060 km/h)</span>
                  <span>2,400 km/h</span>
                </div>
              </div>

              {/* Altitude */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">ISA Altitude (h):</span>
                  <span className="text-teal-300 font-bold">{params.altitudeM.toLocaleString()} m</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="250"
                  value={params.altitudeM}
                  onChange={(e) => setParams({ ...params, altitudeM: parseFloat(e.target.value) })}
                  className="w-full accent-teal-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0 m (Sea Level)</span>
                  <span>11,000 m (Tropopause)</span>
                  <span>25,000 m (U-2/SR-71)</span>
                </div>
              </div>

              {/* Airfoil Camber */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">Airfoil Mean Camber:</span>
                  <span className="text-amber-300 font-bold">{params.airfoilCamber}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.5"
                  value={params.airfoilCamber}
                  onChange={(e) => setParams({ ...params, airfoilCamber: parseFloat(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>0% (Symmetric)</span>
                  <span>3% (Transonic Airliner)</span>
                  <span>6% (High-Lift)</span>
                </div>
              </div>

              {/* Wing Area */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">Reference Wing Area (S):</span>
                  <span className="text-slate-200 font-bold">{params.wingAreaM2} m²</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="500"
                  step="5"
                  value={params.wingAreaM2}
                  onChange={(e) => setParams({ ...params, wingAreaM2: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Aspect Ratio */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300">Aspect Ratio (AR = b²/S):</span>
                  <span className="text-slate-200 font-bold">{params.aspectRatio}</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="15"
                  step="0.5"
                  value={params.aspectRatio}
                  onChange={(e) => setParams({ ...params, aspectRatio: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Atmospheric Telemetry Card */}
          <div className="hud-panel p-4 rounded-xl border border-cyan-500/20 font-mono text-xs space-y-2">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5 uppercase text-[11px]">
              <Info className="w-3.5 h-3.5" />
              ISA 1976 Ambient Atmospheric State
            </span>
            <div className="grid grid-cols-2 gap-2 pt-1 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Temperature:</span>
                <span>{results.atmosphere.temperatureC}°C ({results.atmosphere.temperatureK} K)</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Air Density (ρ):</span>
                <span>{results.atmosphere.densityKgM3} kg/m³</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Ambient Pressure:</span>
                <span>{(results.atmosphere.pressurePa / 1000).toFixed(1)} kPa</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Speed of Sound (a):</span>
                <span className="text-cyan-300">{results.atmosphere.speedOfSoundMs} m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

