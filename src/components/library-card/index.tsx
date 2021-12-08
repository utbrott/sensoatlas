import { useRouter } from 'next/router';
import { Button, Box, VStack, Heading, Text } from '@chakra-ui/react';
import { CardItem as Item } from '#types/card-item';

type Props = {
  item: Item;
  hasButton?: string;
};

export const Card = ({ item, hasButton }: Props) => {
  const { id, title, desc } = item;
  const router = useRouter();

  return (
    <VStack as='article' maxW='md' bg='gray.800' p={2} rounded='md' align='flex-start'>
      <Heading size='sm' p={2}>
        {title}
      </Heading>
      <Box flex={1} p={2}>
        <Text fontSize='sm' textAlign='justify' color='gray.200'>
          {desc}
        </Text>
      </Box>
      {hasButton && (
        <Button
          colorScheme='blue'
          variant='ghost'
          size='sm'
          onClick={() => router.push(`laboratories/${id}`)}
        >
          {hasButton}
        </Button>
      )}
    </VStack>
  );
};
