import { VStack, Heading } from '@chakra-ui/react';
import { calcStrainValidationData } from '#utils/generate-strain-data';

type Props = {
  context: any;
};

export const TaskForm = ({ context }: Props) => {
  return (
    <VStack
      w='full'
      flex={1}
      bg='gray.800'
      p={4}
      rounded='md'
      align='flex-start'>
      <Heading size='sm' mb={2}>
        Submit answers
        {context.isConfigSaved && calcStrainValidationData(context)}
      </Heading>
    </VStack>
  );
};
