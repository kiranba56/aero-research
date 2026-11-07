import React, { useState } from 'react';
import { 
  Plane, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Check, 
  X, 
  Maximize2, 
  Gauge, 
  Compass, 
  Weight, 
  Layers, 
  Sparkles, 
  Award, 
  ChevronRight,
  FileDown
} from 'lucide-react';
import { AIRCRAFT_DATA } from '../data/aircraftData';
import { Aircraft, Era, AircraftCategory, PropulsionType } from '../types/aircraft';
import { AircraftSilhouette } from './AircraftSilhouettes';

interface HangarModuleProps {
  onSelectAircraft: (id: string) => void;
  onOpenPdfModalWithSelection?: (ids: string[]) => void;
}

export const HangarModule: React.FC<HangarModuleProps> = ({ 
  onSelectAircraft,
  onOpenPdfModalWithSelection 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPropulsion, setSelectedPropulsion] = useState<string>('All');
  const [comparisonIds, setComparisonIds] = useState<string[]>(['wright-flyer', 'sr71-blackbird', 'bwb-blended-wing']);
  const [showComparisonMatrix, setShowComparisonMatrix] = useState<boolean>(true);

  const eras = [
    'All',
    'Pioneer (1903-1914)',
    'WWI & Interwar (1914-1938)',
    'WWII & Piston Peak (1939-1945)',
    'Jet & Supersonic Dawn (1946-1969)',
    'Widebody & Fly-by-Wire (1970-1999)',
    'Composites & Stealth (2000-2025)',
    'Future Horizons (2026+)'
  ];

  const categories = ['All', 'Commercial', 'Fighter', 'Bomber', 'Experimental / Research', 'Reconnaissance'];
  const propulsionTypes = ['All', 'Piston Engine', 'Turbojet', 'Low-Bypass Turbofan', 'High-Bypass Turbofan', 'Rocket Engine', 'Electric / Hydrogen'];

  const filteredAircraft = AIRCRAFT_DATA.filter(ac => {
    const matchesSearch = 
      ac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ac.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ac.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ac.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEra = selectedEra === 'All' || ac.era === selectedEra;
    const matchesCat = selectedCategory === 'All' || ac.category === selectedCategory;
    const matchesProp = selectedPropulsion === 'All' || ac.propulsionType.includes(selectedPropulsion);
    return matchesSearch && matchesEra && matchesCat && matchesProp;
  });

  const toggleCompare = (id: string) => {
    if (comparisonIds.includes(id)) {
      setComparisonIds(comparisonIds.filter(item => item !== id));
    } else {
      if (comparisonIds.length >= 4) {
        alert('You can compare up to 4 aircraft simultaneously.');
        return;
      }
      setComparisonIds([...comparisonIds, id]);
    }
  };

  const comparedAircraft = AIRCRAFT_DATA.filter(a => comparisonIds.includes(a.id));

  // Find max values in comparison set for metric bars
  const maxSpeed = Math.max(...comparedAircraft.map(a => a.topSpeedKmh), 1);
  const maxCeiling = Math.max(...comparedAircraft.map(a => a.serviceCeilingM), 1);
  const maxRange = Math.max(...comparedAircraft.map(a => a.rangeKm), 1);
  const maxLD = Math.max(...comparedAircraft.map(a => a.liftToDragRatio), 1);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <Plane className="w-4 h-4" />
            <span>Airframe Registry & Specification Matrix</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Aircraft Hangar & Multi-Spec Comparator
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Explore detailed aerodynamic profiles of history’s most influential airframes. Select up to 4 aircraft to perform an immediate comparative telemetry analysis.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, model, maker..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-cyan-500/30 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 mb-8 space-y-3">
        {/* Era selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Era:
          </span>
          {eras.map(era => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1 rounded font-mono text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedEra === era
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                  : 'bg-black/40 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {era === 'All' ? 'All Eras' : era.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Category & Propulsion */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">Role:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black/60 border border-slate-700 text-slate-200 rounded px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">Propulsion:</span>
            <select
              value={selectedPropulsion}
              onChange={(e) => setSelectedPropulsion(e.target.value)}
              className="bg-black/60 border border-slate-700 text-slate-200 rounded px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-cyan-400"
            >
              {propulsionTypes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <span className="text-slate-500 font-mono text-[11px] ml-auto">
            Showing <strong className="text-cyan-400">{filteredAircraft.length}</strong> of {AIRCRAFT_DATA.length} airframes
          </span>
        </div>
      </div>

      {/* Comparison Drawer / Toggle Bar */}
      {comparisonIds.length > 0 && (
        <div className="mb-8 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs text-cyan-300 font-bold uppercase">
                Comparative Telemetry Dock ({comparisonIds.length}/4 Selected)
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {comparedAircraft.map(ac => (
                  <span
                    key={ac.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/60 text-slate-200 border border-cyan-500/30 text-xs font-mono"
                  >
                    {ac.name}
                    <button
                      onClick={() => toggleCompare(ac.id)}
                      className="text-slate-400 hover:text-red-400 ml-1 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowComparisonMatrix(!showComparisonMatrix)}
                className="px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono cursor-pointer transition-all"
              >
                {showComparisonMatrix ? 'Hide Matrix' : 'Display Side-by-Side Matrix'}
              </button>
              {onOpenPdfModalWithSelection && (
                <button
                  onClick={() => onOpenPdfModalWithSelection(comparisonIds)}
                  className="px-3 py-1.5 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export Compared (.PDF)</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Side-by-Side Comparison Table */}
          {showComparisonMatrix && comparedAircraft.length > 0 && (
            <div className="mt-6 pt-6 border-t border-cyan-500/20 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-cyan-500/20 text-slate-400">
                    <th className="py-2 px-3 w-44">METRIC</th>
                    {comparedAircraft.map(ac => (
                      <th key={ac.id} className="py-2 px-3 min-w-[200px]">
                        <div className="flex items-center gap-2 text-white font-heading font-bold text-sm">
                          <AircraftSilhouette type={ac.svgType} className="w-6 h-6 inline-block" />
                          <span>{ac.name}</span>
                        </div>
                        <span className="text-[10px] text-cyan-400">{ac.year} • {ac.category}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {/* Top Speed */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Top Speed</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold">{ac.topSpeedKmh.toLocaleString()} km/h</span>
                          <span className="text-cyan-400 font-bold">M{ac.topSpeedMach}</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className="bg-cyan-400 h-full rounded-full" 
                            style={{ width: `${(ac.topSpeedKmh / maxSpeed) * 100}%` }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Service Ceiling */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Service Ceiling</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <span className="text-teal-300 font-bold">{ac.serviceCeilingM.toLocaleString()} m</span>
                        <span className="text-slate-500 text-[10px] ml-1">({Math.round(ac.serviceCeilingM * 3.28084).toLocaleString()} ft)</span>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className="bg-teal-400 h-full rounded-full" 
                            style={{ width: `${(ac.serviceCeilingM / maxCeiling) * 100}%` }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Range */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Range</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <span className="text-white font-bold">{ac.rangeKm.toLocaleString()} km</span>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className="bg-sky-400 h-full rounded-full" 
                            style={{ width: `${(ac.rangeKm / maxRange) * 100}%` }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Lift-to-Drag Ratio */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Lift/Drag Ratio (L/D)</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <span className="text-amber-300 font-bold">{ac.liftToDragRatio}:1</span>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div 
                            className="bg-amber-400 h-full rounded-full" 
                            style={{ width: `${(ac.liftToDragRatio / maxLD) * 100}%` }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Wingspan & MTOW */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Wingspan / MTOW</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <div>Span: <strong className="text-slate-200">{ac.wingspanM} m</strong></div>
                        <div>MTOW: <strong className="text-slate-200">{ac.mtowKg.toLocaleString()} kg</strong></div>
                      </td>
                    ))}
                  </tr>

                  {/* Propulsion Type & Engine */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Propulsion & Engine</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <span className="text-cyan-300 font-semibold block">{ac.propulsionType}</span>
                        <span className="text-[10px] text-slate-400 block line-clamp-2">{ac.engineModel}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Structural Materials */}
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-slate-400">Airframe Materials</td>
                    {comparedAircraft.map(ac => (
                      <td key={ac.id} className="py-2.5 px-3">
                        <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
                          {ac.structuralMaterials.map((mat, i) => (
                            <li key={i}>{mat}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Aircraft Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAircraft.map(ac => {
          const isComparing = comparisonIds.includes(ac.id);

          return (
            <div
              key={ac.id}
              className="hud-panel rounded-xl p-5 flex flex-col justify-between border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
            >
              {/* Top Card Info */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {ac.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {ac.category}
                  </span>
                </div>

                {/* Silhouette & Name */}
                <div className="flex items-center gap-4 my-2">
                  <div className="w-16 h-16 rounded-lg bg-black/40 border border-cyan-500/20 flex items-center justify-center p-2 group-hover:border-cyan-400 transition-colors shrink-0">
                    <AircraftSilhouette type={ac.svgType} className="w-12 h-12" glow />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {ac.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 truncate max-w-[180px]">
                      {ac.designation}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {ac.manufacturer} • {ac.country}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 line-clamp-2">
                  {ac.significance}
                </p>

                {/* Quick specs grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-cyan-500/10 font-mono text-xs">
                  <div className="p-2 rounded bg-black/30 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase">Max Speed</span>
                    <span className="font-bold text-white">{ac.topSpeedKmh} km/h</span>
                    <span className="text-[10px] text-cyan-400 ml-1">M{ac.topSpeedMach}</span>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase">Ceiling</span>
                    <span className="font-bold text-teal-300">{ac.serviceCeilingM.toLocaleString()} m</span>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase">Range</span>
                    <span className="font-bold text-slate-200">{ac.rangeKm.toLocaleString()} km</span>
                  </div>
                  <div className="p-2 rounded bg-black/30 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase">L/D Ratio</span>
                    <span className="font-bold text-amber-300">{ac.liftToDragRatio}:1</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleCompare(ac.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer ${
                    isComparing
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isComparing ? 'opacity-100' : 'opacity-30'}`} />
                  <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                </button>

                <button
                  onClick={() => onSelectAircraft(ac.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono cursor-pointer transition-all"
                >
                  <span>Inspect Specs</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

