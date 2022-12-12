import { VStack } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode;
};
export const Theory: React.FC<Props> = ({ children }) => {
  return (
    <VStack w='full' flex={1} spacing={8}>
      {children}
    </VStack>
  );
};

export { Modal } from './modal';
export { Table } from './table';
export { Formula } from './formula';
