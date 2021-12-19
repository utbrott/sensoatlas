import { VStack } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const TasksCard = ({ children }: Props) => {
  return (
    <VStack h='full' maxW='md' flex={1} spacing={4} as='section'>
      {children}
    </VStack>
  );
};

export { TaskData } from './task-data';
export { FormCard } from './form-card';
export { Form } from './form';
