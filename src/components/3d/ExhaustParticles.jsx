import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function ExhaustParticles() {
  const pointsRef = useRef();
  const bypassPointsRef = useRef();

  const isFlowVisible = useAppStore((state) => state.isFlowVisible);
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);
  const flowRate = useAppStore((state) => state.flowRate); // 0-100
  const bypassPosition = useAppStore((state) => state.bypassPosition); // 0-100

  const PARTICLE_COUNT = 300;
  const BYPASS_PARTICLE_COUNT = 100;

  // Main flow path keypoints (Engine -> Pipe -> Muffler -> Nozzle -> Turbine -> Deflector -> Outlet)
  const mainPathCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(13.5, 0, 0), // Engine
      new THREE.Vector3(9.5, 0, 0), // Exhaust Pipe
      new THREE.Vector3(5.25, 0, 0), // Muffler Chamber
      new THREE.Vector3(2.5, 0, 0), // Nozzle entrance
      new THREE.Vector3(0.0, 0, 0), // 12-Blade Turbine
      new THREE.Vector3(-2.8, 0, 0), // Slanted Deflector
      new THREE.Vector3(-3.0, 1.8, 0), // Outlet turn
      new THREE.Vector3(-3.0, 3.5, 0), // Exit top
    ]);
  }, []);

  // Bypass flow path keypoints (Muffler outlet -> Bypass pipe -> Exit duct)
  const bypassPathCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(3.8, 0, 0),
      new THREE.Vector3(3.8, -2.6, 0),
      new THREE.Vector3(0.0, -2.6, 0),
      new THREE.Vector3(-3.8, -2.6, 0),
      new THREE.Vector3(-3.8, 1.8, 0),
      new THREE.Vector3(-3.0, 3.5, 0),
    ]);
  }, []);

  // Initial particle parameters (offset, speed, spread)
  const [positions, colors, offsets] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const off = new Float32Array(PARTICLE_COUNT);

    const colorHot = new THREE.Color("#f97316"); // Orange engine flame
    const colorFast = new THREE.Color("#06b6d4"); // Cyan high velocity
    const colorExit = new THREE.Color("#64748b"); // Slate exit gas

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      off[i] = Math.random();
      const p = mainPathCurve.getPoint(off[i]);

      // Add radial noise spread
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y + (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.4;

      // Color based on progression (Hot -> Acceleration in Nozzle -> Cool exit)
      const mixCol = off[i] < 0.4 ? colorHot : off[i] < 0.75 ? colorFast : colorExit;
      col[i * 3] = mixCol.r;
      col[i * 3 + 1] = mixCol.g;
      col[i * 3 + 2] = mixCol.b;
    }
    return [pos, col, off];
  }, [mainPathCurve]);

  // Bypass particles setup
  const [bPositions, bColors, bOffsets] = useMemo(() => {
    const pos = new Float32Array(BYPASS_PARTICLE_COUNT * 3);
    const col = new Float32Array(BYPASS_PARTICLE_COUNT * 3);
    const off = new Float32Array(BYPASS_PARTICLE_COUNT);

    const colorBypass = new THREE.Color("#ef4444");

    for (let i = 0; i < BYPASS_PARTICLE_COUNT; i++) {
      off[i] = Math.random();
      const p = bypassPathCurve.getPoint(off[i]);
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y + (Math.random() - 0.5) * 0.2;
      pos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.2;

      col[i * 3] = colorBypass.r;
      col[i * 3 + 1] = colorBypass.g;
      col[i * 3 + 2] = colorBypass.b;
    }
    return [pos, col, off];
  }, [bypassPathCurve]);

  useFrame((state, delta) => {
    if (!isFlowVisible) return;
    const speedMult = (isSimulating && !isPaused ? 0.35 : 0.12) * (flowRate / 100) * simulationSpeed;

    // Update Main Path Particles
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Accelerate when passing through Nozzle (progress t between 0.35 and 0.55)
        const t = offsets[i];
        const accel = t > 0.35 && t < 0.6 ? 2.2 : 1.0;
        offsets[i] = (offsets[i] + delta * speedMult * accel) % 1.0;

        const p = mainPathCurve.getPoint(offsets[i]);
        // Tighter stream inside Nozzle & Turbine
        const radiusNoise = t > 0.4 && t < 0.65 ? 0.15 : 0.4;

        posAttr.array[i * 3] = p.x;
        posAttr.array[i * 3 + 1] = p.y + Math.sin(t * 20 + i) * radiusNoise;
        posAttr.array[i * 3 + 2] = p.z + Math.cos(t * 20 + i) * radiusNoise;
      }
      posAttr.needsUpdate = true;
    }

    // Update Bypass Path Particles (Only visible when bypass valve position > 0)
    if (bypassPointsRef.current && bypassPosition > 0) {
      const bPosAttr = bypassPointsRef.current.geometry.attributes.position;
      const bSpeed = speedMult * (bypassPosition / 100);
      for (let i = 0; i < BYPASS_PARTICLE_COUNT; i++) {
        bOffsets[i] = (bOffsets[i] + delta * bSpeed) % 1.0;
        const p = bypassPathCurve.getPoint(bOffsets[i]);

        bPosAttr.array[i * 3] = p.x;
        bPosAttr.array[i * 3 + 1] = p.y + Math.sin(bOffsets[i] * 15 + i) * 0.12;
        bPosAttr.array[i * 3 + 2] = p.z + Math.cos(bOffsets[i] * 15 + i) * 0.12;
      }
      bPosAttr.needsUpdate = true;
    }
  });

  if (!isFlowVisible) return null;

  return (
    <group>
      {/* Main Flow Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Bypass Flow Particles */}
      {bypassPosition > 0 && (
        <points ref={bypassPointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={BYPASS_PARTICLE_COUNT}
              array={bPositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={BYPASS_PARTICLE_COUNT}
              array={bColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.25}
            vertexColors
            transparent
            opacity={Math.min(0.9, (bypassPosition / 100) * 1.2)}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}
