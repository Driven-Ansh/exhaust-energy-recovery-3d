import React from "react";
import { Html } from "@react-three/drei";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function DimensionCallouts() {
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  if (!isTechnical) return null;

  const items = [
    { id: "01", pos: [13.5, 3.0, 0], name: "ENGINE" },
    { id: "02", pos: [9.5, 2.0, 0], name: "EXHAUST PIPE" },
    { id: "03", pos: [5.25, 3.2, 0], name: "MUFFLER CHAMBER" },
    { id: "04", pos: [2.5, 2.5, 0], name: "NOZZLE" },
    { id: "05", pos: [0.0, 2.8, 0], name: "12-BLADE TURBINE" },
    { id: "06", pos: [-1.5, 1.8, 0], name: "COMMON SHAFT" },
    { id: "07", pos: [-2.8, 3.0, 0], name: "SLANTED DEFLECTOR" },
    { id: "08", pos: [0.0, -3.8, 0], name: "BYPASS VALVE" },
    { id: "09", pos: [-7.2, 3.0, 0], name: "GENERATOR G" },
    { id: "10", pos: [-7.2, -4.2, 1.8], name: "POWER ELECTRONICS" },
    { id: "11", pos: [-2.5, -4.5, 2.5], name: "BATTERY PACK" },
    { id: "12", pos: [-3.0, 4.2, 0], name: "EXHAUST OUTLET" },
  ];

  return (
    <group>
      {/* Component Index Numbering Badges using lightweight HTML overlay */}
      {items.map((item) => (
        <group key={item.id} position={item.pos}>
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <Html center distanceFactor={20}>
            <div className="px-2 py-0.5 rounded bg-slate-900/90 border border-cyan-500/50 text-[11px] font-mono font-bold text-cyan-400 whitespace-nowrap shadow-lg">
              {item.id}. {item.name}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
