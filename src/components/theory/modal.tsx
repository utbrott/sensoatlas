import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

type Props = {
  header?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
};

export const Modal = ({ header, children, isDisabled = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size='sm'
        colorScheme='blue'
        variant='outline'
        onClick={() => onOpen()}
        _focus={{ outline: 'none' }}
        isDisabled={isDisabled}
      >
        View theory
      </Button>
      <ChakraModal
        isCentered
        blockScrollOnMount
        size='5xl'
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='scale'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent bg='gray.800'>
          <ModalHeader fontSize='lg' color='gray.300'>
            Theory: {header}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            fontSize='sm'
            textAlign='justify'
            color='gray.300'
            sx={{
              '&::-webkit-scrollbar': {
                width: 2,
                backgroundColor: '#212125',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#656567',
              },
              scrollbarWidth: 'thin',
            }}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  );
};
