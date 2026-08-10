import React from "react";
import { Html, Line } from "@react-three/drei";
import { useAppStore } from "../../store/useAppStore";

export function DimensionCallouts() {
  const isTechnical = useAppStore((state) => state.isTechnicalMode);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);

  if (!isTechnical) return null;

  // Staggered callout pin positions & leader lines matching Reference Image 2
  const items = [
    { id: "engine", num: "01", pos: [13.5, 3.8, 0], anchor: [13.5, 0, 0], title: "01 ENGINE (3-CYLINDER)", desc: "Fuel combustion produces high-pressure, high-temp exhaust gas" },
    { id: "exhaustPipe", num: "02", pos: [9.5, 2.8, 0], anchor: [9.5, 0, 0], title: "02 EXHAUST PIPE", desc: "Transports exhaust from engine to chamber" },
    { id: "mufflerChamber", num: "03", pos: [5.25, 4.2, 0], anchor: [5.25, 0, 0], title: "03 EXHAUST CHAMBER", desc: "Expands and conditions exhaust flow before nozzle" },
    { id: "nozzle", num: "04", pos: [2.5, 3.2, 0], anchor: [2.5, 0, 0], title: "04 HIGH-VELOCITY NOZZLE", desc: "Accelerates exhaust creating high-velocity jet" },
    { id: "turbine", num: "05", pos: [0.0, 4.2, 0], anchor: [0.0, 0, 0], title: "05 12-BLADE TURBINE", desc: "Exhaust jet rotates 12 blades converting fluid energy into shaft power" },
    { id: "shaft", num: "06", pos: [-1.5, 2.2, 0], anchor: [-1.5, 0, 0], title: "06 COMMON SHAFT", desc: "Transmits rotational energy to generator" },
    { id: "deflector", num: "07", pos: [-2.8, 3.8, 0], anchor: [-2.8, 0, 0], title: "07 SLANTED DEFLECTOR", desc: "Redirects exhaust flow upward after turbine passage" },
    { id: "bypassValve", num: "08", pos: [0.0, -3.8, 0], anchor: [0.0, -2.6, 0], title: "08 BYPASS VALVE", desc: "Controls alternate exhaust path to manage flow" },
    { id: "generator", num: "09", pos: [-7.2, 3.8, 0], anchor: [-7.2, 0, 0], title: "09 GENERATOR G", desc: "Converts rotational mechanical power into electricity" },
    { id: "powerElectronics", num: "10", pos: [-7.2, -3.8, 1.8], anchor: [-7.2, -3.2, 1.8], title: "10 POWER ELECTRONICS", desc: "Conditions and regulates electrical output" },
    { id: "batteryPack", num: "11", pos: [-2.5, -4.2, 2.5], anchor: [-2.5, -3.5, 2.5], title: "11 BATTERY PACK", desc: "Stores electrical energy for vehicle systems" },
    { id: "exhaustOutlet", num: "12", pos: [-3.0, 5.2, 0], anchor: [-3.0, 2.5, 0], title: "12 EXHAUST OUTLET", desc: "Vents de-energized exhaust out to atmosphere" },
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

      {/* Floating Glassmorphism Technical Cards & Pointer Lines matching Reference Image 2 */}
      {items.map((item) => (
        <group key={item.id}>
          {/* Leader Pointer Line */}
          <Line
            points={[item.pos, item.anchor]}
            color="#38bdf8"
            lineWidth={1.5}
          />

          {/* Anchor Sphere Pin */}
          <mesh position={item.anchor}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          {/* Glassmorphism Callout Tag */}
          <group
            position={item.pos}
            onClick={(e) => {
              e.stopPropagation();
              setSelected(item.id);
            }}
          >
            <Html center distanceFactor={22}>
              <div className="p-2 rounded-xl bg-slate-900/90 border border-cyan-500/50 shadow-2xl text-left backdrop-blur-md pointer-events-auto cursor-pointer hover:border-cyan-400 hover:scale-105 transition-all max-w-[180px]">
                <div className="text-[10px] font-bold font-mono text-cyan-400 uppercase tracking-wider mb-0.5">
                  {item.title}
                </div>
                <div className="text-[9px] text-slate-300 leading-tight font-sans">
                  {item.desc}
                </div>
              </div>
            </Html>
          </group>
        </group>
      ))}
    </group>
  );
}
