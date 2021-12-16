import { useEffect } from 'react';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Tag,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import {
  generateStrainValues,
  generateTempertureValues,
  calcValidationData,
} from '#utils/generate-strain-data';
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
      case 'strain':
        taskData['0'] = generateStrainValues(context);
        taskData['1'] = generateTempertureValues();
        validationData['0'] = calcValidationData(context);
        validationData['1'] = calcValidationData(context, true);
        context.updateValidationState();
    }
  }

  return (
    <VStack
      w='full'
      flex={1}
      bg='gray.800'
      p={4}
      rounded='md'
      align='flex-start'>
      <Heading size='sm' mb={2}>
        Tasks for this laboratory
      </Heading>
      {context.isConfigSaved ? (
        <>
          <VStack align='flex-start' spacing={2} w='full' flex={1}>
            {taskPrompts.map((item: any) => (
              <Text key={item.taskId} fontSize='sm' textAlign='justify'>
                {`Task ${item.taskId}: `}
                <Latex>{item.content}</Latex>
              </Text>
            ))}
          </VStack>
          <VStack align='flex-start' spacing={2} w='full' flex={1}>
            <Heading size='xs' mb={2}>
              Generated values for calculations
            </Heading>
            {Object.keys(taskData).map((key, index) => (
              <HStack key={key} spacing={4}>
                <Text fontSize='sm' fontWeight='medium'>
                  Task {index + 1}:
                </Text>
                <HStack spacing={2}>
                  {taskData[key].map((item: number) => (
                    <Tag key={item} variant='subtle' colorScheme='blue'>
                      {item}
                    </Tag>
                  ))}
                </HStack>
              </HStack>
            ))}
          </VStack>
        </>
      ) : (
        <Alert status='warning' h={10} rounded='md'>
          <AlertIcon />
          <AlertDescription fontSize='sm'>
            No sensor configuration selected
          </AlertDescription>
        </Alert>
      )}
    </VStack>
  );
};
