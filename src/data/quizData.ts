import { QuizQuestion } from '../types/aircraft';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Why did the Wright Brothers choose a canard (forward elevator) configuration for the 1903 Wright Flyer?',
    options: [
      'To provide positive pitch recovery and protect the pilot during an impending nose-dive crash',
      'Because rear rudders had not yet been invented in 1903',
      'To reduce supersonic wave drag at high Mach numbers',
      'To mount the heavy gasoline engine directly over the canard'
    ],
    correctIndex: 0,
    explanation: 'The Wright brothers feared fatal nose-first dive crashes (which killed pioneer Otto Lilienthal in a glider stall). Placing the elevator forward allowed the pilot to see control deflections and provided pitch leverage to prevent ground-impact dives.',
    category: 'Historic Flights'
  },
  {
    id: 'q2',
    question: 'What is the primary aerodynamic purpose of sweeping an aircraft\'s wings backward at high transonic speeds?',
    options: [
      'To increase the wingspan and lower induced drag',
      'To delay the onset of compressibility wave drag by reducing the effective Mach number normal to the wing leading edge (M * cos(sweep))',
      'To prevent the engines from overheating at high altitude',
      'To enable the aircraft to fly backward during carrier landings'
    ],
    correctIndex: 1,
    explanation: 'Sweeping the wings by an angle Λ reduces the component of airflow velocity perpendicular to the leading edge to V * cos(Λ). This tricks the airfoil into "feeling" a lower Mach number, substantially delaying the formation of supersonic shock waves and wave drag.',
    category: 'Aerodynamics'
  },
  {
    id: 'q3',
    question: 'In the standard International Standard Atmosphere (ISA) model, what happens to the speed of sound as an aircraft climbs through the troposphere from sea level to 11,000 meters?',
    options: [
      'It increases significantly due to dropping air density',
      'It remains strictly constant at 340.3 m/s',
      'It decreases from ~340 m/s down to ~295 m/s because sound speed is proportional to the square root of absolute temperature (T)',
      'It fluctuates wildly depending on the humidity and wing loading'
    ],
    correctIndex: 2,
    explanation: 'The speed of sound in an ideal gas is given by a = sqrt(gamma * R * T). In the troposphere, temperature drops with altitude at approximately -6.5°C per kilometer, causing the speed of sound to drop from ~340 m/s at sea level to ~295 m/s at 11,000 m (36,089 ft).',
    category: 'Aerodynamics'
  },
  {
    id: 'q4',
    question: 'Why does the Lockheed SR-71 Blackbird feature movable axisymmetric inlet spikes inside its engine nacelles?',
    options: [
      'To scoop water from clouds for engine intercooling',
      'To position conical supersonic shock waves precisely at the engine cowl lip, slowing supersonic air down to subsonic speeds before it enters the compressor',
      'To serve as high-frequency radar jamming antennas',
      'To pierce physical birds during high-altitude strikes'
    ],
    correctIndex: 1,
    explanation: 'Jet engine compressors cannot ingest supersonic air without stalling. At speeds above Mach 1.6, the SR-71 spikes retract progressively into the nacelle, generating oblique shock waves that decelerate the airflow to subsonic speeds while converting extreme kinetic energy into massive static pressure recovery.',
    category: 'Propulsion'
  },
  {
    id: 'q5',
    question: 'What is "Coffin Corner" in high-altitude jet aviation?',
    options: [
      'The sharp trailing edge vertex where the wingtip meets the aileron',
      'The critical altitude where an aircraft’s low-speed aerodynamic stall speed and high-speed critical Mach buffet speed converge to virtually the same airspeed',
      'A dangerous blind spot underneath the cockpit floor',
      'The emergency descent dive angle required when cockpit pressure fails'
    ],
    correctIndex: 1,
    explanation: 'At very high altitudes, the stall speed (due to thin air requiring a higher true airspeed to maintain lift) and the critical Mach buffet speed (shock wave stall from exceeding Mach limits) converge. If the pilot flies 5 knots too slow they stall; 5 knots too fast and shockwave buffet causes loss of control.',
    category: 'Aerodynamics'
  },
  {
    id: 'q6',
    question: 'What aerodynamic principle explains why the Boeing 787 Dreamliner uses raked wingtips rather than traditional vertical winglets?',
    options: [
      'Raked wingtips create trailing tip vortices that push the aircraft forward like a sailboat',
      'Raked wingtips increase the effective aspect ratio with less structural weight and lower parasitic drag in long-range high-subsonic cruise',
      'Raked wingtips are solely cosmetic to make the aircraft look modern',
      'Raked wingtips contain emergency fuel dumping rockets'
    ],
    correctIndex: 1,
    explanation: 'Raked wingtips sweep the outer wing edge back smoothly. In long-range cruise (Mach 0.85), raked wingtips provide a span-efficiency gain equivalent to or superior to vertical winglets while generating less interference drag and imposing less wing-root torsional bending moment.',
    category: 'Materials'
  },
  {
    id: 'q7',
    question: 'How does NASA\'s X-59 QueSST achieve "quiet" supersonic flight without producing a disruptive sonic boom?',
    options: [
      'By using acoustic soundproofing mufflers around the jet exhaust nozzle',
      'By flying strictly in the vacuum of space where sound cannot travel',
      'By using an elongated needle-nose and tailored airframe volume distribution that prevents individual shock waves from coalescing into a loud N-wave',
      'By turning off the engine whenever it flies over populated land'
    ],
    correctIndex: 2,
    explanation: 'A normal supersonic aircraft generates multiple distinct shock waves (nose, canopy, wings, inlets, tail) that quickly merge in the atmosphere into two sharp overpressure shocks called an "N-wave." The X-59’s geometry spreads these shocks out along its 100-foot body so they never coalesce, transforming the boom into a gentle 75 PLdB sonic "thump."',
    category: 'Historic Flights'
  },
  {
    id: 'q8',
    question: 'What is the primary thermodynamic advantage of a High-Bypass Turbofan over a pure Turbojet at subsonic cruise speeds (Mach 0.80 - 0.85)?',
    options: [
      'Turbofans burn liquid hydrogen instead of kerosene jet fuel',
      'Higher propulsive efficiency (eta_p = 2 / (1 + v_j / v_0)) achieved by accelerating a large mass of bypass air with a moderate exhaust velocity increase',
      'Turbofans require no maintenance or lubricating oil',
      'Turbofans produce zero exhaust gas emissions'
    ],
    correctIndex: 1,
    explanation: 'Propulsive efficiency is maximized when the exhaust jet velocity is as close as possible to the aircraft flight speed. Pure turbojets shoot a small mass of air at very high speed (wasting kinetic energy as heat and noise), whereas high-bypass turbofans accelerate a massive volume of cool bypass air at moderate velocity, cutting fuel burn dramatically.',
    category: 'Propulsion'
  }
];

