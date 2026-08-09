import React from "react";
import { Text } from "@react-three/drei";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function ExhaustOutletModel() {
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  const isSelected = selectedId === "exhaustOutlet";
  const isHovered = hoveredId === "exhaustOutlet";

  const { position, radius, length } = SYSTEM_DIMENSIONS.exhaustOutlet;
  const explodedOffset = viewMode === "exploded" ? -1.0 : 0;
  const currentX = position[0] + explodedOffset;

  return (
    <group
      position={[currentX, position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("exhaustOutlet");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("exhaustOutlet");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {/* Upward Exit Duct */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 32, 1, true]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#64748b"}
          metalness={0.9}
          roughness={0.25}
          side={2}
          transparent={viewMode === "cutaway"}
          opacity={viewMode === "cutaway" ? 0.4 : 1.0}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Collar */}
      <mesh position={[0, -length / 2, 0]} castShadow>
        <cylinderGeometry args={[radius * 1.25, radius * 1.25, 0.15, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Selection outline */}
      {(isSelected || isHovered) && (
        <mesh>
          <cylinderGeometry args={[radius + 0.05, radius + 0.05, length + 0.1, 24]} />
          <meshBasicMaterial
            color={isSelected ? "#38bdf8" : "#f59e0b"}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Show 3D Label ONLY in Technical Mode */}
      {isTechnical && (
        <Text
          position={[0, length / 2 + 0.6, 0]}
          fontSize={0.4}
          color={isSelected ? "#38bdf8" : "#94a3b8"}
          anchorX="center"
          anchorY="bottom"
        >
          12. EXHAUST OUTLET
        </Text>
      )}
    </group>
  );
}
