import { sensorDefaults } from '#data/sensor-defaults';

export const strainConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_METAL':
      switch (action.payload) {
        case 'copper':
          return {
            ...state,
            metal: action.payload,
            sensitivity: '2.6',
            modulus: '110',
          };
        case 'constantan':
          return {
            ...state,
            metal: action.payload,
            sensitivity: '2.1',
            modulus: '162',
          };
        case 'platinum':
          return {
            ...state,
            metal: action.payload,
            sensitivity: '6.1',
            modulus: '154',
          };
        case 'monel':
          return {
            ...state,
            metal: action.payload,
            sensitivity: '1.9',
            modulus: '180',
          };
      }
      return { ...state, metal: action.payload };
    case 'CHANGE_VOLTAGE':
      return { ...state, inputVoltage: action.payload };
    case 'CHANGE_RESISTANCE':
      return { ...state, resistance: action.payload };
    case 'CHANGE_BRIDGE':
      return { ...state, bridge: action.payload };
    default:
      return sensorDefaults.strain.config;
  }
};
