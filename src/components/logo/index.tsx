import { AppIconGradient } from './app-icon';
import { FacultyFull } from './faculty-logo';
import { default as NextLink } from 'next/link';
import { HStack, Flex, Text, Link } from '@chakra-ui/react';

const App = () => {
  return (
    <NextLink href='/' passHref>
      <Link
        variant='unstyled'
        _hover={{ textDecoration: 'none' }}
        _focus={{ outline: 'none' }}
      >
        <HStack width='full' px={8} py={4} spacing={2} align='center'>
          <Flex align='center' gap='1'>
            <>
              <AppIconGradient />
              <Flex>
                <Text size='xl' fontWeight='semibold'>
                  senso
                </Text>
                <Text size='xl' fontWeight='light'>
                  atlas
                </Text>
              </Flex>
            </>
          </Flex>
        </HStack>
      </Link>
    </NextLink>
  );
};

const Faculty = () => {
  return <FacultyFull />;
};

export const Logo = Object.assign({ App, Faculty });
