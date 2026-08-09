import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function GeneratorModel() {
  const rotorRef = useRef();
  const auraRef = useRef();
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);

  const isSelected = selectedId === "generator";
  const isHovered = hoveredId === "generator";

  const { position, length, radius, statorFins } = SYSTEM_DIMENSIONS.generator;
  const explodedOffset = viewMode === "exploded" ? -2.5 : 0;
  const currentX = position[0] + explodedOffset;

  const rotationSpeed = (isSimulating && !isPaused ? 8.0 : isSelected ? 1.5 : 0.3) * simulationSpeed;

  useFrame((state, delta) => {
    if (rotorRef.current && (isSimulating || isSelected || isHovered)) {
      rotorRef.current.rotation.x += delta * rotationSpeed;
    }
    if (auraRef.current) {
      auraRef.current.material.opacity = isSimulating
        ? Math.sin(state.clock.elapsedTime * 6) * 0.15 + 0.35
        : 0.1;
    }
  });

  return (
    <group
      position={[currentX, position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("generator");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("generator");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {/* Heavy Cylindrical Stator Housing */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 48, 1, false]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#1e293b"}
          metalness={0.88}
          roughness={0.22}
          side={2}
          transparent={viewMode === "cutaway"}
          opacity={viewMode === "cutaway" ? 0.3 : 0.96}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Cooling Fins around Stator */}
      {Array.from({ length: statorFins }).map((_, i) => {
        const finAngle = (i * 2 * Math.PI) / statorFins;
        return (
          <mesh
            key={i}
            rotation={[finAngle, 0, Math.PI / 2]}
            position={[0, Math.sin(finAngle) * (radius + 0.08), Math.cos(finAngle) * (radius + 0.08)]}
          >
            <boxGeometry args={[length * 0.9, 0.12, 0.06]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Internal Rotor Hub & Copper Winding */}
      <group ref={rotorRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius * 0.65, radius * 0.65, length * 0.8, 24]} />
          <meshStandardMaterial color="#b45309" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Electromagnetic Energy Field Aura */}
      <mesh ref={auraRef} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius + 0.2, radius + 0.2, length + 0.1, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
      </mesh>

      {/* Junction Box */}
      <mesh position={[0, radius + 0.35, 0]} castShadow>
        <boxGeometry args={[0.9, 0.5, 0.8]} />
        <meshStandardMaterial color="#d97706" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 3D Geometric 'G' Emblem on End Cap (Zero Font Network Dependencies) */}
      <group position={[-length / 2 - 0.05, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Outer Ring of G */}
        <mesh>
          <torusGeometry args={[0.7, 0.12, 16, 32, Math.PI * 1.5]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Horizontal Bar of G */}
        <mesh position={[0.2, 0, 0]}>
          <boxGeometry args={[0.5, 0.12, 0.12]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Selection outline */}
      {(isSelected || isHovered) && (
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius + 0.08, radius + 0.08, length + 0.1, 36]} />
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
