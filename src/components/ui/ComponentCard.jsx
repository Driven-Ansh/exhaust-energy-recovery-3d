import React, { useState } from "react";
import { X, ChevronDown, ChevronUp, Cpu, Info, Zap, ArrowRight } from "lucide-react";
import { COMPONENTS_DATA } from "../../data/componentsData";
import { useAppStore } from "../../store/useAppStore";

export function ComponentCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedId = useAppStore((state) => state.selectedComponentId);
  const setSelectedComponentId = useAppStore(
    (state) => state.setSelectedComponentId
  );

  if (!selectedId || !COMPONENTS_DATA[selectedId]) return null;

  const data = COMPONENTS_DATA[selectedId];

  return (
    <div className="absolute top-16 right-6 z-20 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-white shadow-2xl animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Header Banner */}
      <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              COMPONENT {data.id}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {data.category}
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-100">{data.name}</h2>
          <p className="text-[11px] text-amber-400 font-mono mt-0.5">
            Sketch Label: "{data.sketchLabel}"
          </p>
        </div>

        <button
          onClick={() => setSelectedComponentId(null)}
          className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="p-4 flex flex-col gap-3 text-xs">
        {/* Description */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1">
            DESCRIPTION & OVERVIEW
          </h3>
          <p className="text-slate-300 leading-relaxed">{data.description}</p>
        </div>

        {/* Function */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <h3 className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase mb-1">
            CORE FUNCTION
          </h3>
          <p className="text-slate-200 leading-relaxed">{data.function}</p>
        </div>

        {/* Fluid/Electrical Input & Output Flow */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
              INPUT
            </span>
            <span className="text-slate-200 font-medium block leading-tight">
              {data.input}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-800">
            <span className="text-[10px] font-bold text-cyan-400 uppercase block mb-1">
              OUTPUT
            </span>
            <span className="text-slate-200 font-medium block leading-tight">
              {data.output}
            </span>
          </div>
        </div>

        {/* Technical Parameters Table */}
        <div>
          <h3 className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
            TECHNICAL SPECIFICATIONS
          </h3>
          <div className="divide-y divide-slate-800/60 rounded-lg border border-slate-800 bg-slate-950/40">
            {data.parameters.map((param, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-1.5">
                <span className="text-slate-400 font-medium">{param.label}</span>
                <span className="text-slate-200 font-semibold font-mono">{param.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable "Learn More" Section */}
        <div className="pt-2 border-t border-slate-800">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-all"
          >
            <span>Learn More & Design Notes</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {isExpanded && (
            <div className="p-3 mt-2 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-cyan-200/90 leading-relaxed text-[11px] animate-in fade-in duration-150">
              {data.details}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
