import { VStack, HStack, Heading, Text } from '@chakra-ui/react';

type Props = {
  sensorName: string;
  context: any;
};

export const TaskData = (props: Props) => {
  const { sensorName, context } = props;

  switch (sensorName) {
    case 'strain':
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
      <VStack align='flex-start' spacing={1} h='40%'>
        <Heading size='sm' mb={2}>
          Tasks for this laboratory
        </Heading>
        {context[sensorName].tasks.prompts.map((item: any) => (
          <Text key={item.id} fontSize='sm'>
            {`${item.id + 1}. ${item.prompt}`}
          </Text>
        ))}
      </VStack>
      <VStack align='flex-start' spacing={1}>
        <Heading size='sm' mb={2}>
          Generated values for calculations
        </Heading>
        <VStack w='full' flex={1}></VStack>
      </VStack>
    </VStack>
  );
};
