import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { SIMULATION_PHASES } from "../../data/simulationPhases";
import { Sparkles, Eye, Maximize2, Compass } from "lucide-react";

export function Header() {
  const currentPhaseIndex = useAppStore((state) => state.currentPhaseIndex);
  const jumpToPhase = useAppStore((state) => state.jumpToPhase);
  const isPresentationMode = useAppStore((state) => state.isPresentationMode);
  const setPresentationMode = useAppStore((state) => state.setPresentationMode);
  const isTechnicalMode = useAppStore((state) => state.isTechnicalMode);
  const toggleTechnicalMode = useAppStore((state) => state.toggleTechnicalMode);

  const phaseBreadcrumbs = [
    { idx: 2, label: "1 ENGINE" },
    { idx: 3, label: "2 EXHAUST" },
    { idx: 4, label: "3 CHAMBER" },
    { idx: 5, label: "4 NOZZLE" },
    { idx: 6, label: "5 TURBINE" },
    { idx: 9, label: "6 SHAFT" },
    { idx: 10, label: "7 GENERATOR" },
    { idx: 11, label: "8 BATTERY" },
  ];

  const currentPhase = SIMULATION_PHASES.find((p) => p.phaseIndex === currentPhaseIndex) || SIMULATION_PHASES[0];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  if (isPresentationMode) {
    return (
      <button
        onClick={() => setPresentationMode(false)}
        className="absolute top-4 right-4 z-50 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-mono text-cyan-400 hover:bg-slate-800 transition-all pointer-events-auto shadow-2xl"
      >
        EXIT PRESENTATION MODE
      </button>
    );
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex flex-col px-5 py-2.5 bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-transparent backdrop-blur-md pointer-events-none space-y-2">
      {/* Top Main Bar */}
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-sans text-sm font-extrabold tracking-wide text-slate-100 uppercase">
              EXHAUST ENERGY RECOVERY SYSTEM
            </h1>
            <p className="text-[10px] font-mono text-slate-400">
              Interactive Heavy-Duty Vehicle Energy Recovery Concept • 12-Blade Turbine Architecture
            </p>
          </div>
        </div>

        {/* Phase Breadcrumbs Pill Navigation matching Reference Image */}
        <div className="hidden lg:flex items-center gap-1.5 pointer-events-auto font-mono text-[10px]">
          {phaseBreadcrumbs.map((b) => {
            const isActive = currentPhaseIndex === b.idx;
            return (
              <button
                key={b.idx}
                onClick={() => jumpToPhase(b.idx)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  isActive
                    ? "bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-slate-500"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>

        {/* Header Right Action Buttons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setPresentationMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 text-slate-200 text-xs font-mono transition-all shadow"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            PRESENT
          </button>
          <button
            onClick={toggleTechnicalMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shadow ${
              isTechnicalMode
                ? "bg-cyan-950/80 border-cyan-500/50 text-cyan-300"
                : "bg-slate-900/80 border-slate-700/60 text-slate-300"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            DIMENSIONS
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 text-slate-300 transition-all shadow"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Phase Label Sub-Bar matching Reference Image */}
      <div className="text-center pointer-events-auto">
        <span className="inline-block px-3 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
          {currentPhase.title}
        </span>
      </div>
    </header>
  );
}
