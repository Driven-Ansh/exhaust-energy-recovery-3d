import React, { useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  FastForward,
  Zap,
} from "lucide-react";
import { SIMULATION_PHASES } from "../../data/simulationPhases";
import { useAppStore } from "../../store/useAppStore";

export function SimulationBar() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const currentPhaseIndex = useAppStore((state) => state.currentPhaseIndex);
  const simulationSpeed = useAppStore((state) => state.simulationSpeed);
  const simProgress = useAppStore((state) => state.simProgress);

  const pauseSimulation = useAppStore((state) => state.pauseSimulation);
  const resumeSimulation = useAppStore((state) => state.resumeSimulation);
  const restartSimulation = useAppStore((state) => state.restartSimulation);
  const stopSimulation = useAppStore((state) => state.stopSimulation);
  const nextPhase = useAppStore((state) => state.nextPhase);
  const prevPhase = useAppStore((state) => state.prevPhase);
  const setPhaseIndex = useAppStore((state) => state.setPhaseIndex);
  const setSimulationSpeed = useAppStore((state) => state.setSimulationSpeed);
  const setSimProgress = useAppStore((state) => state.setSimProgress);
  const setSelectedComponentId = useAppStore((state) => state.setSelectedComponentId);
  const setBatteryChargePercent = useAppStore((state) => state.setBatteryChargePercent);

  const currentPhase = SIMULATION_PHASES.find((p) => p.phaseIndex === currentPhaseIndex) || SIMULATION_PHASES[0];

  // Auto-advance simulation timer & update phase highlights
  useEffect(() => {
    if (!isSimulating || isPaused) return;

    // Highlight active phase component
    if (currentPhase.highlightComponent) {
      setSelectedComponentId(currentPhase.highlightComponent);
    }

    // Battery charge increment during battery phase
    let batteryInterval = null;
    if (currentPhase.id === "battery") {
      batteryInterval = setInterval(() => {
        setBatteryChargePercent((prev) => Math.min(100, prev + 1));
      }, 200 / simulationSpeed);
    }

    const stepMs = 50;
    const totalMs = (currentPhase.duration * 1000) / simulationSpeed;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += stepMs;
      const progress = Math.min(100, (elapsed / totalMs) * 100);
      setSimProgress(progress);

      if (elapsed >= totalMs) {
        clearInterval(timer);
        if (currentPhaseIndex < 12) {
          nextPhase();
        } else {
          stopSimulation();
        }
      }
    }, stepMs);

    return () => {
      clearInterval(timer);
      if (batteryInterval) clearInterval(batteryInterval);
    };
  }, [
    isSimulating,
    isPaused,
    currentPhaseIndex,
    simulationSpeed,
    currentPhase,
    nextPhase,
    setSimProgress,
    setSelectedComponentId,
    setBatteryChargePercent,
    stopSimulation,
  ]);

  if (!isSimulating) return null;

  return (
    <div className="absolute bottom-6 left-6 right-6 z-30 flex flex-col gap-3 max-w-4xl mx-auto">
      {/* Top Banner: Narration & Step Explanations */}
      <div className="p-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-500/10 text-white">
        <div className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">
              {currentPhase.title}
            </span>
            <span className="text-xs font-medium text-slate-400">
              {currentPhase.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Multipliers */}
            {[0.5, 1.0, 2.0].map((spd) => (
              <button
                key={spd}
                onClick={() => setSimulationSpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-all ${
                  simulationSpeed === spd
                    ? "bg-cyan-500 text-slate-950 border-cyan-400"
                    : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Narration Body Text */}
        <p className="text-sm font-normal text-slate-200 leading-relaxed mt-1">
          {currentPhase.narration}
        </p>

        {/* Dynamic Phase Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-75 ease-linear rounded-full"
            style={{ width: `${simProgress}%` }}
          />
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-slate-300">
        <div className="flex items-center gap-2">
          <button
            onClick={() => (isPaused ? resumeSimulation() : pauseSimulation())}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          </button>

          <button
            onClick={restartSimulation}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            title="Restart Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={prevPhase}
            disabled={currentPhaseIndex <= 1}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
            title="Previous Phase"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={nextPhase}
            disabled={currentPhaseIndex >= 12}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition-all"
            title="Next Phase"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="text-xs font-semibold text-slate-400 ml-2">
            PHASE {currentPhaseIndex} / 12
          </span>
        </div>

        {/* Phase Step Dots Scrubber */}
        <div className="flex items-center gap-1.5">
          {SIMULATION_PHASES.map((p) => (
            <button
              key={p.phaseIndex}
              onClick={() => setPhaseIndex(p.phaseIndex)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPhaseIndex === p.phaseIndex
                  ? "bg-cyan-400 ring-4 ring-cyan-500/20 scale-110"
                  : p.phaseIndex < currentPhaseIndex
                  ? "bg-cyan-600/60"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              title={`Jump to Phase ${p.phaseIndex}: ${p.title}`}
            />
          ))}
        </div>

        <button
          onClick={stopSimulation}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/40 border border-slate-700 text-slate-300 transition-all"
        >
          EXIT SIMULATION
        </button>
      </div>
    </div>
  );
}
