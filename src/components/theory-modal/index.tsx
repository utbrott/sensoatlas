import {
  Modal,
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
  children?: React.ReactNode;
};

export const TheoryModal = ({ header, children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size='sm'
        colorScheme='blue'
        variant='outline'
        onClick={() => onOpen()}
        _focus={{ outline: 'none' }}
      >
        View theory
      </Button>
      <Modal
        isCentered
        blockScrollOnMount
        size='xl'
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='scale'
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize='sm' textAlign='justify' color='gray.200'>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
