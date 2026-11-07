import React from 'react';
import { 
  X, 
  Plane, 
  Layers, 
  Gauge, 
  FileDown, 
  Cpu, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  Sparkles,
  Award
} from 'lucide-react';
import { Aircraft } from '../types/aircraft';
import { AircraftSilhouette } from './AircraftSilhouettes';
import { generateAerospaceReport } from '../utils/pdfGenerator';

interface AircraftDetailModalProps {
  aircraft: Aircraft | null;
  onClose: () => void;
}

export const AircraftDetailModal: React.FC<AircraftDetailModalProps> = ({ aircraft, onClose }) => {
  if (!aircraft) return null;

  const handleExportIndividualPdf = () => {
    generateAerospaceReport({
      selectedAircraftIds: [aircraft.id],
      includeTimeline: true,
      includePhysicsSection: true,
      includePropulsionSection: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-8 hud-panel rounded-2xl border border-cyan-500/40 p-6 sm:p-8 bg-[#04091a] shadow-2xl text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-cyan-500/20">
          <div className="w-20 h-20 rounded-xl bg-black/60 border border-cyan-500/40 flex items-center justify-center p-2 shrink-0">
            <AircraftSilhouette type={aircraft.svgType} className="w-16 h-16" glow />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {aircraft.year}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-teal-300 border border-slate-700">
                {aircraft.category}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-amber-300 border border-slate-700">
                {aircraft.status}
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              {aircraft.name}
            </h2>
            <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
              {aircraft.designation} • {aircraft.manufacturer} ({aircraft.country})
            </p>
          </div>
        </div>

        {/* Description & Significance */}
        <div className="my-6 space-y-4">
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
            <span className="font-mono text-xs uppercase text-cyan-400 font-bold block mb-1">
              Historical Significance:
            </span>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {aircraft.significance}
            </p>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {aircraft.description}
          </p>
        </div>

        {/* Technical Specification Matrix */}
        <div className="mb-6">
          <span className="font-mono text-xs uppercase text-slate-400 block mb-3 font-semibold">
            Engineering Telemetry & Specifications:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Max Speed</span>
              <span className="text-white font-bold text-sm">{aircraft.topSpeedKmh.toLocaleString()} km/h</span>
              <span className="text-cyan-400 text-[10px] block">Mach {aircraft.topSpeedMach}</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Cruise Speed</span>
              <span className="text-white font-bold text-sm">{aircraft.cruiseSpeedKmh.toLocaleString()} km/h</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Service Ceiling</span>
              <span className="text-teal-300 font-bold text-sm">{aircraft.serviceCeilingM.toLocaleString()} m</span>
              <span className="text-slate-400 text-[10px] block">({Math.round(aircraft.serviceCeilingM * 3.28084).toLocaleString()} ft)</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Combat / Max Range</span>
              <span className="text-slate-200 font-bold text-sm">{aircraft.rangeKm.toLocaleString()} km</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Wingspan / Length</span>
              <span className="text-slate-200 font-bold text-sm">{aircraft.wingspanM} m / {aircraft.lengthM} m</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">MTOW (Takeoff Weight)</span>
              <span className="text-slate-200 font-bold text-sm">{aircraft.mtowKg.toLocaleString()} kg</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Lift-to-Drag Ratio</span>
              <span className="text-amber-300 font-bold text-sm">{aircraft.liftToDragRatio}:1</span>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Thrust-to-Weight</span>
              <span className="text-cyan-300 font-bold text-sm">
                {aircraft.thrustToWeightRatio ? `${aircraft.thrustToWeightRatio} T/W` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Engine and Power Plant */}
        <div className="p-3.5 rounded-xl bg-black/50 border border-cyan-500/20 mb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Powerplant: {aircraft.propulsionType} ({aircraft.engineCount}x Engine{aircraft.engineCount > 1 ? 's' : ''})</span>
          </div>
          <p className="text-slate-300 font-sans text-xs">
            <strong>Model:</strong> {aircraft.engineModel}
          </p>
          <p className="text-slate-400 font-sans text-xs mt-0.5">
            <strong>Installed Thrust / Power:</strong> {aircraft.thrustOrPower}
          </p>
        </div>

        {/* Aerodynamic Innovations & Structural Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Innovations */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-xs uppercase text-cyan-400 font-bold flex items-center gap-1.5 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Aerodynamic Innovations:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {aircraft.aerodynamicInnovations.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Structural Materials */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="font-mono text-xs uppercase text-teal-400 font-bold flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5" />
              Structural Materials:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {aircraft.structuralMaterials.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-slate-500">
            Maiden Flight: {aircraft.firstFlight}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportIndividualPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Export Airframe Dossier (.PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

