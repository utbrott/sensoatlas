import { ConfigItem } from '#types/config-item';

export const SensorConfig: ConfigItem[] = [
  {
    sensor: 'temperatureRtd',
    id: 'sensor',
    type: 'select',
    label: 'Inner wire material',
    options: ['platinum', 'copper', 'nickel', 'tungsten'],
    optionLabels: ['Platinum', 'Copper', 'Nickel', 'Tungsten'],
    defaultValue: 'platinum',
  },
  {
    sensor: 'temperatureRtd',
    id: 'resistance',
    type: 'select',
    label: 'Resistance (R)',
    options: ['100', '500', '1000'],
    optionLabels: ['100Ω', '500Ω', '1000Ω'],
    defaultValue: '100',
  },
  {
    sensor: 'temperatureRtd',
    id: 'thickness',
    type: 'radio',
    label: 'Sheath/Thermowell thickness',
    options: ['0.5', '1.0', '1.5'],
    optionLabels: ['0.5mm', '1.0mm', '1.5mm'],
    defaultValue: '0.5',
  },
  {
    sensor: 'temperatureRtd',
    id: 'filler',
    type: 'radio',
    label: 'Thermowell filling material',
    options: ['mgoPowder', 'siliconCompound'],
    optionLabels: ['MgO Powder', 'Silicon Compound'],
    defaultValue: 'mgoPowder',
  },
  {
    sensor: 'strain',
    id: 'metal',
    type: 'select',
    label: 'Inner wire material',
    options: ['copper', 'constantan', 'platinum', 'monel'],
    optionLabels: [
      'Copper (Sensitivity: 2.6)',
      'Constatan (Sensitivity: 2.1)',
      'Platinum (Sensitivity: 6.1)',
      'Monel (Sensitivity: 1.9)',
    ],
    defaultValue: 'copper',
  },
  {
    sensor: 'strain',
    id: 'voltage',
    type: 'radio',
    label: 'Input voltage (Vin)',
    options: ['5', '12'],
    optionLabels: ['5V', '12V'],
    defaultValue: '5',
  },
  {
    sensor: 'strain',
    id: 'resistance',
    type: 'select',
    label: 'Resistance (R)',
    options: ['120', '350', '600', '700', '1000'],
    optionLabels: ['120Ω', '350Ω', '600Ω', '700Ω', '1000Ω'],
    defaultValue: '120',
  },
  {
    sensor: 'strain',
    id: 'bridge',
    type: 'radio',
    label: 'Bridge Configuration',
    options: ['quater', 'half', 'full'],
    optionLabels: ['Quater', 'Half', 'Full'],
    defaultValue: 'quater',
  },
];
