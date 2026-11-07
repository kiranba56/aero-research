import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TimelineModule } from './components/TimelineModule';
import { HangarModule } from './components/HangarModule';
import { WindTunnelSimulator } from './components/WindTunnelSimulator';
import { FlightEnvelopeModule } from './components/FlightEnvelopeModule';
import { PropulsionLabModule } from './components/PropulsionLabModule';
import { AeroQuizModule } from './components/AeroQuizModule';
import { AircraftDetailModal } from './components/AircraftDetailModal';
import { ResearchDossierExportModal } from './components/ResearchDossierExportModal';
import { Footer } from './components/Footer';
import { AIRCRAFT_DATA } from './data/aircraftData';
import { Aircraft } from './types/aircraft';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | null>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false);
  const [pdfPreselectedIds, setPdfPreselectedIds] = useState<string[]>([]);

  // Smooth scroll to top on tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAircraftById = (id: string) => {
    const found = AIRCRAFT_DATA.find(a => a.id === id);
    if (found) {
      setSelectedAircraft(found);
    }
  };

  const handleOpenPdfWithSelection = (ids: string[]) => {
    setPdfPreselectedIds(ids);
    setPdfModalOpen(true);
  };

  const handleOpenGeneralPdf = () => {
    setPdfPreselectedIds([]);
    setPdfModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* HUD Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange}
        onOpenPdfModal={handleOpenGeneralPdf}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <HeroSection 
              onNavigate={handleTabChange}
              onOpenPdfModal={handleOpenGeneralPdf}
              onSelectAircraft={handleSelectAircraftById}
            />
            {/* Embedded Hangar Preview on Overview */}
            <HangarModule 
              onSelectAircraft={handleSelectAircraftById}
              onOpenPdfModalWithSelection={handleOpenPdfWithSelection}
            />
            {/* Embedded Wind Tunnel Simulator Preview */}
            <WindTunnelSimulator />
            {/* Embedded Flight Envelopes Preview */}
            <FlightEnvelopeModule />
          </div>
        )}

        {activeTab === 'timeline' && (
          <TimelineModule onSelectAircraft={handleSelectAircraftById} />
        )}

        {activeTab === 'hangar' && (
          <HangarModule 
            onSelectAircraft={handleSelectAircraftById}
            onOpenPdfModalWithSelection={handleOpenPdfWithSelection}
          />
        )}

        {activeTab === 'simulator' && (
          <WindTunnelSimulator />
        )}

        {activeTab === 'envelopes' && (
          <FlightEnvelopeModule />
        )}

        {activeTab === 'propulsion' && (
          <PropulsionLabModule />
        )}

        {activeTab === 'quiz' && (
          <AeroQuizModule />
        )}
      </main>

      {/* Detail Modal for Selected Aircraft */}
      <AircraftDetailModal 
        aircraft={selectedAircraft}
        onClose={() => setSelectedAircraft(null)}
      />

      {/* Research Dossier PDF Generator Modal */}
      <ResearchDossierExportModal 
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        preselectedIds={pdfPreselectedIds}
      />

      {/* Academic Footer */}
      <Footer 
        onNavigate={handleTabChange}
        onOpenPdfModal={handleOpenGeneralPdf}
      />
    </div>
  );
}

export default App;

