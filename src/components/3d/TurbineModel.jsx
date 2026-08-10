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
  const rotationSpeed = (isSimulating && !isPaused ? 8.5 : isSelected ? 2.5 : 0.8) * simulationSpeed;

  useFrame((state, delta) => {
    if (rotorRef.current) {
      rotorRef.current.rotation.x += delta * rotationSpeed;
    }
  });

  // Generate EXACTLY 12 aerodynamic blades arrayed radially at 30-degree intervals around central hub
  const blades = Array.from({ length: bladeCount }, (_, index) => {
    const angle = (index * 2 * Math.PI) / bladeCount; // 360 / 12 = 30 deg
    const rad = hubRadius + bladeLength / 2;
    return {
      id: index + 1,
      angle,
      pos: [0, Math.cos(angle) * rad, Math.sin(angle) * rad],
      rotation: [angle + (32 * Math.PI) / 180, 0, 0],
    };
  });

  // 6 Stationary Inlet Stator Guide Vanes
  const statorVanes = Array.from({ length: 6 }, (_, index) => {
    const angle = (index * 2 * Math.PI) / 6;
    const rad = hubRadius + bladeLength * 0.55;
    return {
      id: index + 1,
      angle,
      pos: [0.6, Math.cos(angle) * rad, Math.sin(angle) * rad],
      rotation: [angle - (20 * Math.PI) / 180, 0, 0],
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
      {/* Outer Cutaway Housing Casing matching Reference Image 2 */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[housingRadius, housingRadius, housingLength, 48, 1, false]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#334155"}
          metalness={0.9}
          roughness={0.15}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={viewMode === "cutaway" || isSelected || isHovered ? 0.3 : 0.85}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Flange Mounting Rings on Housing ends */}
      {[-housingLength / 2, housingLength / 2].map((xOff, i) => (
        <mesh key={i} position={[xOff, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[housingRadius * 1.08, housingRadius * 1.08, 0.15, 36]} />
          <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.15} />
        </mesh>
      ))}

      {/* STATIONARY INLET STATOR GUIDE VANES */}
      {statorVanes.map((v) => (
        <group key={v.id} position={v.pos} rotation={v.rotation}>
          <mesh castShadow>
            <boxGeometry args={[0.25, bladeLength * 0.9, 0.08]} />
            <meshStandardMaterial color="#64748b" metalness={0.92} roughness={0.15} />
          </mesh>
        </group>
      ))}

      {/* ROTATING 12-BLADE TURBINE ROTOR ASSEMBLY (SPINS ON COMMON SHAFT) */}
      <group ref={rotorRef}>
        {/* Central Machined Steel Rotor Wheel Hub */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[hubRadius, hubRadius, 0.45, 36]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.96} roughness={0.08} />
        </mesh>

        {/* Front Aerodynamic Bullet Nose Cone */}
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[hubRadius * 0.95, 0.6, 36]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.08} />
        </mesh>

        {/* THE 12 DISTINCT AERODYNAMIC TURBINE BLADES */}
        {blades.map((b) => (
          <group key={b.id} position={b.pos} rotation={b.rotation}>
            {/* Main Airfoil Blade Body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[bladeWidth * 0.85, bladeLength, bladeThickness * 1.6]} />
              <meshStandardMaterial
                color="#e2e8f0"
                metalness={0.96}
                roughness={0.08}
                emissive="#0284c7"
                emissiveIntensity={0.25}
              />
            </mesh>

            {/* Curved Tip Shroud Cap */}
            <mesh position={[0, bladeLength / 2 + 0.05, 0]}>
              <boxGeometry args={[bladeWidth * 0.9, 0.08, bladeThickness * 2.2]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.92} roughness={0.1} />
            </mesh>

            {/* Blade Root Pin Mounting Collar */}
            <mesh position={[0, -bladeLength / 2 - 0.04, 0]}>
              <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Outer Perimeter Blade Tip Shroud Ring connecting all 12 blades */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[hubRadius + bladeLength, 0.04, 16, 48]} />
          <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.1} />
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
