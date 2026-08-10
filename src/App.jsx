import React from "react";
import { Canvas } from "@react-three/fiber";
import { MainScene } from "./components/3d/MainScene";
import { Header } from "./components/ui/Header";
import { Toolbar } from "./components/ui/Toolbar";
import { ComponentCard } from "./components/ui/ComponentCard";
import { LiveDashboard } from "./components/ui/LiveDashboard";

export default function App() {
  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden select-none font-sans">
      {/* Sleek Minimal Header */}
      <Header />

      {/* Floating Render Mode & Preset Camera Pill */}
      <Toolbar />

      {/* Right Component Info & Specs Overlay Card */}
      <ComponentCard />

      {/* Floating Simulation Phase Narration Banner */}
      <LiveDashboard />

      {/* Main 3D WebGL Canvas */}
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
