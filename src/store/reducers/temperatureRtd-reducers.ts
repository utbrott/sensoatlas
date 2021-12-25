import { sensorDefaults } from '#data/sensor-defaults';

export const temperatureRtdConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_SENSOR': {
      switch (action.payload) {
        case 'platinum':
          return {
            ...state,
            sensorMaterial: {
              metal: action.payload,
              tempCoeff: 0.003729,
              density: 21450,
              heatCapacity: 133,
              conductivity: 69.1,
            },
          };
        case 'copper':
          return {
            ...state,
            sensorMaterial: {
              metal: action.payload,
              tempCoeff: 0.004041,
              density: 8960,
              heatCapacity: 0.385,
              conductivity: 384.1,
            },
          };
        case 'nickel':
          return {
            ...state,
            sensorMaterial: {
              metal: action.payload,
              tempCoeff: 0.00617,
              density: 8908,
              heatCapacity: 440,
              conductivity: 106,
            },
          };
        case 'tungsten':
          return {
            ...state,
            sensorMaterial: {
              metal: action.payload,
              tempCoeff: 0.0045,
              density: 19300,
              heatCapacity: 134,
              conductivity: 173,
            },
          };
      }
    }
    case 'CHANGE_FILLER': {
      switch (action.payload) {
        case 'mgoPowder':
          return {
            ...state,
            fillerMaterial: {
              type: action.payload,
              density: 3580,
              heatCapacity: 877,
              conductivity: 26.8,
            },
          };
        case 'siliconCompound':
          return {
            ...state,
            fillerMaterial: {
              type: action.payload,
              density: 3210,
              heatCapacity: 800,
              conductivity: 3,
            },
          };
      }
    }
    case 'CHANGE_RESISTANCE': {
      return { ...state, resistance: action.payload };
    }
    case 'CHANGE_THICKNESS': {
      return { ...state, thickness: action.payload };
    }
    default:
      return sensorDefaults.temperatureRtd.config;
  }
};
