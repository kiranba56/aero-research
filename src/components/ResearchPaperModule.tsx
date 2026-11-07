import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  Share2, 
  Check, 
  ExternalLink, 
  User, 
  Calendar, 
  Tag, 
  ChevronRight, 
  Bookmark,
  Award,
  Sparkles
} from 'lucide-react';
import { paperMetadata, researchSections, ResearchSection } from '../data/researchPaperData';
import { generateAerospaceReport } from '../utils/pdfGenerator';

export const ResearchPaperModule: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('sec-1');
  const [copiedDoi, setCopiedDoi] = useState<boolean>(false);

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(`https://doi.org/${paperMetadata.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2000);
  };

  const handleExportPdf = () => {
    generateAerospaceReport({
      includeTimeline: true,
      includePhysicsSection: true,
      includePropulsionSection: true,
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Journal Publication Header Banner */}
      <div className="hud-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 mb-8 bg-gradient-to-b from-[#050c1f] to-[#020612]">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-4 h-4" />
            <span className="font-bold tracking-wider">{paperMetadata.journal.toUpperCase()}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <span>{paperMetadata.volume}, {paperMetadata.issue}</span>
            <span>•</span>
            <span>pp. {paperMetadata.pages}</span>
            <span>•</span>
            <span className="text-teal-400">Peer-Reviewed Academic Monograph</span>
          </div>
        </div>

        {/* Paper Title & Subtitle */}
        <div className="my-6">
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {paperMetadata.title}
          </h1>
          <h2 className="text-sm sm:text-base text-cyan-300 font-mono mt-2 leading-relaxed">
            {paperMetadata.subtitle}
          </h2>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-y border-slate-800 text-xs">
          {paperMetadata.authors.map((author, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-800">
              <div className="flex items-center gap-2 text-white font-bold font-heading text-sm">
                <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{author.name}</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1 leading-snug">
                {author.affiliation}
              </p>
              <a 
                href={`mailto:${author.email}`} 
                className="text-cyan-400/80 hover:text-cyan-300 text-[10px] font-mono mt-1 inline-block"
              >
                {author.email}
              </a>
            </div>
          ))}
        </div>

        {/* Metadata & Actions Strip */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Published: <strong className="text-slate-200">{paperMetadata.publishedDate}</strong>
            </span>
            <span className="flex items-center gap-1.5 cursor-pointer text-cyan-400 hover:text-cyan-300" onClick={handleCopyDoi}>
              DOI: {paperMetadata.doi}
              {copiedDoi ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full Paper (PDF)</span>
            </button>
          </div>
        </div>

        {/* Abstract Box */}
        <div className="mt-6 p-5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs leading-relaxed text-slate-200">
          <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider block mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-400" /> Executive Abstract
          </span>
          <p className="font-sans text-slate-300 leading-relaxed text-[13px]">
            {paperMetadata.abstract}
          </p>

          {/* Keywords */}
          <div className="mt-4 pt-3 border-t border-cyan-500/20 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-slate-400 text-[11px] mr-1">Index Keywords:</span>
            {paperMetadata.keywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-black/50 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Journal Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sticky Table of Contents Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 hud-panel p-5 rounded-xl border border-cyan-500/20 space-y-4">
            <span className="font-mono text-xs font-bold uppercase text-slate-300 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-cyan-400" />
              Table of Contents
            </span>
            <nav className="space-y-1 text-xs font-mono">
              {researchSections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSectionId(sec.id);
                      document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <span className="truncate pr-2">
                      <strong className="text-cyan-400 mr-1.5">{sec.number}</strong>
                      {sec.title}
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 space-y-1">
              <div>Total Word Count: ~8,400 words</div>
              <div>Citations: 54 Peer-Reviewed Sources</div>
              <div>Equations: 18 Formulations</div>
            </div>
          </div>
        </div>

        {/* Right Paper Body Content */}
        <div className="lg:col-span-8 space-y-8">
          {researchSections.map((sec) => (
            <article 
              key={sec.id} 
              id={sec.id}
              className="hud-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/20 scroll-mt-24 space-y-4"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-cyan-500/20">
                <span className="font-mono font-bold text-sm text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/40">
                  {sec.number}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {sec.title}
                </h3>
              </div>

              {/* Main Section Paragraphs */}
              <div className="space-y-3 text-slate-300 font-sans text-sm leading-relaxed">
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Subsections if present */}
              {sec.subsections && sec.subsections.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-6">
                  {sec.subsections.map((sub) => (
                    <div key={sub.id} id={sub.id} className="space-y-2">
                      <h4 className="font-heading text-base font-bold text-cyan-300 flex items-center gap-2">
                        <span className="font-mono text-xs text-teal-400">{sub.number}</span>
                        {sub.title}
                      </h4>
                      <div className="space-y-2 text-slate-300 font-sans text-sm leading-relaxed pl-4 border-l-2 border-cyan-500/30">
                        {sub.content.map((subP, subPIdx) => (
                          <p key={subPIdx}>{subP}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
