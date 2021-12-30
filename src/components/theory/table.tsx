import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { TheoryTable } from '#types/theory-table';
import Latex from 'react-latex';

type Props = {
  data: TheoryTable;
};

export const Table = ({ data }: Props) => {
  return (
    <VStack w='full' h='max' align='flex-start'>
      <Heading size='xs'>{data.caption}</Heading>
      <ChakraTable variant='simple'>
        <Thead>
          <Tr>
            {data.headers.map((header, index) => (
              <Th key={index} textTransform='none' color='gray.300'>
                <Text textTransform='uppercase' color='inherit'>
                  {header.text}
                </Text>
                <Latex>{header.unit}</Latex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.rows.map((row, index) => (
            <Tr key={index}>
              {row.map((item, index) => (
                <Td key={index}>{item}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </VStack>
  );
};
