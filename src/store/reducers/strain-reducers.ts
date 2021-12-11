import { sensorDefaults } from '#data/sensor-defaults';

export const strainConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_METAL':
      switch (action.payload) {
        case 'copper':
          return {
            ...state,
            metal: action.payload,
            gaugeFactor: 2.6,
            modulus: 110,
            temperatureCoefficient: 0.004041,
          };
        case 'constantan':
          return {
            ...state,
            metal: action.payload,
            gaugeFactor: 2.1,
            modulus: 162,
            temperatureCoefficient: -0.000074,
          };
        case 'platinum':
          return {
            ...state,
            metal: action.payload,
            gaugeFactor: 6.1,
            modulus: 154,
            temperatureCoefficient: 0.003729,
          };
        case 'monel':
          return {
            ...state,
            metal: action.payload,
            gaugeFactor: 1.9,
            modulus: 180,
            temperatureCoefficient: 0.0011,
          };
      }
      return { ...state, metal: action.payload };
    case 'CHANGE_VOLTAGE':
      return { ...state, inputVoltage: action.payload };
    case 'CHANGE_RESISTANCE':
      return { ...state, resistance: action.payload };
    case 'CHANGE_BRIDGE':
      switch (action.payload) {
        case 'quater':
          return { ...state, bridge: action.payload, bridgeMultiplier: '0.25' };
        case 'half':
          return { ...state, bridge: action.payload, bridgeMultiplier: '0.5' };
        case 'full':
          return { ...state, bridge: action.payload, bridgeMultiplier: '1' };
      }
      return { ...state, bridge: action.payload };
    default:
      return sensorDefaults.strain.config;
  }
};
