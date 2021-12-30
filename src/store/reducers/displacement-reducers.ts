import { sensorDefaults } from '#data/sensor-defaults';

export const displacementConfigReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CHANGE_TURNS':
      return {
        ...state,
        turns: action.payload,
      };
    case 'CHANGE_VOLTAGE':
      return {
        ...state,
        inputVoltage: action.payload,
      };

    case 'CHANGE_FREQUENCY':
      return {
        ...state,
        frequency: action.payload,
      };
    default:
      return sensorDefaults.displacement.config;
  }
};
