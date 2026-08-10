import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { Box, Layers, Sliders, Wind, Zap, Info, RotateCcw, Truck } from "lucide-react";

export function Toolbar() {
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);
  const isFlowVisible = useAppStore((state) => state.isFlowVisible);
  const toggleFlowVisible = useAppStore((state) => state.toggleFlowVisible);
  const isEnergyFlowVisible = useAppStore((state) => state.isEnergyFlowVisible);
  const toggleEnergyFlowVisible = useAppStore((state) => state.toggleEnergyFlowVisible);
  const isTechnicalMode = useAppStore((state) => state.isTechnicalMode);
  const toggleTechnicalMode = useAppStore((state) => state.toggleTechnicalMode);
  const showVehicleContext = useAppStore((state) => state.showVehicleContext);
  const toggleVehicleContext = useAppStore((state) => state.toggleVehicleContext);
  const setPresetView = useAppStore((state) => state.setPresetView);
  const isPresentationMode = useAppStore((state) => state.isPresentationMode);

  if (isPresentationMode) return null;

  return (
    <div className="absolute top-20 left-4 z-20 w-64 rounded-2xl bg-slate-900/90 border border-slate-700/60 p-3.5 shadow-2xl backdrop-blur-xl pointer-events-auto space-y-3.5">
      {/* 3D Visualization Render Modes */}
      <div>
        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
          VISUALIZATION MODES
        </span>
        <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode("normal")}
            className={`py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all ${
              viewMode === "normal"
                ? "bg-cyan-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            NORMAL
          </button>
          <button
            onClick={() => setViewMode("cutaway")}
            className={`py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all ${
              viewMode === "cutaway"
                ? "bg-cyan-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            CUTAWAY
          </button>
          <button
            onClick={() => setViewMode("exploded")}
            className={`py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all ${
              viewMode === "exploded"
                ? "bg-cyan-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            EXPLODED
          </button>
        </div>
      </div>

      {/* Layer Toggles */}
      <div className="space-y-1.5 text-xs font-mono">
        <button
          onClick={toggleFlowVisible}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isFlowVisible
              ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <Wind className="w-3.5 h-3.5" /> FLOW VISUALIZATION
          </span>
          <span className={`w-2 h-2 rounded-full ${isFlowVisible ? "bg-cyan-400 shadow-sm shadow-cyan-400" : "bg-slate-700"}`} />
        </button>

        <button
          onClick={toggleEnergyFlowVisible}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isEnergyFlowVisible
              ? "bg-amber-950/60 border-amber-500/50 text-amber-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> ENERGY FLOW
          </span>
          <span className={`w-2 h-2 rounded-full ${isEnergyFlowVisible ? "bg-amber-400 shadow-sm shadow-amber-400" : "bg-slate-700"}`} />
        </button>

        <button
          onClick={toggleTechnicalMode}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            isTechnicalMode
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5" /> TECHNICAL MODE
          </span>
          <span className={`w-2 h-2 rounded-full ${isTechnicalMode ? "bg-emerald-400 shadow-sm shadow-emerald-400" : "bg-slate-700"}`} />
        </button>

        <button
          onClick={toggleVehicleContext}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
            showVehicleContext
              ? "bg-indigo-950/60 border-indigo-500/50 text-indigo-300"
              : "bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5" /> VEHICLE CONTEXT
          </span>
          <span className={`w-2 h-2 rounded-full ${showVehicleContext ? "bg-indigo-400 shadow-sm shadow-indigo-400" : "bg-slate-700"}`} />
        </button>
      </div>

      {/* Preset Camera Angles */}
      <div className="pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
          <span>CAMERA VIEWS</span>
          <button
            onClick={() => setPresetView("isometric")}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> RESET
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {["isometric", "front", "side", "top"].map((camKey) => (
            <button
              key={camKey}
              onClick={() => setPresetView(camKey)}
              className="py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-[10px] font-mono text-slate-300 capitalize transition-all"
            >
              {camKey}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
