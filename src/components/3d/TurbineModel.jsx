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

  // Calculate X positions for 12 SEPARATE TURBINE WHEELS ARRANGED IN SERIES ALONG THE SHAFT AXIS
  const seriesSpacing = (housingLength * 0.85) / (bladeCount - 1);
  const startX = (housingLength * 0.85) / 2;

  const seriesTurbines = Array.from({ length: bladeCount }, (_, index) => {
    const xPos = startX - index * seriesSpacing;
    const stagePitch = (index * Math.PI) / 8; // Multi-stage progressive pitch down the series
    return {
      id: index + 1,
      xPos,
      stagePitch,
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
      {/* Extended Frosted Polycarbonate Housing (Transparent so all 12 series turbines are 100% visible) */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[housingRadius, housingRadius, housingLength, 48, 1, false]} />
        <meshStandardMaterial
          color={isSelected ? "#38bdf8" : isHovered ? "#60a5fa" : "#e2e8f0"}
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={viewMode === "cutaway" || isSelected || isHovered ? 0.22 : 0.32}
          wireframe={isTechnical}
        />
      </mesh>

      {/* Heavy Flange Mounting Rings on Housing ends */}
      {[-housingLength / 2, housingLength / 2].map((xOff, i) => (
        <mesh key={i} position={[xOff, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[housingRadius * 1.08, housingRadius * 1.08, 0.16, 36]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.92} roughness={0.15} />
        </mesh>
      ))}

      {/* ROTATING 12 SEPARATE TURBINES IN SERIES ALONG CENTRAL COMMON SHAFT */}
      <group ref={rotorRef}>
        {seriesTurbines.map((tWheel) => (
          <group key={tWheel.id} position={[tWheel.xPos, 0, 0]}>
            {/* Central Rotor Hub Disk for this Turbine Wheel */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[hubRadius, hubRadius, 0.16, 24]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.08} />
            </mesh>

            {/* 6 Aerodynamic Blades for this specific Turbine Wheel */}
            {Array.from({ length: 6 }).map((_, bIdx) => {
              const bAngle = (bIdx * Math.PI) / 3 + tWheel.stagePitch;
              const rad = hubRadius + bladeLength / 2;
              return (
                <group
                  key={bIdx}
                  position={[0, Math.cos(bAngle) * rad, Math.sin(bAngle) * rad]}
                  rotation={[bAngle + 0.5, 0, 0]}
                >
                  <mesh castShadow receiveShadow>
                    <boxGeometry args={[bladeWidth, bladeLength, bladeThickness * 1.5]} />
                    <meshStandardMaterial
                      color="#00f0ff"
                      metalness={0.96}
                      roughness={0.08}
                      emissive="#0284c7"
                      emissiveIntensity={0.35}
                    />
                  </mesh>
                  {/* Blade Tip Shroud Segment */}
                  <mesh position={[0, bladeLength / 2 + 0.04, 0]}>
                    <boxGeometry args={[bladeWidth * 1.1, 0.08, bladeThickness * 2.0]} />
                    <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
                  </mesh>
                </group>
              );
            })}

            {/* Outer Shroud Ring for this Turbine Wheel */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[hubRadius + bladeLength, 0.035, 12, 36]} />
              <meshStandardMaterial color="#0284c7" metalness={0.92} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Front Aerodynamic Bullet Nose Cone on Turbine 1 */}
        <mesh position={[startX + 0.35, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
          <coneGeometry args={[hubRadius * 0.95, 0.6, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.08} />
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
