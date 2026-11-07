export interface EngineType {
  id: string;
  name: string;
  subType: string;
  workingPrinciple: string;
  thermodynamicCycle: string;
  idealMachRange: string;
  altitudeCeiling: string;
  typicalSFC: string;
  thrustToWeight: string;
  propulsiveEfficiency: string;
  thermalEfficiency: string;
  advantages: string[];
  disadvantages: string[];
  historicalExamples: {
    engineName: string;
    aircraft: string;
    year: number;
    metrics: string;
  }[];
  detailedPhysics: string;
  imageUrl: string;
  imageCaption: string;
}

export const enginesDataset: EngineType[] = [
  {
    id: "eng-piston",
    name: "Piston (Reciprocating) Engine",
    subType: "Internal Combustion (Inline / Radial / Horizontally-Opposed)",
    workingPrinciple: "Converts chemical fuel energy into mechanical shaft power through cyclic reciprocating motion of pistons within cylinders (Intake, Compression, Power, Exhaust), driving a variable or fixed-pitch propeller.",
    thermodynamicCycle: "Otto Cycle (constant volume heat addition)",
    idealMachRange: "Mach 0.0 to 0.45 (< 400 km/h)",
    altitudeCeiling: "Sea level to 25,000 ft (turbo-supercharged)",
    typicalSFC: "0.40–0.50 lb/(hp·h) [240–300 g/(kW·h)]",
    thrustToWeight: "1.0 to 1.8 hp/lb power-to-weight",
    propulsiveEfficiency: "80–88% at low subsonic speeds (< 350 km/h); degrades severely as propeller tips reach transonic speeds",
    thermalEfficiency: "28–34%",
    advantages: [
      "Exceptional fuel efficiency at low flight velocities (< 300 km/h)",
      "Low manufacturing and overhaul acquisition costs for general aviation",
      "Immediate throttle response and simple mechanical diagnostics",
      "Superior propulsive efficiency during takeoff and low-altitude climb"
    ],
    disadvantages: [
      "Strict power-to-weight ceiling; heavy cast iron/aluminum engine blocks",
      "Severe propeller compressibility drag as blade tips approach Mach 1.0",
      "Atmospheric density decay rapidly starves combustion without heavy multi-stage superchargers",
      "Complex mechanical reciprocating wear (pistons, valves, connecting rods, spark plugs)"
    ],
    historicalExamples: [
      {
        engineName: "Wright 12-hp Inline 4",
        aircraft: "Wright Flyer I",
        year: 1903,
        metrics: "12 hp, 82 kg, 0.15 hp/kg"
      },
      {
        engineName: "Rolls-Royce Merlin 66 V-12",
        aircraft: "Supermarine Spitfire Mk IX / P-51D",
        year: 1942,
        metrics: "1,720 hp, 744 kg, two-stage two-speed supercharger"
      },
      {
        engineName: "Pratt & Whitney R-4360 Wasp Major",
        aircraft: "Boeing B-50 / Convair B-36",
        year: 1944,
        metrics: "28-cylinder 4-row radial, 3,500 hp, 71.5 L displacement"
      }
    ],
    detailedPhysics: "The net mechanical work per cycle is determined by the Otto compression ratio r = V_max / V_min: η_th = 1 - (1 / r^(γ-1)), where γ ≈ 1.4 for air. Piston engines hit a fundamental barrier in the 1940s: extracting 3,000+ hp required 28+ cylinders, hundreds of moving parts, and monstrous cooling drag that canceled out power gains.",
    imageUrl: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f1?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Internal combustion reciprocating aircraft powerplant displaying mechanical valve and propeller linkage."
  },
  {
    id: "eng-turboprop",
    name: "Turboprop Engine",
    subType: "Gas Turbine Driven Reduction Gearbox Propeller",
    workingPrinciple: "A gas turbine core (compressor, combustor, turbine) produces high-velocity gas that is expanded across an extra 'free power turbine'. This power turbine extracts 80–90% of the gas energy into rotational shaft power to turn a multi-blade propeller via an epicyclic reduction gearbox.",
    thermodynamicCycle: "Brayton Cycle driving external shaft load",
    idealMachRange: "Mach 0.35 to 0.65 (350–700 km/h)",
    altitudeCeiling: "Up to 30,000 ft (9,100 m)",
    typicalSFC: "0.35–0.45 lb/(shp·h) [210–270 g/(kW·h)]",
    thrustToWeight: "2.5 to 4.5 shp/lb shaft power density",
    propulsiveEfficiency: "82–88% in mid-subsonic cruise; far superior to turbofans below Mach 0.6",
    thermalEfficiency: "35–42%",
    advantages: [
      "Outstanding fuel economy for short-haul regional flights (under 500 nmi)",
      "Vastly higher power-to-weight ratio and reliability than piston engines",
      "Short takeoff and landing (STOL) capability with reversible pitch propeller braking",
      "Lower operational emissions for short-range commuter routes"
    ],
    disadvantages: [
      "Speed limited to ~Mach 0.65 due to propeller tip shockwave formation",
      "High mechanical complexity and weight in the reduction gearbox (stepping down 30,000+ RPM turbine to 1,200 RPM propeller)",
      "Cabin vibration and acoustic noise signatures from blade passage frequencies"
    ],
    historicalExamples: [
      {
        engineName: "Rolls-Royce Dart",
        aircraft: "Vickers Viscount",
        year: 1948,
        metrics: "First turboprop in commercial service, centrifugal compressor, 1,400 shp"
      },
      {
        engineName: "Pratt & Whitney Canada PT6A",
        aircraft: "Beechcraft King Air / Cessna Caravan",
        year: 1963,
        metrics: "Over 50,000 produced, reverse-flow free-turbine, 500–1,700 shp"
      },
      {
        engineName: "Europrop TP400-D6",
        aircraft: "Airbus A400M Atlas",
        year: 2009,
        metrics: "11,000 shp, 8-bladed scimitar composite propeller, 5.3 m diameter"
      }
    ],
    detailedPhysics: "Propulsive efficiency is governed by Froude momentum theory: η_p = 2 / (1 + v_jet / v_0). Because a propeller accelerates an enormous mass of air by a very small velocity increment (Δv), its propulsive efficiency at moderate speeds is fundamentally higher than pure jet reactions.",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Turboprop scimitar propeller blades engineered for high aerodynamic propulsive efficiency."
  },
  {
    id: "eng-turbojet",
    name: "Turbojet Engine",
    subType: "Pure Reaction Gas Turbine",
    workingPrinciple: "Ambient air is compressed by axial or centrifugal compressor stages, mixed with jet fuel, combusted at high pressure, and expanded across a turbine that drives the compressor. The remaining high-temperature, high-pressure gas expands through a convergent nozzle, generating thrust entirely via high-velocity exhaust reaction.",
    thermodynamicCycle: "Open Brayton Cycle (constant pressure heat addition)",
    idealMachRange: "Mach 0.8 to 2.5+ (Supersonic optimum)",
    altitudeCeiling: "Up to 60,000+ ft (18,000 m)",
    typicalSFC: "0.90–1.25 lb/(lbf·h) subsonic; 1.5–2.0 lb/(lbf·h) with afterburner",
    thrustToWeight: "4:1 to 7:1",
    propulsiveEfficiency: "Poor at subsonic speeds (< 50% at Mach 0.6); climbs to > 80% at Mach 2.0+ as flight velocity matches exhaust speed",
    thermalEfficiency: "26–33%",
    advantages: [
      "Compact frontal cross-sectional area minimizing high-speed aerodynamic drag",
      "Produces enormous thrust at high supersonic Mach numbers",
      "Capable of integrating afterburners for 50%+ thrust bursts during combat/takeoff",
      "Mechanically simpler than geared turbofans (no bypass ducting or giant fan)"
    ],
    disadvantages: [
      "Extremely poor fuel economy and high SFC at subsonic cruise",
      "Intolerable acoustic noise levels caused by high-shear supersonic exhaust jet mixing with ambient air",
      "Obsolete for modern commercial civil aviation due to emissions and fuel costs"
    ],
    historicalExamples: [
      {
        engineName: "Heinkel HeS 3B",
        aircraft: "Heinkel He 178",
        year: 1939,
        metrics: "World's first flight turbojet, centrifugal flow, 1,100 lbf thrust"
      },
      {
        engineName: "Pratt & Whitney J57",
        aircraft: "Boeing 707-120 / F-100 Super Sabre",
        year: 1953,
        metrics: "First two-spool axial turbojet, 10,000 lbf dry thrust"
      },
      {
        engineName: "Rolls-Royce/Snecma Olympus 593",
        aircraft: "Concorde",
        year: 1969,
        metrics: "38,050 lbf with reheat, Mach 2.04 sustained cruise"
      }
    ],
    detailedPhysics: "Thrust is defined by Newton's second law: F = m_dot * (v_exit - v_0) + (P_exit - P_0) * A_exit. In a pure turbojet, all air passes through the core (Bypass Ratio = 0). While this maximizes specific thrust per unit engine frontal area, it creates very high exhaust kinetic energy loss: E_loss = 0.5 * m_dot * (v_exit - v_0)^2.",
    imageUrl: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Supersonic turbojet exhaust nozzle geometry directing high-enthalpy gas expansion."
  },
  {
    id: "eng-turbofan",
    name: "Turbofan Engine (High & Geared Bypass)",
    subType: "Ducted Fan Bypass Gas Turbine",
    workingPrinciple: "A gas turbine core powers an oversized front fan. The airflow splits: a small fraction enters the high-pressure core, while the vast majority (the 'bypass air') flows around the core through a bypass duct, producing 75–90% of total engine thrust at lower velocity and high mass flow.",
    thermodynamicCycle: "Bypass Brayton Cycle with split flow streams",
    idealMachRange: "Mach 0.70 to 0.88 (Subsonic commercial sweet spot)",
    altitudeCeiling: "35,000 to 45,000 ft (10,500–13,700 m)",
    typicalSFC: "0.42–0.58 lb/(lbf·h) [12–16 g/(kN·s)]",
    thrustToWeight: "5:1 to 9:1",
    propulsiveEfficiency: "75–85% at Mach 0.80–0.85",
    thermalEfficiency: "45–55% (Overall pressure ratios exceeding 50:1)",
    advantages: [
      "Industry benchmark for modern commercial passenger aviation efficiency",
      "Dramatic acoustic noise reduction (bypass air cushions the hot core jet shear layer)",
      "High bypass ratios (BPR 10:1 to 12.5:1) deliver lowest SFC per passenger-kilometer",
      "Geared turbofan (GTF) architectures decouple fan speed from low-pressure turbine for optimal aerodynamics"
    ],
    disadvantages: [
      "Enormous fan diameter (e.g. GE9X diameter is 3.4 m / 134 in, wider than a Boeing 737 fuselage) requires long landing gear",
      "High nacelle drag and weight penalties at higher transonic speeds (> Mach 0.88)",
      "Extremely complex multi-spool bearings, single-crystal cooled turbine metallurgy, and planetary gearboxes"
    ],
    historicalExamples: [
      {
        engineName: "Pratt & Whitney JT9D",
        aircraft: "Boeing 747-100",
        year: 1969,
        metrics: "First commercial high-bypass turbofan (BPR 5:1), 43,500 lbf thrust"
      },
      {
        engineName: "General Electric GE90-115B",
        aircraft: "Boeing 777-300ER",
        year: 2003,
        metrics: "World's most powerful jet engine in commercial service, 115,300 lbf thrust"
      },
      {
        engineName: "Pratt & Whitney PW1100G-JM",
        aircraft: "Airbus A320neo",
        year: 2014,
        metrics: "Geared Turbofan (BPR 12.5:1), 3:1 planetary gearbox, 16% SFC reduction"
      }
    ],
    detailedPhysics: "Total thrust F = m_dot_core * (v_core - v_0) + m_dot_bypass * (v_bypass - v_0). By maximizing mass flow rate (m_dot) and reducing exhaust velocity (v_exit), propulsive efficiency approaches maximum while kinetic energy wastage drops quadratically: P_waste ∝ Δv^2.",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "High-bypass turbofan composite fan blades demonstrating titanium leading-edge erosion protection."
  },
  {
    id: "eng-electric",
    name: "Electric & Hybrid Propulsion",
    subType: "Permanent Magnet Synchronous Motors & Fuel Cells",
    workingPrinciple: "Electrical energy stored in lithium-ion batteries or generated via hydrogen fuel cells powers high-efficiency permanent magnet synchronous electric motors (PMSM), which drive distributed ducted or open propellers (DEP).",
    thermodynamicCycle: "Electrochemical / Electro-mechanical (Carnot limit not applicable)",
    idealMachRange: "Mach 0.0 to 0.40 (< 400 km/h) for near-term eVTOL / Commuter",
    altitudeCeiling: "Sea level to 15,000 ft (commuter eVTOL)",
    typicalSFC: "Equivalent energy: 90–95% motor efficiency (0 direct carbon emissions)",
    thrustToWeight: "Motor power density: 5.0 to 10.0 kW/kg; entire battery powertrain density is currently low",
    propulsiveEfficiency: "85–92% across all operational phases due to distributed propulsion scaling",
    thermalEfficiency: "Motor conversion > 92%; PEM Fuel cell ~55–60%",
    advantages: [
      "Zero direct greenhouse gas emissions (CO2, NOx, particulates, contrail soot) during flight",
      "Near-silent acoustic acoustic signature for urban air mobility (eVTOL)",
      "Distributed Electric Propulsion (DEP): multiple small electric motors can be mounted along the wing to blow air across wings, dramatically increasing lift at low speeds",
      "Very low maintenance overhead: electric motors have only one moving part (rotor) with zero hot-section turbine degradation"
    ],
    disadvantages: [
      "Severe battery gravimetric energy density bottleneck: current state-of-the-art batteries deliver ~250–300 Wh/kg vs jet fuel's 12,000 Wh/kg (a 40x difference)",
      "Aircraft landing weight equals takeoff weight; batteries do not burn off mass during flight like liquid fuel",
      "Long charging turnaround times and thermal runaway fire hazards requiring complex cooling systems"
    ],
    historicalExamples: [
      {
        engineName: "Pipistrel E-811",
        aircraft: "Pipistrel Velis Electro",
        year: 2020,
        metrics: "World's first EASA-type-certified electric aircraft, 57.6 kW motor, 50-minute endurance"
      },
      {
        engineName: "Joby Electric Powertrain",
        aircraft: "Joby S4 eVTOL",
        year: 2021,
        metrics: "6 tilting electric proprotors, 320 km/h top speed, 160 km range on battery"
      },
      {
        engineName: "ZeroAvia ZA600 Hydrogen-Electric",
        aircraft: "Dornier 228 testbed",
        year: 2023,
        metrics: "600 kW hydrogen fuel-cell electric powertrain for 19-seat regional aircraft"
      }
    ],
    detailedPhysics: "Electric motors decouple propulsive power from thermal heat cycles. Under Distributed Electric Propulsion (DEP), dynamic pressure q = 0.5 * ρ * V^2 over the wing is increased by propeller slipstream blowing, doubling the maximum lift coefficient (C_Lmax) from 1.5 to 3.0+ without increasing wing surface area.",
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Distributed electric propulsion concept exploring high-efficiency aerofoil integration."
  }
];

export interface EngineComparisonRow {
  parameter: string;
  piston: string;
  turboprop: string;
  turbojet: string;
  turbofan: string;
  electric: string;
}

export const engineComparisonTable: EngineComparisonRow[] = [
  {
    parameter: "Thermodynamic Cycle",
    piston: "Otto Cycle (Reciprocating)",
    turboprop: "Brayton (Shaft Power)",
    turbojet: "Brayton (Pure Reaction)",
    turbofan: "Split-Stream Brayton",
    electric: "Electromechanical"
  },
  {
    parameter: "Bypass Ratio (BPR)",
    piston: "N/A (Open Propeller)",
    turboprop: "Effective 50:1 to 100:1",
    turbojet: "0:1 (Pure Core)",
    turbofan: "10:1 to 12.5:1 (Ultra-High)",
    electric: "N/A (Open/Ducted Fan)"
  },
  {
    parameter: "Cruise Speed Sweetspot",
    piston: "Mach 0.15–0.30 (< 300 km/h)",
    turboprop: "Mach 0.40–0.60 (400–650 km/h)",
    turbojet: "Mach 1.2–2.5+ (Supersonic)",
    turbofan: "Mach 0.75–0.86 (Subsonic)",
    electric: "Mach 0.15–0.35 (< 350 km/h)"
  },
  {
    parameter: "Cruise Altitude",
    piston: "3,000–12,000 ft",
    turboprop: "15,000–28,000 ft",
    turbojet: "40,000–60,000 ft",
    turbofan: "33,000–43,000 ft",
    electric: "1,000–10,000 ft"
  },
  {
    parameter: "Specific Fuel Consumption (SFC)",
    piston: "0.45 lb/(hp·h)",
    turboprop: "0.40 lb/(shp·h)",
    turbojet: "1.10 lb/(lbf·h)",
    turbofan: "0.44–0.52 lb/(lbf·h)",
    electric: "0 direct fuel (180 Wh/seat-km)"
  },
  {
    parameter: "Propulsive Efficiency (η_p)",
    piston: "85% at low speeds",
    turboprop: "82–88% mid-speed",
    turbojet: "45% subsonic / 85% supersonic",
    turbofan: "78–84% transonic",
    electric: "88–92% across spectrum"
  },
  {
    parameter: "Power/Thrust-to-Weight",
    piston: "1.2–1.8 hp/kg",
    turboprop: "4.0–6.0 hp/kg",
    turbojet: "4:1 to 7:1 T/W",
    turbofan: "6:1 to 9:1 T/W",
    electric: "5.0–10.0 kW/kg motor only"
  },
  {
    parameter: "Acoustic Noise Profile",
    piston: "Moderate (Exhaust & Propeller)",
    turboprop: "High external (Blade tip pass)",
    turbojet: "Extreme (> 120 EPNdB)",
    turbofan: "Low (ICAO Chapter 14 compliant)",
    electric: "Ultra-Low (Community friendly)"
  },
  {
    parameter: "Primary Contemporary Use",
    piston: "Flight training & light aircraft",
    turboprop: "Regional airlines & tactical cargo",
    turbojet: "Supersonic fighters & missiles",
    turbofan: "Commercial airliners & business jets",
    electric: "Urban Air Mobility (eVTOL) & trainers"
  }
];
