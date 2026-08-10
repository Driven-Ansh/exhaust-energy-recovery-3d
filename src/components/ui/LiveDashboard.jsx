import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { SIMULATION_PHASES } from "../../data/simulationPhases";
import { Flame, Zap, ShieldCheck, Play, Pause, RotateCcw, SkipForward } from "lucide-react";

export function LiveDashboard() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const currentPhaseIndex = useAppStore((state) => state.currentPhaseIndex);
  const nextPhase = useAppStore((state) => state.nextPhase);
  const startSimulation = useAppStore((state) => state.startSimulation);
  const pauseSimulation = useAppStore((state) => state.pauseSimulation);
  const resumeSimulation = useAppStore((state) => state.resumeSimulation);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);
  const setSimulationSpeed = useAppStore((state) => state.setSimulationSpeed);

  const exhaustFlowRate = useAppStore((state) => state.exhaustFlowRate);
  const turbineRPM = useAppStore((state) => state.turbineRPM);
  const shaftRPM = useAppStore((state) => state.shaftRPM);
  const generatorKW = useAppStore((state) => state.generatorKW);
  const batteryCharge = useAppStore((state) => state.batteryCharge);
  const bypassOpenPercent = useAppStore((state) => state.bypassOpenPercent);
  const isPresentationMode = useAppStore((state) => state.isPresentationMode);

  const currentPhase = SIMULATION_PHASES.find((p) => p.phaseIndex === currentPhaseIndex) || SIMULATION_PHASES[0];

  if (isPresentationMode) return null;

  return (
    <div className="absolute bottom-10 left-4 right-4 z-20 grid grid-cols-1 md:grid-cols-4 gap-3 pointer-events-auto">
      {/* PANEL 1: LIVE SIMULATION DASHBOARD matching Reference Image */}
      <div className="rounded-2xl bg-slate-900/95 border border-slate-700/60 p-3 shadow-2xl backdrop-blur-xl">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1">
          LIVE SIMULATION DASHBOARD
        </div>
        <div className="space-y-1 text-[11px] font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Exhaust Flow</span>
            <span className="font-bold text-cyan-300">{exhaustFlowRate} kg/s</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Turbine RPM</span>
            <span className="font-bold text-cyan-300">{turbineRPM.toLocaleString()} RPM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Shaft RPM</span>
            <span className="font-bold text-cyan-300">{shaftRPM.toLocaleString()} RPM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Generator Output</span>
            <span className="font-bold text-yellow-400">{generatorKW} kW</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Battery Charge</span>
            <span className="font-bold text-emerald-400">{batteryCharge}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Bypass Position</span>
            <span className="font-bold text-slate-200">{bypassOpenPercent}%</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-1 mt-1">
            <span className="text-slate-400">System Status</span>
            <span className="font-bold text-emerald-400 uppercase">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* PANEL 2: ENGINE COMBUSTION - 3 CYLINDER matching Reference Image */}
      <div className="rounded-2xl bg-slate-900/95 border border-slate-700/60 p-3 shadow-2xl backdrop-blur-xl">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1">
          ENGINE COMBUSTION - 3 CYLINDER
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["CYLINDER 1", "CYLINDER 2", "CYLINDER 3"].map((cylLabel, i) => (
            <div key={i} className="flex flex-col items-center bg-slate-950 p-2 rounded-xl border border-slate-800">
              {/* Cylinder Cutaway Graphic with Animated Flame */}
              <div className="relative w-8 h-12 bg-slate-900 rounded-md border border-slate-700 flex items-center justify-center overflow-hidden mb-1">
                <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-700 rounded-t" />
                <Flame className={`w-5 h-5 text-orange-500 transition-all ${isSimulating ? "animate-bounce text-orange-400" : ""}`} />
              </div>
              <span className="text-[9px] font-mono text-slate-300">{cylLabel}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL 3: ENERGY TRANSFORMATION Diagram matching Reference Image */}
      <div className="rounded-2xl bg-slate-900/95 border border-slate-700/60 p-3 shadow-2xl backdrop-blur-xl">
        <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1">
          ENERGY TRANSFORMATION
        </div>
        <div className="grid grid-cols-4 gap-1 text-center font-mono text-[9px]">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-xl bg-orange-950/60 border border-orange-500/40 text-orange-400 mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <span className="text-slate-300">EXHAUST ENERGY</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 mb-1">
              <div className="w-4 h-4 rounded-full border-2 border-dashed border-cyan-400 animate-spin" />
            </div>
            <span className="text-slate-300">MECHANICAL ENERGY</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-xl bg-yellow-950/60 border border-yellow-500/40 text-yellow-400 mb-1">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-slate-300">ELECTRICAL ENERGY</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-slate-300">STORED ENERGY</span>
          </div>
        </div>
      </div>

      {/* PANEL 4: SIMULATION CONTROLS matching Reference Image */}
      <div className="rounded-2xl bg-slate-900/95 border border-slate-700/60 p-3 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-800 pb-1">
            SIMULATION CONTROLS
          </div>
          <div className="grid grid-cols-3 gap-1.5 mb-2 font-mono text-[10px]">
            <button
              onClick={isPaused ? resumeSimulation : pauseSimulation}
              className="py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold flex items-center justify-center gap-1"
            >
              {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
              {isPaused ? "RESUME" : "PAUSE"}
            </button>
            <button
              onClick={startSimulation}
              className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> RESTART
            </button>
            <button
              onClick={nextPhase}
              className="py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-1"
            >
              <SkipForward className="w-3 h-3" /> SKIP
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>SPEED CONTROL</span>
            <div className="flex items-center gap-1">
              {[0.5, 1.0, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setSimulationSpeed(s)}
                  className={`px-1.5 py-0.5 rounded ${
                    simulationSpeed === s ? "bg-cyan-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Progress Bar */}
        <div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-1 border border-slate-800">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${(currentPhaseIndex / SIMULATION_PHASES.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
            <span>PHASE PROGRESS</span>
            <span className="font-bold text-amber-400">{currentPhase.subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
