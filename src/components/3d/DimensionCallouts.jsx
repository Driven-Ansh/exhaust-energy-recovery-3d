import React from "react";
import { Text, Line } from "@react-three/drei";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function DimensionCallouts() {
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  if (!isTechnical) return null;

  return (
    <group>
      {/* Central Rotation Axis Centerline Line */}
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
      <Text position={[2.5, 0.4, 0]} fontSize={0.3} color="#38bdf8">
        CENTER ROTATIONAL AXIS
      </Text>

      {/* Overall Length Dimension Line */}
      <Line
        points={[
          [13.5, 5, 0],
          [-9.0, 5, 0],
        ]}
        color="#f59e0b"
        lineWidth={1.5}
      />
      <Text position={[2.25, 5.4, 0]} fontSize={0.45} color="#f59e0b">
        OVERALL SYSTEM LENGTH: 23.5 UNITS (Normalized CAD)
      </Text>

      {/* Nozzle Throat Diameter Dimension Callout */}
      <Line
        points={[
          [2.5, 1.8, 0],
          [2.5, -1.8, 0],
        ]}
        color="#ef4444"
        lineWidth={1.5}
      />
      <Text position={[2.5, -2.2, 0]} fontSize={0.35} color="#ef4444">
        NOZZLE CONTRACTION (ø 170mm THROAT)
      </Text>

      {/* 12-Blade Turbine Axis Indicator */}
      <Line
        points={[
          [0, 2.2, 0],
          [0, -2.2, 0],
        ]}
        color="#10b981"
        lineWidth={1.5}
      />
      <Text position={[0, 2.5, 0]} fontSize={0.38} color="#10b981">
        12-BLADE TURBINE ROTOR AXIS
      </Text>

      {/* Component Index Numbering Legend Badges 01 - 12 */}
      {[
        { id: "01", pos: [13.5, 3.0, 0], name: "ENGINE" },
        { id: "02", pos: [9.5, 2.0, 0], name: "PIPE" },
        { id: "03", pos: [5.25, 3.2, 0], name: "MUFFLER" },
        { id: "04", pos: [2.5, 2.5, 0], name: "NOZZLE" },
        { id: "05", pos: [0.0, 2.8, 0], name: "12-BLADE TURBINE" },
        { id: "06", pos: [-1.5, 1.8, 0], name: "SHAFT" },
        { id: "07", pos: [-2.8, 3.0, 0], name: "DEFLECTOR" },
        { id: "08", pos: [0.0, -3.8, 0], name: "BYPASS VALVE" },
        { id: "09", pos: [-7.2, 3.0, 0], name: "GENERATOR G" },
        { id: "10", pos: [-7.2, -4.2, 1.8], name: "POWER ELECTRONICS" },
        { id: "11", pos: [-2.5, -4.5, 2.5], name: "BATTERY PACK" },
        { id: "12", pos: [-3.0, 4.2, 0], name: "EXIT OUTLET" },
      ].map((item) => (
        <group key={item.id} position={item.pos}>
          <mesh>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshBasicMaterial color="#0284c7" />
          </mesh>
          <Text fontSize={0.35} color="#ffffff" anchorX="center" anchorY="middle">
            {item.id}
          </Text>
        </group>
      ))}
    </group>
  );
}
