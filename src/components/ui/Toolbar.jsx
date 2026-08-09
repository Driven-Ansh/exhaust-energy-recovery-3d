import React from "react";
import {
  Play,
  RotateCcw,
  Box,
  Eye,
  Wind,
  Zap,
  Cpu,
  Truck,
  Camera,
  Compass,
} from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export function Toolbar() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const startSimulation = useAppStore((state) => state.startSimulation);
  const viewMode = useAppStore((state) => state.viewMode);
  const setViewMode = useAppStore((state) => state.setViewMode);
  const isFlowVisible = useAppStore((state) => state.isFlowVisible);
  const setFlowVisible = useAppStore((state) => state.setFlowVisible);
  const isEnergyFlowVisible = useAppStore((state) => state.isEnergyFlowVisible);
  const setEnergyFlowVisible = useAppStore((state) => state.setEnergyFlowVisible);
  const isTechnicalMode = useAppStore((state) => state.isTechnicalMode);
  const setTechnicalMode = useAppStore((state) => state.setTechnicalMode);
  const isVehicleContextVisible = useAppStore((state) => state.isVehicleContextVisible);
  const setVehicleContextVisible = useAppStore((state) => state.setVehicleContextVisible);
  const setPresetView = useAppStore((state) => state.setPresetView);
  const setSelectedComponentId = useAppStore((state) => state.setSelectedComponentId);

  const resetCamera = () => {
    setSelectedComponentId(null);
    setPresetView("isometric");
  };

  return (
    <div className="absolute top-16 left-6 z-20 flex flex-col gap-2 max-w-xs">
      {/* Primary SIMULATE Button */}
      <button
        onClick={startSimulation}
        disabled={isSimulating}
        className={`flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-bold text-sm shadow-xl transition-all ${
          isSimulating
            ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
        }`}
      >
        <Play className="w-5 h-5 fill-current" />
        <span>{isSimulating ? "SIMULATION RUNNING..." : "SIMULATE PROCESS"}</span>
      </button>

      {/* Main Mode Toggles Panel */}
      <div className="flex flex-col gap-1 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800/80 text-xs font-semibold text-slate-300">
        <div className="px-2 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-800">
          VISUALIZATION MODES
        </div>

        {/* Normal / Cutaway / Exploded View Buttons */}
        <div className="grid grid-cols-3 gap-1 mt-1">
          <button
            onClick={() => setViewMode("normal")}
            className={`px-2 py-1.5 rounded-lg border text-center transition-all ${
              viewMode === "normal"
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50 hover:text-white"
            }`}
          >
            NORMAL
          </button>

          <button
            onClick={() => setViewMode(viewMode === "cutaway" ? "normal" : "cutaway")}
            className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border text-center transition-all ${
              viewMode === "cutaway"
                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>CUTAWAY</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === "exploded" ? "normal" : "exploded")}
            className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg border text-center transition-all ${
              viewMode === "exploded"
                ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50 hover:text-white"
            }`}
          >
            <Box className="w-3 h-3" />
            <span>EXPLODED</span>
          </button>
        </div>

        {/* Feature Toggles */}
        <div className="flex flex-col gap-1 mt-1">
          <button
            onClick={() => setFlowVisible(!isFlowVisible)}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
              isFlowVisible
                ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/40"
                : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <Wind className="w-3.5 h-3.5" />
              <span>FLOW VISUALIZATION</span>
            </span>
            <span className={`w-2 h-2 rounded-full ${isFlowVisible ? "bg-cyan-400" : "bg-slate-600"}`} />
          </button>

          <button
            onClick={() => setEnergyFlowVisible(!isEnergyFlowVisible)}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
              isEnergyFlowVisible
                ? "bg-amber-500/15 text-amber-400 border-amber-500/40"
                : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>ENERGY FLOW</span>
            </span>
            <span className={`w-2 h-2 rounded-full ${isEnergyFlowVisible ? "bg-amber-400" : "bg-slate-600"}`} />
          </button>

          <button
            onClick={() => setTechnicalMode(!isTechnicalMode)}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
              isTechnicalMode
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                : "bg-slate-800/40 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>TECHNICAL MODE</span>
            </span>
            <span className={`w-2 h-2 rounded-full ${isTechnicalMode ? "bg-emerald-400" : "bg-slate-600"}`} />
          </button>

          <button
            onClick={() => setVehicleContextVisible(!isVehicleContextVisible)}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-all ${
              isVehicleContextVisible
                ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/40"
                : "bg-slate-800/40 text-slate-800 hover:bg-slate-800 hover:text-slate-200 text-slate-400"
            }`}
          >
            <span className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-indigo-400" />
              <span>SHOW VEHICLE CONTEXT</span>
            </span>
            <span className={`w-2 h-2 rounded-full ${isVehicleContextVisible ? "bg-indigo-400" : "bg-slate-600"}`} />
          </button>
        </div>

        {/* Camera Angles Section */}
        <div className="px-2 pt-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase border-t border-slate-800 flex items-center justify-between mt-1">
          <span>CAMERA VIEWS</span>
          <button onClick={resetCamera} className="flex items-center gap-1 text-[10px] text-cyan-400 hover:underline">
            <RotateCcw className="w-2.5 h-2.5" /> RESET
          </button>
        </div>

        <div className="grid grid-cols-4 gap-1">
          {["isometric", "front", "side", "top"].map((view) => (
            <button
              key={view}
              onClick={() => setPresetView(view)}
              className="px-1.5 py-1 rounded bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 capitalize text-[10px] text-center border border-slate-700/40"
            >
              {view}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
