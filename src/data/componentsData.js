// Detailed Component Specification & Engineering Overview Data

export const COMPONENTS_DATA = {
  // Engine & Cylinders
  engine: {
    id: "engine",
    title: "01 Engine — 3-Cylinder Combustion Source",
    category: "THERMAL POWER SOURCE",
    sketchLabel: "Heavy Truck Diesel Engine Block",
    description:
      "Heavy-duty 3-cylinder engine block operating on a 4-stroke thermal combustion cycle. Produces high-temperature (650°C), high-pressure exhaust gas stream driving the energy recovery loop.",
    coreFunction:
      "Converts chemical fuel energy into mechanical torque while discharging high-energy thermal exhaust into the recovery manifold.",
    specs: {
      "Displacement": "7.2 Liters (3 x 2.4L Cylinders)",
      "Firing Order": "1 - 3 - 2 (120° Phase Offset)",
      "Exhaust Gas Temp": "650 °C at Nominal Load",
      "Combustion Peak Pressure": "165 bar",
      "Nominal Speed": "1,800 RPM",
    },
  },

  cylinder_1: {
    id: "cylinder_1",
    title: "Cylinder C1 — Front Combustion Stage",
    category: "RECIPROCATING COMBUSTION BORE",
    description: "Front cylinder bore featuring reciprocating aluminum piston, dual overhead intake/exhaust valves, and top dead center combustion chamber.",
    coreFunction: "Initial stroke combustion delivering pressurized pulse into the front exhaust header.",
    specs: { "Bore Diameter": "128 mm", "Stroke Length": "145 mm", "Peak Flame Temp": "1,850 °C" },
  },
  cylinder_2: {
    id: "cylinder_2",
    title: "Cylinder C2 — Center Combustion Stage",
    category: "RECIPROCATING COMBUSTION BORE",
    description: "Center cylinder bore with 120° crank offset, providing balanced mid-cycle combustion pulses.",
    coreFunction: "Sustains continuous fluid pressure buildup in main exhaust manifold.",
    specs: { "Bore Diameter": "128 mm", "Stroke Length": "145 mm", "Peak Flame Temp": "1,850 °C" },
  },
  cylinder_3: {
    id: "cylinder_3",
    title: "Cylinder C3 — Rear Combustion Stage",
    category: "RECIPROCATING COMBUSTION BORE",
    description: "Rear cylinder bore directly adjacent to main exhaust pipe coupling flange.",
    coreFunction: "Final cylinder stroke stabilizing exhaust pulse stream entering ducting.",
    specs: { "Bore Diameter": "128 mm", "Stroke Length": "145 mm", "Peak Flame Temp": "1,850 °C" },
  },

  // Piping & Chamber
  exhaustPipe: {
    id: "exhaustPipe",
    title: "02 Main Exhaust Pipe",
    category: "FLUID TRANSPORT DUCT",
    sketchLabel: "Exhaust Ducting",
    description: "Insulated stainless steel exhaust duct carrying hot pressurized exhaust gases directly from engine manifold to expansion chamber.",
    coreFunction: "Preserves fluid thermal and kinetic enthalpy with minimal flow resistance.",
    specs: { "Duct Inner Diameter": "210 mm", "Wall Thickness": "4.5 mm", "Insulation Rating": "Ceramic Fiber Layer" },
  },

  mufflerChamber: {
    id: "mufflerChamber",
    title: "03 Exhaust / Muffler Chamber",
    category: "PRESSURE ACCUMULATOR",
    sketchLabel: "Large Oval Muffler Chamber",
    description: "Large oval chamber acting as a pressure accumulation reservoir to damp combustion pressure spikes into a smooth continuous gas flow.",
    coreFunction: "Transforms pulsating exhaust bursts into a stable high-pressure plenum for nozzle entry.",
    specs: { "Chamber Volume": "48.5 Liters", "Internal Baffle": "Perforated Diffuser Core", "Operating Pressure": "3.8 bar" },
  },

  nozzle: {
    id: "nozzle",
    title: "04 High-Velocity Convergent Nozzle",
    category: "FLUID ACCELERATOR",
    sketchLabel: "Restricted Diameter Passage",
    description: "Convergent nozzle section with decreasing cross-sectional area accelerating exhaust stream according to Bernoulli's principle.",
    coreFunction: "Converts static fluid pressure into high-speed kinetic velocity jet (>140 m/s) striking Turbine Stage T1.",
    specs: { "Area Contraction Ratio": "4.2 : 1", "Exit Velocity": "145 m/s", "Nozzle Angle": "14.5 Degrees" },
  },

  // 12 Separate Turbines in Series
  turbine: {
    id: "turbine",
    title: "05 12-Stage Series Turbine Assembly",
    category: "KINETIC ENERGY EXTRACTION",
    sketchLabel: "12-Blade / Stage Turbine Architecture",
    description: "Multi-stage axial turbine array comprising 12 SEPARATE TURBINE WHEELS (T1 through T12) mounted sequentially in series on the common central shaft.",
    coreFunction: "Sequentially extracts kinetic energy from gas stream across 12 distinct rotor stages, driving common shaft rotation.",
    specs: { "Stage Count": "12 Separate Turbines in Series", "Rotor Outer Diameter": "320 mm", "Total Isentropic Efficiency": "78.4%", "Max Rated Speed": "22,500 RPM" },
  },

  ...Array.from({ length: 12 }).reduce((acc, _, idx) => {
    const stageNum = idx + 1;
    const key = `turbine_t${stageNum}`;
    acc[key] = {
      id: key,
      title: `Turbine Stage T${stageNum} — Series Rotor ${stageNum}`,
      category: "AXIAL ROTOR STAGE",
      description: `Turbine Wheel T${stageNum} mounted in series position ${stageNum} along central shaft. Extracts stage ${stageNum} enthalpy drop.`,
      coreFunction: `Converts stage ${stageNum} fluid kinetic energy into shaft torque.`,
      specs: { "Stage Position": `${stageNum} of 12`, "Blade Count": "6 Aerodynamic Impulse Blades", "Pitched Angle": `${15 + stageNum * 2}°` },
    };
    return acc;
  }, {}),

  // Shaft, Deflector, Bypass, Generator, Electronics, Battery, Outlet
  shaft: {
    id: "shaft",
    title: "06 Common Rotational Shaft",
    category: "MECHANICAL TORQUE TRANSMISSION",
    sketchLabel: "Common Shaft",
    description: "High-strength alloy central shaft locking all 12 turbine wheels and electrical generator rotor in 1:1 direct mechanical synchrony.",
    coreFunction: "Transfers mechanical torque from 12 turbine stages directly to electrical generator rotor.",
    specs: { "Shaft Diameter": "36 mm", "Material": "Chrome-Moly Alloy Steel", "Max Torque": "125 Nm" },
  },

  deflector: {
    id: "deflector",
    title: "07 Slanted Exhaust Deflector Sheet",
    category: "FLOW DIVERSION BAFFLE",
    sketchLabel: "Slanted Metal Plate",
    description: "Heavy metal deflector plate angled at 52 degrees positioned downstream of Turbine T12 to safely divert de-energized exhaust gas upward.",
    coreFunction: "Redirects post-turbine gas stream toward top exit tailpipe matching sketch geometry.",
    specs: { "Angle": "52.0 Degrees", "Plate Material": "Inconel 625 Heat-Resistant Alloy" },
  },

  bypassValve: {
    id: "bypassValve",
    title: "08 Interactive Bypass Valve",
    category: "FLOW OVERPRESSURE SAFETY",
    sketchLabel: "Bypass Valve Conduit",
    description: "Electromechanically actuated bypass valve permitting high-flow exhaust to bypass turbine stages during high-load engine conditions.",
    coreFunction: "Prevents excessive exhaust backpressure on engine during full load acceleration.",
    specs: { "Valve Type": "Butterfly Disc Actuator", "Response Time": "120 ms", "Max Flow Capacity": "12.0 kg/s" },
  },

  generator: {
    id: "generator",
    title: "09 Electrical Generator G",
    category: "ELECTROMECHANICAL CONVERTER",
    sketchLabel: "Generator G",
    description: "Industrial electromechanical generator with multi-pole rotor core and copper armature windings driven directly by common shaft.",
    coreFunction: "Converts rotational mechanical power into clean high-voltage electrical current.",
    specs: { "Peak Electrical Output": "35 kW", "Voltage": "400 V DC (Rectified)", "Efficiency": "94.2%" },
  },

  powerElectronics: {
    id: "powerElectronics",
    title: "10 Power Electronics Unit",
    category: "ELECTRICAL CONDITIONING",
    sketchLabel: "Power Converter Box",
    description: "Solid-state inverter/rectifier unit conditioning generator variable AC output into regulated DC charging power.",
    coreFunction: "Regulates voltage and manages high-voltage battery charging protocols.",
    specs: { "Efficiency": "98.5%", "Cooling": "Liquid Cold Plate", "Max Current": "100 A" },
  },

  batteryPack: {
    id: "batteryPack",
    title: "11 Vehicle Battery Pack",
    category: "ELECTRICAL ENERGY STORAGE",
    sketchLabel: "Vehicle Battery Pack",
    description: "Heavy-duty lithium-ion traction battery pack storing recovered electrical energy for vehicle propulsion and auxiliary systems.",
    coreFunction: "Stores recovered energy, offsetting engine alternator load and reducing vehicle fuel consumption by 8-12%.",
    specs: { "Capacity": "45 kWh", "Nominal Voltage": "400 V", "Chemistry": "NMC Lithium-Ion" },
  },

  exhaustOutlet: {
    id: "exhaustOutlet",
    title: "12 Exhaust Outlet",
    category: "ATMOSPHERIC DISCHARGE",
    sketchLabel: "Top Exit Duct",
    description: "Upward vertical stack venting cooled, expanded exhaust gas safely into the atmosphere.",
    coreFunction: "Final atmospheric discharge path for de-energized exhaust gas stream.",
    specs: { "Exit Diameter": "170 mm", "Exhaust Temp at Exit": "180 °C" },
  },
};
