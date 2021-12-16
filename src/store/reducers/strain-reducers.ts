import { sensorDefaults } from '#data/sensor-defaults';

export const strainConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_METAL': {
      switch (action.payload) {
        case 'copper':
          return {
            ...state,
            material: {
              metal: action.payload,
              gaugeFactor: 2.6,
              modulus: 110,
              tempCoeff: 0.004041,
            },
          };
        case 'constantan':
          return {
            ...state,
            material: {
              metal: action.payload,
              gaugeFactor: 2.1,
              modulus: 162,
              tempCoeff: -0.000074,
            },
          };
        case 'platinum':
          return {
            ...state,
            material: {
              metal: action.payload,
              gaugeFactor: 6.1,
              modulus: 154,
              tempCoeff: 0.003729,
            },
          };
        case 'monel':
          return {
            ...state,
            material: {
              metal: action.payload,
              gaugeFactor: 1.9,
              modulus: 180,
              tempCoeff: 0.0011,
            },
          };
      }
    }
    case 'CHANGE_VOLTAGE':
      return { ...state, inputVoltage: action.payload };
    case 'CHANGE_RESISTANCE':
      return { ...state, resistance: action.payload };
    case 'CHANGE_BRIDGE': {
      switch (action.payload) {
        case 'quater':
          return {
            ...state,
            bridge: {
              type: action.payload,
              multiplier: 0.25,
            },
          };
        case 'half':
          return {
            ...state,
            bridge: {
              type: action.payload,
              multiplier: 0.5,
            },
          };
        case 'full':
          return {
            ...state,
            bridge: {
              type: action.payload,
              multiplier: 1,
            },
          };
      }
    }
    default:
      return sensorDefaults.strain.config;
  }
};
