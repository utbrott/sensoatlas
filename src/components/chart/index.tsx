import React, { useContext } from 'react';
import { LabsContext } from '#store/labs-context';
import {
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};

export const ChartsCard = ({ children }: Props) => {
  const context = useContext(LabsContext);

  return (
    <VStack
      h='full'
      flex={1}
      as='section'
      bg='gray.800'
      rounded='md'
      p={4}
      align='flex-start'
    >
      <Heading size='sm' mb={2}>
        Generated charts
      </Heading>
      {!context.isLabFinished ? (
        <Alert status='warning' rounded='md' py={1}>
          <AlertIcon />
          <VStack flex={1} spacing={0} align='flex-start'>
            <AlertTitle fontSize='sm'>Not all tasks completed</AlertTitle>
            <AlertDescription fontSize='xs'>
              Complete all tasks to view generated charts.
            </AlertDescription>
          </VStack>
        </Alert>
      ) : (
        <VStack w='full' flex={1} align='stretch'>
          {children}
        </VStack>
      )}
    </VStack>
  );
};

export { SingleLineChart } from './single-line-chart';
export { MultiLineChart } from './multi-line-chart';
export { ChartTabs } from './chart-tabs';
