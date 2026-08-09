import React from "react";
import { Text } from "@react-three/drei";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function DeflectorModel() {
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  const isSelected = selectedId === "deflector";
  const isHovered = hoveredId === "deflector";

  const { position, angleDegrees, width, height, thickness } = SYSTEM_DIMENSIONS.deflector;

  const explodedOffset = viewMode === "exploded" ? -1.0 : 0;
  const currentX = position[0] + explodedOffset;
  const radAngle = (angleDegrees * Math.PI) / 180;

  return (
    <group
      position={[currentX, position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("deflector");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("deflector");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {/* Slanted Metal Baffle Plate matching sketch angle */}
      <mesh rotation={[0, 0, radAngle]} castShadow receiveShadow>
        <boxGeometry args={[thickness, height, width]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#64748b"}
          metalness={0.9}
          roughness={0.2}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Central Shaft Clearance Hole Collar on Slanted Plate */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, thickness * 1.5, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Selection outline */}
      {(isSelected || isHovered) && (
        <mesh rotation={[0, 0, radAngle]}>
          <boxGeometry args={[thickness + 0.06, height + 0.08, width + 0.08]} />
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
          position={[0, height / 2 + 0.5, 0]}
          fontSize={0.4}
          color={isSelected ? "#38bdf8" : "#94a3b8"}
          anchorX="center"
          anchorY="bottom"
        >
          07. SLANTED DEFLECTOR
        </Text>
      )}
    </group>
  );
}
