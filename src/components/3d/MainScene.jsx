import React, { useRef } from "react";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Baseplate } from "./Baseplate";
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
import { HighlightAura } from "./HighlightAura";
import { CameraController } from "./CameraController";
import { useAppStore } from "../../store/useAppStore";

export function MainScene() {
  const controlsRef = useRef();
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const isTechnical = useAppStore((state) => state.isTechnicalMode);

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={0.5}
        maxDistance={120}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        rotateSpeed={0.9}
        zoomSpeed={1.2}
        panSpeed={0.9}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />

      <CameraController controlsRef={controlsRef} />

      <hemisphereLight skyColor="#38bdf8" groundColor="#020617" intensity={0.9} />
      <ambientLight intensity={isTechnical ? 0.6 : 0.85} />

      <directionalLight
        position={[25, 30, 25]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-25, -15, -20]} intensity={1.4} color="#94a3b8" />
      <directionalLight position={[0, 20, -25]} intensity={1.8} color="#38bdf8" />

      <pointLight position={[15.5, 3, 2]} intensity={2.5} color="#ea580c" />
      <pointLight position={[-0.25, 3, 2]} intensity={2.2} color="#00f0ff" />
      <pointLight position={[-8.5, 3, 2]} intensity={2.0} color="#2563eb" />
      <pointLight position={[-3.5, -2, 2.5]} intensity={2.0} color="#22c55e" />

      <ContactShadows
        position={[1.5, -2.6, 0]}
        opacity={0.8}
        scale={60}
        blur={2.0}
        far={15}
        color="#020617"
      />

      <group onClick={() => setSelected(null)}>
        <Baseplate />
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

        <ExhaustParticles />
        <EnergyFlowLines />
        <VehicleChassis />
        <DimensionCallouts />
        <HighlightAura />
      </group>
    </>
  );
}
