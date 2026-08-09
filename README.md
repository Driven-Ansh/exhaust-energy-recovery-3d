# Exhaust Energy Recovery System — Interactive 3D Engineering Presentation Model

An interactive, high-fidelity 3D mechanical engineering visualization and simulation web application based **EXACTLY** on the user's hand-drawn concept sketch.

![3D Engineering Model Overview](https://img.shields.io/badge/Status-Complete%20%26%20Interactive-success)
![WebGL Three.js](https://img.shields.io/badge/Graphics-WebGL%20%2F%20Three.js-blue)
![React R3F](https://img.shields.io/badge/Framework-React%20%2B%20R3F-cyan)

---

## 🎯 Project Overview & Sketch Fidelity

This project recreates the exact conceptual flow path, component order, and physical arrangement shown in the original hand-drawn engineering reference image:

1. **Engine / Combustion Source** (`01`) — Upstream high-temperature combustion exhaust port.
2. **Main Exhaust Pipe** (`02`) — Stainless steel ducting transporting hot gas.
3. **Exhaust / Muffler Chamber** (`03`) — Large elongated oval/cylindrical chamber for pressure accumulation and acoustic dampening.
4. **High-Velocity Exhaust Nozzle** (`04`) — Convergent throat section accelerating static pressure into high-speed fluid velocity.
5. **12-Blade Turbine** (`05`) — Concentric radial impulse turbine containing **EXACTLY 12 aerodynamic blades** mounted on the shaft.
6. **Common Rotational Shaft** (`06`) — Single central mechanical axis transmitting 1:1 torque from turbine to generator.
7. **Slanted Exhaust Deflector** (`07`) — Slanted metal sheet angled to redirect post-turbine exhaust gas upward into the exit duct.
8. **Interactive Bypass Valve** (`08`) — Secondary diversion loop with an animated mechanical valve disc regulating overpressure.
9. **Electrical Generator G** (`09`) — Industrial permanent magnet synchronous generator coupled to the common shaft.
10. **Power Electronics** (`10`) — Solid-state inverter module regulating power for battery charging.
11. **Vehicle Battery Pack** (`11`) — Traction battery pack receiving recovered electrical current.
12. **Exhaust Outlet** (`12`) — Top exit tailpipe discharging de-energized exhaust gas.

---

## 🚀 Key Features

* **Real-Time 3D Mechanical Model**: Rendered with WebGL using Three.js and React Three Fiber.
* **12-Phase Guided Cinematic Simulation**: A self-running presentation sequence featuring automated camera movements, component highlights, dynamic flow acceleration, spinning turbine/shaft/generator, and live narration overlays.
* **Interactive Component Exploration**: Click any 3D component to isolate it, focus the camera, and open detailed technical specification panels.
* **Multiple Display Modes**:
  * **Normal**: Metallic PBR shaders with studio lighting.
  * **Cutaway**: Semi-transparent shell housing for inspecting internal gas flow, nozzle acceleration, 12 turbine blades, and slanted deflector plate.
  * **Exploded View**: Smoothly separates components along assembly axes.
  * **Technical Mode**: Engineering blueprint grid, 3D dimension callout lines, axis centerlines, and numbered legend callouts (`01`–`12`).
  * **Vehicle Context**: Semi-transparent heavy-duty semi-truck chassis overlay showing system placement under the truck frame.
* **Live Engineering Dashboard**: Calculated real-time metrics (Turbine RPM, Generator Power kW, Battery State of Charge %, Bypass Valve position) with interactive control sliders.
* **Presentation Mode (`PRESENT`)**: Fullscreen, clean presentation view for large-screen project pitches and hackathon demonstrations.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19, Vite
* **3D Graphics Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
* **State Management**: `zustand`
* **Icons & Animation**: `lucide-react`, Framer Motion
* **Styling**: Tailwind CSS v4, Glassmorphism UI tokens

---

## 💻 Local Development

To run the application locally on your machine:

```bash
# 1. Clone or navigate to the project directory
cd exhaust-energy-recovery-3d

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open browser at http://localhost:5173
```

---

## 🌐 Production Build & Vercel Deployment

The project is fully configured for static deployment to Vercel, Netlify, or GitHub Pages.

```bash
# Build production bundle
npm run build

# Output directory: ./dist
```

To deploy to Vercel CLI directly:
```bash
npx vercel
```

---

## ⚙️ How to Modify Dimensions & Simulation Parameters

All mechanical dimensions, radii, lengths, blade counts, and positions are stored centrally in `src/data/dimensions.js`.

```javascript
// src/data/dimensions.js
export const SYSTEM_DIMENSIONS = {
  turbine: {
    bladeCount: 12, // Parametric blade count
    hubRadius: 0.45,
    bladeLength: 1.25,
    bladePitchAngle: 32,
  },
  // ...
};
```
Updating values in `dimensions.js` updates all 3D mesh geometries and technical overlay callouts instantly across the application.
