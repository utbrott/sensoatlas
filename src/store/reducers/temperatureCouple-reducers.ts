import { sensorDefaults } from '#data/sensor-defaults';

export const temperatureCoupleConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_SENSOR': {
      switch (action.payload) {
        case 'typeJ':
          return {
            ...state,
            thermocouple: {
              type: action.payload,
              seebeckCoeff: 51,
              density: 8535,
              heatCapacity: 345,
              conductivity: 46,
            },
          };
        case 'typeK':
          return {
            ...state,
            thermocouple: {
              type: action.payload,
              seebeckCoeff: 40,
              density: 8738,
              heatCapacity: 380,
              conductivity: 35,
            },
          };
        case 'typeR':
          return {
            ...state,
            thermocouple: {
              type: action.payload,
              seebeckCoeff: 12,
              density: 16628,
              heatCapacity: 99,
              conductivity: 55,
            },
          };
        case 'typeT':
          return {
            ...state,
            thermocouple: {
              type: action.payload,
              seebeckCoeff: 60,
              density: 8902,
              heatCapacity: 316,
              conductivity: 160,
            },
          };
        case 'typeE':
          return {
            ...state,
            thermocouple: {
              type: action.payload,
              seebeckCoeff: 40,
              density: 8825,
              heatCapacity: 336,
              conductivity: 33,
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
    case 'CHANGE_REFERENCE': {
      return { ...state, refTemperature: action.payload };
    }
    case 'CHANGE_THICKNESS': {
      return { ...state, thickness: action.payload };
    }
    default:
      return sensorDefaults.temperatureCouple.config;
  }
};
