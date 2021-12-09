import { VStack, Heading } from '@chakra-ui/react';

export const TaskForm = () => {
  return (
    <VStack w='full' flex={1} bg='gray.800' p={4} rounded='md' align='flex-start'>
      <Heading size='sm' mb={2}>
        Submit answers
      </Heading>
    </VStack>
  );
};
