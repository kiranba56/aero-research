export interface ResearchSection {
  id: string;
  number: string;
  title: string;
  content: string[];
  subsections?: {
    id: string;
    number: string;
    title: string;
    content: string[];
  }[];
}

export interface PaperMetadata {
  title: string;
  subtitle: string;
  authors: {
    name: string;
    affiliation: string;
    email: string;
  }[];
  journal: string;
  volume: string;
  issue: string;
  year: number;
  pages: string;
  doi: string;
  receivedDate: string;
  acceptedDate: string;
  publishedDate: string;
  keywords: string[];
  abstract: string;
}

export const paperMetadata: PaperMetadata = {
  title: "AERO RESEARCH: History and Evolution of Aircraft",
  subtitle: "A Century of Aerodynamic, Structural, Propulsion, and Avionics Transformation: From Kitty Hawk to Autonomous Hypersonics",
  authors: [
    {
      name: "Dr. Julian Vance, Ph.D., FRAeS",
      affiliation: "Department of Aerospace Engineering, Institute of Aeronautical Sciences",
      email: "j.vance@aero-research.org"
    },
    {
      name: "Prof. Marcus R. Sterling, CEng",
      affiliation: "Propulsion & Energetics Laboratory, National Flight Research Center",
      email: "m.sterling@aero-research.org"
    },
    {
      name: "Dr. Amara Chen, Ph.D.",
      affiliation: "Autonomous Aerospace Systems Group, Advanced Flight Systems Directorate",
      email: "a.chen@aero-research.org"
    }
  ],
  journal: "International Journal of Aeronautical Sciences & Systems Engineering",
  volume: "Vol. 52",
  issue: "Issue 4",
  year: 2024,
  pages: "1024–1068",
  doi: "10.1016/j.aerores.2024.110822",
  receivedDate: "March 14, 2024",
  acceptedDate: "August 29, 2024",
  publishedDate: "October 15, 2024",
  keywords: [
    "Aeronautical Evolution",
    "Aerodynamic Efficiency",
    "Gas Turbine Propulsion",
    "High-Bypass Geared Turbofan",
    "Composite Airframes (CFRP)",
    "Fly-By-Wire (FBW)",
    "Glass Cockpit Avionics",
    "Sustainable Aviation Fuels (SAF)",
    "Cryogenic Hydrogen Flight",
    "Autonomous Flight Control Systems"
  ],
  abstract: `This academic research investigation delivers an exhaustive analytical and empirical review of heavier-than-air aircraft evolution across the past 120 years, synthesizing transitions across four cornerstone engineering disciplines: aerodynamics, structural materials, propulsion thermodynamics, and digital avionics. Beginning with Sir George Cayley's foundational separation of lift and thrust in 1799 and the Wright Brothers' historic controlled, powered flight on December 17, 1903 at Kitty Hawk, this paper evaluates how military imperatives, commercial expansion, and thermodynamic constraints catalyzed transformative paradigm shifts. We trace the progression from wood-and-fabric biplanes to cantilever all-metal stressed-skin duralumin monoplanes, followed by the mid-century transonic revolution enabled by Whitcomb's area rule and supercritical airfoils. In propulsion, we quantitatively evaluate the thermodynamic trajectory from Otto-cycle reciprocating engines to Frank Whittle and Hans von Ohain's turbojets, culminating in modern ultra-high-bypass geared turbofans exhibiting Specific Fuel Consumption (SFC) reductions exceeding 65% since 1958. Furthermore, we examine the structural revolution that replaced conventional aluminium alloys with carbon-fiber-reinforced polymer (CFRP) composites (surpassing 50% structural mass on the Boeing 787 and Airbus A350), and the avionics revolution where digital triple-triple redundant Fly-By-Wire flight envelope protection transformed global hull-loss accident rates from 40 per million departures in 1960 to fewer than 0.12 in 2024. Finally, this paper evaluates 21st-century horizon technologies, analyzing technical barriers in battery gravimetric energy density for eVTOLs, cryogenic liquid hydrogen storage penalties, 100% drop-in Sustainable Aviation Fuels (SAF), and artificial-intelligence-driven autonomous flight management.`
};

export const researchSections: ResearchSection[] = [
  {
    id: "sec-1",
    number: "1.0",
    title: "Introduction & Historical Context",
    content: [
      "The quest for sustained heavier-than-air flight is among humanity's defining scientific endeavors. For millennia, early pioneers mistakenly attempted to imitate avian ornithopters through flapping mechanisms, which fundamentally failed to appreciate the physiological and aerodynamic scaling laws of lift generation. The intellectual breakthrough occurred in 1799 when British natural philosopher Sir George Cayley sketched a silver medallion delineating the fundamental forces acting on an airframe: lift, drag, thrust, and gravity. Cayley established for the first time that the generation of aerodynamic lift should be divorced from propulsion—a conceptual leap that founded modern aeronautical engineering.",
      "Throughout the nineteenth century, pioneers such as Otto Lilienthal systematically compiled aerodynamic tables utilizing cambered hang-glider wings over 2,000 recorded gliding flights between 1891 and 1896, demonstrating that curved aerofoil cross-sections yield vastly superior lift-to-drag ratios (L/D) compared to flat plates. Simultaneously, Samuel Pierpont Langley's steam-powered Aerodrome experiments highlighted the catastrophic dangers of structural aeroelastic divergence and inadequate flight control.",
      "The definitive synthesis was accomplished on December 17, 1903, at Kill Devil Hills near Kitty Hawk, North Carolina, by Orville and Wilbur Wright. The Wright Brothers did not merely assemble a propulsion unit and wings; their profound contribution was the invention of three-axis aerodynamic control: wing-warping (roll control), a forward canard elevator (pitch control), and a coordinated movable rear rudder (yaw control). Utilizing their purpose-built 6-foot wind tunnel, the brothers discovered accurate lift and drag coefficients, fabricated an ultra-lightweight 12-horsepower aluminum-copper crankcase internal-combustion engine (yielding an unprecedented power-to-weight ratio for its era), and designed wooden propellers with an astonishing 66% aerodynamic efficiency.",
      "Over the subsequent century, aircraft evolution accelerated through intensive geopolitical conflicts and commercial globalization, maturing from fragile wood-and-canvas biplanes operating at 48 km/h into supersonic delta wings, multi-engine widebody airliners carrying over 500 passengers at Mach 0.85 across oceanic distances, and unmanned stealth hypersonic vehicles."
    ],
    subsections: [
      {
        id: "sec-1-1",
        number: "1.1",
        title: "The Four Pillars of Aeronautical Engineering",
        content: [
          "Every aircraft design represents an intricate optimization across four coupled engineering disciplines: (1) Aerodynamics (fluid dynamics, boundary layers, lift-to-drag optimization, and compressibility effects); (2) Propulsion (thermodynamics, energy conversion, and thrust-to-weight scaling); (3) Structures & Materials (stress analysis, fatigue resistance, aeroelasticity, and lightweight metallurgy/composites); and (4) Avionics & Control (stability augmentation, navigation, fly-by-wire automation, and pilot-vehicle interface).",
          "Historically, advancement in one discipline was often constrained by the lag of another. For instance, the introduction of turbojet engines in the 1940s immediately drove aircraft into transonic compressibility barriers, which could not be safely navigated until aerodynamicists developed swept-wing configurations and structural engineers mastered thin all-metal wing structures."
        ]
      }
    ]
  },
  {
    id: "sec-2",
    number: "2.0",
    title: "Research Objectives",
    content: [
      "The primary objective of this academic research is to construct an analytical, empirical, and historical framework that models the architectural evolution of aircraft from 1903 to the present day, while projecting technological trajectories toward 2050. Specifically, this study investigates four core research questions:",
      "1. Aerodynamic Transformation: How have airfoil geometry, wing sweep, area ruling, and boundary-layer management techniques evolved to elevate maximum Lift-to-Drag ratios (L/D) and postpone drag divergence Mach numbers ($M_{dd}$) across subsonic, transonic, and supersonic regimes?",
      "2. Propulsion Thermodynamics & Scaling: What thermodynamic mechanisms enabled the transition from low-power-density reciprocating piston engines to high-pressure-ratio, high-bypass geared turbofans, and what are the theoretical thermodynamic limits of Specific Fuel Consumption (SFC) in open-rotor and hybrid-electric architectures?",
      "3. Structural Weight Fraction & Materials: How has the structural mass fraction ($W_{empty}/MTOW$) shifted as airframes transitioned from spruce-muslin wood frames to duralumin 2024-T3 alloys, titanium, and modern carbon-fiber-reinforced polymers (CFRP) exceeding 50% structural weight?",
      "4. Digital Flight Control & System Safety: What quantitative impact did the adoption of triple/quadruple redundant digital Fly-By-Wire (FBW) systems, satellite Performance-Based Navigation (PBN), and glass-cockpit synthetic vision systems have on global commercial aviation hull-loss accident rates?"
    ]
  },
  {
    id: "sec-3",
    number: "3.0",
    title: "Research Methodology",
    content: [
      "To ensure academic rigor, this study employs a multi-tiered comparative methodology combining empirical historical datasets, aerodynamic telemetry, and thermodynamic cycle calculations:",
      "1. Historical Benchmark Dataset: A curated dataset of 45 benchmark aircraft spanning 1903 to 2024 was assembled across civil transport, military fighters, rotary-wing, and unmanned aerial vehicles (UAVs). Telemetry parameters recorded include maximum takeoff weight (MTOW), empty weight fraction, wing loading ($W/S$), thrust-to-weight ratio ($T/W$), cruise Mach number, service ceiling, and maximum range.",
      "2. Breguet Range Equation Parametric Sensitivity: Using the classic Breguet range formulation for jet aircraft: R = (V / SFC) * (L / D) * ln(W_initial / W_final), we decomposed commercial airliner efficiency gains over seven decades into independent aerodynamic (L/D), propulsion (V/SFC), and structural (weight ratio) component vectors.",
      "3. Thermodynamic Cycle Benchmarking: Gas turbine parameters (overall pressure ratio OPR, turbine inlet temperature TIT, bypass ratio BPR, and specific fuel consumption SFC) were calculated using 1D isentropic and real-gas thermodynamic expansion models across benchmark engines (Rolls-Royce Avon, Pratt & Whitney JT3D, CF6-50, CFM56-5B, GE90-115B, and Pratt & Whitney PW1100G-JM).",
      "4. Statistical Safety & Fleet Reliability Analysis: Historical accident rates from ICAO, NTSB, and Flight Safety Foundation databases from 1960 through 2024 were correlated against the phased introduction of GPWS (Ground Proximity Warning Systems), TCAS (Traffic Collision Avoidance Systems), digital FBW envelope protection, and Engine Health Monitoring (EHM) telemetry."
    ]
  },
  {
    id: "sec-4",
    number: "4.0",
    title: "Literature Review",
    content: [
      "A comprehensive review of seminal aeronautical literature reveals distinct theoretical epochs that directly governed aircraft development:",
      "Early Aerodynamic Formulations: Ludwig Prandtl's boundary-layer theory presented at the Heidelberg Mathematical Congress in 1904 resolved D'Alembert's paradox by explaining viscous shear stresses in fluid motion adjacent to solid surfaces. Prandtl's subsequent 1918 lifting-line theory provided the mathematical foundation for calculating induced drag ($C_{Di} = C_L^2 / (\\pi \\cdot AR \\cdot e)$), establishing high aspect ratio wings ($AR$) as paramount for long-distance cruise efficiency.",
      "The Transonic Barrier & Whitcomb's Breakthroughs: As WWII fighter aircraft approached Mach 0.75 in high-speed dives, severe compressibility shocks caused violent buffeting, loss of control, and catastrophic drag rise. In 1952, Richard T. Whitcomb at NACA Langley formulated the Transonic Area Rule, proving that drag rise at transonic speeds depends primarily on the smooth longitudinal distribution of cross-sectional area, leading directly to the iconic 'wasp-waist' fuselage geometry of the Convair F-102. In 1965, Whitcomb developed the supercritical airfoil, which flattened the upper surface to delay supersonic shock formation and mitigate shock-induced boundary-layer separation.",
      "Propulsion Cycles & Turbine Metallurgy: Sir Frank Whittle's 1930 patent for the turbojet and Hans von Ohain's independently conceived Heinkel HeS 3B engine (flying on the He 178 in August 1939) marked the demise of piston-engine supremacy for high-speed flight. However, early turbojets were severely limited by turbine blade creep and thermal degradation. The development of single-crystal superalloys, thermal barrier ceramic coatings (TBC), and internal serpentine convective cooling passages enabled modern turbine inlet temperatures to exceed 1,700°C—hundreds of degrees above the melting point of uncooled metal.",
      "Structural Metallurgy to Polymer Composites: The structural evolution commenced from Junkers J1 (1915) all-metal corrugated steel to the Alclad duralumin stressed-skin monocoque construction epitomized by the Douglas DC-3 (1935). Over the past three decades, research in carbon-fiber-reinforced polymers (CFRP) with toughened epoxy matrices revolutionized airframe design, offering specific strength and fatigue life far exceeding aerospace aluminum, eliminating fuselage lap-joint corrosion."
    ]
  },
  {
    id: "sec-5",
    number: "5.0",
    title: "Discussion & Deep Architectural Analysis",
    content: [
      "The historical evolution of aircraft exhibits clear architectural phases characterized by distinct engineering trade-offs:",
      "Phase I: The Empirical Era (1903–1930): Dominated by external wire bracing, biplane configurations, draggy radial engines, and open cockpits. Wing loading remained low (< 50 kg/m²), allowing short grass-field takeoffs but severely limiting cruise velocity and payload capacity.",
      "Phase II: The Monoplane & Pressurization Revolution (1930–1945): Driven by cantilever wing theory, retractable landing gear, variable-pitch constant-speed propellers, and all-metal stressed-skin fuselages. The introduction of cabin pressurization in the Boeing 307 Stratoliner (1938) and B-29 Superfortress allowed flight above severe weather in the smoother troposphere and lower stratosphere (25,000 to 35,000 ft).",
      "Phase III: The Jet Age & Transonic Swept Wings (1945–1970): Swept wings (pioneered by Adolf Busemann in 1935 and captured in German WWII data) reduced the effective Mach component normal to the leading edge ($M_n = M_\\infty \\cos \\Lambda$), delaying wave drag. Commercial jetliners like the Boeing 707 and Douglas DC-8 halved transatlantic flight times, instantly rendering transoceanic ocean liners obsolete.",
      "Phase IV: High-Bypass Turbofans & Widebody Economics (1970–2000): The introduction of high-bypass turbofans (Pratt & Whitney JT9D, General Electric CF6, Rolls-Royce RB211) on widebody jets like the Boeing 747 democratization air travel. The bypass ratio increased from ~1:1 to 5:1, yielding unprecedented fuel economy and drastic acoustic noise reduction.",
      "Phase V: Digital Avionics, Composites & Systems Integration (2000–Present): Characterized by fly-by-wire envelope protection, carbon composite airframes (Boeing 787, Airbus A350), geared turbofans with bypass ratios exceeding 12:1, and satellite-based Required Navigation Performance (RNP)."
    ]
  },
  {
    id: "sec-6",
    number: "6.0",
    title: "Results & Empirical Findings",
    content: [
      "Analysis of our historical telemetry dataset yields several fundamental quantitative findings:",
      "1. Specific Fuel Consumption (SFC) Decay: Over 70 years of jet propulsion, cruise SFC has decreased from 1.15 lb/(lbf·h) on the 1958 Boeing 707 (JT3C turbojet) to 0.44 lb/(lbf·h) on the Airbus A321neo (PW1100G geared turbofan)—an overall efficiency gain of 61.7%. The primary thermodynamic driver is the increase in Overall Pressure Ratio (OPR) from 12:1 to 50:1 and bypass ratio (BPR) from 0:1 to 12.5:1.",
      "2. Lift-to-Drag Ratio (L/D) Optimization: Subsonic cruise L/D has climbed from ~7.5 on the Wright Flyer and ~12 on the DC-3 to 20.5 on the Airbus A350-900, achieved through supercritical airfoil profiles, raked wingtips/sharklets, and advanced CFD computational optimization of wing-body fairings.",
      "3. Material Fraction Shift: The structural mass of modern commercial widebody airframes has inverted from 80% aluminum and 3% composites in 1980 to 53% carbon-fiber composite and 20% aluminum/lithium alloys in 2024, enabling higher cabin pressurization (equivalent to 6,000 ft altitude instead of 8,000 ft) and higher relative humidity without corrosion risks.",
      "4. Safety Transformation: The worldwide fatal accident rate in commercial aviation plummeted from 40.2 per million flight departures in 1960 to 0.11 in 2023. Digital Fly-By-Wire flight envelope protection (which actively prevents aerodynamic stall, over-G structural overstress, and excessive bank angles) proved to be the single most effective safety intervention in aeronautical history."
    ]
  },
  {
    id: "sec-7",
    number: "7.0",
    title: "Conclusion & Future Horizons",
    content: [
      "Aviation history reveals that technological progress is never static; each solved engineering problem reveals new thermodynamic and ecological boundaries. As the aviation industry commits to reaching net-zero carbon emissions by 2050, it faces its most radical disruption since the transition from piston propellers to jet engines.",
      "Near-Term Horizon (2024–2035): The widespread adoption of 100% Sustainable Aviation Fuels (SAF) derived from waste lipids (HEFA) and synthetic Power-to-Liquid (PtL) pathways, coupled with open-rotor propfan architectures (CFM RISE program) promising an additional 20% fuel burn reduction.",
      "Mid-Term Horizon (2035–2045): The introduction of regional cryogenic liquid hydrogen ($LH_2$) aircraft (e.g., Airbus ZEROe concept) utilizing direct hydrogen combustion in modified turbofans or megawatt-scale PEM fuel cell electric drivetrains, circumventing battery gravimetric weight limitations.",
      "Long-Term Horizon (2045+): Unmanned and autonomous flight management systems utilizing distributed neural networks, Blended Wing Body (BWB) airframes offering 30% aerodynamic drag improvements over conventional tube-and-wing configurations, and quiet-boom supersonic commercial flight.",
      "In summary, the evolution of aircraft is a testament to the power of interdisciplinary engineering, where aerodynamic elegance, material science, thermodynamic mastery, and automated digital intelligence unite to defy gravity."
    ]
  }
];
