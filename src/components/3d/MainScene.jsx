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
      {/* Full 360-Degree Interactive Orbit Camera Controls */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={100}
        minPolarAngle={0}
        maxPolarAngle={Math.PI} // Full 360 rotation around top and bottom
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />

      {/* Camera Position Interpolation Controller */}
      <CameraController controlsRef={controlsRef} />

      {/* Realistic High-Performance Studio Lighting (Zero External Network Overhead) */}
      <hemisphereLight skyColor="#f8fafc" groundColor="#0f172a" intensity={0.8} />
      <ambientLight intensity={isTechnical ? 0.4 : 0.6} />

      <directionalLight
        position={[20, 25, 20]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-20, 10, -20]} intensity={0.7} />
      <directionalLight position={[0, -15, 10]} intensity={0.4} />

      <pointLight position={[0, 4, 3]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[-7.2, 3, 2]} intensity={1.2} color="#f59e0b" />

      {/* Ground Contact Shadows */}
      <ContactShadows
        position={[0, -4.5, 0]}
        opacity={0.6}
        scale={50}
        blur={2.5}
        far={12}
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
