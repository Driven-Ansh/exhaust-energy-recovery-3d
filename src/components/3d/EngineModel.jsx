import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function EngineModel() {
  const meshRef = useRef();
  const glowRef = useRef();
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  const isSelected = selectedId === "engine";
  const isHovered = hoveredId === "engine";

  const { position, width, height, depth } = SYSTEM_DIMENSIONS.engine;
  const currentX = position[0] + (viewMode === "exploded" ? 4.0 : 0);

  useFrame((state) => {
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 4) * 0.3 + 0.7;
      glowRef.current.material.emissiveIntensity = isSelected ? 2.0 : pulse * 0.9;
    }
  });

  return (
    <group
      position={[currentX, position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("engine");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("engine");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {/* Heavy Engine Block */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#475569"}
          metalness={0.85}
          roughness={0.25}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Bright Silver Valve Cover Top */}
      <mesh position={[0, height / 2 + 0.25, 0]} castShadow>
        <boxGeometry args={[width * 0.85, 0.5, depth * 0.85]} />
        <meshStandardMaterial color="#f8fafc" metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Exhaust Header Outlets */}
      {[-0.9, -0.3, 0.3, 0.9].map((zOffset, i) => (
        <mesh key={i} position={[-width / 2 - 0.2, 0, zOffset]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.25, 0.5, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.2} />
        </mesh>
      ))}

      {/* Internal Combustion Port Glowing Chamber */}
      <mesh ref={glowRef} position={[-width / 2 + 0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 0.3, 24]} />
        <meshStandardMaterial
          color="#ea580c"
          emissive="#ea580c"
          emissiveIntensity={1.0}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Selection outline */}
      {(isSelected || isHovered) && (
        <mesh>
          <boxGeometry args={[width + 0.15, height + 0.15, depth + 0.15]} />
          <meshBasicMaterial
            color={isSelected ? "#38bdf8" : "#f59e0b"}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
}
