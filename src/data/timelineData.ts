export interface TimelineEvent {
  id: string;
  year: number | string;
  exactDate?: string;
  title: string;
  era: 'Pioneers (1804–1903)' | 'Dawn & WWI (1903–1918)' | 'Golden Age (1919–1938)' | 'WWII & Jet Dawn (1939–1945)' | 'Cold War & Jet Age (1946–1975)' | 'Digital & Composites (1976–2010)' | 'Next-Gen & Future (2011+)';
  category: 'Milestone' | 'Civil' | 'Military' | 'Experimental';
  aircraftName?: string;
  summary: string;
  details: string[];
  keySpecs?: {
    speed?: string;
    wingspan?: string;
    propulsion?: string;
    significance?: string;
  };
  imageUrl: string;
  imageCaption: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "tl-cayley",
    year: 1804,
    exactDate: "1804",
    title: "Sir George Cayley: The Father of Aeronautics",
    era: "Pioneers (1804–1903)",
    category: "Experimental",
    aircraftName: "Cayley Model Glider",
    summary: "Sir George Cayley establishes the fundamental principles of heavier-than-air flight, separating aerodynamic lift from propulsion for the first time in history.",
    details: [
      "Designed the world's first successful model glider in 1804 with a fixed cambered kite wing and cruciform movable tail unit.",
      "Identified the four governing forces: lift, weight, thrust, and drag.",
      "Published his seminal three-part treatise 'On Aerial Navigation' in Nicholson's Journal (1809–1810), laying the mathematical groundwork for modern aeronautics."
    ],
    keySpecs: {
      speed: "15 km/h (glider)",
      wingspan: "1.5 m",
      propulsion: "Unpowered / Gravity glider",
      significance: "First documented separation of lift and propulsion"
    },
    imageUrl: "https://images.unsplash.com/photo-1517976487502-5f715d376453?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Conceptual visualization of early gliding aerodynamic experiments based on Cayley's cambered wing geometry."
  },
  {
    id: "tl-lilienthal",
    year: 1891,
    exactDate: "1891–1896",
    title: "Otto Lilienthal: The Glider Pioneer",
    era: "Pioneers (1804–1903)",
    category: "Experimental",
    aircraftName: "Lilienthal Derwitzer / Normal Glider",
    summary: "German engineer Otto Lilienthal conducts over 2,000 controlled hang-glider flights from artificial hills, publishing the first reliable lift tables for cambered airfoils.",
    details: [
      "Demonstrated that cambered (curved) surfaces produce significantly higher lift than flat surfaces, publishing 'Birdflight as the Basis of Aviation' (1889).",
      "Invented the weight-shift method of aerodynamic control.",
      "His published aerodynamic data directly inspired Wilbur and Orville Wright to embark on their own aeronautical quest."
    ],
    keySpecs: {
      speed: "25–35 km/h",
      wingspan: "6.7 m",
      propulsion: "Human weight-shift glider",
      significance: "First systematic empirical aerodynamic data published"
    },
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Archival representation of nineteenth-century aerodynamic gliding trials."
  },
  {
    id: "tl-wright-flyer",
    year: 1903,
    exactDate: "December 17, 1903",
    title: "The Wright Brothers: First Controlled, Powered Flight",
    era: "Dawn & WWI (1903–1918)",
    category: "Milestone",
    aircraftName: "Wright Flyer I",
    summary: "Orville and Wilbur Wright achieve the first controlled, sustained, powered, heavier-than-air flight at Kill Devil Hills, Kitty Hawk, North Carolina.",
    details: [
      "The first flight lasted 12 seconds, traversing 120 feet (37 meters) over wind-swept sand dunes, piloted by Orville Wright.",
      "Invented 3-axis control: wing-warping (roll), forward canard elevator (pitch), and coupled vertical rudder (yaw).",
      "Constructed a custom 12-hp water-cooled aluminum alloy block engine weighing only 82 kg.",
      "Engineered high-efficiency twin pusher wooden counter-rotating propellers achieving an astonishing 66% efficiency."
    ],
    keySpecs: {
      speed: "48 km/h (30 mph)",
      wingspan: "12.3 m (40.3 ft)",
      propulsion: "Wright 4-cylinder 12 hp piston engine",
      significance: "First controlled, sustained, powered heavier-than-air flight"
    },
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Historic commemorative staging of the Wright Flyer aerodynamic architecture at Kitty Hawk."
  },
  {
    id: "tl-bleriot",
    year: 1909,
    exactDate: "July 25, 1909",
    title: "Louis Blériot Crosses the English Channel",
    era: "Dawn & WWI (1903–1918)",
    category: "Milestone",
    aircraftName: "Blériot XI",
    summary: "French aviator Louis Blériot flies 38 km across the English Channel from Calais to Dover in 36 minutes, proving the practical viability of cross-border aviation.",
    details: [
      "Popularized the tractor monoplane layout (engine in front, single wing, rear tail control surfaces), which became the archetype for modern aviation.",
      "Powered by an innovative 25-horsepower three-cylinder Anzani W-fan radial engine.",
      "Demonstrated that natural geographic barriers (seas and mountains) could be easily crossed by aircraft."
    ],
    keySpecs: {
      speed: "75 km/h",
      wingspan: "7.8 m",
      propulsion: "Anzani 3-cylinder 25 hp",
      significance: "First overseas international flight"
    },
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Classic tractor propeller layout establishing the standard monoplane aircraft design."
  },
  {
    id: "tl-ww1-fighters",
    year: 1917,
    exactDate: "1914–1918",
    title: "WWI Military Acceleration: Fokker Dr.I & Camel",
    era: "Dawn & WWI (1903–1918)",
    category: "Military",
    aircraftName: "Fokker Dr.I / Sopwith Camel",
    summary: "World War I accelerates aeronautical evolution from recreational novelty into tactical air power, introducing synchronization gears, rotary engines, and dogfighting.",
    details: [
      "Anthony Fokker introduced the mechanical interrupter gear, allowing machine guns to fire through the spinning propeller arc without striking the blades.",
      "Rotary engines like the Clerget 9B spun their cylinders around a fixed crankshaft for enhanced air cooling.",
      "Hugo Junkers developed the Junkers J1 in 1915—the world's first all-metal cantilever monoplane, eliminating external drag-producing struts."
    ],
    keySpecs: {
      speed: "185 km/h",
      wingspan: "7.2 m",
      propulsion: "Oberursel Ur.II rotary 110 hp",
      significance: "All-metal construction & combat synchronization technology"
    },
    imageUrl: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f1?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Restored vintage military biplane displaying wooden propeller and structural wire bracing."
  },
  {
    id: "tl-lindbergh",
    year: 1927,
    exactDate: "May 20–21, 1927",
    title: "Charles Lindbergh's Solo Transatlantic Flight",
    era: "Golden Age (1919–1938)",
    category: "Civil",
    aircraftName: "Spirit of St. Louis (Ryan NYP)",
    summary: "Charles Lindbergh completes the first solo non-stop transatlantic flight from New York to Paris, covering 5,800 km in 33.5 hours, sparking global commercial interest.",
    details: [
      "Custom-built monoplane optimized purely for fuel capacity; carried 1,705 liters of gasoline in a forward fuselage tank that blocked the pilot's forward vision, requiring a periscope.",
      "Powered by the ultra-reliable 223-hp Wright Whirlpool J-5C radial air-cooled engine.",
      "The 'Lindbergh Boom' led to a 300% increase in U.S. airline passenger traffic within three years."
    ],
    keySpecs: {
      speed: "175 km/h cruise",
      wingspan: "14.0 m",
      propulsion: "Wright J-5C Whirlwind radial 223 hp",
      significance: "First solo non-stop transatlantic flight"
    },
    imageUrl: "https://images.unsplash.com/photo-1583071299210-c6c113f4cb91?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Historic radial-engine monoplane illustrating the endurance designs of the Golden Age."
  },
  {
    id: "tl-dc3",
    year: 1935,
    exactDate: "December 17, 1935",
    title: "Douglas DC-3: The Birth of Commercial Air Travel",
    era: "Golden Age (1919–1938)",
    category: "Civil",
    aircraftName: "Douglas DC-3 / C-47 Skytrain",
    summary: "The Douglas DC-3 revolutionizes passenger aviation as the first airliner capable of making a profit carrying passengers alone without airmail subsidies.",
    details: [
      "Featured an all-metal stressed-skin Alclad duralumin monocoque fuselage, cantilever wings, and retractable landing gear.",
      "Equipped with twin 1,200 hp Pratt & Whitney R-1830 Twin Wasp radial engines, cruising comfortably at 330 km/h with 21 passengers.",
      "Over 16,000 were built across civil and military C-47 variants, transforming global logistics and airline networks."
    ],
    keySpecs: {
      speed: "333 km/h (207 mph)",
      wingspan: "29.0 m (95 ft)",
      propulsion: "2x Pratt & Whitney R-1830 (1,200 hp each)",
      significance: "First economically self-sustaining commercial airliner"
    },
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Polished aluminum twin-engine Douglas transport showcasing the stressed-skin monocoque structure."
  },
  {
    id: "tl-he-178-me262",
    year: 1939,
    exactDate: "August 27, 1939",
    title: "The Dawn of Jet Propulsion: He 178 & Me 262",
    era: "WWII & Jet Dawn (1939–1945)",
    category: "Milestone",
    aircraftName: "Heinkel He 178 / Messerschmitt Me 262",
    summary: "Erich Warsitz pilots the world's first turbojet flight in the Heinkel He 178, inaugurating the Jet Age and shattering previous piston-engine performance boundaries.",
    details: [
      "The He 178 was powered by Hans von Ohain's HeS 3B centrifugal-flow turbojet delivering 1,100 lbf of thrust.",
      "Sir Frank Whittle in Britain independently developed the W.1 turbojet, powering the Gloster E.28/39 in May 1941.",
      "In 1944, the Messerschmitt Me 262 Schwalbe entered combat as the first operational jet fighter, featuring 18.5° swept wings and twin Junkers Jumo 004 axial-flow turbojets, cruising at 900 km/h."
    ],
    keySpecs: {
      speed: "900 km/h (559 mph) - Me 262",
      wingspan: "12.6 m",
      propulsion: "2x Junkers Jumo 004B axial turbojets",
      significance: "First turbojet flight and first operational combat jet"
    },
    imageUrl: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Early jet airframe aerodynamic silhouette showing swept-wing geometry."
  },
  {
    id: "tl-bell-x1",
    year: 1947,
    exactDate: "October 14, 1947",
    title: "Chuck Yeager Breaks the Sound Barrier in Bell X-1",
    era: "Cold War & Jet Age (1946–1975)",
    category: "Milestone",
    aircraftName: "Bell X-1 (Glamorous Glennis)",
    summary: "Captain Charles 'Chuck' Yeager shatters the sound barrier in level flight aboard the rocket-powered Bell X-1, reaching Mach 1.06 (1,127 km/h) over Rogers Dry Lake.",
    details: [
      "Dispelled the popular myth of an impassable 'sound wall', proving supersonic flight was aerodynamically achievable.",
      "Shaped like a Browning .50-caliber machine gun bullet, known to be aerodynamically stable at supersonic velocities.",
      "Utilized an all-moving horizontal stabilizer ('flying tail') to maintain longitudinal pitch control during transonic shock-wave passage.",
      "Powered by a Reaction Motors XLR11 four-chamber liquid-oxygen and ethyl alcohol rocket engine."
    ],
    keySpecs: {
      speed: "Mach 1.06 (1,127 km/h) at 43,000 ft",
      wingspan: "8.5 m",
      propulsion: "Reaction Motors XLR11-E-8 (6,000 lbf)",
      significance: "First manned supersonic flight in level flight"
    },
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Rocket research airframe designed for exploring transonic and supersonic compressibility."
  },
  {
    id: "tl-boeing-707",
    year: 1958,
    exactDate: "October 26, 1958",
    title: "Boeing 707 & Pan Am: The Commercial Jet Age",
    era: "Cold War & Jet Age (1946–1975)",
    category: "Civil",
    aircraftName: "Boeing 707-120",
    summary: "Pan American World Airways inaugurates transatlantic Boeing 707 passenger service from New York to Paris, shrinking the globe and initiating modern international travel.",
    details: [
      "Swept 35-degree wings with four podded Pratt & Whitney JT3C turbojet engines suspended beneath pylons, isolating vibration and fire hazards from the fuselage.",
      "Cruised at 960 km/h (Mach 0.82) at 35,000 ft, cutting transatlantic travel time from 14 hours down to under 7 hours.",
      "Set the global standard for low-wing, swept-wing, multi-engine podded commercial jetliner layout."
    ],
    keySpecs: {
      speed: "977 km/h (Mach 0.82)",
      wingspan: "39.9 m (130 ft)",
      propulsion: "4x Pratt & Whitney JT3C-6 turbojets",
      significance: "First commercially dominant transatlantic jetliner"
    },
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Swept-wing jetliner ascending into the upper atmosphere."
  },
  {
    id: "tl-sr71",
    year: 1964,
    exactDate: "December 22, 1964",
    title: "Lockheed SR-71 Blackbird: Mach 3+ Reconnaissance",
    era: "Cold War & Jet Age (1946–1975)",
    category: "Military",
    aircraftName: "Lockheed SR-71 Blackbird",
    summary: "Kelly Johnson's Lockheed Skunk Works creates the SR-71 Blackbird, capable of sustained continuous cruise above Mach 3.2 at altitudes of 85,000 feet.",
    details: [
      "Constructed from 85% titanium alloy (Beta-120/Ti-13V-11Cr-3Al) to endure aerodynamic skin friction temperatures exceeding 300°C (572°F).",
      "Pioneered early radar cross-section (RCS) reduction with chined fuselage sides and canted vertical tails.",
      "Powered by two Pratt & Whitney J58 continuous-bleed turboramjets, operating as afterburning turbojets at low speeds and converting to ramjets above Mach 2."
    ],
    keySpecs: {
      speed: "Mach 3.32 (3,540 km/h / 2,193 mph)",
      wingspan: "16.9 m (55.6 ft)",
      propulsion: "2x Pratt & Whitney J58 turboramjets (34,000 lbf each)",
      significance: "Highest altitude and fastest air-breathing manned aircraft in history"
    },
    imageUrl: "https://images.unsplash.com/photo-1517976487502-5f715d376453?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Aerodynamic titanium airframe built for sustained Mach 3+ thermal friction."
  },
  {
    id: "tl-concorde",
    year: 1969,
    exactDate: "March 2, 1969 (First Flight) / 1976 (Service)",
    title: "Concorde: Supersonic Commercial Passenger Travel",
    era: "Cold War & Jet Age (1946–1975)",
    category: "Civil",
    aircraftName: "Aérospatiale / BAC Concorde",
    summary: "Anglo-French Concorde enters passenger service, carrying 100 passengers at Mach 2.04 (twice the speed of sound) across the Atlantic in 3.5 hours.",
    details: [
      "Featured an ogival slender delta wing and droop-snoop nose for takeoff and landing pilot visibility.",
      "Flew at 60,000 feet (18,000 m), where passengers could observe the curvature of the Earth.",
      "Powered by four Rolls-Royce/Snecma Olympus 593 turbojets with reheat (afterburners), cruising supersonically without reheat via supercruise."
    ],
    keySpecs: {
      speed: "Mach 2.04 (2,179 km/h / 1,354 mph)",
      wingspan: "25.6 m (84 ft)",
      propulsion: "4x Rolls-Royce/Snecma Olympus 593 Mk 610",
      significance: "Only commercially successful supersonic passenger transport"
    },
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Ogival delta wing configuration optimized for Mach 2 commercial cruise."
  },
  {
    id: "tl-boeing-747",
    year: 1970,
    exactDate: "January 22, 1970",
    title: "Boeing 747: The Queen of the Skies & High-Bypass Jet",
    era: "Cold War & Jet Age (1946–1975)",
    category: "Civil",
    aircraftName: "Boeing 747-100",
    summary: "The world's first wide-body twin-aisle airliner enters service with Pan Am, slashing per-seat seat-mile operating costs and democratizing global tourism.",
    details: [
      "Pioneered the wide-body twin-aisle cabin with a distinctive upper deck bubble, accommodating up to 400+ passengers.",
      "Introduced the first generation of high-bypass turbofans (Pratt & Whitney JT9D with 5:1 bypass ratio), dramatically cutting fuel consumption and community noise.",
      "Over 1,570 built across 53 years of production, concluding with the final 747-8F delivery in 2023."
    ],
    keySpecs: {
      speed: "907 km/h (Mach 0.85)",
      wingspan: "59.6 m (195 ft)",
      propulsion: "4x Pratt & Whitney JT9D-3A (43,500 lbf each)",
      significance: "First widebody airliner; introduced high-bypass turbofans"
    },
    imageUrl: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "The iconic Queen of the Skies widebody commercial airliner."
  },
  {
    id: "tl-a320-fbw",
    year: 1988,
    exactDate: "March 28, 1988",
    title: "Airbus A320: The Digital Fly-By-Wire Revolution",
    era: "Digital & Composites (1976–2010)",
    category: "Civil",
    aircraftName: "Airbus A320-200",
    summary: "Airbus introduces the A320, the world's first commercial airliner featuring full digital Fly-By-Wire (FBW) flight controls and side-stick controllers.",
    details: [
      "Replaced mechanical cables and pulleys with redundant digital flight control computers and electro-hydraulic actuators.",
      "Introduced computerized 'Flight Envelope Protection', preventing the aircraft from stalling, overspeeding, or exceeding +2.5g loads regardless of pilot stick inputs.",
      "Pioneered the full glass cockpit with Electronic Flight Instrument System (EFIS) cathode ray tube displays, establishing modern two-crew cockpit ergonomics."
    ],
    keySpecs: {
      speed: "828 km/h (Mach 0.78)",
      wingspan: "34.1 m (111 ft)",
      propulsion: "2x CFM International CFM56-5 or IAE V2500",
      significance: "First commercial airliner with full digital fly-by-wire"
    },
    imageUrl: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Modern narrowbody airliner featuring digital fly-by-wire avionics."
  },
  {
    id: "tl-b787-composite",
    year: 2011,
    exactDate: "October 26, 2011",
    title: "Boeing 787 Dreamliner: The Carbon Composite Airframe",
    era: "Digital & Composites (1976–2010)",
    category: "Civil",
    aircraftName: "Boeing 787-8 Dreamliner",
    summary: "The Boeing 787 becomes the first major commercial airliner built predominantly from carbon-fiber-reinforced polymer (CFRP) composites (50% by weight).",
    details: [
      "Eliminated thousands of traditional aluminum rivets by utilizing one-piece barrel-molded carbon-epoxy fuselage sections.",
      "Yielded a 20% fuel efficiency improvement over the Boeing 767 through composite weight savings, raked wingtips, and GEnx / Trent 1000 high-bypass engines.",
      "Higher airframe fatigue and corrosion resistance allowed cabin pressurization equivalent to 6,000 ft altitude (versus 8,000 ft on metal airliners) with 16% relative humidity for passenger comfort."
    ],
    keySpecs: {
      speed: "903 km/h (Mach 0.85)",
      wingspan: "60.1 m (197 ft)",
      propulsion: "2x GEnx-1B or Rolls-Royce Trent 1000",
      significance: "First commercial airliner constructed with >50% composite materials"
    },
    imageUrl: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Carbon-fiber composite widebody airliner showing flexible raked wingtip curvature."
  },
  {
    id: "tl-nextgen-future",
    year: 2026,
    exactDate: "2024–2030+",
    title: "Next-Gen Horizons: Hydrogen, eVTOL & Blended Wing Body",
    era: "Next-Gen & Future (2011+)",
    category: "Experimental",
    aircraftName: "Airbus ZEROe / JetZero BWB / Boom Overture",
    summary: "The aerospace industry embarks on decarbonization and autonomy, developing cryogenic liquid hydrogen airframes, electric vertical takeoff (eVTOL), and Blended Wing Bodies.",
    details: [
      "Airbus ZEROe aims to develop the world's first zero-emission commercial aircraft by 2035 using liquid hydrogen combustion and fuel cells.",
      "JetZero and the U.S. Air Force are prototyping a full-scale Blended Wing Body (BWB) demonstrator, targeting 30–50% fuel burn reduction through aerodynamic lift generated across the entire fuselage.",
      "Electric Vertical Takeoff and Landing (eVTOL) aircraft (Joby Aviation, Archer) enter urban air mobility certification, utilizing distributed electric propulsion (DEP)."
    ],
    keySpecs: {
      speed: "Mach 0.85 (BWB) / Mach 1.7 (Boom) / 320 km/h (eVTOL)",
      wingspan: "Variable / Modular",
      propulsion: "Liquid Hydrogen, 100% SAF, Electric Hybrid",
      significance: "Zero-carbon flight, supersonic revival, and urban air mobility"
    },
    imageUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80",
    imageCaption: "Futuristic blended wing body concept representing the aerodynamic frontier."
  }
];
