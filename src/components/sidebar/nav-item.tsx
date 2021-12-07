import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Link,
  Icon,
  HStack,
  Container,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavItem as Item } from '#types/nav-item';

type Props = {
  item: Item;
};

const NavItem = ({ item }: Props) => {
  const router = useRouter();

  if (item.type === 'link') {
    const isActive = router.asPath === item.href ? true : false;
    return (
      <NextLink href={item.href} passHref>
        <Link variant='unstyled' _hover={{ textDecoration: 'none' }} _focus={{ outline: 'none' }}>
          <HStack
            align='center'
            justify='flex-start'
            h={10}
            transition='ease-out'
            transitionProperty='background'
            transitionDuration='normal'
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.600' }}
          >
            <Icon
              w={5}
              h={5}
              mr={4}
              ml={8}
              color={isActive ? 'blue.300' : 'gray.300'}
              as={item.icon}
            />
            <Heading
              fontSize='md'
              fontWeight='medium'
              flex={1}
              letterSpacing='wide'
              color={isActive ? 'blue.300' : 'gray.300'}
            >
              {item.label}
            </Heading>
            {isActive && <Box w={1} h={6} bg='blue.300' />}
          </HStack>
        </Link>
      </NextLink>
    );
  }

  if (item.type === 'linkChild') {
    const isActive = router.asPath === item.href ? true : false;
    return (
      <NextLink href={item.href} passHref>
        <Link variant='unstyled' _hover={{ textDecoration: 'none' }} _focus={{ outline: 'none' }}>
          <HStack
            align='center'
            justify='flex-start'
            h={8}
            transition='ease-out'
            transitionProperty='background'
            transitionDuration='normal'
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.600' }}
          >
            <Container w={5} h={8} mr={4} ml={8} p={0} centerContent>
              <Box w={0.5} h='full' bg='gray.600' />
            </Container>
            <Text
              fontSize='sm'
              fontWeight='light'
              flex={1}
              textAlign='justify'
              color={isActive ? 'blue.200' : 'gray.200'}
            >
              {item.label}
            </Text>
            {isActive && <Box w={1} h={4} bg='blue.200' />}
          </HStack>
        </Link>
      </NextLink>
    );
  }

  return (
    <Heading
      color='gray.400'
      fontWeight='normal'
      textTransform='uppercase'
      letterSpacing='widest'
      size='xs'
      ml={8}
      mt={6}
      mb={2}
    >
      {item.label}
    </Heading>
  );
};

export default NavItem;
