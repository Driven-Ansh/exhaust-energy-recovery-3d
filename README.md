# Heavy-Duty Exhaust Energy Recovery System — Interactive 3D Presentation Model

An interactive, high-fidelity 3D mechanical engineering visualization and simulation web application based **EXACTLY** on a hand-drawn reference sketch for a heavy-vehicle exhaust energy recovery system.

🌐 **Live Online Demo**: [https://driven-ansh.github.io/exhaust-energy-recovery-3d/](https://driven-ansh.github.io/exhaust-energy-recovery-3d/)  
📦 **GitHub Repository**: [https://github.com/Driven-Ansh/exhaust-energy-recovery-3d](https://github.com/Driven-Ansh/exhaust-energy-recovery-3d)

---

## 🎯 Concept & Sketch Fidelity

Reconstructs the original hand-drawn concept sketch as a clean, photorealistic WebGL CAD machine:

1. **Engine / Combustion Source** (`01`) — Heavy-duty engine exhaust port.
2. **Main Exhaust Pipe** (`02`) — Stainless steel ducting transporting hot gas.
3. **Exhaust / Muffler Chamber** (`03`) — Large elongated oval/cylindrical expansion chamber.
4. **High-Velocity Exhaust Nozzle** (`04`) — Convergent throat accelerating flow velocity toward the turbine.
5. **12-Blade Turbine** (`05`) — Concentric radial impulse turbine containing **EXACTLY 12 aerodynamic blades**.
6. **Common Rotational Shaft** (`06`) — Single central mechanical axis transmitting 1:1 torque from turbine to generator.
7. **Slanted Exhaust Deflector** (`07`) — Slanted metal sheet angled at ~52° to redirect post-turbine exhaust upward.
8. **Bypass Valve System** (`08`) — Secondary diversion loop with an animated mechanical butterfly valve.
9. **Electrical Generator G** (`09`) — Industrial permanent magnet generator coupled to the common shaft.
10. **Power Electronics** (`10`) — Solid-state inverter module for energy conditioning.
11. **Vehicle Battery Pack** (`11`) — High-voltage battery pack receiving recovered electrical energy.
12. **Exhaust Outlet** (`12`) — Top exit tailpipe discharging de-energized exhaust gas.

---

## 🕹️ Interactive Features

* **Full 360-Degree Camera Controls**: Rotate freely around all axes (360° top, bottom, sides), pan, and zoom in/out to inspect individual turbine blades or shaft details.
* **Simulate Process**: Single-click automated 12-phase cinematic presentation sequence with camera movements, rotation animations, and step narration.
* **Component Inspection**: Click any 3D component to highlight it and open its technical specification card.
* **Visualization Modes**:
  * **Normal**: Realistic metallic PBR shaders with studio environment lighting.
  * **Cutaway**: Semi-transparent outer housing for inspecting internal gas flow, nozzle throat, 12 turbine blades, and slanted deflector plate.
  * **Exploded View**: Smoothly separates components along assembly axes.
  * **Technical Mode**: Engineering blueprint grid, axis centerlines, 3D dimension lines, and numbered callouts (`01`–`12`).
  * **Vehicle Context**: Semi-transparent heavy-duty semi-truck chassis overlay.

---

## 🛠️ Tech Stack

* **React 19**, **Vite**
* **Three.js**, **React Three Fiber**, **Drei**
* **Zustand** (State Management)
* **Tailwind CSS v4**

---

## 🚀 Local Setup

```bash
git clone https://github.com/Driven-Ansh/exhaust-energy-recovery-3d.git
cd exhaust-energy-recovery-3d
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.
