import React, { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { SIMULATION_PHASES } from "../../data/simulationPhases";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

export function LiveDashboard() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const currentPhaseIndex = useAppStore((state) => state.currentPhaseIndex);
  const nextPhase = useAppStore((state) => state.nextPhase);
  const pauseSimulation = useAppStore((state) => state.pauseSimulation);
  const resumeSimulation = useAppStore((state) => state.resumeSimulation);
  const startSimulation = useAppStore((state) => state.startSimulation);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);
  const setSimulationSpeed = useAppStore((state) => state.setSimulationSpeed);
  const incrementBatteryCharge = useAppStore((state) => state.incrementBatteryCharge);

  const currentPhase = SIMULATION_PHASES.find((p) => p.phaseIndex === currentPhaseIndex) || SIMULATION_PHASES[0];

  useEffect(() => {
    if (!isSimulating || isPaused) return;

    if (currentPhase.id === "battery_charging") {
      incrementBatteryCharge(0.4);
    }

    const durationMs = (currentPhase.duration * 1000) / simulationSpeed;
    const timer = setTimeout(() => {
      nextPhase();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isSimulating, isPaused, currentPhaseIndex, simulationSpeed, currentPhase, nextPhase, incrementBatteryCharge]);

  if (!isSimulating) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[480px] rounded-2xl bg-slate-900/90 border border-slate-700/60 p-3.5 shadow-2xl backdrop-blur-xl pointer-events-auto">
      {/* Active Phase Banner */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
          {currentPhase.title}
        </span>
        <span className="text-[10px] font-mono font-bold text-slate-400">
          {currentPhaseIndex} / {SIMULATION_PHASES.length}
        </span>
      </div>

      {/* Narration */}
      <p className="text-xs text-slate-200 font-sans leading-relaxed mb-3 line-clamp-2">
        {currentPhase.narration}
      </p>

      {/* Phase Progress Bar */}
      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mb-2 border border-slate-800">
        <div
          className="bg-cyan-400 h-full transition-all duration-300 shadow-sm shadow-cyan-400"
          style={{ width: `${(currentPhaseIndex / SIMULATION_PHASES.length) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <button
            onClick={isPaused ? resumeSimulation : pauseSimulation}
            className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold flex items-center gap-1 hover:bg-cyan-400 transition-all"
          >
            {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
            {isPaused ? "RESUME" : "PAUSE"}
          </button>
          <button
            onClick={startSimulation}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            title="Restart"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={nextPhase}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            title="Skip Phase"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 font-mono text-[10px]">
          {[0.5, 1.0, 2.0].map((s) => (
            <button
              key={s}
              onClick={() => setSimulationSpeed(s)}
              className={`px-2 py-0.5 rounded transition-all ${
                simulationSpeed === s ? "bg-cyan-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
