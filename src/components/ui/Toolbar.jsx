import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { COMPONENTS_DATA } from "../../data/componentsData";
import { Play, Pause, RotateCcw } from "lucide-react";

export function Toolbar() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const startSimulation = useAppStore((state) => state.startSimulation);
  const pauseSimulation = useAppStore((state) => state.pauseSimulation);
  const resumeSimulation = useAppStore((state) => state.resumeSimulation);

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
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const setSelected = useAppStore((state) => state.setSelectedComponentId);
  const isPresentationMode = useAppStore((state) => state.isPresentationMode);

  if (isPresentationMode) return null;

  const componentList = [
    { id: "engine", label: "01 Engine (3-Cylinder)" },
    { id: "exhaustPipe", label: "02 Exhaust Pipe" },
    { id: "mufflerChamber", label: "03 Exhaust Chamber" },
    { id: "nozzle", label: "04 High-Velocity Nozzle" },
    { id: "turbine", label: "05 12-Blade Turbine" },
    { id: "shaft", label: "06 Common Shaft" },
    { id: "deflector", label: "07 Slanted Deflector" },
    { id: "bypassValve", label: "08 Bypass Valve" },
    { id: "generator", label: "09 Generator" },
    { id: "powerElectronics", label: "10 Power Electronics" },
    { id: "batteryPack", label: "11 Battery Pack" },
    { id: "exhaustOutlet", label: "12 Exhaust Outlet" },
  ];

  return (
    <aside className="absolute top-20 left-4 z-20 w-64 rounded-2xl bg-slate-900/95 border border-slate-700/60 p-3.5 shadow-2xl backdrop-blur-xl pointer-events-auto max-h-[calc(100vh-180px)] overflow-y-auto space-y-3">
      {/* SIMULATE PROCESS Glowing Button */}
      <div>
        {!isSimulating ? (
          <button
            onClick={startSimulation}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            SIMULATE PROCESS
          </button>
        ) : (
          <button
            onClick={isPaused ? resumeSimulation : pauseSimulation}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            <Pause className="w-4 h-4 fill-current" />
            {isPaused ? "RESUME" : "PAUSE"}
          </button>
        )}
      </div>

      {/* VISUALIZATION MODES */}
      <div>
        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          VISUALIZATION MODES
        </span>
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {["normal", "cutaway", "exploded"].map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className={`py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                viewMode === m
                  ? "bg-cyan-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles List */}
      <div className="space-y-1 text-[11px] font-mono">
        <button
          onClick={toggleFlowVisible}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all ${
            isFlowVisible ? "bg-cyan-950/60 border-cyan-500/50 text-cyan-300" : "bg-slate-950/40 border-slate-800 text-slate-400"
          }`}
        >
          <span>FLOW VISUALIZATION</span>
          <span className={`w-2 h-2 rounded-full ${isFlowVisible ? "bg-cyan-400" : "bg-slate-700"}`} />
        </button>

        <button
          onClick={toggleEnergyFlowVisible}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all ${
            isEnergyFlowVisible ? "bg-amber-950/60 border-amber-500/50 text-amber-300" : "bg-slate-950/40 border-slate-800 text-slate-400"
          }`}
        >
          <span>ENERGY FLOW</span>
          <span className={`w-2 h-2 rounded-full ${isEnergyFlowVisible ? "bg-amber-400" : "bg-slate-700"}`} />
        </button>

        <button
          onClick={toggleTechnicalMode}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all ${
            isTechnicalMode ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300" : "bg-slate-950/40 border-slate-800 text-slate-400"
          }`}
        >
          <span>TECHNICAL MODE</span>
          <span className={`w-2 h-2 rounded-full ${isTechnicalMode ? "bg-emerald-400" : "bg-slate-700"}`} />
        </button>

        <button
          onClick={toggleVehicleContext}
          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl border transition-all ${
            showVehicleContext ? "bg-indigo-950/60 border-indigo-500/50 text-indigo-300" : "bg-slate-950/40 border-slate-800 text-slate-400"
          }`}
        >
          <span>SHOW VEHICLE CONTEXT</span>
          <span className={`w-2 h-2 rounded-full ${showVehicleContext ? "bg-indigo-400" : "bg-slate-700"}`} />
        </button>
      </div>

      {/* CAMERA VIEWS */}
      <div className="pt-1.5 border-t border-slate-800">
        <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          <span>CAMERA VIEWS</span>
          <button onClick={() => setPresetView("isometric")} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> RESET
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1 font-mono text-[9px]">
          {["isometric", "front", "side", "top"].map((c) => (
            <button
              key={c}
              onClick={() => setPresetView(c)}
              className="py-1 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 capitalize"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* COMPONENTS LIST matching Reference Image */}
      <div className="pt-1.5 border-t border-slate-800">
        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          COMPONENTS
        </span>
        <div className="space-y-0.5 text-[10px] font-mono">
          {componentList.map((item) => {
            const isSel = selectedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full text-left px-2 py-1 rounded transition-all ${
                  isSel
                    ? "bg-amber-500/20 border border-amber-400/60 text-amber-300 font-bold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-950/60"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
