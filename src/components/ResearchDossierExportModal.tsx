import React, { useState } from 'react';
import { 
  X, 
  FileDown, 
  CheckSquare, 
  Square, 
  FileText, 
  CheckCircle2, 
  Layers, 
  Flame, 
  Clock, 
  Cpu
} from 'lucide-react';
import { generateAerospaceReport } from '../utils/pdfGenerator';
import { AIRCRAFT_DATA } from '../data/aircraftData';

interface ResearchDossierExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedIds?: string[];
}

export const ResearchDossierExportModal: React.FC<ResearchDossierExportModalProps> = ({ 
  isOpen, 
  onClose,
  preselectedIds
}) => {
  if (!isOpen) return null;

  const [includeTimeline, setIncludeTimeline] = useState(true);
  const [includePhysics, setIncludePhysics] = useState(true);
  const [includePropulsion, setIncludePropulsion] = useState(true);
  const [usePreselectedOnly, setUsePreselectedOnly] = useState(preselectedIds && preselectedIds.length > 0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    setTimeout(() => {
      try {
        generateAerospaceReport({
          selectedAircraftIds: usePreselectedOnly && preselectedIds && preselectedIds.length > 0 ? preselectedIds : undefined,
          includeTimeline,
          includePhysicsSection: includePhysics,
          includePropulsionSection: includePropulsion,
        });
        setDownloadSuccess(true);
      } catch (err) {
        console.error('PDF export error:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-xl hud-panel rounded-2xl border border-cyan-500/40 p-6 sm:p-8 bg-[#040817] shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-cyan-500/20">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Export Academic Research Dossier
            </h3>
            <p className="text-xs font-mono text-cyan-400">
              Publication-Grade PDF Technical Monograph
            </p>
          </div>
        </div>

        {/* Scope and Options */}
        <div className="my-6 space-y-4">
          <p className="text-xs text-slate-300">
            Configure the sections to be compiled into your formal Aerospace Engineering Monograph. All tables and governing formulations adhere to AIAA and NASA standard nomenclature.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {/* Option 1: Executive Abstract & Physics */}
            <div 
              onClick={() => setIncludePhysics(!includePhysics)}
              className="p-3 rounded-lg bg-black/40 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200">Executive Abstract & Aerodynamic Formulations</span>
              </div>
              {includePhysics ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4 text-slate-600" />}
            </div>

            {/* Option 2: Chronological Milestones Table */}
            <div 
              onClick={() => setIncludeTimeline(!includeTimeline)}
              className="p-3 rounded-lg bg-black/40 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="text-slate-200">Chronological Milestones (1903 - 2030+)</span>
              </div>
              {includeTimeline ? <CheckSquare className="w-4 h-4 text-teal-400" /> : <Square className="w-4 h-4 text-slate-600" />}
            </div>

            {/* Option 3: Propulsion & Future Horizons */}
            <div 
              onClick={() => setIncludePropulsion(!includePropulsion)}
              className="p-3 rounded-lg bg-black/40 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-amber-400" />
                <span className="text-slate-200">Propulsion Evolution & Net-Zero Aviation</span>
              </div>
              {includePropulsion ? <CheckSquare className="w-4 h-4 text-amber-400" /> : <Square className="w-4 h-4 text-slate-600" />}
            </div>

            {/* Scope: All vs Selected Aircraft */}
            {preselectedIds && preselectedIds.length > 0 && (
              <div 
                onClick={() => setUsePreselectedOnly(!usePreselectedOnly)}
                className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 font-semibold">
                    Include only {preselectedIds.length} currently compared airframes
                  </span>
                </div>
                {usePreselectedOnly ? <CheckSquare className="w-4 h-4 text-cyan-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              </div>
            )}
          </div>
        </div>

        {/* Success message */}
        {downloadSuccess && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/70 border border-emerald-500 text-emerald-200 font-mono text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Research PDF successfully compiled and downloaded to your device!</span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-heading font-bold text-xs tracking-wider shadow-lg shadow-cyan-900/50 transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>{isGenerating ? 'Compiling Dossier...' : 'Download Official PDF Monograph'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

