import { useRouter } from 'next/router';
import {
  HStack,
  VStack,
  Heading,
  Center,
  Text,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { Image } from '#components/image';
import { SensorConfig } from '#data/sensor-config';
import { ConfigField } from './config-field';

type Props = {
  sensorName: string;
  context: any;
  imageSource: string;
  setIsSaved: () => void;
};

export const Config = (props: Props) => {
  const { sensorName, context, imageSource, setIsSaved } = props;
  const router = useRouter();
  const { isConfigSaved } = context;

  const configItems = SensorConfig.filter(
    filteredItem => filteredItem.sensor === sensorName
  );

  const handleConfigReset = () => {
    router.reload();
  };

  const handleConfigUpdate = (sensor: string, field: string, value: string) => {
    context.updateConfig(sensor, field, value);
  };

  return (
    <VStack
      h='full'
      maxW='sm'
      flex={1}
      bg='gray.800'
      p={4}
      borderRadius='md'
      align='flex-start'
      spacing={6}
      as='section'
    >
      <Heading size='sm' mb={2} spacing={2}>
        Sensor configuration
      </Heading>
      <VStack w='full' flex={1} spacing={3}>
        {configItems.map(item => (
          <ConfigField
            key={item.id}
            item={item}
            handleChange={(e: any) =>
              handleConfigUpdate(
                sensorName,
                item.id,
                item.type === 'select' ? e.currentTarget.value : e
              )
            }
          />
        ))}
      </VStack>
      <VStack w='full' align='flex-start'>
        <Text fontSize='sm' fontWeight='medium'>
          Simplified schematic:
        </Text>
        <Center w='full'>
          <Image
            width='350px'
            height='280px'
            objectFit='cover'
            src={imageSource}
            alt='schematic'
            quality='100'
            borderRadius='md'
          />
        </Center>
      </VStack>
      <HStack w='full' flexGrow={1} align='flex-end'>
        <Button
          size='sm'
          variant='solid'
          colorScheme='green'
          isFullWidth
          onClick={setIsSaved}
          isDisabled={isConfigSaved ? true : false}
        >
          Save
        </Button>
        <Tooltip label='Carefully! All progress will be lost.' bg='red.300'>
          <Button
            size='sm'
            variant='outline'
            colorScheme='gray'
            isFullWidth
            onClick={handleConfigReset}
            isDisabled={isConfigSaved ? false : true}
            _focus={{ outlineColor: 'none' }}
          >
            Reset
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  );
};
