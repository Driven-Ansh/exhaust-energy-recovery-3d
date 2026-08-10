import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function EngineModel() {
  const meshRef = useRef();
  const pistonRefs = useRef([]);
  const rodRefs = useRef([]);
  const crankRefs = useRef([]);
  const combustionRefs = useRef([]);
  const valveRefs = useRef([]);

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
  const cylinderOffsets = [-0.95, 0.0, 0.95];
  // 120-degree phase offsets for 3-cylinder firing order (0, 2.094 rad, 4.188 rad)
  const phaseOffsets = [0, 2.09439, 4.18879];

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime * (isSimulating && !isPaused ? 8.0 : 3.0) * simulationSpeed;

    cylinderOffsets.forEach((_, i) => {
      const cycle = Math.sin(time + phaseOffsets[i]);
      // Piston reciprocating Y position (-0.4 to +0.45)
      const pistonY = cycle * 0.45;

      if (pistonRefs.current[i]) {
        pistonRefs.current[i].position.y = pistonY + 0.1;
      }
      if (rodRefs.current[i]) {
        rodRefs.current[i].position.y = (pistonY - 0.45) / 2 + 0.1;
        rodRefs.current[i].rotation.z = Math.cos(time + phaseOffsets[i]) * 0.28;
      }
      if (crankRefs.current[i]) {
        crankRefs.current[i].rotation.z = time + phaseOffsets[i];
      }
      if (valveRefs.current[i]) {
        // Overhead valve actuates opposite to piston stroke
        valveRefs.current[i].position.y = 1.1 - Math.max(0, -cycle) * 0.15;
      }
      if (combustionRefs.current[i]) {
        // HD Combustion Flame Flash at Top Dead Center (cycle > 0.65)
        const isTDC = cycle > 0.65;
        const flashIntensity = isTDC ? (cycle - 0.65) * 2.85 : 0.0;
        combustionRefs.current[i].material.emissiveIntensity = flashIntensity * 3.5;
        combustionRefs.current[i].scale.setScalar(1.0 + flashIntensity * 0.4);
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
      {/* Heavy Engine Block Cutaway Housing matching Reference Image 2 */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#334155"}
          metalness={0.88}
          roughness={0.18}
          transparent={true}
          opacity={viewMode === "cutaway" || isSelected || isHovered ? 0.38 : 0.85}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Wireframe Edge Frame */}
      <mesh>
        <boxGeometry args={[width + 0.02, height + 0.02, depth + 0.02]} />
        <meshBasicMaterial color="#cbd5e1" wireframe transparent opacity={0.5} />
      </mesh>

      {/* OVERHEAD CYLINDER HEAD & DUAL VALVE SPRINGS */}
      <mesh position={[0, height / 2 + 0.25, 0]} castShadow>
        <boxGeometry args={[width * 0.9, 0.5, depth * 0.85]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.12} />
      </mesh>

      {/* REALISTIC 3-CYLINDER RECIPROCATING ENGINE INTERNALS */}
      {cylinderOffsets.map((xPos, i) => (
        <group key={i} position={[xPos, 0, 0]}>
          {/* Cylinder Bore Sleeve Ring */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.38, 0.38, 1.35, 24, 1, true]} />
            <meshStandardMaterial
              color="#94a3b8"
              metalness={0.9}
              roughness={0.2}
              side={THREE.DoubleSide}
              transparent
              opacity={0.65}
            />
          </mesh>

          {/* Overhead Dual Valve Assemblies */}
          <group ref={(el) => (valveRefs.current[i] = el)}>
            {[-0.15, 0.15].map((zV, vIdx) => (
              <group key={vIdx} position={[0, 0, zV]}>
                {/* Valve Stem & Disk */}
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.04, 0.12, 0.45, 16]} />
                  <meshStandardMaterial color="#f1f5f9" metalness={0.95} roughness={0.1} />
                </mesh>
                {/* Valve Return Spring Coils */}
                <mesh position={[0, 0.15, 0]}>
                  <cylinderGeometry args={[0.09, 0.09, 0.25, 12]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} wireframe />
                </mesh>
              </group>
            ))}
          </group>

          {/* Reciprocating Piston Head */}
          <group ref={(el) => (pistonRefs.current[i] = el)}>
            <mesh castShadow>
              <cylinderGeometry args={[0.36, 0.36, 0.38, 24]} />
              <meshStandardMaterial color="#f8fafc" metalness={0.96} roughness={0.08} />
            </mesh>
            {/* Piston Compression Rings */}
            {[-0.09, 0.0, 0.09].map((yR, idx) => (
              <mesh key={idx} position={[0, yR, 0]}>
                <torusGeometry args={[0.362, 0.015, 8, 24]} />
                <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.1} />
              </mesh>
            ))}
          </group>

          {/* Connecting Rod */}
          <group ref={(el) => (rodRefs.current[i] = el)}>
            <mesh castShadow>
              <boxGeometry args={[0.09, 0.72, 0.12]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.15} />
            </mesh>
          </group>

          {/* Crankshaft Throw Counterweight */}
          <group position={[0, -0.65, 0]} ref={(el) => (crankRefs.current[i] = el)}>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.15, 0.35, 0.35]} />
              <meshStandardMaterial color="#475569" metalness={0.92} roughness={0.15} />
            </mesh>
          </group>

          {/* HIGH-DEFINITION COMBUSTION FLAME BURST AT TOP DEAD CENTER */}
          <mesh
            ref={(el) => (combustionRefs.current[i] = el)}
            position={[0, 0.75, 0]}
          >
            <sphereGeometry args={[0.34, 24, 24]} />
            <meshStandardMaterial
              color="#f97316"
              emissive="#ea580c"
              emissiveIntensity={0.0}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Crankshaft Center Journal Axis */}
      <mesh position={[0, -0.65, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, width * 0.85, 24]} />
        <meshStandardMaterial color="#1e293b" metalness={0.95} roughness={0.1} />
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
