import { TheoryTable } from '#types/theory-table';

export const rtdSensorTable: TheoryTable = {
  caption: 'RTD sensor material data',
  headers: [
    {
      text: 'Metal',
      unit: '',
    },
    {
      text: 'Temperature coefficient',
      unit: '',
    },
    {
      text: 'Density',
      unit: '[$kg\\cdot m^{-3}$]',
    },
    {
      text: 'Heat capacity',
      unit: '[$J\\cdot (kg ^\\circ C)^{-1}$]',
    },
    {
      text: 'Thermal conductivity',
      unit: '[$W\\cdot (mK)^{-1}$]',
    },
  ],
  rows: [
    ['Platinum', 0.003729, 21450, 133, 69.1],
    ['Copper', 0.004041, 8960, 385, 384.1],
    ['Nickel', 0.00617, 8908, 440, 106],
    ['Tungsten', 0.0045, 21450, 134, 173],
  ],
};

export const thermocoupleSensorTable: TheoryTable = {
  caption: 'Thermocouple sensor types data',
  headers: [
    {
      text: 'Thermocouple type',
      unit: '',
    },
    {
      text: 'Seebecks coefficient',
      unit: '[$\\mu V\\cdot K^{-1}$]',
    },
    {
      text: 'Density',
      unit: '[$kg\\cdot m^{-3}$]',
    },
    {
      text: 'Heat capacity',
      unit: '[$J\\cdot (kg ^\\circ C)^{-1}$]',
    },
    {
      text: 'Thermal conductivity',
      unit: '[$W\\cdot (mK)^{-1}$]',
    },
  ],
  rows: [
    ['Type J', 51, 8535, 345, 46],
    ['Type K', 40, 8738, 380, 35],
    ['Type R', 12, 16628, 99, 55],
    ['Type T', 60, 8902, 316, 160],
    ['Type E', 40, 8825, 336, 33],
  ],
};

export const fillerMaterialTable: TheoryTable = {
  caption: 'Sheath/Thermowell materials data',
  headers: [
    {
      text: 'Material',
      unit: '',
    },
    {
      text: 'Density',
      unit: '[$kg\\cdot m^{-3}$]',
    },
    {
      text: 'Heat capacity',
      unit: '[$J\\cdot (kg ^\\circ C)^{-1}$]',
    },
    {
      text: 'Thermal conductivity',
      unit: '[$W\\cdot (mK)^{-1}$]',
    },
  ],
  rows: [
    ['MgO Powder', 3580, 877, 26.8],
    ['Silicon Compound', 3210, 800, 3],
    ['Air', 1.225, 1005, 0.025],
    ['SS304 (Casing)', 8030, 500, 21.4],
  ],
};

export const strainSensorTable: TheoryTable = {
  caption: 'Strain gauge sensor material data',
  headers: [
    {
      text: 'Metal',
      unit: '',
    },
    {
      text: 'Gauge factor',
      unit: '',
    },
    {
      text: 'Temperature coefficient',
      unit: '',
    },
  ],
  rows: [
    ['Copper', 2.6, 0.004041],
    ['Constantan', 2.1, -0.000074],
    ['Platinum', 6.1, 0.003729],
    ['Monel', 1.9, 0.0011],
  ],
};
