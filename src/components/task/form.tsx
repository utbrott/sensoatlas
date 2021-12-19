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
  Icon,
  HStack,
} from '@chakra-ui/react';
import React from 'react';

import { HiCheck } from 'react-icons/hi';

type Props = {
  taskNo: string;
  value: string;
  isInvalid: boolean;
  errorMessage: string;
  isComplete: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

export const Form = (props: Props) => {
  const {
    taskNo,
    value,
    isInvalid,
    errorMessage,
    isComplete,
    handleChange,
    handleSubmit,
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
        <FormControl isInvalid={isInvalid} isDisabled={isComplete}>
          <FormLabel fontSize='sm'>Task {taskNo}</FormLabel>
          <Input
            id='submitted'
            autoComplete='off'
            size='sm'
            rounded='md'
            type='number'
            step='0.01'
            value={value}
            onChange={handleChange}
          />
          {!isInvalid && !isComplete && (
            <FormHelperText fontSize='xs'>
              Answer format - 2 decimal digits, no trailing zeros.
            </FormHelperText>
          )}
          <FormErrorMessage fontSize='xs'>{errorMessage}</FormErrorMessage>
        </FormControl>
        {!isComplete ? (
          <Button
            size='sm'
            variant='solid'
            colorScheme='gray'
            fontWeight='normal'
            type='submit'
            isFullWidth
            isDisabled={isComplete}
          >
            Submit answer
          </Button>
        ) : (
          <HStack color='green.400'>
            <Text fontSize='sm' color='green.400'>
              Task completed
            </Text>
            <Icon as={HiCheck} />
          </HStack>
        )}
      </VStack>
    </Box>
  );
};
