import React, { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MainScene } from "./components/3d/MainScene";
import { Header } from "./components/ui/Header";
import { Toolbar } from "./components/ui/Toolbar";
import { SimulationBar } from "./components/ui/SimulationBar";
import { ComponentCard } from "./components/ui/ComponentCard";
import { DimensionsModal } from "./components/ui/DimensionsModal";
import { PresentationOverlay } from "./components/ui/PresentationOverlay";
import { useAppStore } from "./store/useAppStore";

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Canvas 3D Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950 text-white z-50">
          <div className="p-6 max-w-md rounded-2xl bg-slate-900 border border-red-500/40 shadow-2xl text-center">
            <h2 className="text-lg font-bold text-red-400 mb-2">3D Graphics Error Detected</h2>
            <p className="text-xs text-slate-300 mb-4 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800 text-left overflow-x-auto">
              {this.state.error?.toString()}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all"
            >
              RELOAD 3D VISUALIZATION
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const isPresenting = useAppStore((state) => state.isPresenting);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 select-none font-sans text-slate-100">
      {/* Top Header Navigation */}
      {!isPresenting && <Header />}

      {/* Main Mode Toolbar */}
      {!isPresenting && <Toolbar />}

      {/* 3D WebGL Canvas */}
      <CanvasErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [18, 10, 22], fov: 40 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={null}>
            <MainScene />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      {/* Interactive Right Sidebar Component Specs (Opens when clicked) */}
      {!isPresenting && <ComponentCard />}

      {/* 12-Phase Cinematic Simulation Control Bar */}
      <SimulationBar />

      {/* Parametric Dimensions Modal */}
      <DimensionsModal />

      {/* Presentation Mode Clean Overlay */}
      <PresentationOverlay />
    </div>
  );
}
