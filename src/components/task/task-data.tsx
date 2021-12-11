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
} from '#utils/generate-strain-data';

type Props = {
  sensorName: string;
  context: any;
};

export const TaskData = (props: Props) => {
  const { sensorName, context } = props;
  const { taskPrompts, taskData } = context[sensorName];

  if (context.isConfigSaved) {
    switch (sensorName) {
      case 'strain':
        taskData['0'] = generateStrainValues(context);
        taskData['1'] = generateTempertureValues();
    }
  }

  return (
    <VStack
      w='full'
      flex={1}
      bg='gray.800'
      p={4}
      rounded='md'
      align='flex-start'
      spacing={4}>
      <VStack align='flex-start' spacing={2} h='50%' w='full'>
        <Heading size='sm' mb={2}>
          Tasks for this laboratory
        </Heading>
        {Object.keys(taskPrompts).map((key, index) => (
          <Text key={key} fontSize='sm' textAlign='justify'>
            {`Task ${index + 1}: ${taskPrompts[key]}`}
          </Text>
        ))}
      </VStack>
      <VStack align='flex-start' spacing={2} w='full'>
        <Heading size='xs' mb={2}>
          Generated values for calculations
        </Heading>
        {context.isConfigSaved ? (
          Object.keys(taskData).map((key, index) => (
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
          ))
        ) : (
          <Alert status='warning' h={10} rounded='md'>
            <AlertIcon />
            <AlertDescription fontSize='sm'>
              No sensor configuration selected
            </AlertDescription>
          </Alert>
        )}
      </VStack>
    </VStack>
  );
};
