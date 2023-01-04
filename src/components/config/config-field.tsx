import { Stack, Box, Text, Radio, RadioGroup, Select } from '@chakra-ui/react';
import { useContext } from 'react';
import { LabsContext } from '@store/labs-context';

type RadioItem = {
  type: 'radio';
};

type SelectItem = {
  type: 'select';
};

type ItemTypeProps = RadioItem | SelectItem;

export type ConfigField = ItemTypeProps & {
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

type Props = {
  item: ConfigField;
  handleChange: any;
};

export const ConfigField = (props: Props) => {
  const { item, handleChange } = props;
  const { label, options, optionLabels, defaultValue } = item;
  const { isConfigSaved } = useContext(LabsContext);

  return (
    <Box w='full'>
      <Text fontSize='sm' flex={1} mb={1}>
        {label}
      </Text>
      {item.type === 'radio' ? (
        <RadioGroup
          defaultValue={defaultValue}
          onChange={handleChange}
          isDisabled={isConfigSaved ? true : false}
        >
          <Stack direction='row' spacing={4}>
            {options.map((option, index) => (
              <Radio key={index} value={option} size='sm'>
                {optionLabels[index]}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      ) : (
        <Select
          size='sm'
          variant='filled'
          defaultValue={defaultValue}
          onChange={handleChange}
          isDisabled={isConfigSaved ? true : false}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {optionLabels[index]}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};
