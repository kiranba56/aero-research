import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  RotateCw, 
  Gauge, 
  Layers, 
  Wind, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const PropulsionLabModule: React.FC = () => {
  const [selectedEngine, setSelectedEngine] = useState<'piston' | 'turbojet' | 'turbofan' | 'ramjet' | 'hydrogen'>('turbofan');
  const [machSlider, setMachSlider] = useState<number>(1.8);
  const [showAreaRule, setShowAreaRule] = useState<boolean>(true);

  // Engine cycle database
  const engineDetails = {
    piston: {
      name: 'Internal Combustion Piston & Supercharger',
      era: '1903 - 1945 (Wright Flyer to Spitfire / B-29)',
      efficiency: '28 - 34% Thermal Efficiency',
      speedLimit: 'Top ceiling: ~750 km/h (Propeller tip Mach stall)',
      compressionRatio: '7:1 to 10:1 (Mechanical manifold boost)',
      bypassRatio: 'N/A (100% propeller slipstream)',
      fuel: 'Aviation Gasoline (100/130 to 115/145 Avgas)',
      description: 'Pistons drive a rotating crankshaft connected to variable-pitch propeller blades. At high flight speeds, the blade tips approach the speed of sound and experience massive shock wave drag, imposing a hard physics ceiling on maximum velocity.',
      stages: [
        { name: 'Air Intake', role: 'Ambient air enters carburetor / fuel injector', p: '1.0 atm', t: '15°C' },
        { name: 'Supercharger', role: 'Centrifugal compressor boosts manifold pressure', p: '2.4 atm', t: '90°C' },
        { name: 'Combustion', role: 'Spark plug ignites stoichiometric fuel-air mixture', p: '65 atm', t: '2200°C' },
        { name: 'Power Stroke', role: 'Expanding gas drives piston and connecting rod', p: '12 atm', t: '950°C' },
        { name: 'Muffler / Jet Exhaust', role: 'Exhaust gas ejected (Meredith effect thrust)', p: '1.0 atm', t: '650°C' },
      ]
    },
    turbojet: {
      name: 'Pure Turbojet (Continuous Brayton Cycle)',
      era: '1939 - 1969 (Me 262 to Bell X-1, Concorde)',
      efficiency: '15 - 22% Subsonic / High Supersonic Peak',
      speedLimit: 'Mach 1.0 to Mach 2.5 (High exhaust velocity)',
      compressionRatio: '4:1 (Me 262) to 15:1 (Olympus 593)',
      bypassRatio: '0.0 (Zero bypass - all air enters combustor)',
      fuel: 'Kerosene Jet A-1',
      description: 'Invented independently by Frank Whittle and Hans von Ohain. All incoming air passes through the compressor, burns with fuel in the combustion chamber, and spins the turbine before exiting at extreme jet velocity.',
      stages: [
        { name: 'Diffuser Inlet', role: 'Decelerates incoming air and recovers ram pressure', p: '1.2 atm', t: '25°C' },
        { name: 'Axial Compressor', role: 'Multi-stage bladed rotors compress air sequentially', p: '14 atm', t: '380°C' },
        { name: 'Combustion Chamber', role: 'Continuous kerosene atomization and ignition', p: '13.5 atm', t: '1250°C' },
        { name: 'Turbine Wheel', role: 'Extracts just enough energy to drive compressor shaft', p: '3.2 atm', t: '850°C' },
        { name: 'Convergent Nozzle', role: 'Accelerates hot gases to produce pure reactive thrust', p: '1.0 atm', t: '700°C' },
      ]
    },
    turbofan: {
      name: 'High-Bypass Turbofan (Modern Standard)',
      era: '1970 - Present (Boeing 777, 787, A350, CFM LEAP)',
      efficiency: '42 - 55% Overall Propulsive Efficiency',
      speedLimit: 'Mach 0.78 to Mach 0.90 (Subsonic Cruise)',
      compressionRatio: '40:1 to 55:1 (Ultra-high overall pressure ratio)',
      bypassRatio: '9:1 to 14:1 (90%+ air bypasses core)',
      fuel: 'Kerosene Jet A-1 / 100% Sustainable Aviation Fuel (SAF)',
      description: 'The foundation of contemporary commercial flight. A massive titanium/composite front fan directs 85–92% of the air around the engine core. Accelerating a huge volume of cool air at moderate velocity maximizes propulsive efficiency and reduces jet roar.',
      stages: [
        { name: 'Composite Front Fan', role: 'Compresses bypass airflow and generates 80%+ total thrust', p: '1.6 atm', t: '35°C' },
        { name: 'High-Pressure Compressor', role: 'Spins at 15,000+ RPM to compress core air to 50 atm', p: '52 atm', t: '650°C' },
        { name: 'Combustor (TAPS)', role: 'Low-NOx lean combustion burning cleanly', p: '50 atm', t: '1600°C' },
        { name: 'Single-Crystal Turbine', role: 'Ceramic-coated cooled blades operate above melting point', p: '6.5 atm', t: '1050°C' },
        { name: 'Exhaust Mixer & Chevron', role: 'Mixes cold bypass air with core exhaust to muffle noise', p: '1.0 atm', t: '250°C' },
      ]
    },
    ramjet: {
      name: 'Ramjet & Scramjet (Hypersonic Compression)',
      era: '1964 - Future (SR-71 J58 Turboramjet, X-43A Scramjet)',
      efficiency: 'High efficiency above Mach 3.0',
      speedLimit: 'Mach 3.0 to Mach 10+ (No moving turbomachinery)',
      compressionRatio: '30:1 to 100:1 (Pure aerodynamic ram shock compression)',
      bypassRatio: 'N/A',
      fuel: 'Special JP-7 / Liquid Hydrogen',
      description: 'Contains zero moving blades or rotating shafts. Relies entirely on the vehicle’s forward velocity to "ram" and compress supersonic air into the combustion chamber. In a Scramjet (Supersonic Combustion Ramjet), the air remains supersonic throughout combustion.',
      stages: [
        { name: 'Supersonic Spike / Ramp', role: 'Oblique shock waves slow air and achieve massive ram compression', p: '45 atm', t: '680°C' },
        { name: 'Isolator Section', role: 'Prevents shockwave instability and engine unstarts', p: '42 atm', t: '720°C' },
        { name: 'Supersonic Combustor', role: 'Hydrogen fuel injected and ignited in supersonic stream (under 1 ms)', p: '40 atm', t: '2400°C' },
        { name: 'Expansion Divergent Nozzle', role: 'Massive aerodynamic expansion delivering Mach 5+ hypersonic exhaust', p: '1.0 atm', t: '1400°C' },
        { name: 'Reaction Thrust Vector', role: 'Powers extreme atmospheric and orbital-insertion flight', p: '1.0 atm', t: '1200°C' },
      ]
    },
    hydrogen: {
      name: 'Cryogenic Liquid Hydrogen & Fuel Cell Hybrid',
      era: '2026 - 2035+ (Zero-Carbon Aviation Horizon)',
      efficiency: '60%+ System Thermodynamic Efficiency',
      speedLimit: 'Mach 0.82 Subsonic or Mach 5+ Cryo-Scramjet',
      compressionRatio: 'Electric compressors powered by H2 fuel cells or direct burn',
      bypassRatio: 'Ultra-High Bypass / Open Fan RISE (25:1 to 30:1)',
      fuel: 'Liquid Hydrogen (LH2 stored at -253°C)',
      description: 'Hydrogen has nearly triple the energy density by mass compared to jet kerosene (120 MJ/kg vs 43 MJ/kg) with zero CO2 emissions—producing only pure water vapor. Requires insulated cryogenic tanks and offers extreme heat sink cooling for high-Mach flight.',
      stages: [
        { name: 'Cryogenic LH2 Storage', role: 'Liquid hydrogen stored in vacuum-insulated fuselage tanks at -253°C', p: '3.0 atm', t: '-253°C' },
        { name: 'Thermal Heat Exchanger', role: 'Absorbs airframe and engine heat to vaporize hydrogen fuel', p: '12 atm', t: '150°C' },
        { name: 'PEM Fuel Cell / Combustor', role: 'Produces electricity for distributed electric fans or direct combustion', p: '30 atm', t: '1400°C' },
        { name: 'Boundary Layer Ingestion Fan', role: 'Electric fans ingest slow fuselage boundary layer air to boost efficiency', p: '1.5 atm', t: '45°C' },
        { name: 'Pure Water Vapor Exhaust', role: 'Clean exhaust stream with zero carbon dioxide or soot emissions', p: '1.0 atm', t: '85°C' },
      ]
    }
  };

  const currentEngine = engineDetails[selectedEngine];

  // Mach cone angle calculation: mu = arcsin(1/M)
  const isSupersonic = machSlider >= 1.0;
  const machAngleDeg = isSupersonic ? ((Math.asin(1 / machSlider) * 180) / Math.PI).toFixed(1) : null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <Flame className="w-4 h-4" />
            <span>Thermodynamics & Compressible Fluid Dynamics</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Propulsion Evolution & Sound Barrier Laboratory
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Explore the thermodynamic propulsion cycles that propelled humanity past the speed of sound—from reciprocating superchargers to high-bypass turbofans and cryogenic hydrogen scramjets.
          </p>
        </div>
      </div>

      {/* Engine Architecture Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 font-mono text-xs">
        {[
          { id: 'piston', label: '1. Piston & Supercharger' },
          { id: 'turbojet', label: '2. Pure Turbojet' },
          { id: 'turbofan', label: '3. High-Bypass Turbofan' },
          { id: 'ramjet', label: '4. Ramjet / Scramjet' },
          { id: 'hydrogen', label: '5. Cryogenic Liquid H2' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedEngine(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              selectedEngine === tab.id
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/70 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Engine Overview Card */}
      <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="font-heading text-xl font-bold text-white">
                {currentEngine.name}
              </h3>
            </div>
            <p className="text-xs font-mono text-cyan-400 mt-0.5">
              Historical Operational Horizon: {currentEngine.era}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-700 text-teal-300">
              {currentEngine.efficiency}
            </span>
            <span className="px-2.5 py-1 rounded bg-black/40 border border-slate-700 text-amber-300">
              Fuel: {currentEngine.fuel}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-300 mt-4 leading-relaxed max-w-4xl">
          {currentEngine.description}
        </p>

        {/* 5 Thermodynamic Cycle Stages */}
        <div className="mt-6">
          <span className="text-xs font-mono uppercase text-slate-400 block mb-3">
            Thermodynamic Working Fluid Stages:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs">
            {currentEngine.stages.map((stage, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-xl bg-black/40 border border-cyan-500/20 hover:border-cyan-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 mb-1">
                    <span>STAGE 0{idx + 1}</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
                  </div>
                  <h4 className="font-heading font-bold text-white text-sm">
                    {stage.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-sans mt-1.5 leading-snug">
                    {stage.role}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] flex justify-between">
                  <span className="text-amber-300">P: {stage.p}</span>
                  <span className="text-teal-300">T: {stage.t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transonic Sound Barrier & Whitcomb Area Rule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Mach Shockwave Cone Visualizer */}
        <div className="lg:col-span-6 hud-panel p-6 rounded-2xl border border-cyan-500/30">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 text-xs font-mono">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              MACH CONE & SHOCKWAVE PROPAGATION
            </span>
            <span className="text-slate-400 font-mono">
              μ = arcsin(1 / M)
            </span>
          </div>

          <div className="my-4">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-300">Flight Velocity:</span>
              <span className="text-cyan-300 font-bold text-sm">
                Mach {machSlider.toFixed(2)} ({Math.round(machSlider * 1225)} km/h)
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.05"
              value={machSlider}
              onChange={(e) => setMachSlider(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>Mach 0.5 (Subsonic)</span>
              <span className="text-cyan-400">Mach 1.0 (Sonic Barrier)</span>
              <span className="text-amber-400">Mach 3.5 (Blackbird)</span>
            </div>
          </div>

          {/* Mach Shockwave SVG Diagram */}
          <div className="w-full h-[220px] rounded-xl bg-black/60 border border-cyan-500/20 relative overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 220" className="w-full h-full">
              {/* Center aircraft point */}
              <circle cx="280" cy="110" r="4" fill="#00f0ff" />
              <text x="290" y="114" fill="#00f0ff" fontSize="10" fontFamily="monospace">VEHICLE</text>

              {!isSupersonic ? (
                // Subsonic pressure waves expanding forward of vehicle
                <g opacity="0.6">
                  <circle cx="240" cy="110" r="30" fill="none" stroke="#38bdf8" strokeDasharray="3,3" />
                  <circle cx="210" cy="110" r="60" fill="none" stroke="#38bdf8" strokeDasharray="3,3" />
                  <circle cx="170" cy="110" r="90" fill="none" stroke="#38bdf8" strokeDasharray="3,3" />
                  <text x="50" y="30" fill="#38bdf8" fontSize="10" fontFamily="monospace">SUBSONIC: Pressure waves outrun aircraft</text>
                </g>
              ) : (
                // Supersonic Mach Cone lines
                <g>
                  {/* Upper Shock Line */}
                  <line 
                    x1="280" 
                    y1="110" 
                    x2={280 - 240} 
                    y2={110 - 240 * Math.tan(((parseFloat(machAngleDeg || '45') * Math.PI) / 180))} 
                    stroke="#f59e0b" 
                    strokeWidth="2.5" 
                  />
                  {/* Lower Shock Line */}
                  <line 
                    x1="280" 
                    y1="110" 
                    x2={280 - 240} 
                    y2={110 + 240 * Math.tan(((parseFloat(machAngleDeg || '45') * Math.PI) / 180))} 
                    stroke="#f59e0b" 
                    strokeWidth="2.5" 
                  />
                  {/* Mach Angle Arc / Indicator */}
                  <path 
                    d={`M 200 110 A 80 80 0 0 0 ${280 - 80 * Math.cos(((parseFloat(machAngleDeg || '45') * Math.PI) / 180))} ${110 - 80 * Math.sin(((parseFloat(machAngleDeg || '45') * Math.PI) / 180))}`} 
                    fill="none" 
                    stroke="#00f0ff" 
                    strokeDasharray="2,2" 
                  />
                  <text x="210" y="100" fill="#00f0ff" fontSize="11" fontFamily="monospace">
                    μ = {machAngleDeg}°
                  </text>
                  <text x="30" y="30" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                    SUPERSONIC: Disturbance confined inside Mach Cone
                  </text>
                  <text x="30" y="200" fill="#64748b" fontSize="9" fontFamily="monospace">
                    ZONE OF SILENCE (Observer hears nothing before wave arrival)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 text-xs font-mono text-slate-300">
            {isSupersonic ? (
              <p>
                At <strong className="text-cyan-300">Mach {machSlider}</strong>, the aircraft flies faster than pressure disturbances can radiate ahead. Shock waves coalesce into a conical envelope with half-angle <strong className="text-amber-300">{machAngleDeg}°</strong>. When this wave washes over the ground, observers hear the explosive double "crack" of a sonic boom.
              </p>
            ) : (
              <p>
                At subsonic speeds (<strong className="text-cyan-300">Mach {machSlider}</strong>), pressure waves propagate forward at the speed of sound, warning the upstream air molecules to smoothly part around the approaching airframe.
              </p>
            )}
          </div>
        </div>

        {/* Right: The Whitcomb Area Rule Explorer */}
        <div className="lg:col-span-6 hud-panel p-6 rounded-2xl border border-cyan-500/30">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 text-xs font-mono">
            <span className="text-cyan-300 font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              WHITCOMB AREA RULE (THE "WASP WAIST")
            </span>
            <button
              onClick={() => setShowAreaRule(!showAreaRule)}
              className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] cursor-pointer"
            >
              {showAreaRule ? 'Disable Area Rule' : 'Enable Area Rule'}
            </button>
          </div>

          {/* Area Rule Schematic SVG */}
          <div className="w-full h-[220px] rounded-xl bg-black/60 border border-cyan-500/20 my-4 relative overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 220" className="w-full h-full">
              {/* Aircraft outline */}
              {showAreaRule ? (
                // Area ruled fuselage (wasp waist indented at wing root)
                <g>
                  {/* Indented Fuselage */}
                  <path 
                    d="M 40 110 Q 90 90 140 92 Q 200 102 260 92 Q 330 95 370 110 Q 330 125 260 128 Q 200 118 140 128 Q 90 130 40 110 Z" 
                    fill="rgba(6, 182, 212, 0.15)" 
                    stroke="#00f0ff" 
                    strokeWidth="2" 
                  />
                  {/* Delta Wings mounted at indentation */}
                  <polygon points="140,92 260,92 200,30" fill="rgba(6, 182, 212, 0.25)" stroke="#00f0ff" strokeWidth="1.5" />
                  <polygon points="140,128 260,128 200,190" fill="rgba(6, 182, 212, 0.25)" stroke="#00f0ff" strokeWidth="1.5" />
                  <text x="80" y="25" fill="#38bdf8" fontSize="10" fontFamily="monospace">WITH AREA RULE: Smooth total cross-section (Low Wave Drag)</text>
                </g>
              ) : (
                // Non-area ruled cylindrical fuselage (abrupt cross section spike)
                <g>
                  {/* Straight cylindrical Fuselage */}
                  <path 
                    d="M 40 110 Q 90 92 140 92 L 260 92 Q 330 92 370 110 Q 330 128 260 128 L 140 128 Q 90 128 40 110 Z" 
                    fill="rgba(239, 68, 68, 0.15)" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                  />
                  {/* Wings without fuselage waist */}
                  <polygon points="140,92 260,92 200,30" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1.5" />
                  <polygon points="140,128 260,128 200,190" fill="rgba(239, 68, 68, 0.25)" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="80" y="25" fill="#ef4444" fontSize="10" fontFamily="monospace">WITHOUT AREA RULE: Cross-section bulge spikes wave drag (+60%)</text>
                </g>
              )}

              {/* Cross-Section Area Graph at Bottom */}
              <line x1="40" y1="200" x2="370" y2="200" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
              {showAreaRule ? (
                <path d="M 40 200 Q 120 180 200 178 Q 280 180 370 200" fill="none" stroke="#00f0ff" strokeWidth="2" />
              ) : (
                <path d="M 40 200 Q 120 190 160 188 Q 200 150 240 188 Q 280 190 370 200" fill="none" stroke="#ef4444" strokeWidth="2" />
              )}
              <text x="45" y="195" fill="#94a3b8" fontSize="9" fontFamily="monospace">TOTAL CROSS SECTION AREA DISTRIBUTION</text>
            </svg>
          </div>

          <div className="text-xs font-mono text-slate-300 space-y-1">
            <strong className="text-cyan-300 block">NACA Aerodynamicist Richard Whitcomb (1952)</strong>
            <p>
              Transonic wave drag is determined by the smooth longitudinal gradient of the airplane’s total cross-sectional area, not just its wing profile. By pinching the fuselage like a "coke bottle" where the wings attach, the combined area of fuselage + wings stays smooth and uniform, eliminating massive shock wave turbulence and allowing aircraft like the Convair F-102 and F-106 to achieve supersonic flight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

