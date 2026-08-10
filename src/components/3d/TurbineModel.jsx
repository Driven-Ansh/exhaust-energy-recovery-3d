import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function TurbineModel() {
  const rotorRef = useRef();
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const hoveredId = useAppStore((state) => state.hoveredComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const setHovered = useAppStore((state) => state.setHoveredComponentId);
  const viewMode = useAppStore((state) => state.viewMode);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);

  const isSelected = selectedId === "turbine";
  const isHovered = hoveredId === "turbine";

  const { position, bladeCount, hubRadius, bladeLength, bladeWidth, bladeThickness, housingRadius, housingLength } = SYSTEM_DIMENSIONS.turbine;

  const currentX = position[0];
  const rotationSpeed = (isSimulating && !isPaused ? 8.0 : isSelected ? 2.0 : 0.6) * simulationSpeed;

  useFrame((state, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.x += delta * rotationSpeed;
    }
  });

  // Generate EXACTLY 12 distinct turbine stages spaced sequentially one behind another along the X axis
  const stageSpacing = (housingLength * 0.85) / bladeCount;
  const startStageX = (housingLength * 0.85) / 2;

  const turbineStages = Array.from({ length: bladeCount }, (_, stageIndex) => {
    const xPos = startStageX - stageIndex * stageSpacing;
    // Each stage has a 2-blade or 4-blade impulse rotor pair pitched aerodynamically
    const stageAngle = (stageIndex * Math.PI) / 6; // Incremental pitch angle down the shaft

    return {
      id: stageIndex + 1,
      xPos,
      rotationAngle: stageAngle,
    };
  });

  return (
    <group
      position={[currentX, position[1], position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        setSelected("turbine");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered("turbine");
      }}
      onPointerOut={() => setHovered(null)}
    >
      {/* High-Clarity Frosted Outer Housing (Transparent so all 12 stages are 100% visible) */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[housingRadius, housingRadius, housingLength, 48, 1, false]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#e2e8f0"}
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={viewMode === "cutaway" || isSelected || isHovered ? 0.2 : 0.35}
          wireframe={isTechnical}
        />
      </mesh>

      {/* ROTATING 12-STAGE TURBINE ASSEMBLY (12 BLADES SEQUENTIALLY MOUNTED ONE BEHIND ANOTHER) */}
      <group ref={rotorRef}>
        {turbineStages.map((stage) => (
          <group key={stage.id} position={[stage.xPos, 0, 0]}>
            {/* Rotor Hub Disk for Stage */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[hubRadius * 0.9, hubRadius * 0.9, 0.12, 24]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Aerodynamic Impulse Turbine Blades for this Stage (Upper & Lower Blades) */}
            {[0, Math.PI].map((bladeAngle, bIdx) => (
              <group key={bIdx} rotation={[bladeAngle + stage.rotationAngle, 0, 0]}>
                <mesh
                  position={[0, hubRadius + bladeLength / 2, 0]}
                  rotation={[0.4, 0, 0]}
                  castShadow
                >
                  <boxGeometry args={[bladeWidth * 0.75, bladeLength, bladeThickness * 1.5]} />
                  <meshStandardMaterial
                    color="#00f0ff"
                    metalness={0.96}
                    roughness={0.08}
                    emissive="#0284c7"
                    emissiveIntensity={0.4}
                  />
                </mesh>
                <mesh position={[0, hubRadius + bladeLength, 0]}>
                  <boxGeometry args={[bladeWidth * 0.8, 0.08, bladeThickness * 1.8]} />
                  <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* Nose Cone Bullet Head on Front Stage */}
        <mesh position={[startStageX + 0.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[hubRadius * 0.9, 0.5, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Selection outline */}
      {(isSelected || isHovered) && (
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[housingRadius + 0.08, housingRadius + 0.08, housingLength + 0.1, 36]} />
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
