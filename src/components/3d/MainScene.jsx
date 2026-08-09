import React, { useRef } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { EngineModel } from "./EngineModel";
import { ExhaustPipeModel } from "./ExhaustPipeModel";
import { MufflerChamberModel } from "./MufflerChamberModel";
import { NozzleModel } from "./NozzleModel";
import { TurbineModel } from "./TurbineModel";
import { ShaftModel } from "./ShaftModel";
import { DeflectorModel } from "./DeflectorModel";
import { BypassValveModel } from "./BypassValveModel";
import { GeneratorModel } from "./GeneratorModel";
import { PowerElectronicsModel } from "./PowerElectronicsModel";
import { BatteryModel } from "./BatteryModel";
import { ExhaustOutletModel } from "./ExhaustOutletModel";
import { ExhaustParticles } from "./ExhaustParticles";
import { EnergyFlowLines } from "./EnergyFlowLines";
import { VehicleChassis } from "./VehicleChassis";
import { DimensionCallouts } from "./DimensionCallouts";
import { CameraController } from "./CameraController";
import { useAppStore } from "../../store/useAppStore";

export function MainScene() {
  const controlsRef = useRef();
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  return (
    <>
      {/* 100% Unrestricted 360-Degree Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={0.5}
        maxDistance={120}
        minPolarAngle={0}
        maxPolarAngle={Math.PI} // Full 360-degree vertical and horizontal freedom
        rotateSpeed={0.9}
        zoomSpeed={1.2}
        panSpeed={0.9}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />

      {/* Smooth Interpolation Controller for presets & simulation */}
      <CameraController controlsRef={controlsRef} />

      {/* Studio Lighting System for High Contrast & Realism */}
      <hemisphereLight skyColor="#38bdf8" groundColor="#0f172a" intensity={0.9} />
      <ambientLight intensity={isTechnical ? 0.5 : 0.8} />

      {/* Main Directional Key Light */}
      <directionalLight
        position={[25, 30, 25]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Opposite Fill Light */}
      <directionalLight position={[-25, -15, -20]} intensity={1.2} color="#94a3b8" />

      {/* Back Rim Light for Outline Separation */}
      <directionalLight position={[0, 20, -25]} intensity={1.5} color="#38bdf8" />

      {/* Accent Point Lights */}
      <pointLight position={[0, 4, 4]} intensity={2.0} color="#38bdf8" />
      <pointLight position={[-7.2, 4, 3]} intensity={1.8} color="#f59e0b" />
      <pointLight position={[5.25, 4, 3]} intensity={1.5} color="#cbd5e1" />

      {/* Soft Ground Contact Shadow */}
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.7}
        scale={60}
        blur={2.0}
        far={15}
        color="#020617"
      />

      {/* Background Deselect Click Handler */}
      <group onClick={() => setSelected(null)}>
        {/* Core 12 Component Models */}
        <EngineModel />
        <ExhaustPipeModel />
        <MufflerChamberModel />
        <NozzleModel />
        <TurbineModel />
        <ShaftModel />
        <DeflectorModel />
        <BypassValveModel />
        <GeneratorModel />
        <PowerElectronicsModel />
        <BatteryModel />
        <ExhaustOutletModel />

        {/* Visualizers */}
        <ExhaustParticles />
        <EnergyFlowLines />
        <VehicleChassis />
        <DimensionCallouts />
      </group>
    </>
  );
}
