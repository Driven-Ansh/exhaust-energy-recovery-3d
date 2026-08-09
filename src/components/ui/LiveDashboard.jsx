import React, { useState } from "react";
import { Gauge, Sliders, Battery, Activity, Flame, ChevronRight, ChevronLeft } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";

export function LiveDashboard() {
  const [isOpen, setIsOpen] = useState(true);

  const flowRate = useAppStore((state) => state.flowRate);
  const engineLoad = useAppStore((state) => state.engineLoad);
  const bypassPosition = useAppStore((state) => state.bypassPosition);
  const generatorLoad = useAppStore((state) => state.generatorLoad);
  const batteryCharge = useAppStore((state) => state.batteryChargePercent);
  const isSimulating = useAppStore((state) => state.isSimulating);
  const setSlider = useAppStore((state) => state.setSlider);

  // Dynamic calculated metrics based on current sliders
  const effectiveFlowFactor = (flowRate / 100) * (1 - bypassPosition / 100);
  const turbineRPM = Math.round(effectiveFlowFactor * 18500 * (engineLoad / 100));
  const shaftRPM = turbineRPM;
  const generatorOutputkW = ((shaftRPM / 18500) * 18.5 * (generatorLoad / 100)).toFixed(1);
  const systemStatus = bypassPosition > 80 ? "BYPASS ACTIVE" : isSimulating || flowRate > 20 ? "ACTIVE RECOVERY" : "STANDBY";

  return (
    <div
      className={`absolute bottom-6 right-6 z-20 transition-all duration-300 ${
        isOpen ? "w-80" : "w-12"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-3 top-4 z-30 p-1.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 shadow-lg hover:bg-slate-700 transition-all"
        title={isOpen ? "Collapse Dashboard" : "Expand Live Engineering Dashboard"}
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="p-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-white shadow-2xl flex flex-col gap-3">
          {/* Title & Status */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                LIVE METRICS (SIMULATED)
              </h3>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                systemStatus === "ACTIVE RECOVERY"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                  : systemStatus === "BYPASS ACTIVE"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {systemStatus}
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                TURBINE RPM
              </span>
              <span className="text-base font-bold font-mono text-cyan-400">
                {turbineRPM.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">RPM</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                GENERATOR POWER
              </span>
              <span className="text-base font-bold font-mono text-amber-400">
                {generatorOutputkW} <span className="text-[10px] text-slate-400 font-normal">kW</span>
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                BATTERY SOC
              </span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {batteryCharge}%
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                BYPASS VALVE
              </span>
              <span className="text-base font-bold font-mono text-red-400">
                {bypassPosition}%
              </span>
            </div>
          </div>

          {/* Interactive Sliders Section */}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2.5 text-xs">
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>SIMULATION CONTROL SLIDERS</span>
            </div>

            {/* Exhaust Flow Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 font-medium mb-1">
                <span>Exhaust Flow Rate</span>
                <span className="font-mono text-cyan-400">{flowRate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={flowRate}
                onChange={(e) => setSlider("flowRate", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Engine Load Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 font-medium mb-1">
                <span>Engine Load</span>
                <span className="font-mono text-cyan-400">{engineLoad}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={engineLoad}
                onChange={(e) => setSlider("engineLoad", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Bypass Valve Position Slider */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-300 font-medium mb-1">
                <span>Bypass Valve Position</span>
                <span className="font-mono text-red-400">{bypassPosition}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={bypassPosition}
                onChange={(e) => setSlider("bypassPosition", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
