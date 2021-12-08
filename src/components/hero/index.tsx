import { useRouter } from 'next/router';
import { Box, VStack, HStack, Heading, Text, Button, Link } from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';

export const Hero = () => {
  const router = useRouter();

  return (
    <VStack w='full' h='full' justify='center' align='center' as='section'>
      <Box>
        <HStack w='full' mb={4}>
          <Heading as='h1'>Welcome to</Heading>
          <Heading as='h1' color='blue.200'>
            SensoLab
          </Heading>
        </HStack>
        <Text mb={6} fontSize='md' color='gray.300' maxW='75ch' align='justify'>
          An app designed and built to assist you in completing your reports for Sensors &
          Transducers laboratory. Workflow is really simple - choose a laboratory that you want to
          work with and follow the steps listed on the page. For more informations about the app
          head to{' '}
          <Link color='blue.200' href='/info'>
            Informations
          </Link>
        </Text>
        <Button
          colorScheme='blue'
          size='sm'
          rightIcon={<ChevronRightIcon fontSize='20px' />}
          onClick={() => router.push('/laboratories')}
        >
          Browse laboratories
        </Button>
      </Box>
    </VStack>
  );
};
