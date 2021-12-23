type RadioItem = {
  type: 'radio';
};

type SelectItem = {
  type: 'select';
};

type ItemTypeProps = RadioItem | SelectItem;

export type ConfigItem = ItemTypeProps & {
  sensor:
    | 'temperatureRtd'
    | 'temperatureCouple'
    | 'displacement'
    | 'strain'
    | 'piezoelectric';
  id: string;
  label: string;
  options: string[];
  optionLabels: string[];
  defaultValue: string;
};
