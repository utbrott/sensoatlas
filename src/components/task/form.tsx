import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  FormLabel,
  Text,
} from '@chakra-ui/react';

type Props = {
  taskNo: string;
  isInvalid: boolean;
  errorString: string;
  isDisabled: boolean;
  handleSubmit: any;
  handleChange: any;
};

export const Form = (props: Props) => {
  const {
    taskNo,
    isInvalid,
    errorString,
    isDisabled,
    handleSubmit,
    handleChange,
  } = props;

  return (
    <Box w='full' flex={1}>
      <VStack
        w='full'
        as='form'
        onSubmit={handleSubmit}
        align='flex-start'
        spacing={4}
      >
        <FormControl isInvalid={isInvalid} isDisabled={isDisabled}>
          <FormLabel fontSize='sm'>Task {taskNo}</FormLabel>
          <Input
            id='submitted'
            autoComplete='off'
            size='sm'
            rounded='md'
            type='number'
            step='0.01'
            onChange={handleChange}
          />
          {!isInvalid && (
            <FormHelperText fontSize='xs'>
              Answer format - 2 decimal digits, no trailing zeros.
            </FormHelperText>
          )}
          <FormErrorMessage fontSize='xs'>{errorString}</FormErrorMessage>
        </FormControl>
        {!isDisabled ? (
          <Button
            size='sm'
            variant='solid'
            colorScheme='gray'
            fontWeight='normal'
            type='submit'
            isFullWidth
            isDisabled={isDisabled}
          >
            Submit answer
          </Button>
        ) : (
          <Text fontSize='sm' color='green.400'>
            All answers correct!
          </Text>
        )}
      </VStack>
    </Box>
  );
};
