import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { Play, Pause, Compass, Truck } from "lucide-react";

export function Header() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const startSimulation = useAppStore((state) => state.startSimulation);
  const pauseSimulation = useAppStore((state) => state.pauseSimulation);
  const resumeSimulation = useAppStore((state) => state.resumeSimulation);

  const isTechnicalMode = useAppStore((state) => state.isTechnicalMode);
  const toggleTechnicalMode = useAppStore((state) => state.toggleTechnicalMode);
  const showVehicleContext = useAppStore((state) => state.showVehicleContext);
  const toggleVehicleContext = useAppStore((state) => state.toggleVehicleContext);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent backdrop-blur-md pointer-events-none">
      {/* App Title */}
      <div className="pointer-events-auto">
        <h1 className="font-sans text-base font-extrabold tracking-wide text-slate-100 uppercase">
          EXHAUST ENERGY RECOVERY SYSTEM
        </h1>
        <p className="text-[11px] font-mono text-slate-400">
          Interactive 3D Heavy-Duty Vehicle Concept
        </p>
      </div>

      {/* SIMULATE PROCESS Button */}
      <div className="pointer-events-auto">
        {!isSimulating ? (
          <button
            onClick={startSimulation}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase shadow-xl shadow-cyan-500/30 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            SIMULATE PROCESS
          </button>
        ) : (
          <button
            onClick={isPaused ? resumeSimulation : pauseSimulation}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase shadow-xl shadow-amber-500/30 transition-all active:scale-95"
          >
            <Pause className="w-4 h-4 fill-current" />
            {isPaused ? "RESUME" : "PAUSE"}
          </button>
        )}
      </div>

      {/* Toggles: TECHNICAL MODE & VEHICLE VIEW */}
      <div className="flex items-center gap-2 pointer-events-auto font-mono text-xs">
        <button
          onClick={toggleTechnicalMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            isTechnicalMode
              ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-md"
              : "bg-slate-900/80 border-slate-700/60 text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          TECHNICAL MODE
        </button>

        <button
          onClick={toggleVehicleContext}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            showVehicleContext
              ? "bg-indigo-950/80 border-indigo-500/50 text-indigo-300 shadow-md"
              : "bg-slate-900/80 border-slate-700/60 text-slate-300 hover:bg-slate-800"
          }`}
        >
          <Truck className="w-3.5 h-3.5 text-indigo-400" />
          VEHICLE VIEW
        </button>
      </div>
    </header>
  );
}
