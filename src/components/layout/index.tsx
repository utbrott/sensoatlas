import { PropsWithChildren } from 'react';
import { Container, VStack, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '#components/sidebar';

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
  return (
    <Container display='flex' maxW='100vw' minH='auto' align='flex-start' p={0} bg='gray.900'>
      <Sidebar />
      <VStack w='full' flex={1} spacing={4} as='main'>
        {children}
      </VStack>
    </Container>
  );
};

export default Layout;
