import { HStack } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const Content = ({ children }: Props) => {
  return (
    <HStack as='main' w='full' flex={1} p={4} spacing={4}>
      {children}
    </HStack>
  );
};
