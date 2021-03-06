import { useRouter } from 'next/router';
import { HStack, Heading, Button } from '@chakra-ui/react';
import { HiChevronLeft } from 'react-icons/hi';

type Props = {
  heading: string;
  hasButton?: boolean;
};

export const Header = ({ heading, hasButton = false }: Props) => {
  const router = useRouter();

  return (
    <HStack w='full' px={4} pt={4}>
      <Heading size='md' flex={1} lineHeight={7}>
        {heading}
      </Heading>
      {hasButton && (
        <Button
          colorScheme='blue'
          variant='ghost'
          size='xs'
          leftIcon={<HiChevronLeft fontSize='20px' />}
          onClick={() => router.push('/laboratories')}
        >
          Back to library
        </Button>
      )}
    </HStack>
  );
};
