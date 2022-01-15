import { useRouter } from 'next/router';
import { Box, VStack, HStack, Heading, Text, Button } from '@chakra-ui/react';
import { HiChevronRight } from 'react-icons/hi';

export const Hero = () => {
  const router = useRouter();

  return (
    <VStack w='full' h='full' justify='center' align='center' as='section'>
      <Box>
        <HStack w='full' mb={4}>
          <Heading as='h1'>Welcome to</Heading>
          <Heading as='h1' color='blue.200'>
            SensoAtlas
          </Heading>
        </HStack>
        <Text mb={6} fontSize='md' color='gray.300' maxW='75ch' align='justify'>
          An app designed and built to assist you in completing your reports for
          Sensors & Transducers laboratory. Workflow is really simple - choose a
          laboratory that you want to work with and follow the steps listed on
          the page.
        </Text>
        <Button
          colorScheme='blue'
          size='sm'
          rightIcon={<HiChevronRight fontSize='20px' />}
          onClick={() => router.push('/laboratories')}
        >
          Browse laboratories
        </Button>
      </Box>
    </VStack>
  );
};
