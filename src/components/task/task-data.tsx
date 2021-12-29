import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Tag,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { generateTempertureValues } from '#utils/generate-temperature-values';
import {
  generateStrainValues,
  strainValidationData,
} from '#utils/generate-strain-lab-data';
import {
  rtdResistanceValidation,
  thermocoupleVoltageValidation,
  tauValidationRtd,
  tauValidationCouple,
} from '#utils/generate-temperature-lab-data';
import {
  generateDisplacementValues,
  lvdtVoltageValidation,
} from '#utils/generate-displacement-lab-data';
import Latex from 'react-latex';

type Props = {
  sensorName: string;
  context: any;
};

export const TaskData = (props: Props) => {
  const { sensorName, context } = props;
  const { taskPrompts, taskData, validationData } = context[sensorName];

  if (context.isConfigSaved && !context.isValidationAvailable) {
    switch (sensorName) {
      case 'temperatureRtd':
        taskData['0'] = generateTempertureValues({ min: 0, max: 500 });
        validationData['0'] = rtdResistanceValidation(context);
        validationData['1'] = tauValidationRtd(context);
        break;
      case 'temperatureCouple':
        taskData['0'] = generateTempertureValues({ min: 0, max: 500 });
        validationData['0'] = thermocoupleVoltageValidation(context);
        validationData['1'] = tauValidationCouple(context);
        break;
      case 'displacement':
        taskData['0'] = generateDisplacementValues({ min: 0, max: 15 });
        validationData['0'] = lvdtVoltageValidation(context);
        break;
      case 'strain':
        taskData['0'] = generateStrainValues(context);
        taskData['1'] = generateTempertureValues({ min: 0, max: 50 });
        validationData['0'] = strainValidationData(context);
        validationData['1'] = strainValidationData(context, true);
        break;
    }
    setTimeout(() => context.updateValidationState(), 500);
  }

  return (
    <VStack
      w='full'
      flex={0.5}
      bg='gray.800'
      p={4}
      rounded='md'
      align='flex-start'
    >
      <Heading size='sm' mb={2}>
        Tasks
      </Heading>
      {context.isConfigSaved ? (
        <VStack align='flex-start' spacing={4} w='full'>
          {taskPrompts.map((item: any) => (
            <Box key={item.taskId}>
              <Text
                fontSize='sm'
                fontWeight='medium'
              >{`Task ${item.taskId}: `}</Text>
              <Text fontSize='sm' textAlign='justify' mb={2}>
                <Latex>{item.content}</Latex>
              </Text>
              {item.hasData && (
                <HStack spacing={2}>
                  <Text fontSize='sm' fontWeight='medium'>
                    Data:
                  </Text>
                  <HStack spacing={2}>
                    {taskData[item.taskId - 1].map((item: number) => (
                      <Tag key={item} variant='subtle' colorScheme='blue'>
                        {item}
                      </Tag>
                    ))}
                  </HStack>
                </HStack>
              )}
            </Box>
          ))}
        </VStack>
      ) : (
        <Alert status='warning' rounded='md' py={1}>
          <AlertIcon />
          <VStack flex={1} spacing={0} align='flex-start'>
            <AlertTitle fontSize='sm'>
              No sensor configuration selected
            </AlertTitle>
            <AlertDescription fontSize='xs'>
              Select and save sensor configuration to view tasks.
            </AlertDescription>
          </VStack>
        </Alert>
      )}
    </VStack>
  );
};
