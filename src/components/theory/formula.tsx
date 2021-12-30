import { Text, Heading, VStack, Box } from '@chakra-ui/react';
import { TheoryItem } from '#types/theory-formula-item';
import Latex from 'react-latex';

type Props = {
  data: TheoryItem[];
};

export const Formula = ({ data }: Props) => {
  return (
    <VStack w='full' h='max' align='flex-start' spacing={4}>
      {data.map((item, index) => (
        <VStack
          key={index}
          w='full'
          h='max'
          align='flex-start'
          borderBottomWidth={1}
          pb={2}
        >
          {item.caption && (
            <Heading size='xs' mb={1}>
              {item.caption}
            </Heading>
          )}
          <VStack w='full' h='max' align='flex-start'>
            <Box w='full'>
              {item.formulas.map((formula, index) => (
                <Text key={index} fontSize='md' mb={2} pl={4}>
                  <Latex>{formula}</Latex>
                </Text>
              ))}
              <Text fontSize='sm' mb={1}>
                Where:
              </Text>
              <VStack w='full' h='max' align='flex-start' pl={4}>
                {item.symbols?.map((symbol, index) => (
                  <Text key={index} fontSize='sm'>
                    <Latex>{symbol}</Latex>
                  </Text>
                ))}
              </VStack>
            </Box>
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};
