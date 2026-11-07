export type Era = 
  | 'Pioneer (1903-1914)'
  | 'WWI & Interwar (1914-1938)'
  | 'WWII & Piston Peak (1939-1945)'
  | 'Jet & Supersonic Dawn (1946-1969)'
  | 'Widebody & Fly-by-Wire (1970-1999)'
  | 'Composites & Stealth (2000-2025)'
  | 'Future Horizons (2026+)';

export type PropulsionType = 
  | 'Piston Engine'
  | 'Turboprop'
  | 'Turbojet'
  | 'Low-Bypass Turbofan'
  | 'High-Bypass Turbofan'
  | 'Rocket Engine'
  | 'Ramjet / Scramjet'
  | 'Electric / Hydrogen';

export type AircraftCategory = 
  | 'Commercial'
  | 'Fighter'
  | 'Bomber'
  | 'Experimental / Research'
  | 'Reconnaissance'
  | 'Transport / Cargo';

export interface Aircraft {
  id: string;
  name: string;
  designation: string;
  manufacturer: string;
  country: string;
  year: number;
  era: Era;
  category: AircraftCategory;
  propulsionType: PropulsionType;
  engineCount: number;
  engineModel: string;
  topSpeedKmh: number;
  topSpeedMach: number;
  cruiseSpeedKmh: number;
  serviceCeilingM: number;
  rangeKm: number;
  wingspanM: number;
  lengthM: number;
  emptyWeightKg: number;
  mtowKg: number;
  thrustOrPower: string;
  thrustToWeightRatio?: number;
  liftToDragRatio: number;
  firstFlight: string;
  significance: string;
  aerodynamicInnovations: string[];
  structuralMaterials: string[];
  description: string;
  status: 'Retired' | 'Active' | 'Development / Concept' | 'Museum Specimen';
  svgType: 'biplane' | 'monoplane' | 'jet-fighter' | 'widebody' | 'supersonic' | 'stealth' | 'future-bwb';
}

export interface TimelineMilestone {
  id: string;
  year: number;
  date: string;
  title: string;
  subtitle: string;
  era: Era;
  category: 'First Flight' | 'Speed Record' | 'Aerodynamic Breakthrough' | 'Propulsion' | 'Avionics';
  aircraftId?: string;
  description: string;
  keyFigures: string[];
  technicalImpact: string;
}

export interface AtmosphereData {
  altitudeM: number;
  altitudeFt: number;
  temperatureK: number;
  temperatureC: number;
  pressurePa: number;
  densityKgM3: number;
  speedOfSoundMs: number;
  speedOfSoundKmh: number;
}

export interface SimulationParams {
  altitudeM: number;
  airspeedKmh: number;
  angleOfAttackDeg: number;
  wingAreaM2: number;
  aspectRatio: number;
  airfoilCamber: number; // percentage camber
}

export interface SimulationResults {
  machNumber: number;
  atmosphere: AtmosphereData;
  liftCoefficient: number;
  dragCoefficient: number;
  inducedDragCoeff: number;
  parasiticDragCoeff: number;
  liftN: number;
  dragN: number;
  liftToDrag: number;
  dynamicPressurePa: number;
  reynoldsNumber: number;
  isStalled: boolean;
  machAngleDeg?: number;
  soundBarrierWaveDragMultiplier: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Aerodynamics' | 'Historic Flights' | 'Propulsion' | 'Materials';
}

