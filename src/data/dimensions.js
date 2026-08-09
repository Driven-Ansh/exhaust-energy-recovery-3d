// Centralized Engineering Dimensions & Spatial Layout Configuration
// All 3D meshes and UI spec panels read from this configuration.

export const SYSTEM_DIMENSIONS = {
  // Overall System Metrics (in Normalized Engineering Units / meters)
  overallLength: 23.5, // Total length from Engine module to Generator end
  overallWidth: 6.0,
  overallHeight: 7.0,

  // 01 Engine / Combustion Source
  engine: {
    position: [13.5, 0, 0],
    width: 3.2,
    height: 3.8,
    depth: 3.2,
    exhaustPortDiameter: 1.2,
  },

  // 02 Main Exhaust Pipe
  exhaustPipe: {
    startX: 11.9,
    endX: 7.0,
    radius: 0.65,
    wallThickness: 0.08,
  },

  // 03 Exhaust / Muffler Chamber
  mufflerChamber: {
    position: [5.25, 0, 0],
    length: 3.5,
    radiusY: 2.2,
    radiusZ: 1.8,
    outerThickness: 0.12,
  },

  // 04 High-Velocity Exhaust Nozzle
  nozzle: {
    startX: 3.5,
    endX: 1.5,
    inletRadius: 1.8,
    outletRadius: 0.85,
    length: 2.0,
  },

  // 05 12-Blade Turbine
  turbine: {
    position: [0, 0, 0],
    bladeCount: 12, // EXACTLY 12 blades as per sketch requirement
    hubRadius: 0.45,
    bladeLength: 1.25,
    bladeWidth: 0.4,
    bladeThickness: 0.08,
    bladePitchAngle: 32, // degrees aerodynamic pitch
    housingRadius: 1.85,
    housingLength: 4.2,
  },

  // 06 Common Shaft
  shaft: {
    startX: 4.5,
    endX: -8.2,
    radius: 0.18,
    material: "Machined Steel Alloy",
  },

  // 07 Slanted Exhaust Deflector Sheet
  deflector: {
    position: [-2.8, 0, 0],
    angleDegrees: 52, // Slanted sheet angle in degrees as drawn
    width: 3.4,
    height: 4.2,
    thickness: 0.1,
  },

  // 08 Bypass Valve & Pipe
  bypass: {
    inletPos: [3.8, -1.8, 0],
    outletPos: [-3.8, -1.8, 0],
    valveBodyPos: [0, -2.6, 0],
    pipeRadius: 0.38,
    valveDiscRadius: 0.36,
  },

  // 09 Electrical Generator
  generator: {
    position: [-7.2, 0, 0],
    length: 3.2,
    radius: 1.75,
    statorFins: 16,
  },

  // 10 Power Electronics Module
  powerElectronics: {
    position: [-7.2, -3.2, 1.8],
    width: 2.2,
    height: 1.4,
    depth: 1.8,
  },

  // 11 Vehicle Battery Pack
  batteryPack: {
    position: [-2.5, -3.5, 2.5],
    width: 4.5,
    height: 1.6,
    depth: 3.0,
    cells: 48,
  },

  // 12 Exhaust Outlet
  exhaustOutlet: {
    position: [-3.0, 2.5, 0],
    radius: 0.85,
    length: 1.8,
  },
};
