import { useRouter } from 'next/router';
import { HStack, VStack, Heading, Center, Text, Button, Tooltip } from '@chakra-ui/react';
import { Image } from '#components/image';
import { StrainConfig as configItems } from '#data/config-strain';
import { ConfigField } from './config-field';

type Props = {
  context: any;
  imageSource: string;
  isSaved: boolean;
  setIsSaved: () => void;
};

export const Config = (props: Props) => {
  const { context, imageSource, isSaved, setIsSaved } = props;
  const router = useRouter();

  const handleConfigReset = () => {
    router.reload();
  };

  const handleConfigUpdate = (field: string, value: string) => {
    context.updateConfig(field, value);
  };

  return (
    <VStack
      h='full'
      maxW='md'
      flex={1}
      bg='gray.800'
      p={4}
      borderRadius='md'
      align='flex-start'
      spacing={6}
      as='section'
    >
      <Heading size='sm' mb={2}>
        Sensor configuration
      </Heading>
      <VStack w='full' flex={1} spacing={3}>
        {configItems.map((item) => (
          <ConfigField
            key={item.id}
            item={item}
            handleChange={(event: any) =>
              handleConfigUpdate(
                item.id,
                item.type === 'select' ? event.currentTarget.value : event
              )
            }
          />
        ))}
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
          onClick={setIsSaved}
          isDisabled={isSaved ? true : false}
        >
          Save
        </Button>
        <Tooltip label='Carefully! All progress will be lost.' bg='red.300'>
          <Button
            size='sm'
            variant='outline'
            colorScheme='gray'
            isFullWidth
            onClick={handleConfigReset}
            isDisabled={isSaved ? false : true}
            _focus={{ outlineColor: 'none' }}
          >
            Reset
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  );
};
