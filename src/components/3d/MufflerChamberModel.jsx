import React from "react";
import { Text } from "@react-three/drei";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function MufflerChamberModel() {
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  const isSelected = selectedId === "mufflerChamber";
  const isHovered = hoveredId === "mufflerChamber";

  const { position, length, radiusY, radiusZ } = SYSTEM_DIMENSIONS.mufflerChamber;

  const explodedOffset = viewMode === "exploded" ? 2.0 : 0;
  const currentX = position[0] + explodedOffset;

  return (
    <group
      position={[currentX, position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("mufflerChamber");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("mufflerChamber");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {/* Oval / Elongated Cylindrical Housing Shell */}
      <mesh rotation={[0, 0, Math.PI / 2]} scale={[radiusY, 1, radiusZ]} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, length, 48, 1, false]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#475569"}
          metalness={0.88}
          roughness={0.22}
          side={2}
          transparent={viewMode === "cutaway"}
          opacity={viewMode === "cutaway" ? 0.3 : 0.96}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Internal Perforated Baffle Tube (Visible in cutaway mode) */}
      <mesh rotation={[0, 0, Math.PI / 2]} scale={[radiusY * 0.45, 1, radiusZ * 0.45]}>
        <cylinderGeometry args={[1, 1, length * 0.9, 24, 1, true]} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.9}
          roughness={0.2}
          wireframe
          transparent
          opacity={viewMode === "cutaway" ? 0.7 : 0.2}
        />
      </mesh>

      {/* Structural Steel Clamp Bands around Muffler Body */}
      {[-length * 0.3, 0, length * 0.3].map((xOffset, i) => (
        <mesh
          key={i}
          position={[xOffset, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[radiusY * 1.03, 1, radiusZ * 1.03]}
          castShadow
        >
          <cylinderGeometry args={[1, 1, 0.12, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.15} />
        </mesh>
      ))}

      {/* Heavy End Caps */}
      {[-length / 2, length / 2].map((xPos, idx) => (
        <mesh
          key={idx}
          position={[xPos, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          scale={[radiusY * 1.01, 1, radiusZ * 1.01]}
          castShadow
        >
          <cylinderGeometry args={[1, 1, 0.15, 36]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.25} />
        </mesh>
      ))}

      {/* Selection outline */}
      {(isSelected || isHovered) && (
        <mesh rotation={[0, 0, Math.PI / 2]} scale={[radiusY * 1.05, 1, radiusZ * 1.05]}>
          <cylinderGeometry args={[1, 1, length + 0.15, 36]} />
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
          position={[0, radiusY + 0.9, 0]}
          fontSize={0.45}
          color={isSelected ? "#38bdf8" : "#94a3b8"}
          anchorX="center"
          anchorY="bottom"
        >
          03. EXHAUST / MUFFLER CHAMBER
        </Text>
      )}
    </group>
  );
}
