import React from "react";
import { useAppStore } from "../../store/useAppStore";
import { Activity, Gauge, Zap, Flame, Cpu, ShieldCheck } from "lucide-react";

export function LiveDashboard() {
  const engineLoad = useAppStore((state) => state.engineLoad);
  const setEngineLoad = useAppStore((state) => state.setEngineLoad);
  const exhaustFlowRate = useAppStore((state) => state.exhaustFlowRate);
  const turbineRPM = useAppStore((state) => state.turbineRPM);
  const shaftRPM = useAppStore((state) => state.shaftRPM);
  const generatorKW = useAppStore((state) => state.generatorKW);
  const batteryCharge = useAppStore((state) => state.batteryCharge);
  const bypassOpenPercent = useAppStore((state) => state.bypassOpenPercent);
  const isSimulating = useAppStore((state) => state.isSimulating);
  const isPresentationMode = useAppStore((state) => state.isPresentationMode);

  if (isPresentationMode) return null;

  return (
    <div className="absolute bottom-4 left-4 z-20 w-80 rounded-2xl bg-slate-900/90 border border-slate-700/60 p-4 shadow-2xl backdrop-blur-xl pointer-events-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-100 uppercase">
            LIVE SIMULATION DASHBOARD
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-[9px] font-mono font-bold text-cyan-400">
          SIMULATED VALUES
        </span>
      </div>

      {/* Simulated Engine Load Control Slider */}
      <div className="mb-3.5 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-300 font-mono flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            SIMULATED ENGINE LOAD
          </span>
          <span className="font-mono font-bold text-orange-400">{engineLoad}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          step="5"
          value={engineLoad}
          onChange={(e) => setEngineLoad(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>

      {/* Real-time Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
        {/* Exhaust Flow */}
        <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Gauge className="w-3 h-3 text-cyan-400" /> FLOW RATE
          </div>
          <div className="text-sm font-bold text-cyan-300 mt-0.5">
            {exhaustFlowRate} <span className="text-[10px] text-slate-400 font-normal">kg/s</span>
          </div>
        </div>

        {/* Turbine RPM */}
        <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" /> TURBINE (T1-T12)
          </div>
          <div className="text-sm font-bold text-cyan-300 mt-0.5">
            {turbineRPM.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">RPM</span>
          </div>
        </div>

        {/* Generator kW */}
        <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-400" /> GEN OUTPUT
          </div>
          <div className="text-sm font-bold text-yellow-300 mt-0.5">
            {generatorKW} <span className="text-[10px] text-slate-400 font-normal">kW</span>
          </div>
        </div>

        {/* Battery SOC % */}
        <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> BATTERY SOC
          </div>
          <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center justify-between">
            <span>{batteryCharge}%</span>
            {isSimulating && (
              <span className="text-[9px] text-emerald-400 animate-pulse font-normal">⚡ CHARGING</span>
            )}
          </div>
        </div>
      </div>

      {/* Bypass Status Indicator */}
      <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>BYPASS VALVE: <strong className="text-slate-200">{bypassOpenPercent > 0 ? `OPEN (${bypassOpenPercent}%)` : "CLOSED (0%)"}</strong></span>
        <span>SYSTEM: <strong className="text-emerald-400">OPTIMAL</strong></span>
      </div>
    </div>
  );
}
