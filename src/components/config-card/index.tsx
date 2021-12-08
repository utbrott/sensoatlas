import { HStack, VStack, Heading, Center, Text, Button, Tooltip } from '@chakra-ui/react';
import { Image } from '#components/image';

type Props = {
  children: React.ReactNode;
  imageSource: string;
  onSave: () => void;
  saved: boolean;
};

export const ConfigCard = (props: Props) => {
  const { children, imageSource, onSave, saved = false } = props;

  return (
    <VStack
      h='full'
      maxW='md'
      flex={1}
      bg='gray.700'
      p={4}
      borderRadius='md'
      align='flex-start'
      spacing={6}
    >
      <Heading size='sm' mb={2}>
        Sensor configuration
      </Heading>
      <VStack w='full' flex={1} spacing={3}>
        {children}
      </VStack>
      <VStack w='full' align='flex-start'>
        <Text fontSize='sm' fontWeight='medium'>
          Simplified schematic:
        </Text>
        <Center w='full'>
          <Image
            width='350px'
            height='280px'
            objectFit='cover'
            src={imageSource}
            alt='schematic'
            quality='100'
            borderRadius='md'
          />
        </Center>
      </VStack>
      <HStack w='full' flexGrow={1} align='flex-end'>
        <Button
          size='sm'
          variant='solid'
          colorScheme='green'
          isFullWidth
          onClick={onSave}
          isDisabled={saved ? true : false}
        >
          Save
        </Button>
        <Tooltip label='Carefully! All progress will be lost.' bg='red.300'>
          <Button
            size='sm'
            variant='outline'
            isFullWidth
            onClick={() => location.reload()}
            isDisabled={saved ? false : true}
          >
            Reset
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  );
};
