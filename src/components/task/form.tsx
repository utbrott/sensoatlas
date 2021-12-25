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
  index: string;
  maxIndex: number;
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
    index,
    maxIndex,
    value,
    isInvalid,
    errorMessage,
    isComplete,
    handleChange,
    handleSubmit,
  } = props;

  return (
    <Box w='full' h='max'>
      <VStack
        w='full'
        as='form'
        onSubmit={handleSubmit}
        align='flex-start'
        spacing={4}
      >
        <FormControl isInvalid={isInvalid} isDisabled={isComplete}>
          <HStack w='full'>
            <FormLabel fontSize='sm' flex={1}>
              Task {taskNo}
            </FormLabel>
            <HStack w='max' h='max'>
              {isComplete ? (
                <>
                  <Text fontSize='xs' color='green.400'>
                    Task completed
                  </Text>
                  <Icon as={HiCheck} color='green.400' />
                </>
              ) : (
                <Text fontSize='xs'>
                  {index}/{maxIndex} correct
                </Text>
              )}
            </HStack>
          </HStack>
          <Input
            id='submitted'
            autoComplete='off'
            size='sm'
            rounded='md'
            type='number'
            step='0.001'
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
        <Button
          size='sm'
          variant='solid'
          colorScheme='gray'
          fontWeight='normal'
          type='submit'
          isFullWidth
          isDisabled={isComplete}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};
