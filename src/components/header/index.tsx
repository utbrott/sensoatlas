import { HStack, Heading, Button } from '@chakra-ui/react';

type Props = {
  heading: string;
};

export const Header = ({ heading }: Props) => {
  return (
    <HStack w='full' px={4} pt={4}>
      <Heading size='md' flex={1} lineHeight={7}>
        {heading}
      </Heading>
    </HStack>
  );
};
