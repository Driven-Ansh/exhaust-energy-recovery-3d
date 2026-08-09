import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SIMULATION_PHASES } from "../../data/simulationPhases";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function CameraController({ controlsRef }) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(18, 10, 22));
  const targetLookAt = useRef(new THREE.Vector3(1.5, 0, 0));

  const isSimulating = useAppStore((state) => state.isSimulating);
  const currentPhaseIndex = useAppStore((state) => state.currentPhaseIndex);
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const presetView = useAppStore((state) => state.presetView);

  // Handle Preset Camera Views
  useEffect(() => {
    if (presetView === "isometric") {
      targetCamPos.current.set(18, 10, 22);
      targetLookAt.current.set(1.5, 0, 0);
    } else if (presetView === "front") {
      targetCamPos.current.set(1.5, 0, 24);
      targetLookAt.current.set(1.5, 0, 0);
    } else if (presetView === "side") {
      targetCamPos.current.set(26, 0, 0);
      targetLookAt.current.set(1.5, 0, 0);
    } else if (presetView === "top") {
      targetCamPos.current.set(1.5, 26, 0.01);
      targetLookAt.current.set(1.5, 0, 0);
    }
  }, [presetView]);

  // Handle Component Focus on Selection
  useEffect(() => {
    if (!isSimulating && selectedId && SYSTEM_DIMENSIONS[selectedId]) {
      const dim = SYSTEM_DIMENSIONS[selectedId];
      let pos = [0, 0, 0];

      if (dim.position) pos = dim.position;
      else if (dim.startX !== undefined) pos = [(dim.startX + dim.endX) / 2, 0, 0];
      else if (dim.inletPos) pos = dim.valveBodyPos;

      targetCamPos.current.set(pos[0] + 3.5, pos[1] + 2.5, pos[2] + 6.0);
      targetLookAt.current.set(pos[0], pos[1], pos[2]);
    }
  }, [selectedId, isSimulating]);

  // Handle Cinematic Simulation Camera Path
  useEffect(() => {
    if (isSimulating) {
      const phase = SIMULATION_PHASES.find((p) => p.phaseIndex === currentPhaseIndex);
      if (phase) {
        targetCamPos.current.set(...phase.cameraPos);
        targetLookAt.current.set(...phase.cameraTarget);
      }
    }
  }, [isSimulating, currentPhaseIndex]);

  // Smooth lerp camera towards target every frame
  useFrame((state, delta) => {
    if (controlsRef.current) {
      const lerpSpeed = isSimulating ? 2.5 * delta : 4.0 * delta;

      camera.position.lerp(targetCamPos.current, lerpSpeed);
      controlsRef.current.target.lerp(targetLookAt.current, lerpSpeed);
      controlsRef.current.update();
    }
  });

  return null;
}
