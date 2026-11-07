import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Tag, 
  UserCheck, 
  Cpu, 
  ArrowUpRight, 
  Filter, 
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/timelineEvents';
import { Era } from '../types/aircraft';

interface TimelineModuleProps {
  onSelectAircraft: (id: string) => void;
}

export const TimelineModule: React.FC<TimelineModuleProps> = ({ onSelectAircraft }) => {
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('tl-1903');

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

  const categories = [
    'All',
    'First Flight',
    'Speed Record',
    'Aerodynamic Breakthrough',
    'Propulsion',
    'Avionics'
  ];

  const filteredMilestones = TIMELINE_MILESTONES.filter(m => {
    const matchesEra = selectedEra === 'All' || m.era === selectedEra;
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.technicalImpact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesCat && matchesSearch;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Module Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-1">
            <Clock className="w-4 h-4" />
            <span>Chronological Flight Archives</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Historical Milestones & Aerodynamic Evolution
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            A comprehensive historical audit of flight breakthroughs from Orville Wright’s 12-second hop to modern quiet supersonic flight and boundary-layer ingestion architectures.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milestones, pilots, physics..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-cyan-500/30 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col gap-3 mb-8 p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20">
        {/* Era Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Era:
          </span>
          {eras.map(era => (
            <button
              key={era}
              onClick={() => setSelectedEra(era)}
              className={`px-3 py-1 rounded-md font-mono whitespace-nowrap transition-all cursor-pointer ${
                selectedEra === era
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
                  : 'bg-black/30 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {era === 'All' ? 'All Epochs' : era.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-mono text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-teal-400" /> Category:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded font-mono text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-500/30 text-teal-300 border border-teal-400/50'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 md:pl-8 border-l-2 border-cyan-500/30 space-y-8">
        {filteredMilestones.map((milestone) => {
          const isExpanded = expandedId === milestone.id;

          return (
            <div 
              key={milestone.id} 
              className="relative group transition-all"
            >
              {/* Timeline Pin Node */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-300" />
              </div>

              {/* Milestone Card */}
              <div className="hud-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {milestone.year}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" /> {milestone.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-teal-400 border border-teal-500/30">
                      {milestone.category}
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : milestone.id)}
                      className="p-1 text-slate-400 hover:text-cyan-300 rounded cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {milestone.title}
                </h3>
                <h4 className="text-xs font-mono text-cyan-400/90 mb-3">
                  {milestone.subtitle}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-cyan-500/20 space-y-3">
                    {/* Key Figures */}
                    <div className="flex items-start gap-2 text-xs">
                      <UserCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-slate-400">Pioneers / Engineers:</span>{' '}
                        <span className="text-slate-200 font-medium">{milestone.keyFigures.join(', ')}</span>
                      </div>
                    </div>

                    {/* Technical Aerodynamic Impact */}
                    <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs">
                      <div className="flex items-center gap-1.5 text-cyan-300 font-mono font-semibold mb-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Technical Aerodynamic Impact:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed font-sans">
                        {milestone.technicalImpact}
                      </p>
                    </div>

                    {/* Action to view aircraft if linked */}
                    {milestone.aircraftId && (
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => onSelectAircraft(milestone.aircraftId!)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono border border-cyan-400/40 cursor-pointer transition-all"
                        >
                          <span>Inspect Airframe Specifications</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredMilestones.length === 0 && (
          <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
            <Clock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No milestones match your search filters.</p>
            <button
              onClick={() => { setSelectedEra('All'); setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-3 py-1 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

