import React from "react";
import {
  Zap,
  Maximize2,
  Minimize2,
  Ruler,
  Presentation,
  Info,
  Layers,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export function Header() {
  const isFullscreen = useAppStore((state) => state.isFullscreen);
  const isPresenting = useAppStore((state) => state.isPresenting);
  const setPresenting = useAppStore((state) => state.setPresenting);
  const setDimensionsModalOpen = useAppStore(
    (state) => state.setDimensionsModalOpen
  );
  const setSelectedComponentId = useAppStore(
    (state) => state.setSelectedComponentId
  );

  const toggleFullscreenHandler = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Fullscreen error:", err);
      });
      useAppStore.getState().setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      useAppStore.getState().setFullscreen(false);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 text-white">
      {/* Brand Title & Concept Subtitle */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
          <Zap className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
            EXHAUST ENERGY RECOVERY SYSTEM
          </h1>
          <p className="text-xs font-medium text-slate-400">
            Interactive Heavy-Duty Vehicle Energy Recovery Concept • 12-Blade Turbine Architecture
          </p>
        </div>
      </div>

      {/* Action Buttons Header Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPresenting(!isPresenting)}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isPresenting
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
          }`}
          title="Presentation Mode for Large Screen Demos"
        >
          <Presentation className="w-4 h-4" />
          <span>PRESENT</span>
        </button>

        <button
          onClick={() => setDimensionsModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-all"
          title="View Parametric Dimensions Panel"
        >
          <Ruler className="w-4 h-4 text-cyan-400" />
          <span>DIMENSIONS</span>
        </button>

        <button
          onClick={toggleFullscreenHandler}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-all"
          title="Toggle Fullscreen Mode"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
