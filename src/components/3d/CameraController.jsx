import React, { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SIMULATION_PHASES } from "../../data/simulationPhases";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function CameraController({ controlsRef }) {
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(18, 10, 24));
  const targetLookAt = useRef(new THREE.Vector3(1.5, 0, 0));
  const isTransitioning = useRef(false);
  const transitionTimer = useRef(0);

  const isSimulating = useAppStore((state) => state.isSimulating);
  const currentPhaseIndex = useAppStore((state) => state.currentPhaseIndex);
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const presetView = useAppStore((state) => state.presetView);

  // Stop camera transition when user manually interacts with mouse/touch
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isTransitioning.current = false;
    };

    controls.addEventListener("start", handleStart);
    return () => {
      controls.removeEventListener("start", handleStart);
    };
  }, [controlsRef]);

  // Preset Views Smooth Camera Transition
  useEffect(() => {
    if (presetView === "isometric") {
      targetCamPos.current.set(18, 10, 24);
      targetLookAt.current.set(1.5, 0, 0);
    } else if (presetView === "front") {
      targetCamPos.current.set(1.5, 0, 26);
      targetLookAt.current.set(1.5, 0, 0);
    } else if (presetView === "side") {
      targetCamPos.current.set(28, 0, 0);
      targetLookAt.current.set(1.5, 0, 0);
    } else if (presetView === "top") {
      targetCamPos.current.set(1.5, 28, 0.01);
      targetLookAt.current.set(1.5, 0, 0);
    }
    isTransitioning.current = true;
    transitionTimer.current = 1.5;
  }, [presetView]);

  // Component Selection Focus Camera Transition
  useEffect(() => {
    if (!isSimulating && selectedId && SYSTEM_DIMENSIONS[selectedId]) {
      const dim = SYSTEM_DIMENSIONS[selectedId];
      let pos = [0, 0, 0];

      if (dim.position) pos = dim.position;
      else if (dim.startX !== undefined) pos = [(dim.startX + dim.endX) / 2, 0, 0];
      else if (dim.inletPos) pos = dim.valveBodyPos;

      targetCamPos.current.set(pos[0] + 4.5, pos[1] + 3.0, pos[2] + 8.0);
      targetLookAt.current.set(pos[0], pos[1], pos[2]);
      isTransitioning.current = true;
      transitionTimer.current = 1.5;
    }
  }, [selectedId, isSimulating]);

  // Simulation Phase Camera Zoom & Active Component Highlight Transition
  useEffect(() => {
    if (isSimulating) {
      const phase = SIMULATION_PHASES.find((p) => p.phaseIndex === currentPhaseIndex);
      if (phase) {
        targetCamPos.current.set(...phase.cameraPos);
        targetLookAt.current.set(...phase.cameraTarget);
        if (phase.highlightComponent) {
          setSelected(phase.highlightComponent);
        } else {
          setSelected(null);
        }
        isTransitioning.current = true;
        transitionTimer.current = 2.0;
      }
    }
  }, [isSimulating, currentPhaseIndex, setSelected]);

  // Smooth lerp camera ONLY when transitioning
  useFrame((state, delta) => {
    if (isTransitioning.current && controlsRef.current) {
      transitionTimer.current -= delta;
      if (transitionTimer.current <= 0) {
        isTransitioning.current = false;
        return;
      }

      camera.position.lerp(targetCamPos.current, 3.5 * delta);
      controlsRef.current.target.lerp(targetLookAt.current, 3.5 * delta);
      controlsRef.current.update();
    }
  });

  return null;
}
