import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { Play, Pause, Eye, Maximize2, Sparkles } from "lucide-react";

export function Header() {
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPaused = useAppStore((state) => state.isPaused);
  const startSimulation = useAppStore((state) => state.startSimulation);
  const pauseSimulation = useAppStore((state) => state.pauseSimulation);
  const resumeSimulation = useAppStore((state) => state.resumeSimulation);
  const isPresentationMode = useAppStore((state) => state.isPresentationMode);
  const setPresentationMode = useAppStore((state) => state.setPresentationMode);

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
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent backdrop-blur-md pointer-events-none">
      {/* Title & Architecture Subtitle */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-sans text-base font-extrabold tracking-wide text-slate-100 flex items-center gap-2">
            EXHAUST ENERGY RECOVERY SYSTEM
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              12 SERIES TURBINES • 3-CYLINDER ENGINE
            </span>
          </h1>
          <p className="text-[11px] font-mono text-slate-400">
            Interactive Heavy-Duty Vehicle Waste Heat Recovery 3D Engineering Simulator
          </p>
        </div>
      </div>

      {/* Main Simulation Control Button & Presentation Controls */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Simulate Process Button */}
        {!isSimulating ? (
          <button
            onClick={startSimulation}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            SIMULATE PROCESS
          </button>
        ) : (
          <button
            onClick={isPaused ? resumeSimulation : pauseSimulation}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            <Pause className="w-4 h-4 fill-current" />
            {isPaused ? "RESUME" : "PAUSE"}
          </button>
        )}

        {/* Presentation Mode Toggle */}
        <button
          onClick={() => setPresentationMode(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 text-slate-200 text-xs font-mono font-medium transition-all shadow-md"
        >
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          PRESENT
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:bg-slate-800 text-slate-300 transition-all shadow-md"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
