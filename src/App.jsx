import React from "react";
import { Canvas } from "@react-three/fiber";
import { MainScene } from "./components/3d/MainScene";
import { Header } from "./components/ui/Header";
import { ComponentCard } from "./components/ui/ComponentCard";
import { LiveDashboard } from "./components/ui/LiveDashboard";

export default function App() {
  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden select-none font-sans">
      {/* Top Header: Title, SIMULATE button, Technical Mode & Vehicle View Toggles */}
      <Header />

      {/* Right Component Inspection & Narration Card */}
      <ComponentCard />

      {/* Floating Simulation Phase Narration Banner & Speed Pace Controls */}
      <LiveDashboard />

      {/* Main Interactive 3D WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [18, 10, 24], fov: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={["#080d1a"]} />
        <MainScene />
      </Canvas>
    </div>
  );
}
