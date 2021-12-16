import {
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  Box,
} from '@chakra-ui/react';

type Props = {
  sensorName: string;
  context: any;
  children?: React.ReactNode;
};

export const FormPanel = (props: Props) => {
  const { children, context } = props;

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
          All formulas needed are available under &apos;View theory&apos;.
          <br />
          Answer format - 2 decimal digits, no trailing zeros.
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
