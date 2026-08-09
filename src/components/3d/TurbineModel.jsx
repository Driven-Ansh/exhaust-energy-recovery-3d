import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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

  const { position, bladeCount, hubRadius, bladeLength, bladeWidth, bladeThickness, bladePitchAngle, housingRadius, housingLength } = SYSTEM_DIMENSIONS.turbine;

  const currentX = position[0];
  const rotationSpeed = (isSimulating && !isPaused ? 8.0 : isSelected ? 2.0 : 0.5) * simulationSpeed;

  useFrame((state, delta) => {
    if (rotorRef.current && (isSimulating || isSelected || isHovered || true)) {
      rotorRef.current.rotation.x += delta * rotationSpeed;
    }
  });

  // Generate array of EXACTLY 12 turbine blades spaced evenly at 30-degree increments
  const blades = Array.from({ length: bladeCount }, (_, index) => {
    const angle = (index * 2 * Math.PI) / bladeCount; // 360 / 12 = 30 deg
    return {
      id: index + 1,
      angle,
      position: [
        0,
        Math.cos(angle) * (hubRadius + bladeLength / 2),
        Math.sin(angle) * (hubRadius + bladeLength / 2),
      ],
      rotation: [angle + (bladePitchAngle * Math.PI) / 180, 0, 0],
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
      {/* Outer Protective Turbine Housing Chamber (Semi-transparent in normal view so 12 blades are visible) */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[housingRadius, housingRadius, housingLength, 48, 1, false]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#475569"}
          metalness={0.88}
          roughness={0.15}
          side={2}
          transparent={true}
          opacity={viewMode === "cutaway" || isSelected || isHovered ? 0.22 : 0.38}
          wireframe={isTechnical}
        />
      </mesh>

      {/* ROTATING TURBINE ASSEMBLY (ROTOR HUB + EXACTLY 12 BLADES) */}
      <group ref={rotorRef}>
        {/* Central Rotor Hub Disk */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[hubRadius, hubRadius, 0.8, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Nose Cone Bullet Head on Rotor Hub */}
        <mesh position={[0.45, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[hubRadius, 0.6, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.92} roughness={0.12} />
        </mesh>

        {/* THE 12 INDIVIDUAL TURBINE BLADES */}
        {blades.map((b) => (
          <group key={b.id} position={b.position} rotation={b.rotation}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[bladeWidth, bladeLength, bladeThickness]} />
              <meshStandardMaterial
                color="#0284c7"
                metalness={0.96}
                roughness={0.1}
                emissive={isSelected ? "#0284c7" : "#0284c7"}
                emissiveIntensity={0.2}
              />
            </mesh>

            <mesh position={[0, bladeLength / 2 + 0.05, 0]}>
              <boxGeometry args={[bladeWidth * 0.9, 0.1, bladeThickness * 1.2]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        ))}
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
