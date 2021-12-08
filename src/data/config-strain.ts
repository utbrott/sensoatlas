import { ConfigItem } from '#types/config-item';

export const StrainConfig: ConfigItem[] = [
  {
    id: 'metal',
    type: 'select',
    label: 'Inner wire material',
    options: ['copper', 'constantan', 'platinium'],
    optionLabels: [
      'Copper (Sensitivity: 2.6)',
      'Constatan (Sensitivity: 2.1)',
      'Platinium (Sensitivity: 6.1)',
    ],
    defaultValue: 'copper',
  },
  {
    id: 'voltage',
    type: 'radio',
    label: 'Input voltage (Vin)',
    options: ['5', '12'],
    optionLabels: ['5V', '12V'],
    defaultValue: '5',
  },
  {
    id: 'resistance',
    type: 'select',
    label: 'Resistance (R)',
    options: ['120', '350', '600', '700', '1000'],
    optionLabels: ['120Ω', '350Ω', '600Ω', '700Ω', '1000Ω'],
    defaultValue: '120',
  },
  {
    id: 'bridge',
    type: 'radio',
    label: 'Bridge Configuration',
    options: ['quater', 'half', 'full'],
    optionLabels: ['Quater', 'Half', 'Full'],
    defaultValue: 'quater',
  },
];