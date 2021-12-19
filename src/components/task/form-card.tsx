import {
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react';

type Props = {
  sensorName: string;
  context: any;
  children?: React.ReactNode;
};

export const FormCard = (props: Props) => {
  const { context, children } = props;

  return (
    <VStack
      w='full'
      flex={1}
      bg='gray.800'
      p={4}
      rounded='md'
      align='flex-start'
      spacing={4}
    >
      <Box w='full' maxH='max' mb={2}>
        <Heading size='sm' mb={2}>
          Submit answers
        </Heading>
        <Text fontSize='xs' fontWeight='medium' color='gray.400'>
          All formulas needed are available under &apos;View theory&apos;.
        </Text>
      </Box>
      {context.isConfigSaved ? (
        <VStack w='full' flex={1} spacing={8}>
          {children}
        </VStack>
      ) : (
        <Alert status='warning' rounded='md' py={1}>
          <AlertIcon />
          <VStack flex={1} spacing={0} align='flex-start'>
            <AlertTitle fontSize='sm'>
              No sensor configuration selected
            </AlertTitle>
            <AlertDescription fontSize='xs'>
              Select and save sensor configuration to submit answers.
            </AlertDescription>
          </VStack>
        </Alert>
      )}
    </VStack>
  );
};
