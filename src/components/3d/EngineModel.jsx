import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function EngineModel() {
  const meshRef = useRef();
  const pistonRefs = useRef([]);
  const rodRefs = useRef([]);
  const combustionRefs = useRef([]);

  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);

  const isSelected = selectedId === "engine";
  const isHovered = hoveredId === "engine";

  const { position, width, height, depth } = SYSTEM_DIMENSIONS.engine;
  const currentX = position[0] + (viewMode === "exploded" ? 4.0 : 0);

  // 3-Cylinder Piston Positions along X axis inside Engine Block
  const cylinderOffsets = [-0.85, 0.0, 0.85];
  // 120-degree phase offsets for 3-cylinder firing order (0, 2.094 rad, 4.188 rad)
  const phaseOffsets = [0, 2.09439, 4.18879];

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime * (isSimulating && !isPaused ? 7.0 : 2.5) * simulationSpeed;

    cylinderOffsets.forEach((_, i) => {
      const cycle = Math.sin(time + phaseOffsets[i]);
      // Piston reciprocating Y position (-0.4 to +0.45)
      const pistonY = cycle * 0.45;

      if (pistonRefs.current[i]) {
        pistonRefs.current[i].position.y = pistonY + 0.1;
      }
      if (rodRefs.current[i]) {
        // Connecting rod swings slightly with crank throw
        rodRefs.current[i].position.y = (pistonY - 0.4) / 2 + 0.1;
        rodRefs.current[i].rotation.z = Math.cos(time + phaseOffsets[i]) * 0.25;
      }
      if (combustionRefs.current[i]) {
        // Combustion light & flame pulse flashes at Top Dead Center (cycle > 0.7)
        const isTDC = cycle > 0.7;
        const flashIntensity = isTDC ? (cycle - 0.7) * 3.33 : 0.0;
        combustionRefs.current[i].material.emissiveIntensity = flashIntensity * 2.5;
        combustionRefs.current[i].scale.setScalar(1.0 + flashIntensity * 0.3);
      }
    });
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
      {/* Transparent Metallic Grey Engine Block Outer Box */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#cbd5e1"}
          metalness={0.88}
          roughness={0.15}
          transparent={true}
          opacity={0.32}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Wireframe Edge Frame */}
      <mesh>
        <boxGeometry args={[width + 0.02, height + 0.02, depth + 0.02]} />
        <meshBasicMaterial color="#94a3b8" wireframe transparent opacity={0.5} />
      </mesh>

      {/* REALISTIC 3-CYLINDER PISTON & RECTIFYING COMBUSTION ASSEMBLY */}
      {cylinderOffsets.map((xPos, i) => (
        <group key={i} position={[xPos, 0, 0]}>
          {/* Cylinder Bore Sleeve Ring */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 1.3, 24, 1, true]} />
            <meshStandardMaterial
              color="#64748b"
              metalness={0.9}
              roughness={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Reciprocating Piston Head */}
          <group ref={(el) => (pistonRefs.current[i] = el)}>
            <mesh castShadow>
              <cylinderGeometry args={[0.34, 0.34, 0.35, 24]} />
              <meshStandardMaterial color="#f1f5f9" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Piston Compression Rings */}
            {[-0.08, 0.0, 0.08].map((yR, idx) => (
              <mesh key={idx} position={[0, yR, 0]}>
                <torusGeometry args={[0.342, 0.015, 8, 24]} />
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
          </group>

          {/* Connecting Rod */}
          <group ref={(el) => (rodRefs.current[i] = el)}>
            <mesh castShadow>
              <boxGeometry args={[0.08, 0.7, 0.12]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.92} roughness={0.15} />
            </mesh>
          </group>

          {/* HD Combustion Flame Chamber Flash at Top Dead Center */}
          <mesh
            ref={(el) => (combustionRefs.current[i] = el)}
            position={[0, 0.72, 0]}
          >
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#ea580c"
              emissiveIntensity={0.0}
              transparent
              opacity={0.85}
            />
          </mesh>
        </group>
      ))}

      {/* Crankshaft Center Journal Axis */}
      <mesh position={[0, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, width * 0.85, 24]} />
        <meshStandardMaterial color="#475569" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Exhaust Header Pipe Outlets */}
      {cylinderOffsets.map((xPos, i) => (
        <mesh key={i} position={[xPos, 0.4, -depth / 2 - 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.18} />
        </mesh>
      ))}

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
