import {
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
} from '@chakra-ui/react';
import { calcValidationData } from '#utils/generate-strain-data';

type Props = {
  sensorName: string;
  context: any;
  children?: React.ReactNode;
};

export const FormPanel = (props: Props) => {
  const { children, sensorName, context } = props;
  const { validationData, submittedAnswers } = context[sensorName];

  if (context.isConfigSaved) {
    switch (sensorName) {
      case 'strain':
        validationData['0'] = calcValidationData(context);
        validationData['1'] = calcValidationData(context, true);
        console.log(validationData['0'], validationData['1']);
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
      <Box w='full' maxH='max' mb={2}>
        <Heading size='sm' mb={2}>
          Task answers
        </Heading>
        <Text
          fontSize='xs'
          fontWeight='medium'
          color='gray.400'
          fontStyle='italic'>
          Answer format - 2 decimal digits, but no trailing zeros
        </Text>
      </Box>
      {context.isConfigSaved ? (
        <Box w='full' flex={1}>
          {children}
        </Box>
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
