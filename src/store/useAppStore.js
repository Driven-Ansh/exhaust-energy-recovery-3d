import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  // Active Selected / Hovered Components
  selectedComponentId: null,
  hoveredComponentId: null,

  // Visual Display Modes
  viewMode: "normal", // 'normal' | 'cutaway' | 'exploded'
  isFlowVisible: true,
  isEnergyFlowVisible: true,
  isTechnicalMode: false,
  isVehicleContextVisible: false,
  presetView: "isometric", // 'isometric' | 'front' | 'side' | 'top' | null

  // Presentation & Modals
  isPresenting: false,
  isFullscreen: false,
  isDimensionsModalOpen: false,

  // Simulation Controls & State
  isSimulating: false,
  isPaused: false,
  currentPhaseIndex: 1, // 1 to 12
  simulationSpeed: 1.0, // 0.5 | 1.0 | 2.0
  simProgress: 0, // 0 to 100
  batteryChargePercent: 64, // % battery state of charge

  // Actions
  setSelectedComponentId: (id) => set({ selectedComponentId: id }),
  setHoveredComponentId: (id) => set({ hoveredComponentId: id }),

  setViewMode: (mode) => set({ viewMode: mode }),
  setFlowVisible: (visible) =>
    set((state) => ({
      isFlowVisible:
        typeof visible === "boolean" ? visible : !state.isFlowVisible,
    })),
  setEnergyFlowVisible: (visible) =>
    set((state) => ({
      isEnergyFlowVisible:
        typeof visible === "boolean" ? visible : !state.isEnergyFlowVisible,
    })),
  setTechnicalMode: (visible) =>
    set((state) => ({
      isTechnicalMode:
        typeof visible === "boolean" ? visible : !state.isTechnicalMode,
    })),
  setVehicleContextVisible: (visible) =>
    set((state) => ({
      isVehicleContextVisible:
        typeof visible === "boolean"
          ? visible
          : !state.isVehicleContextVisible,
    })),

  setPresetView: (view) => set({ presetView: view }),

  // Simulation controls
  startSimulation: () =>
    set({
      isSimulating: true,
      isPaused: false,
      currentPhaseIndex: 1,
      simProgress: 0,
    }),
  pauseSimulation: () => set({ isPaused: true }),
  resumeSimulation: () => set({ isPaused: false }),
  stopSimulation: () => set({ isSimulating: false, isPaused: false }),
  restartSimulation: () =>
    set({
      isSimulating: true,
      isPaused: false,
      currentPhaseIndex: 1,
      simProgress: 0,
    }),

  nextPhase: () =>
    set((state) => {
      const next = state.currentPhaseIndex + 1;
      if (next > 12) {
        return { isSimulating: false, currentPhaseIndex: 12 };
      }
      return { currentPhaseIndex: next };
    }),

  prevPhase: () =>
    set((state) => {
      const prev = Math.max(1, state.currentPhaseIndex - 1);
      return { currentPhaseIndex: prev };
    }),

  setPhaseIndex: (idx) =>
    set({ currentPhaseIndex: Math.min(12, Math.max(1, idx)) }),

  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),
  setSimProgress: (progress) => set({ simProgress: progress }),

  setBatteryChargePercent: (val) =>
    set((state) => ({
      batteryChargePercent:
        typeof val === "function" ? val(state.batteryChargePercent) : val,
    })),

  // Modals & Modes
  setDimensionsModalOpen: (open) =>
    set((state) => ({
      isDimensionsModalOpen:
        typeof open === "boolean" ? open : !state.isDimensionsModalOpen,
    })),

  setPresenting: (presenting) =>
    set((state) => ({
      isPresenting:
        typeof presenting === "boolean"
          ? presenting
          : !state.isPresenting,
    })),

  setFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
}));
