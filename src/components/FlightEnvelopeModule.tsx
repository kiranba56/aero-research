import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Compass, 
  Zap, 
  Layers, 
  Info,
  Maximize2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  ReferenceLine 
} from 'recharts';

export const FlightEnvelopeModule: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'envelope' | 'efficiency' | 'thrustSpeed'>('envelope');

  // 1. Flight Envelope data (Altitude vs Mach Number & Boundaries)
  const envelopeData = [
    { altitudeKft: 0, altitudeM: 0, lowSpeedStallMach: 0.18, highSpeedLimitMach: 0.95, sr71Mach: null, commercialCruise: null },
    { altitudeKft: 10, altitudeM: 3048, lowSpeedStallMach: 0.22, highSpeedLimitMach: 0.96, sr71Mach: null, commercialCruise: null },
    { altitudeKft: 20, altitudeM: 6096, lowSpeedStallMach: 0.28, highSpeedLimitMach: 0.95, sr71Mach: null, commercialCruise: null },
    { altitudeKft: 30, altitudeM: 9144, lowSpeedStallMach: 0.38, highSpeedLimitMach: 0.92, sr71Mach: null, commercialCruise: 0.82 },
    { altitudeKft: 36, altitudeM: 10972, lowSpeedStallMach: 0.46, highSpeedLimitMach: 0.89, sr71Mach: null, commercialCruise: 0.85 },
    { altitudeKft: 42, altitudeM: 12800, lowSpeedStallMach: 0.58, highSpeedLimitMach: 0.86, sr71Mach: 1.8, commercialCruise: 0.85 },
    { altitudeKft: 48, altitudeM: 14630, lowSpeedStallMach: 0.72, highSpeedLimitMach: 0.84, sr71Mach: 2.4, commercialCruise: null },
    { altitudeKft: 52, altitudeM: 15850, lowSpeedStallMach: 0.79, highSpeedLimitMach: 0.82, sr71Mach: 2.8, commercialCruise: null }, // Coffin corner zone for subsonic
    { altitudeKft: 60, altitudeM: 18288, lowSpeedStallMach: null, highSpeedLimitMach: null, sr71Mach: 3.1, concordeMach: 2.04 },
    { altitudeKft: 75, altitudeM: 22860, lowSpeedStallMach: null, highSpeedLimitMach: null, sr71Mach: 3.25, concordeMach: null },
    { altitudeKft: 85, altitudeM: 25900, lowSpeedStallMach: null, highSpeedLimitMach: null, sr71Mach: 3.32, concordeMach: null },
  ];

  // 2. Decadal fuel efficiency & Specific Fuel Consumption (SFC)
  const efficiencyData = [
    { year: 1958, aircraft: 'Boeing 707-120', sfc: 0.92, fuelBurnLPer100PaxKm: 8.8, bypassRatio: 0.0 },
    { year: 1970, aircraft: 'Boeing 747-100', sfc: 0.65, fuelBurnLPer100PaxKm: 5.8, bypassRatio: 5.0 },
    { year: 1988, aircraft: 'Airbus A320-200', sfc: 0.56, fuelBurnLPer100PaxKm: 3.6, bypassRatio: 6.0 },
    { year: 1995, aircraft: 'Boeing 777-200', sfc: 0.51, fuelBurnLPer100PaxKm: 3.2, bypassRatio: 9.0 },
    { year: 2011, aircraft: 'Boeing 787-8', sfc: 0.44, fuelBurnLPer100PaxKm: 2.3, bypassRatio: 11.0 },
    { year: 2016, aircraft: 'Airbus A321neo', sfc: 0.41, fuelBurnLPer100PaxKm: 1.95, bypassRatio: 12.5 },
    { year: 2026, aircraft: 'CFM RISE Open Fan', sfc: 0.34, fuelBurnLPer100PaxKm: 1.5, bypassRatio: 25.0 },
    { year: 2032, aircraft: 'JetZero BWB H2', sfc: 0.28, fuelBurnLPer100PaxKm: 1.1, bypassRatio: 30.0 },
  ];

  // 3. Thrust-to-Weight vs Top Speed across legendary aircraft
  const thrustSpeedData = [
    { name: 'Wright Flyer', year: 1903, speedKmh: 48, mach: 0.04, twRatio: 0.08, era: 'Pioneer' },
    { name: 'Spitfire Mk IX', year: 1942, speedKmh: 657, mach: 0.54, twRatio: 0.34, era: 'WWII' },
    { name: 'Me 262 Jet', year: 1944, speedKmh: 900, mach: 0.74, twRatio: 0.28, era: 'WWII Jet' },
    { name: 'Boeing 707', year: 1954, speedKmh: 977, mach: 0.88, twRatio: 0.26, era: 'Early Jet' },
    { name: 'SR-71 Blackbird', year: 1964, speedKmh: 3540, mach: 3.32, twRatio: 0.39, era: 'Supersonic' },
    { name: 'Concorde', year: 1969, speedKmh: 2179, mach: 2.04, twRatio: 0.37, era: 'Supersonic' },
    { name: 'F-16 Falcon', year: 1974, speedKmh: 2414, mach: 2.05, twRatio: 1.09, era: 'Fly-by-Wire' },
    { name: 'Boeing 747-400', year: 1988, speedKmh: 988, mach: 0.86, twRatio: 0.29, era: 'Widebody' },
    { name: 'F-22 Raptor', year: 1997, speedKmh: 2414, mach: 2.25, twRatio: 1.25, era: '5th Gen Stealth' },
    { name: 'Boeing 787', year: 2009, speedKmh: 954, mach: 0.89, twRatio: 0.28, era: 'Composites' },
    { name: 'X-59 QueSST', year: 2024, speedKmh: 1510, mach: 1.42, twRatio: 0.68, era: 'Future' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Analytical Telemetry & Flight Envelope Dynamics</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Aerodynamic Flight Envelopes & Analytical Regimes
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Examine the operational boundaries of flight, including the perilous high-altitude Coffin Corner, 70-year fuel burn reductions, and thrust-to-weight performance envelopes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-slate-900/90 border border-cyan-500/30 p-1 text-xs font-mono">
          <button
            onClick={() => setActiveChart('envelope')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeChart === 'envelope'
                ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Flight Envelope & Coffin Corner
          </button>
          <button
            onClick={() => setActiveChart('efficiency')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeChart === 'efficiency'
                ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Decadal Fuel Burn & SFC
          </button>
          <button
            onClick={() => setActiveChart('thrustSpeed')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeChart === 'thrustSpeed'
                ? 'bg-cyan-500/30 text-cyan-300 font-bold border border-cyan-400/50'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Thrust-to-Weight vs Mach
          </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="hud-panel p-6 rounded-2xl border border-cyan-500/30 bg-[#040816]">
        {/* CHART 1: FLIGHT ENVELOPE (ALTITUDE VS SPEED) */}
        {activeChart === 'envelope' && (
          <div>
            <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-cyan-500/20 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>ALTITUDE (kft) vs. MACH NUMBER ENVELOPE (V-n Aerodynamic Boundary)</span>
              </div>
              <span className="text-amber-400">
                COFFIN CORNER PINCH AT ~52,000 FT
              </span>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={envelopeData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="altitudeKft" 
                    stroke="#64748b" 
                    label={{ value: 'Altitude (Thousands of Feet / kft)', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    domain={[0, 3.5]} 
                    label={{ value: 'Flight Mach Number', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#070f24', borderColor: '#06b6d4', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px' }}
                    formatter={(value: any, name: string) => [
                      value ? `Mach ${value}` : 'N/A', 
                      name === 'lowSpeedStallMach' ? 'Low Speed Stall Limit' :
                      name === 'highSpeedLimitMach' ? 'High Speed Buffet / Mach Limit' :
                      name === 'sr71Mach' ? 'SR-71 Operational Corridor' :
                      name === 'commercialCruise' ? 'Standard Airliner Cruise (B787/A350)' : name
                    ]}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px', fontFamily: 'monospace', fontSize: '11px' }} />

                  {/* Commercial Subsonic Safe Flight Corridor */}
                  <Area 
                    type="monotone" 
                    dataKey="highSpeedLimitMach" 
                    name="High Speed Buffet Boundary (M_crit)" 
                    stroke="#f59e0b" 
                    fill="rgba(6, 182, 212, 0.15)" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lowSpeedStallMach" 
                    name="Low Speed Stall Boundary (Vs)" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    strokeDasharray="4 4" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="commercialCruise" 
                    name="Subsonic Commercial Cruise (Mach 0.85)" 
                    stroke="#38bdf8" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#38bdf8' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sr71Mach" 
                    name="SR-71 Blackbird Supersonic High Altitude Cruise" 
                    stroke="#a855f7" 
                    strokeWidth={3} 
                    dot={{ r: 5, fill: '#a855f7' }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Explanation Note */}
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-300 font-mono block">Physics Insight: The Coffin Corner</strong>
              <p>
                As an aircraft climbs into thinner stratospheric air, its stall speed (in True Airspeed) increases because fewer air molecules hit the wings. Concurrently, the speed of sound drops with lower temperatures, causing the high-speed Mach buffet limit to drop. At high altitudes (around 50,000–55,000 ft for subsonic airliners), the margin between low-speed aerodynamic stall and high-speed Mach shockwave stall shrinks to just a few knots—creating the treacherous "Coffin Corner."
              </p>
            </div>
          </div>
        )}

        {/* CHART 2: DECADAL EFFICIENCY & SPECIFIC FUEL CONSUMPTION */}
        {activeChart === 'efficiency' && (
          <div>
            <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-cyan-500/20 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>HISTORIC FUEL CONSUMPTION: LITERS PER 100 PASSENGER-KM (1958 - 2032)</span>
              </div>
              <span className="text-teal-400">
                -85% FUEL BURN REDUCTION OVER 7 DECADES
              </span>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={efficiencyData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="year" 
                    stroke="#64748b" 
                    label={{ value: 'Certification Year', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    label={{ value: 'Liters / 100 Pax-Km', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#070f24', borderColor: '#06b6d4', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px' }}
                    formatter={(value: any, name: string) => [
                      name.includes('Pax') ? `${value} L / 100 pax-km` : `${value} kg/(daN·h)`,
                      name
                    ]}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px', fontFamily: 'monospace', fontSize: '11px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="fuelBurnLPer100PaxKm" 
                    name="Fuel Burn (L / 100 passenger-km)" 
                    stroke="#00f0ff" 
                    strokeWidth={3} 
                    dot={{ r: 6, fill: '#00f0ff' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sfc" 
                    name="Specific Fuel Consumption (SFC) in kg/daN·h" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    dot={{ r: 4, fill: '#f59e0b' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Explanation Note */}
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-300 font-mono block">Engineering Drivers: Bypass Ratio & Lightweight Composites</strong>
              <p>
                From pure turbojets (Boeing 707) burning ~9 liters per passenger-km down to modern carbon-composite twinjets (A321neo / B787) burning ~2 liters per passenger-km, the exponential rise in turbofan Bypass Ratios (from 0:1 to 12+:1 and next-generation 30:1 Open Rotor RISE architectures) accounts for the single largest environmental and economic leap in transport history.
              </p>
            </div>
          </div>
        )}

        {/* CHART 3: THRUST-TO-WEIGHT VS TOP SPEED */}
        {activeChart === 'thrustSpeed' && (
          <div>
            <div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-cyan-500/20 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>THRUST-TO-WEIGHT RATIO (T/W) vs. TOP SPEED ACROSS GENERATIONS</span>
              </div>
              <span className="text-cyan-400">
                FIGHTERS EXCEED T/W &gt; 1.0 FOR VERTICAL ACCELERATION
              </span>
            </div>

            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={thrustSpeedData}
                  margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    angle={-30} 
                    textAnchor="end" 
                    interval={0} 
                    height={60} 
                    tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#cbd5e1' }} 
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#38bdf8" 
                    domain={[0, 1.4]} 
                    label={{ value: 'Thrust-to-Weight (T/W) Ratio', angle: -90, position: 'insideLeft', fill: '#38bdf8', fontSize: 11, fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#f59e0b" 
                    label={{ value: 'Top Speed (km/h)', angle: 90, position: 'insideRight', fill: '#f59e0b', fontSize: 11, fontFamily: 'monospace' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#070f24', borderColor: '#06b6d4', borderRadius: '8px', fontFamily: 'monospace', fontSize: '11px' }} 
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontFamily: 'monospace', fontSize: '11px' }} />
                  <ReferenceLine yAxisId="left" y={1.0} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'T/W = 1.0 (Vertical Climb Threshold)', fill: '#ef4444', fontSize: 10, position: 'top' }} />
                  <Bar yAxisId="left" dataKey="twRatio" name="Thrust / Weight Ratio" fill="#00f0ff" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="speedKmh" name="Top Speed (km/h)" fill="#f59e0b" opacity={0.8} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Explanation Note */}
            <div className="mt-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-300 font-mono block">Aviation Principle: The 1.0 T/W Frontier</strong>
              <p>
                When an aircraft’s installed engine thrust exceeds its total weight (T/W &gt; 1.0, achieved by 4th and 5th-generation fighters like the F-16 and F-22), it can accelerate straight vertically upward into the sky without losing speed, defying purely aerodynamic lift constraints. Commercial airliners, optimized for cruise efficiency rather than dogfighting, operate at modest takeoff T/W ratios around 0.28 to 0.32.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

