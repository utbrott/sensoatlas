import { Grid, VStack } from '@chakra-ui/react';
import { cardItems } from '#data/labs-library';
import { Card } from '#components/library-card';

export const LibraryGrid = () => {
  return (
    <VStack w='full' flex={1} justify='center'>
      <Grid
        templateColumns='repeat(2, 1fr)'
        templateRows='repeat(2, 1fr)'
        gap={6}
        justifyItems='center'
      >
        {cardItems.map((item) => (
          <Card key={item.id} item={item} hasButton='Start laboratory' />
        ))}
      </Grid>
    </VStack>
  );
};
