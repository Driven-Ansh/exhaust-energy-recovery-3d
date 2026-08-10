import { create } from "zustand";
import { SIMULATION_PHASES } from "../data/simulationPhases";

export const useAppStore = create((set, get) => ({
  // View & Mode State
  viewMode: "cutaway", // "normal", "cutaway", "exploded"
  isFlowVisible: true,
  isEnergyFlowVisible: true,
  isTechnicalMode: false, // Default to false for clean uncluttered 3D view
  showVehicleContext: false,
  presetView: "isometric",
  isPresentationMode: false,

  // Interactive Component Selection
  selectedComponentId: null,
  hoveredComponentId: null,

  // Simulation Parameters
  isSimulating: false,
  isPaused: false,
  currentPhaseIndex: 1,
  simulationSpeed: 1.0,
  engineLoad: 75,

  // Dynamic Simulated Metrics
  batteryCharge: 68,
  exhaustFlowRate: 8.75,
  turbineRPM: 12450,
  shaftRPM: 12450,
  generatorKW: 24.8,
  bypassOpenPercent: 0,

  // Setters
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleFlowVisible: () => set((state) => ({ isFlowVisible: !state.isFlowVisible })),
  toggleEnergyFlowVisible: () => set((state) => ({ isEnergyFlowVisible: !state.isEnergyFlowVisible })),
  toggleTechnicalMode: () => set((state) => ({ isTechnicalMode: !state.isTechnicalMode })),
  toggleVehicleContext: () => set((state) => ({ showVehicleContext: !state.showVehicleContext })),
  setPresetView: (view) => set({ presetView: view }),
  setPresentationMode: (val) => set({ isPresentationMode: val }),

  setSelectedComponentId: (id) => set({ selectedComponentId: id }),
  setHoveredComponentId: (id) => set({ hoveredComponentId: id }),

  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),

  // Simulation Actions
  startSimulation: () => set({ isSimulating: true, isPaused: false, currentPhaseIndex: 1 }),
  stopSimulation: () => set({ isSimulating: false, isPaused: false, currentPhaseIndex: 1 }),
  pauseSimulation: () => set({ isPaused: true }),
  resumeSimulation: () => set({ isPaused: false }),

  nextPhase: () => {
    const { currentPhaseIndex } = get();
    if (currentPhaseIndex < SIMULATION_PHASES.length) {
      set({ currentPhaseIndex: currentPhaseIndex + 1 });
    } else {
      set({ isSimulating: false, currentPhaseIndex: 1 });
    }
  },

  prevPhase: () => {
    const { currentPhaseIndex } = get();
    if (currentPhaseIndex > 1) {
      set({ currentPhaseIndex: currentPhaseIndex - 1 });
    }
  },

  jumpToPhase: (phaseIdx) => set({ currentPhaseIndex: phaseIdx, isSimulating: true, isPaused: false }),

  incrementBatteryCharge: (delta) => set((state) => ({
    batteryCharge: Math.min(100, parseFloat((state.batteryCharge + delta).toFixed(1))),
  })),

  setBypassOpenPercent: (val) => set({ bypassOpenPercent: val }),
}));
