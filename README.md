# AERO RESEARCH – History & Evolution of Aircraft (1903 – 2030+)

An interactive academic research web application exploring 120+ years of aviation history, aerodynamic breakthroughs, thermodynamic propulsion cycles, flight envelopes, and sustainable net-zero flight horizons.

![Aero Research Cover][def]
---

## ✈️ Features & Capabilities

### 1. 📜 Chronological Flight Archives & Milestones
- **7 Aviation Epochs**: Pioneer Era (1903–1914), WWI & Interwar (1914–1938), WWII & Piston Peak (1939–1945), Jet & Supersonic Dawn (1946–1969), Widebody & Fly-by-Wire (1970–1999), Composites & Stealth (2000–2025), Future Horizons (2026+).
- **Interactive Milestone Stream**: Detailed technical impacts, historical context, key figures, and aerodynamic lore.

### 2. 🛩️ Aircraft Hangar & 4-Way Multi-Spec Comparator
- **19+ Iconic Airframes**: From the 1903 Wright Flyer to the Mach 6.70 North American X-15, SR-71 Blackbird, Concorde, Boeing 747/787, F-16, F-22, F-35, and NASA X-59 QueSST.
- **Side-by-Side Comparison Matrix**: Select up to 4 aircraft simultaneously to compare Top Speed / Mach, Service Ceiling, Combat Range, Wingspan, MTOW, Lift-to-Drag ($L/D$) ratio, and Thrust-to-Weight ($T/W$) ratio.

### 3. 💨 Virtual Wind Tunnel & Aerodynamics Simulator
- **ISA 1976 Standard Atmosphere**: Live ambient air pressure, temperature, density ($\rho$), and speed of sound ($a$) computed from sea level to 25,000 m.
- **Dynamic Fluid Dynamics Visualization**:
  - Live animated streamlines curving around an NACA airfoil.
  - Controls for Angle of Attack ($\alpha$), Airspeed, Altitude, and Camber.
  - Bernoulli pressure differential fields (cyan suction vs amber compression).
  - **Boundary Layer Stall Warning**: Visual turbulent separation vortices when $\alpha > 16^\circ$.
  - **Supersonic Mach Cone**: Oblique shock wave angle $\mu = \arcsin(1/M)$ rendered when $M \ge 1.0$.

### 4. 📊 Flight Envelopes & Analytical Regimes
- **Coffin Corner Convergence**: Altitude vs Mach envelope mapping the perilous high-altitude pinch where stall speed converges with critical Mach buffet.
- **Decadal Fuel Efficiency (1958–2032)**: Tracking an 85% drop in liters per 100 passenger-km across 7 decades.
- **Thrust-to-Weight vs Speed**: Analyzing the $T/W > 1.0$ vertical acceleration threshold.

### 5. 🔥 Propulsion Cycles & Sound Barrier Lab
- **5 Thermodynamic Cycles**: Piston & Supercharger, Pure Turbojet, High-Bypass Turbofan, Hypersonic Ramjet/Scramjet, and Cryogenic Liquid Hydrogen.
- **Whitcomb Area Rule ("Wasp Waist")**: Interactive toggle visualizing how indented fuselage waistlines smooth longitudinal cross-section and eliminate transonic wave drag.

### 6. 🎓 Aero IQ Knowledge Assessment
- Interactive 8-question exam testing fluid dynamics, sound barrier physics, and flight milestones with detailed engineering explanations and certification rank awards.

### 7. 📄 Official Academic Dossier Exporter (PDF)
- Generates a multi-page PDF technical monograph complete with formatted tables, governing equations, and historical milestone indices using `jspdf` and `jspdf-autotable`.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4 + Custom Tactical HUD Styling
- **Charts**: Recharts
- **Icons**: Lucide React
- **Document Generation**: jsPDF + jspdf-autotable
- **Audio Engine**: Native Web Audio API procedural synthesis

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/kiranba56/aero-research.git

# Navigate to project directory
cd aero-research

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5174/` in your browser.

### Building for Production

```bash
npm run build
```

---

## 📚 Academic References & Citations
- NASA Dryden / Armstrong Flight Research Center Technical Reports
- American Institute of Aeronautics and Astronautics (AIAA)
- Smithsonian National Air and Space Museum Archives
- ICAO Standard Atmosphere Model (Doc 7488/3)


[def]: https://www.aerosociety.com/media/19759/december-2022-aerospace-cover-page-001-web.jpg