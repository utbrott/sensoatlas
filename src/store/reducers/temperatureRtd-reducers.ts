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
              density: 21.45,
              heatCapacity: 0.133,
              conductivity: 69.1,
            },
          };
        case 'copper':
          return {
            ...state,
            sensorMaterial: {
              metal: action.payload,
              tempCoeff: 0.004041,
              density: 8.96,
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
              density: 8.908,
              heatCapacity: 0.44,
              conductivity: 106,
            },
          };
        case 'tungsten':
          return {
            ...state,
            sensorMaterial: {
              metal: action.payload,
              tempCoeff: 0.0045,
              density: 19.3,
              heatCapacity: 0.134,
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
              density: 3.58,
              heatCapacity: 0.877,
              conductivity: 26.8,
            },
          };
        case 'siliconCompound':
          return {
            ...state,
            fillerMaterial: {
              type: action.payload,
              density: 3.21,
              heatCapacity: 0.8,
              conductivity: 3,
            },
          };
      }
    }
    case 'CHANGE_RESISTANCE': {
      return { ...state, resistance: action.payload };
    }
    default:
      return sensorDefaults.temperatureRtd.config;
  }
};
