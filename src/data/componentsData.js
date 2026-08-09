// Technical metadata for all 12 core components of the Exhaust Energy Recovery System

export const COMPONENTS_DATA = {
  engine: {
    id: "01",
    name: "Engine / Combustion Source",
    shortName: "Engine Source",
    category: "Primary Energy Source",
    sketchLabel: "Engine / Combustion",
    description:
      "Represents the primary heavy-duty diesel combustion engine source. High-temperature, high-pressure exhaust gas generated during fuel combustion exits the cylinders and enters the recovery manifold.",
    function:
      "Generates thermal and kinetic energy in the form of high-temperature pressurized exhaust flow directed into the recovery loop.",
    input: "Diesel Fuel + Compressed Air Combustion",
    output: "Hot Exhaust Gas (550°C - 750°C, High Pressure)",
    parameters: [
      { label: "Operating Temp", value: "650 °C" },
      { label: "Engine Displacement", value: "12.8 L Heavy-Duty" },
      { label: "Exhaust Mass Flow", value: "0.45 kg/s (Simulated)" },
      { label: "Exhaust Pressure", value: "2.8 bar" },
    ],
    details:
      "In heavy diesel vehicles, up to 35% of total combustion heat energy is lost through exhaust gases. Capturing this waste stream is the fundamental goal of this energy recovery architecture.",
  },

  exhaustPipe: {
    id: "02",
    name: "Main Exhaust Pipe",
    shortName: "Exhaust Pipe",
    category: "Fluid Ducting",
    sketchLabel: "Exhaust Pipe",
    description:
      "Heavy-wall insulated cylindrical exhaust ducting connecting the engine combustion exhaust port directly into the primary muffler chamber.",
    function:
      "Directs high-temperature exhaust gas from the engine to the recovery chamber while minimizing heat loss and backpressure.",
    input: "Engine Exhaust Port Flow",
    output: "Direct Intake to Muffler Chamber",
    parameters: [
      { label: "Duct Inner Diameter", value: "130 mm" },
      { label: "Material", value: "316L Stainless Steel" },
      { label: "Thermal Insulation", value: "Ceramic Wrap" },
      { label: "Flow Velocity", value: "45 m/s" },
    ],
    details:
      "Designed with minimal bends to reduce wall friction and preserve kinetic energy prior to entering the expanding muffler chamber.",
  },

  mufflerChamber: {
    id: "03",
    name: "Exhaust / Muffler Chamber",
    shortName: "Muffler Chamber",
    category: "Pressure Management",
    sketchLabel: "Muffler",
    description:
      "Large elongated oval/cylindrical expansion chamber as drawn in the original concept sketch. Serves as acoustic dampener and fluid accumulator prior to the high-velocity nozzle stage.",
    function:
      "Stabilizes exhaust flow pulsations from combustion cycles and builds up uniform fluid pressure before feeding the restricted nozzle.",
    input: "Pulsating Exhaust Stream from Main Pipe",
    output: "Stabilized High-Pressure Exhaust Reservoir",
    parameters: [
      { label: "Chamber Volume", value: "38.5 Liters" },
      { label: "Major Axis Diameter", value: "440 mm" },
      { label: "Acoustic Attenuation", value: "-18 dB" },
      { label: "Internal Peak Pressure", value: "2.5 bar" },
    ],
    details:
      "Visually faithful to the large rectangular/oval chamber in the hand-drawn sketch. Shell transparency can be toggled to view internal gas stabilization.",
  },

  nozzle: {
    id: "04",
    name: "High-Velocity Exhaust Nozzle",
    shortName: "Convergent Nozzle",
    category: "Fluid Acceleration",
    sketchLabel: "Restricted Nozzle",
    description:
      "Precision convergent nozzle passage transitioning the large muffler diameter down into a restricted throat area immediately upstream of the turbine blades.",
    function:
      "Converts thermal static pressure from the muffler chamber into focused, high-velocity dynamic kinetic flow (Bernoulli acceleration principle).",
    input: "Stabilized Gas from Muffler Chamber",
    output: "High-Velocity Jet (Subsonic/Transonic Flow)",
    parameters: [
      { label: "Inlet Diameter", value: "360 mm" },
      { label: "Throat Diameter", value: "170 mm" },
      { label: "Contraction Ratio", value: "4.49 : 1" },
      { label: "Exit Gas Velocity", value: "140 m/s (Simulated)" },
    ],
    details:
      "As exhaust gas passes through this narrowing passage, velocity increases dramatically while pressure drops, maximizing momentum delivered to the 12 turbine blades.",
  },

  turbine: {
    id: "05",
    name: "12-Blade Turbine Assembly",
    shortName: "12-Blade Turbine",
    category: "Kinetic Conversion",
    sketchLabel: "Gas turbine / Blade",
    description:
      "Primary energy extraction component containing EXACTLY 12 engineered radial impulse blades mounted on the common shaft, matching the original hand drawing.",
    function:
      "Extracts kinetic energy from high-velocity exhaust jets striking the 12 blades, converting linear gas flow into rotational mechanical torque on the shaft.",
    input: "High-Velocity Exhaust Stream from Nozzle",
    output: "High-Torque Rotational Shaft Motion",
    parameters: [
      { label: "Number of Blades", value: "12 (Exact Sketch Match)" },
      { label: "Rotor Diameter", value: "320 mm" },
      { label: "Blade Material", value: "Inconel 718 Superalloy" },
      { label: "Rated Speed", value: "18,500 RPM" },
      { label: "Isentropic Efficiency", value: "76.4%" },
    ],
    details:
      "Strictly adheres to the 12-blade requirement from the reference sketch. High-strength heat-resistant alloy withstands continuous 650°C gas bombardment.",
  },

  shaft: {
    id: "06",
    name: "Common Rotational Shaft",
    shortName: "Common Shaft",
    category: "Mechanical Transmission",
    sketchLabel: "Shaft",
    description:
      "Central precision shaft running through the turbine hub, extending backward into the generator rotor assembly.",
    function:
      "Mechanically transmits 100% of rotational torque generated by the 12 turbine blades directly into the rotor of the electrical generator.",
    input: "Turbine Blade Rotational Torque",
    output: "Synchronous Generator Rotor Drive",
    parameters: [
      { label: "Shaft Diameter", value: "36 mm" },
      { label: "Total Length", value: "1,270 mm" },
      { label: "Material", value: "4340 Nitrided Chromoly Steel" },
      { label: "Bearing Type", value: "Ceramic High-Speed Ball Bearings" },
    ],
    details:
      "Concentric shaft design aligns turbine and generator on a single central mechanical axis as shown in the original engineering drawing.",
  },

  deflector: {
    id: "07",
    name: "Slanted Exhaust Deflector",
    shortName: "Exit Deflector",
    category: "Flow Direction Control",
    sketchLabel: "Exit / Slanted Sheet",
    description:
      "Internal slanted metal sheet arrangement positioned directly downstream of the turbine blades as drawn in the original reference sketch.",
    function:
      "Deflects expanded post-turbine exhaust gas upward toward the top exit duct while maintaining backpressure control.",
    input: "Discharged Post-Turbine Exhaust Flow",
    output: "90-Degree Upward Deflected Exit Stream",
    parameters: [
      { label: "Deflection Angle", value: "52 Degrees" },
      { label: "Sheet Thickness", value: "6.0 mm" },
      { label: "Material", value: "Stainless Steel Baffle Plate" },
      { label: "Surface Treatment", value: "Anti-Erosion Coating" },
    ],
    details:
      "Preserves the exact visual geometry from the user's hand-drawn concept, directing gas out through the top exit port.",
  },

  bypassValve: {
    id: "08",
    name: "Interactive Bypass Valve System",
    shortName: "Bypass Valve",
    category: "Flow Regulation",
    sketchLabel: "Bypass valve",
    description:
      "Secondary diversion duct and mechanical valve loop originating upstream of the nozzle and returning gas downstream of the deflector.",
    function:
      "Protects system from extreme engine overpressure or low-load thermal conditions by allowing exhaust to bypass the turbine directly to exit.",
    input: "Upstream High-Pressure Exhaust",
    output: "Direct Secondary Exit Bypass Flow",
    parameters: [
      { label: "Actuator Type", value: "Pneumatic / Servo Electronic" },
      { label: "Bypass Duct Diameter", value: "76 mm" },
      { label: "Valve Position", value: "0 - 100% Variable" },
      { label: "Response Time", value: "120 ms" },
    ],
    details:
      "Fully interactive in 3D. Users can open/close the valve manually or watch it actuate automatically during simulation mode.",
  },

  generator: {
    id: "09",
    name: "Electrical Generator",
    shortName: "Electrical Generator",
    category: "Electromechanical Power Conversion",
    sketchLabel: "Generator / G",
    description:
      "Heavy-duty industrial permanent magnet synchronous generator (PMSG) mounted on the common shaft at the rear end of the system.",
    function:
      "Converts rotational mechanical shaft energy into high-voltage AC/DC electrical power.",
    input: "High-RPM Rotational Shaft Power",
    output: "High-Voltage Electric Current (AC/DC)",
    parameters: [
      { label: "Peak Electrical Output", value: "18.5 kW" },
      { label: "Generator Type", value: "3-Phase Permanent Magnet" },
      { label: "Stator Winding", value: "Heavy-Gauge Oxygen-Free Copper" },
      { label: "Electrical Efficiency", value: "93.8%" },
    ],
    details:
      "Matches the circular generator housing marked 'G' in the sketch. Generates continuous power for onboard heavy-vehicle electronics and battery charging.",
  },

  powerElectronics: {
    id: "10",
    name: "Power Electronics Inverter Module",
    shortName: "Power Electronics",
    category: "Electrical Power Conditioning",
    sketchLabel: "Power Electronics",
    description:
      "Solid-state DC-DC converter and AC-DC inverter unit that conditions raw electric power from the generator for battery charging.",
    function:
      "Regulates voltage, controls charging currents, and provides peak power point tracking (MPPT) for optimal energy capture.",
    input: "Variable AC/DC Voltage from Generator",
    output: "Regulated 400V DC Battery Charging Current",
    parameters: [
      { label: "Conversion Efficiency", value: "97.2%" },
      { label: "Switching Frequency", value: "40 kHz SiC MOSFET" },
      { label: "Cooling", value: "Liquid Glycol Loop" },
      { label: "Output Voltage", value: "400 V DC" },
    ],
    details:
      "Connects the generator output cables into the main vehicle high-voltage DC bus.",
  },

  batteryPack: {
    id: "11",
    name: "Vehicle Battery Pack",
    shortName: "Battery Pack",
    category: "Energy Storage",
    sketchLabel: "Vehicle Battery Pack",
    description:
      "Heavy-truck high-voltage Lithium Iron Phosphate (LiFePO4) traction battery system storing recovered electrical energy.",
    function:
      "Stores electrical energy recovered from engine exhaust waste heat, reducing alternator load and saving vehicle fuel.",
    input: "Regulated DC Electrical Current",
    output: "Onboard Vehicle Power & Auxiliary Drives",
    parameters: [
      { label: "Pack Energy Capacity", value: "85 kWh" },
      { label: "Nominal Pack Voltage", value: "400 V" },
      { label: "State of Charge (SOC)", value: "Dynamic Charging" },
      { label: "Fuel Consumption Savings", value: "4.5% - 7.2%" },
    ],
    details:
      "Animated current pulses show electric charge filling the battery during live simulation.",
  },

  exhaustOutlet: {
    id: "12",
    name: "Main Exhaust Outlet",
    shortName: "Exhaust Outlet",
    category: "Final Fluid Exit",
    sketchLabel: "Exit Duct",
    description:
      "Final exit tailpipe ducting taking post-deflector exhaust gas and discharging it safely away from the vehicle frame.",
    function:
      "Vents de-energized exhaust gas out to the atmosphere after maximum kinetic and thermal energy extraction.",
    input: "Deflected Low-Energy Exhaust Stream",
    output: "Atmospheric Discharge",
    parameters: [
      { label: "Outlet Diameter", value: "170 mm" },
      { label: "Tailpipe Material", value: "Aluminized Steel" },
      { label: "Residual Temperature", value: "320 °C" },
      { label: "Backpressure Contribution", value: "< 0.15 bar" },
    ],
    details:
      "Positioned at the top of the housing following the slanted deflector angle drawn in the user's concept.",
  },
};
