// 12-Phase Automated Cinematic Presentation Sequence Definition
// Camera positions configured for medium-wide view without extreme zoom-in

export const SIMULATION_PHASES = [
  {
    phaseIndex: 1,
    id: "intro",
    title: "PHASE 01 — INTRODUCTION",
    subtitle: "EXHAUST ENERGY RECOVERY SYSTEM",
    narration:
      "Welcome to the Heavy-Duty Vehicle Exhaust Energy Recovery System interactive 3D engineering prototype. This concept captures waste heat and kinetic energy from diesel exhaust to generate clean electricity.",
    highlightComponent: null,
    cameraPos: [16, 9, 20],
    cameraTarget: [1.5, 0, 0],
    duration: 5.5,
  },
  {
    phaseIndex: 2,
    id: "engine",
    title: "PHASE 02 — ENGINE COMBUSTION SOURCE",
    subtitle: "Waste Thermal & Kinetic Energy Generation",
    narration:
      "Combustion inside the 3-cylinder heavy-duty diesel engine produces high-temperature exhaust gases (650°C). Reciprocating pistons drive exhaust flow directly into the energy recovery manifold.",
    highlightComponent: "engine",
    cameraPos: [16, 6, 12],
    cameraTarget: [10, 0, 0],
    duration: 6.0,
  },
  {
    phaseIndex: 3,
    id: "exhaust_path",
    title: "PHASE 03 — MAIN EXHAUST PIPE",
    subtitle: "High-Temperature Fluid Transport",
    narration:
      "Exhaust gases travel down the main stainless steel exhaust ducting. Internal flow paths preserve fluid kinetic energy while directing hot pressurized gas toward the expansion chamber.",
    highlightComponent: "exhaustPipe",
    cameraPos: [15, 6, 11],
    cameraTarget: [7.5, 0, 0],
    duration: 5.0,
  },
  {
    phaseIndex: 4,
    id: "muffler",
    title: "PHASE 04 — EXHAUST / MUFFLER CHAMBER",
    subtitle: "Pressure Stabilization & Accumulation",
    narration:
      "The gas enters the large elongated oval chamber drawn in the original reference concept. Here, pulsating exhaust pressure from combustion strokes stabilizes into a continuous high-pressure fluid reservoir.",
    highlightComponent: "mufflerChamber",
    cameraPos: [14, 6, 11],
    cameraTarget: [5.25, 0, 0],
    duration: 6.0,
  },
  {
    phaseIndex: 5,
    id: "nozzle",
    title: "PHASE 05 — HIGH-VELOCITY EXHAUST NOZZLE",
    subtitle: "Bernoulli Fluid Acceleration",
    narration:
      "The exhaust is directed through a smaller restricted nozzle passage. As the cross-sectional area contracts, static pressure converts to high kinetic velocity (over 140 m/s), creating a concentrated high-speed exhaust jet.",
    highlightComponent: "nozzle",
    cameraPos: [13, 5, 10],
    cameraTarget: [2.5, 0, 0],
    duration: 6.0,
  },
  {
    phaseIndex: 6,
    id: "turbine",
    title: "PHASE 06 — 12 SEQUENTIAL TURBINE STAGES",
    subtitle: "Kinetic Flow to Mechanical Rotation",
    narration:
      "High-velocity exhaust strikes ALL 12 engineered turbine blades mounted sequentially one behind another along the shaft axis. Impulse energy transfer forces all 12 stages into rapid rotation.",
    highlightComponent: "turbine",
    cameraPos: [12, 5, 10],
    cameraTarget: [0, 0, 0],
    duration: 7.5,
  },
  {
    phaseIndex: 7,
    id: "shaft",
    title: "PHASE 07 — COMMON ROTATIONAL SHAFT",
    subtitle: "Direct Mechanical Torque Transfer",
    narration:
      "The turbine rotation is transferred directly through the common central shaft. Running concentrically down the axis, the shaft locks turbine rotation and generator rotor drive in 1:1 mechanical synchrony.",
    highlightComponent: "shaft",
    cameraPos: [11, 5, 10],
    cameraTarget: [-2.5, 0, 0],
    duration: 5.5,
  },
  {
    phaseIndex: 8,
    id: "generator",
    title: "PHASE 08 — ELECTRICAL GENERATOR G",
    subtitle: "Mechanical Energy → Electrical Energy",
    narration:
      "At the rear end of the common shaft, the spinning rotor with copper armature windings cuts through magnetic stator pole fields, inducing high-efficiency alternating electrical current.",
    highlightComponent: "generator",
    cameraPos: [11, 5, 11],
    cameraTarget: [-6.0, 0, 0],
    duration: 6.0,
  },
  {
    phaseIndex: 9,
    id: "battery",
    title: "PHASE 09 — VEHICLE BATTERY PACK",
    subtitle: "Power Conditioning & Energy Storage",
    narration:
      "Power electronics condition the generator output and deliver high-voltage direct current into the heavy-vehicle battery pack. Live charging increases battery state of charge, reducing engine alternator load.",
    highlightComponent: "batteryPack",
    cameraPos: [10, 4, 11],
    cameraTarget: [-3.0, -2.0, 1.5],
    duration: 6.0,
  },
  {
    phaseIndex: 10,
    id: "bypass",
    title: "PHASE 10 — INTERACTIVE BYPASS VALVE",
    subtitle: "Overpressure Protection & Flow Modulation",
    narration:
      "The bypass valve opens or closes to modulate exhaust flow. During high-load backpressure spikes or engine start-up, exhaust diverts safely around the turbine stage directly to the exit tailpipe.",
    highlightComponent: "bypassValve",
    cameraPos: [12, 4, 11],
    cameraTarget: [0, -1.5, 0],
    duration: 6.0,
  },
  {
    phaseIndex: 11,
    id: "exit",
    title: "PHASE 11 — SLANTED DEFLECTOR & EXIT OUTLET",
    subtitle: "Deflected Exhaust Discharge Path",
    narration:
      "Post-turbine exhaust encounters the slanted metal deflector sheet drawn in the original concept sketch. Gas changes direction according to the sketch geometry and safely discharges out the top exit duct.",
    highlightComponent: "deflector",
    cameraPos: [12, 5, 10],
    cameraTarget: [-2.8, 1, 0],
    duration: 6.0,
  },
  {
    phaseIndex: 12,
    id: "summary",
    title: "PHASE 12 — COMPLETE RECOVERY LOOP",
    subtitle: "SIMULATION COMPLETE — Full Energy Loop Active",
    narration:
      "Engine combustion → Muffler → Convergent Nozzle → 12 Turbine Stages → Common Shaft → Electrical Generator → Vehicle Battery Storage. Full interactive exploration mode is now unlocked!",
    highlightComponent: null,
    cameraPos: [16, 9, 20],
    cameraTarget: [1.5, 0, 0],
    duration: 7.0,
  },
];
