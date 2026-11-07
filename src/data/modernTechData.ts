export interface ModernTechTopic {
  id: string;
  title: string;
  category: string;
  iconName: string;
  tagline: string;
  overview: string;
  corePrinciples: {
    heading: string;
    description: string;
  }[];
  engineeringImpact: string[];
  keyAircraftAdopters: string[];
  schematicDescription: string;
  imageUrl: string;
}

export const modernTechDataset: ModernTechTopic[] = [
  {
    id: "tech-aerodynamics",
    title: "Advanced Aerodynamics & Wing Design",
    category: "Fluid Dynamics & Computational Aerodynamics",
    iconName: "Wind",
    tagline: "Shaping airflows to delay transonic shockwaves and maximize Lift-to-Drag ratio",
    overview: "Aerodynamics transitioned from empirical wind-tunnel testing to high-fidelity Reynolds-Averaged Navier-Stokes (RANS) Computational Fluid Dynamics (CFD). Modern transport aircraft feature supercritical airfoils with flattened upper surfaces that push the drag divergence Mach number (Mdd) higher, complemented by biomimetic winglets that dissipate high-energy tip vortices.",
    corePrinciples: [
      {
        heading: "Supercritical Airfoil Profiles",
        description: "Standard subsonic airfoils accelerate airflow over their curved upper surface to supersonic speeds at Mach 0.72, generating strong shock waves that cause severe boundary-layer separation. Supercritical airfoils feature a flattened upper camber and pronounced aft camber, weakening shock waves and delaying shock-induced boundary layer separation until Mach 0.85+."
      },
      {
        heading: "Wingtip Devices (Winglets & Sharklets)",
        description: "High-pressure air from the wing underside naturally curls around the wingtip to the low-pressure upper surface, generating intense rotating wingtip vortices. Winglets, sharklets, and raked wingtips act as aerodynamic vertical sails, diffusing these vortices into smaller swirling eddies and converting vortex energy into a forward-acting thrust component, saving 3–5% fuel."
      },
      {
        heading: "Laminar Flow & Boundary Layer Control",
        description: "Natural Laminar Flow (NLF) and Hybrid Laminar Flow Control (HLFC) utilize microscopic suction holes on the wing leading edge to delay transition from low-drag laminar boundary layers to high-friction turbulent layers, potentially reducing skin friction drag by up to 15%."
      }
    ],
    engineeringImpact: [
      "Elevated cruise Lift-to-Drag (L/D) ratios from 12:1 on early airliners to 20.5:1 on the Airbus A350-900",
      "Saved billions of gallons of aviation jet fuel annually through fleet-wide winglet retrofits",
      "Allowed aircraft to cruise faster (Mach 0.85) without suffering steep transonic drag divergence"
    ],
    keyAircraftAdopters: ["Airbus A350 XWB", "Boeing 787 Dreamliner", "Airbus A320neo", "Boeing 777X (folding raked wingtips)"],
    schematicDescription: "Transonic shockwave mitigation: Comparison showing standard NACA 4-digit airfoil with strong shock vs supercritical airfoil with diffused transonic recompression.",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "tech-composites",
    title: "Composite Materials & Advanced Metallurgy",
    category: "Structural Mechanics & Materials Science",
    iconName: "Layers",
    tagline: "Replacing heavy aluminum with featherweight, fatigue-immune carbon fiber polymers",
    overview: "Modern airframes have shifted from riveted aluminum sheet-metal construction to advanced carbon-fiber-reinforced polymers (CFRP), glass-reinforced aluminum laminates (GLARE), and high-strength titanium aluminides. Today's premier widebodies (Boeing 787 and Airbus A350) are composed of over 50% composite materials by weight.",
    corePrinciples: [
      {
        heading: "Carbon-Fiber Reinforced Polymers (CFRP)",
        description: "Microscopic carbon filaments (5–10 μm diameter) woven into multidirectional fabrics and embedded in toughened epoxy matrices. CFRP provides an exceptional strength-to-weight ratio (4–5 times stronger than aerospace aluminum at 60% of the weight) and exhibits zero vulnerability to electrochemical oxidation (corrosion) or cyclic metal fatigue."
      },
      {
        heading: "One-Piece Barrel Automated Fiber Placement (AFP)",
        description: "Rather than riveting thousands of individual aluminum sheets together with tens of thousands of holes, robotic AFP heads wind continuous carbon tape around giant rotating mandrels to cure complete, seamless one-piece fuselage barrels in pressurized autoclaves."
      },
      {
        heading: "Cabin Environment Physiological Benefits",
        description: "Because carbon fiber does not corrode in humid environments, composite airliners can safely maintain 15–18% relative cabin humidity (compared to 4% on aluminum aircraft) and withstand higher internal pressure differential, permitting a 6,000 ft cabin altitude equivalent for drastically reduced passenger fatigue and dehydration."
      }
    ],
    engineeringImpact: [
      "Over 20% overall airframe empty weight reduction compared to conventional aluminum designs",
      "Doubling of structural heavy maintenance inspection intervals from 6 years to 12 years",
      "Elimination of catastrophic fuselage corrosion and multi-site fatigue cracking (MSD)"
    ],
    keyAircraftAdopters: ["Boeing 787 Dreamliner (50% CFRP)", "Airbus A350 XWB (53% CFRP)", "Bombardier Global 7500", "Airbus A220"],
    schematicDescription: "Material distribution breakdown illustrating carbon fiber fuselage barrels, titanium landing gear trunnions, and aluminum-lithium wing skins.",
    imageUrl: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "tech-fly-by-wire",
    title: "Digital Fly-By-Wire & Flight Envelope Protection",
    category: "Flight Control & Cybernetics",
    iconName: "Cpu",
    tagline: "Replacing mechanical steel cables with redundant microprocessors and smart envelope limits",
    overview: "Fly-By-Wire (FBW) replaces heavy mechanical cables, pulleys, and torque tubes with electronic wiring and digital flight control computers (FCCs). Pilot control stick inputs are converted into digital commands that computers interpret, cross-check against aerodynamic safety margins, and route to electro-hydraulic actuators at the control surfaces.",
    corePrinciples: [
      {
        heading: "Flight Envelope Protection (Hard Laws)",
        description: "The digital computers continuously calculate instantaneous angle of attack (AoA), pitch rate, airspeed, and G-loading. In Airbus 'Normal Law', the computer will physically refuse to allow the aircraft to stall, over-G (+2.5g max / -1.0g min), or exceed 67° of bank angle, regardless of how forcefully the pilot pulls the sidestick."
      },
      {
        heading: "Fault-Tolerant Dissimilar Redundancy",
        description: "To eliminate single points of failure, modern FBW architectures use multi-lane redundancy (e.g., Airbus uses ELAC, SEC, and FAC computers; Boeing uses triple-triple redundant Primary Flight Computers). Critical software lanes are written by separate engineering teams using different compilers and microprocessors to prevent common-mode software bugs."
      },
      {
        heading: "Relaxed Static Stability (RSS)",
        description: "Conventional aircraft require natural aerodynamic static stability, which creates a downforce on the horizontal tail and incurs significant 'trim drag'. FBW computers can stabilize an aerodynamically unstable or neutral airframe in real-time, drastically reducing trim drag and tailplane size."
      }
    ],
    engineeringImpact: [
      "Eliminated aerodynamic stall-spin accidents on transport aircraft under normal flight laws",
      "Shed hundreds of kilograms of heavy steel push-pull rods, pulleys, and bellcranks",
      "Pioneered side-stick cockpit layouts, freeing space for pull-out pilot worktables and displays"
    ],
    keyAircraftAdopters: ["Airbus A320 / A330 / A350 / A380", "Boeing 777 / 787", "Dassault Falcon 8X", "F-16 Fighting Falcon (first analog FBW fighter)"],
    schematicDescription: "Digital signal routing from sidestick through dual-channel Flight Control Computers (FCC) to electro-hydrostatic actuators on ailerons, elevators, and rudder.",
    imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "tech-gps-cns-atm",
    title: "Satellite Navigation (GNSS) & NextGen CNS/ATM",
    category: "Avionics, Satellite Navigation & Air Traffic Management",
    iconName: "Satellite",
    tagline: "Transitioning from ground-based beacons to satellite precision Required Navigation Performance",
    overview: "Aviation has transitioned from legacy ground-based radio beacons (VOR/DME, NDB) to space-based Global Navigation Satellite Systems (GNSS: GPS, Galileo, GLONASS). Augmented by satellite-based augmentation systems (SBAS/WAAS) and ADS-B Out broadcasts, modern aircraft fly curved, continuous-descent satellite routes with centimeter-level positional accuracy.",
    corePrinciples: [
      {
        heading: "Performance-Based Navigation (PBN & RNP)",
        description: "Required Navigation Performance (RNP) mandates that an aircraft remain within a precise lateral corridor (e.g., RNP 0.1 nautical miles = 185 meters) 95% of the time, with automated onboard performance monitoring and alerting. This allows curved RNP Authorization Required (AR) approaches between mountain peaks in zero visibility (e.g., Queenstown, Innsbruck)."
      },
      {
        heading: "ADS-B (Automatic Dependent Surveillance-Broadcast)",
        description: "Rather than relying on spinning ground radar dishes, aircraft broadcast their satellite-derived GPS position, altitude, airspeed, and heading twice per second via 1090 MHz Mode S transponders directly to air traffic control and neighboring aircraft."
      },
      {
        heading: "Continuous Descent Operations (CDO)",
        description: "Replaces traditional fuel-inefficient 'stepped descents' with continuous idle-thrust glides from cruising altitude all the way to runway touchdown, saving hundreds of kilograms of fuel and slashing community noise around airports."
      }
    ],
    engineeringImpact: [
      "Safe parallel runways and reduced aircraft separation minimums from 5 miles to 2.5 miles",
      "Ability to land in mountainous terrain and low-visibility weather with zero ground radar infrastructure",
      "Saves airlines millions of flight miles annually via direct point-to-point Great Circle routing"
    ],
    keyAircraftAdopters: ["Global civil aviation fleet compliant with FAA & EASA ADS-B mandates", "Boeing 737 MAX", "Airbus A321XLR"],
    schematicDescription: "GPS constellation transmitting timing signals to aircraft Multi-Mode Receiver (MMR), cross-linked to ADS-B Out transponder and ATC ground station.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "tech-fms",
    title: "Digital Flight Management Systems (FMS)",
    category: "Autonomous Guidance, Navigation & Performance Automation",
    iconName: "Compass",
    tagline: "The central flight brain optimizing 4D trajectory, fuel burn, and automated flight plans",
    overview: "The Flight Management System (FMS) is the integrated computational heart of modern commercial aircraft. Combining a worldwide aeronautical navigation database with real-time aircraft performance models, the FMS computes optimal lateral (LNAV) and vertical (VNAV) paths, predicts fuel consumption, and commands the autopilot and autothrottle with second-by-second accuracy.",
    corePrinciples: [
      {
        heading: "Cost Index (CI) Optimization",
        description: "The airline inputs a Cost Index number (CI = Time Cost per hour / Fuel Cost per kg). The FMS algorithm instantly balances flight crew wages and maintenance costs against jet fuel expenses, dynamically solving the Euler-Lagrange equations to calculate the exact most economical cruise Mach number and step-climb profile."
      },
      {
        heading: "4D Trajectory-Based Operations (TBO)",
        description: "Modern FMS computes 4D trajectories: latitude, longitude, altitude, and Time of Arrival (RTA). Air traffic management can assign a Required Time of Arrival down to within 10 seconds at a metering fix 2,000 miles ahead, eliminating circling holding patterns at congested airports."
      },
      {
        heading: "Integrated Engine Health & Takeoff Performance",
        description: "Calculates precise V-speeds (V1 decision speed, VR rotation, V2 climb safety speed) and Assumed Temperature / Derate thrust calculations based on runway length, temperature, pressure altitude, and wind, saving engine turbine life by avoiding unnecessary full-power takeoffs."
      }
    ],
    engineeringImpact: [
      "Reduced cockpit crew workload from three (Captain, First Officer, Flight Engineer) down to two pilots",
      "Eliminated holding patterns and optimized fuel reserves through accurate arrival timing",
      "Extended engine on-wing lifespan by 30% through calculated derated takeoff thrust profiles"
    ],
    keyAircraftAdopters: ["Honeywell & Thales FMS across all modern Airbus, Boeing, Bombardier, and Embraer airliners"],
    schematicDescription: "FMS architecture integrating Dual FMCs, Control Display Units (CDU), Air Data Inertial Reference System (ADIRS), and Autopilot Flight Director System (AFDS).",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "tech-glass-cockpit",
    title: "Advanced Glass Cockpit, HUD & Synthetic Vision",
    category: "Cockpit Ergonomics, Human Factors & Sensor Fusion",
    iconName: "Monitor",
    tagline: "Replacing a wall of mechanical gauges with panoramic displays, Head-Up Displays, and 3D terrain",
    overview: "Cockpit design evolved from an overwhelming matrix of over 100 analog dial gauges into clean, widescreen active-matrix liquid crystal and OLED displays. Pilots interact with Primary Flight Displays (PFD), Navigation Displays (ND), Head-Up Displays (HUD), and Synthetic Vision Systems (SVS) that project 3D photorealistic virtual terrain through pitch-black darkness and dense fog.",
    corePrinciples: [
      {
        heading: "Primary Flight Display (PFD) & Attitude Director",
        description: "Synthesizes artificial horizon, pitch ladder, indicated airspeed tape, altitude tape, vertical speed indicator, and autopilot flight modes into a single unified visual scan area directly in the pilot's primary field of view."
      },
      {
        heading: "Head-Up Display (HUD)",
        description: "A holographic combiner glass positioned at pilot eye-level projects critical flight telemetry (airspeed, altitude, flight path vector, runway outline) focused at optical infinity, allowing pilots to fly manual approaches down to Category III zero-visibility minimums without glancing down at instruments."
      },
      {
        heading: "Enhanced Vision Systems (EVS & SVS)",
        description: "Forward-looking infrared (FLIR) sensors detect heat radiation to see runway lighting, terrain, and runway incursions through fog and nocturnal darkness. Simultaneously, Synthetic Vision Systems (SVS) render a computer-generated 3D terrain map derived from satellite topographic elevation databases."
      }
    ],
    engineeringImpact: [
      "Drastically slashed Controlled Flight Into Terrain (CFIT) accidents—formerly the #1 cause of fatal crashes",
      "Eliminated pilot spatial disorientation and vestibular sensory illusions during night and instrument meteorological conditions (IMC)",
      "Streamlined human-machine interface with touchscreens, electronic flight bags (EFB), and paperless cockpits"
    ],
    keyAircraftAdopters: ["Boeing 787 / 777X (dual HUD standard)", "Airbus A350 (six 15-inch panoramic screens)", "Gulfstream G700 (Symmetry Flight Deck)", "Garmin G3000 / G5000"],
    schematicDescription: "Glass cockpit layout displaying primary flight instruments, 3D terrain synthetic vision wireframe, and Head-Up Display flight path vector.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
  }
];
