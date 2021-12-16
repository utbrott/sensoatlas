import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Text,
} from '@chakra-ui/react';

type Props = {
  taskNo: string;
  isInvalid: boolean;
  handleSubmit: any;
  handleChange: any;
};

export const Form = (props: Props) => {
  const { taskNo, isInvalid = false, handleSubmit, handleChange } = props;

  return (
    <Box w='full' flex={1}>
      <Text mb={1} fontSize='sm'>
        Task {taskNo}
      </Text>
      <VStack
        w='full'
        as='form'
        onSubmit={handleSubmit}
        align='flex-start'
        spacing={4}>
        <FormControl isInvalid={isInvalid}>
          <Input
            id='submitted'
            autoComplete='off'
            size='sm'
            rounded='md'
            type='number'
            step='0.01'
            onChange={handleChange}
          />
          <FormHelperText fontSize='xs'>
            Answer format - 2 decimal digits, no trailing zeros.
          </FormHelperText>
          <FormErrorMessage fontSize='xs'>
            Answer is not correct
          </FormErrorMessage>
        </FormControl>
        <Button
          size='sm'
          variant='solid'
          colorScheme='gray'
          fontWeight='normal'
          type='submit'
          isFullWidth>
          Submit answer
        </Button>
      </VStack>
    </Box>
  );
};
