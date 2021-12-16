import { HStack, Heading, Icon } from '@chakra-ui/react';
import { BiAnalyse } from 'react-icons/bi';

const Logo = () => {
  return (
    <HStack w='full' px={7} py={4} spacing={2}>
      <Icon w={7} h={7} as={BiAnalyse} />
      <Heading
        flex={1}
        align='flex-start'
        lineHeight={7}
        letterSpacing='wide'
        fontWeight='normal'
        size='md'
      >
        SensoAtlas
      </Heading>
    </HStack>
  );
};

export default Logo;
