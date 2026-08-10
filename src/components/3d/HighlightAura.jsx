import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SYSTEM_DIMENSIONS } from "../../data/dimensions";
import { useAppStore } from "../../store/useAppStore";

export function HighlightAura() {
  const boxRef = useRef();
  const selectedId = useAppStore((state) => state.selectedComponentId);

  useFrame((state) => {
    if (boxRef.current && selectedId) {
      const pulse = Math.sin(state.clock.elapsedTime * 6) * 0.2 + 0.8;
      boxRef.current.material.opacity = pulse * 0.8;
    }
  });

  if (!selectedId || !SYSTEM_DIMENSIONS[selectedId]) return null;

  const dim = SYSTEM_DIMENSIONS[selectedId];
  let pos = [0, 0, 0];
  let size = [2, 2, 2];

  if (dim.position) {
    pos = dim.position;
    if (dim.width) size = [dim.width + 0.4, dim.height + 0.4, dim.depth + 0.4];
    else if (dim.length && dim.radius) size = [dim.length + 0.4, dim.radius * 2 + 0.4, dim.radius * 2 + 0.4];
    else if (dim.length && dim.radiusY) size = [dim.length + 0.4, dim.radiusY * 2 + 0.4, dim.radiusZ * 2 + 0.4];
    else if (dim.housingLength) size = [dim.housingLength + 0.4, dim.housingRadius * 2 + 0.4, dim.housingRadius * 2 + 0.4];
    else if (dim.angleDegrees) size = [dim.thickness + 0.4, dim.height + 0.4, dim.width + 0.4];
  } else if (dim.startX !== undefined) {
    const len = Math.abs(dim.startX - dim.endX);
    pos = [(dim.startX + dim.endX) / 2, 0, 0];
    size = [len + 0.4, dim.radius * 2 + 0.4, dim.radius * 2 + 0.4];
  } else if (dim.inletPos) {
    pos = dim.valveBodyPos;
    size = [2.5, 2.5, 2.5];
  }

  return (
    <group position={pos}>
      {/* Bright Pulsing Cyan 3D Bounding Box Outline */}
      <mesh ref={boxRef}>
        <boxGeometry args={size} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
