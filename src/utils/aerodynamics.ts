import { AtmosphereData, SimulationParams, SimulationResults } from '../types/aircraft';

// Standard Sea Level constants (ISA 1976)
const T0 = 288.15; // K
const P0 = 101325; // Pa
const RHO0 = 1.225; // kg/m^3
const G = 9.80665; // m/s^2
const R = 287.05287; // J/(kg*K)
const GAMMA = 1.4; // adiabatic index for air
const LAPSE_RATE = -0.0065; // K/m up to 11,000m
const TROPOPAUSE_ALT = 11000; // m
const T_TROPOPAUSE = 216.65; // K
const P_TROPOPAUSE = 22632.1; // Pa

/**
 * Calculates International Standard Atmosphere (ISA) properties at given altitude in meters
 */
export function calculateAtmosphere(altitudeM: number): AtmosphereData {
  const alt = Math.max(0, Math.min(altitudeM, 30000));
  let temperatureK: number;
  let pressurePa: number;

  if (alt <= TROPOPAUSE_ALT) {
    temperatureK = T0 + LAPSE_RATE * alt;
    pressurePa = P0 * Math.pow(temperatureK / T0, -G / (LAPSE_RATE * R));
  } else {
    temperatureK = T_TROPOPAUSE;
    pressurePa = P_TROPOPAUSE * Math.exp((-G * (alt - TROPOPAUSE_ALT)) / (R * T_TROPOPAUSE));
  }

  const densityKgM3 = pressurePa / (R * temperatureK);
  const speedOfSoundMs = Math.sqrt(GAMMA * R * temperatureK);

  return {
    altitudeM: Math.round(alt),
    altitudeFt: Math.round(alt * 3.28084),
    temperatureK: Number(temperatureK.toFixed(2)),
    temperatureC: Number((temperatureK - 273.15).toFixed(1)),
    pressurePa: Math.round(pressurePa),
    densityKgM3: Number(densityKgM3.toFixed(4)),
    speedOfSoundMs: Number(speedOfSoundMs.toFixed(1)),
    speedOfSoundKmh: Number((speedOfSoundMs * 3.6).toFixed(1)),
  };
}

/**
 * Computes aerodynamic performance (Lift, Drag, Mach, Dynamic Pressure, Stall)
 */
export function computeFlightDynamics(params: SimulationParams): SimulationResults {
  const atmosphere = calculateAtmosphere(params.altitudeM);
  const velocityMs = params.airspeedKmh / 3.6;
  const machNumber = velocityMs / atmosphere.speedOfSoundMs;

  // Thin airfoil theory: CL = 2*pi * (alpha - alpha_0)
  // Camber shifts the zero-lift angle of attack
  const alphaL0 = -1.2 * params.airfoilCamber; // zero-lift alpha in degrees
  const effectiveAlpha = params.angleOfAttackDeg - alphaL0;
  
  // Stall characteristics
  const stallAlphaPositive = 16.0 + params.airfoilCamber * 0.5;
  const isStalled = params.angleOfAttackDeg > stallAlphaPositive || params.angleOfAttackDeg < -12;

  let liftCoefficient = 0;
  if (!isStalled) {
    // Normal linear lift curve slope: approx 0.109 per degree
    liftCoefficient = 0.109 * effectiveAlpha;
  } else {
    // Post-stall lift breakdown
    const postStallDecay = Math.max(0.2, 1.4 - (params.angleOfAttackDeg - stallAlphaPositive) * 0.08);
    liftCoefficient = Math.sin((params.angleOfAttackDeg * Math.PI) / 180) * postStallDecay;
  }

  // Oswald efficiency factor
  const oswaldE = 0.82;
  const inducedDragCoeff = (liftCoefficient * liftCoefficient) / (Math.PI * oswaldE * params.aspectRatio);

  // Baseline zero-lift parasitic drag
  let parasiticDragCoeff = 0.022 + 0.0003 * Math.abs(effectiveAlpha);
  if (isStalled) {
    parasiticDragCoeff += 0.15 + 0.02 * (params.angleOfAttackDeg - stallAlphaPositive);
  }

  // Compressibility & Wave Drag Rise (Transonic & Supersonic)
  let waveDragMultiplier = 1.0;
  let waveDragCoeff = 0;
  if (machNumber > 0.75) {
    if (machNumber < 1.0) {
      // Transonic drag divergence peak
      const transonicFactor = Math.pow((machNumber - 0.75) / 0.25, 3.5);
      waveDragCoeff = 0.045 * transonicFactor;
      waveDragMultiplier = 1.0 + waveDragCoeff * 12;
    } else {
      // Supersonic wave drag: drops as 1 / sqrt(M^2 - 1)
      const supersonicDecay = 1 / Math.sqrt(Math.max(0.1, machNumber * machNumber - 1));
      waveDragCoeff = 0.06 * Math.min(2.0, supersonicDecay);
      waveDragMultiplier = 1.8 + waveDragCoeff * 5;
    }
  }

  const dragCoefficient = Math.max(0.015, parasiticDragCoeff + inducedDragCoeff + waveDragCoeff);
  
  // Dynamic pressure q = 0.5 * rho * v^2
  const dynamicPressurePa = 0.5 * atmosphere.densityKgM3 * velocityMs * velocityMs;

  // Total forces
  const liftN = dynamicPressurePa * params.wingAreaM2 * liftCoefficient;
  const dragN = dynamicPressurePa * params.wingAreaM2 * dragCoefficient;

  const liftToDrag = dragN > 0 ? liftN / dragN : 0;

  // Reynolds number Re = (rho * v * c) / mu
  // Dynamic viscosity of air approx 1.789e-5 kg/(m*s)
  const mu = 1.789e-5;
  const meanChord = Math.sqrt(params.wingAreaM2 / params.aspectRatio);
  const reynoldsNumber = (atmosphere.densityKgM3 * velocityMs * meanChord) / mu;

  // Mach cone angle: mu = arcsin(1 / M) for M >= 1
  let machAngleDeg: number | undefined;
  if (machNumber >= 1.0) {
    machAngleDeg = Number(((Math.asin(1 / machNumber) * 180) / Math.PI).toFixed(1));
  }

  return {
    machNumber: Number(machNumber.toFixed(3)),
    atmosphere,
    liftCoefficient: Number(liftCoefficient.toFixed(3)),
    dragCoefficient: Number(dragCoefficient.toFixed(4)),
    inducedDragCoeff: Number(inducedDragCoeff.toFixed(4)),
    parasiticDragCoeff: Number(parasiticDragCoeff.toFixed(4)),
    liftN: Math.round(liftN),
    dragN: Math.round(dragN),
    liftToDrag: Number(liftToDrag.toFixed(2)),
    dynamicPressurePa: Math.round(dynamicPressurePa),
    reynoldsNumber: Math.round(reynoldsNumber),
    isStalled,
    machAngleDeg,
    soundBarrierWaveDragMultiplier: Number(waveDragMultiplier.toFixed(2)),
  };
}

