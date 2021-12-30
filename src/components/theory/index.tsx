import { VStack } from '@chakra-ui/react';
import { FC } from 'react';

export const Theory: FC = ({ children }) => {
  return (
    <VStack w='full' flex={1} spacing={8}>
      {children}
    </VStack>
  );
};

export { Modal } from './modal';
export { Table } from './table';
export { Formula } from './formula';
