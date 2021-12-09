import { Stack, Box, Text, Radio, RadioGroup, Select } from '@chakra-ui/react';
import { ConfigItem as Item } from '#types/config-item';
import { useContext } from 'react';
import { LabsContext } from '#store/labs-context';

type Props = {
  item: Item;
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
          isDisabled={isConfigSaved ? true : false}>
          <Stack direction='row' spacing={4}>
            {options.map((option, index) => (
              <Radio key={index} value={option}>
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
          isDisabled={isConfigSaved ? true : false}>
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
