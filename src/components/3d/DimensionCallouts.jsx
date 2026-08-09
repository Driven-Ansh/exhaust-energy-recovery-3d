import React from "react";
import { Html, Line } from "@react-three/drei";
import { useAppStore } from "../../store/useAppStore";

export function DimensionCallouts() {
  const isTechnical = useAppStore((state) => state.isTechnicalMode);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);

  if (!isTechnical) return null;

  // Well-spaced callout positions along assembly axis (Y-offset staggered to prevent overlap)
  const items = [
    { id: "engine", num: "01", pos: [13.5, 3.8, 0], label: "01. ENGINE / COMBUSTION" },
    { id: "exhaustPipe", num: "02", pos: [9.5, 2.2, 0], label: "02. EXHAUST PIPE" },
    { id: "mufflerChamber", num: "03", pos: [5.25, 4.2, 0], label: "03. MUFFLER CHAMBER" },
    { id: "nozzle", num: "04", pos: [2.5, 2.8, 0], label: "04. CONVERGENT NOZZLE" },
    { id: "turbine", num: "05", pos: [0.0, 4.0, 0], label: "05. 12-BLADE TURBINE" },
    { id: "shaft", num: "06", pos: [-1.5, 2.0, 0], label: "06. COMMON SHAFT" },
    { id: "deflector", num: "07", pos: [-2.8, 3.8, 0], label: "07. SLANTED DEFLECTOR" },
    { id: "bypassValve", num: "08", pos: [0.0, -3.8, 0], label: "08. BYPASS VALVE" },
    { id: "generator", num: "09", pos: [-7.2, 3.8, 0], label: "09. GENERATOR G" },
    { id: "powerElectronics", num: "10", pos: [-7.2, -3.8, 1.8], label: "10. POWER ELECTRONICS" },
    { id: "batteryPack", num: "11", pos: [-2.5, -4.2, 2.5], label: "11. BATTERY PACK" },
    { id: "exhaustOutlet", num: "12", pos: [-3.0, 5.2, 0], label: "12. EXHAUST OUTLET" },
  ];

  return (
    <group>
      {/* Central Shaft Axis Line */}
      <Line
        points={[
          [14, 0, 0],
          [-9, 0, 0],
        ]}
        color="#38bdf8"
        lineWidth={2}
        dashed
        dashScale={2}
      />

      {/* Component Index Numbering Badges */}
      {items.map((item) => (
        <group
          key={item.id}
          position={item.pos}
          onClick={(e) => {
            e.stopPropagation();
            setSelected(item.id);
          }}
          className="cursor-pointer"
        >
          {/* Glowing 3D Sphere Pin */}
          <mesh>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#38bdf8"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Clean Non-Overlapping HTML Badge Tag */}
          <Html center distanceFactor={22}>
            <div className="px-2.5 py-1 rounded-lg bg-slate-900/95 border border-cyan-500/60 text-cyan-300 font-mono text-[11px] font-bold tracking-wide whitespace-nowrap shadow-xl hover:bg-cyan-500 hover:text-slate-950 transition-all pointer-events-auto">
              {item.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
