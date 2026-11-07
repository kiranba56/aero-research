import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AIRCRAFT_DATA } from '../data/aircraftData';
import { TIMELINE_MILESTONES } from '../data/timelineEvents';

export interface PDFExportOptions {
  selectedAircraftIds?: string[];
  includeTimeline?: boolean;
  includePhysicsSection?: boolean;
  includePropulsionSection?: boolean;
}

export function generateAerospaceReport(options: PDFExportOptions = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryCyan = [6, 140, 180] as [number, number, number];
  const darkNavy = [11, 19, 38] as [number, number, number];
  const slateGray = [100, 116, 139] as [number, number, number];

  // --- COVER / HEADER BANNER ---
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.rect(0, 0, 210, 42, 'F');

  // Cyan Accent Line
  doc.setFillColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
  doc.rect(0, 42, 210, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('AERO RESEARCH LABS', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(165, 243, 252);
  doc.text('ACADEMIC DOSSIER: HISTORY, AERODYNAMICS & PROPULSION EVOLUTION', 14, 26);

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`DOCUMENT ID: AERO-TECH-REP-${new Date().getFullYear()} • ISSUED: ${dateStr}`, 14, 34);

  let currentY = 54;

  // --- EXECUTIVE SUMMARY ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('1. Executive Abstract', 14, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const summaryText = 
    'Aviation has evolved from wood, wire, and muslin biplanes achieving 48 km/h in 1903 to carbon-composite, ' +
    'stealth, and quiet supersonic transports cruising beyond Mach 2 at 60,000 feet. This research monograph compiles ' +
    'systematic engineering data regarding the fundamental aerodynamic milestones, thermodynamic propulsion paradigms ' +
    '(from reciprocating internal combustion to turboramjets and boundary-layer-ingesting blended wings), and the mathematical ' +
    'principles governing flight dynamics in the International Standard Atmosphere.';
  
  const splitSummary = doc.splitTextToSize(summaryText, 182);
  doc.text(splitSummary, 14, currentY);
  currentY += splitSummary.length * 4.5 + 6;

  // --- AERODYNAMIC EQUATIONS BOX ---
  if (options.includePhysicsSection !== false) {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, currentY, 182, 32, 2, 2, 'F');
    doc.setDrawColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(14, currentY, 182, 32, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryCyan[0], primaryCyan[1], primaryCyan[2]);
    doc.text('Core Aerodynamic Governing Formulations', 18, currentY + 6);

    doc.setFont('courier', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text('Lift: L = 0.5 * rho * V^2 * S * C_L     |  Drag: D = 0.5 * rho * V^2 * S * C_D', 18, currentY + 13);
    doc.text('Induced Drag: C_Di = C_L^2 / (pi * e * AR) |  Dynamic Pressure: q = 0.5 * rho * V^2', 18, currentY + 19);
    doc.text('Mach Number: M = V / a                 |  Speed of Sound: a = sqrt(gamma * R * T)', 18, currentY + 25);
    currentY += 40;
  }

  // --- HISTORICAL MILESTONES TABLE ---
  if (options.includeTimeline !== false) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text('2. Chronological Milestones in Aviation History', 14, currentY);
    currentY += 4;

    const timelineRows = TIMELINE_MILESTONES.slice(0, 10).map((m) => [
      m.year.toString(),
      m.title,
      m.era.split(' ')[0],
      m.technicalImpact
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['Year', 'Milestone', 'Era', 'Engineering Impact']],
      body: timelineRows,
      theme: 'grid',
      headStyles: {
        fillColor: darkNavy,
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fontSize: 7.5,
        textColor: [30, 41, 59],
      },
      columnStyles: {
        0: { cellWidth: 14, fontStyle: 'bold' },
        1: { cellWidth: 42, fontStyle: 'bold' },
        2: { cellWidth: 26 },
        3: { cellWidth: 100 },
      },
      margin: { left: 14, right: 14 },
    });

    // @ts-ignore
    currentY = doc.lastAutoTable.finalY + 12;
  }

  // --- AIRCRAFT SPECIFICATION MATRIX ---
  if (currentY > 220) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('3. Comparative Aircraft Performance & Structural Matrix', 14, currentY);
  currentY += 4;

  const targetAircraft = options.selectedAircraftIds && options.selectedAircraftIds.length > 0
    ? AIRCRAFT_DATA.filter((a) => options.selectedAircraftIds?.includes(a.id))
    : AIRCRAFT_DATA;

  const aircraftRows = targetAircraft.map((a) => [
    a.name,
    a.year.toString(),
    a.category,
    `${a.topSpeedKmh} km/h (M${a.topSpeedMach})`,
    `${(a.serviceCeilingM / 1000).toFixed(1)} km`,
    `${a.rangeKm.toLocaleString()} km`,
    `${(a.mtowKg / 1000).toFixed(1)} t`,
    a.propulsionType.split(' ')[0]
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Aircraft', 'Year', 'Role', 'Max Speed', 'Ceiling', 'Range', 'MTOW', 'Engine']],
    body: aircraftRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryCyan,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 32 },
      1: { cellWidth: 12 },
      2: { cellWidth: 24 },
      3: { cellWidth: 28 },
      4: { cellWidth: 18 },
      5: { cellWidth: 22 },
      6: { cellWidth: 16 },
      7: { cellWidth: 30 },
    },
    margin: { left: 14, right: 14 },
  });

  // @ts-ignore
  currentY = doc.lastAutoTable.finalY + 12;

  // --- PROPULSION & FUTURE HORIZONS ---
  if (currentY > 210) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('4. Propulsion Evolution & The Next Century of Flight', 14, currentY);
  currentY += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const propulsionText = 
    'The 20th century conquered velocity and altitude through internal combustion superchargers, turbojets, and ' +
    'high-bypass turbofans. The 21st century paradigm has shifted toward aerodynamic environmental efficiency and acoustic management. ' +
    'The elimination of the sonic boom through NASA X-59 shockwave-tailoring, combined with ultra-high lift-to-drag Blended Wing Bodies ' +
    '(L/D > 26:1) and liquid hydrogen cryogenic propulsion, points toward a sustainable net-zero aviation future.';
  
  const splitPropulsion = doc.splitTextToSize(propulsionText, 182);
  doc.text(splitPropulsion, 14, currentY);
  currentY += splitPropulsion.length * 4.2 + 8;

  // Add Page Numbers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(slateGray[0], slateGray[1], slateGray[2]);
    doc.text(
      `AERO RESEARCH ACADEMIC MONOGRAPH • Page ${i} of ${totalPages}`,
      14,
      290
    );
    doc.text('CONFIDENTIAL / ACADEMIC USE ONLY', 145, 290);
  }

  doc.save(`Aero_Research_Monograph_${new Date().toISOString().slice(0, 10)}.pdf`);
}

