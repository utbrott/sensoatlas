import { VStack, HStack, Text } from '@chakra-ui/react';
import { TheoryModal } from '../theory-modal';

type Props = {
  hasModal?: string;
  modalContent?: any;
};

export const Subheader = ({ hasModal, modalContent }: Props) => {
  return (
    <VStack w='full' overflow='hidden' align='flex-start' spacing={2} px={4}>
      <HStack w='90ch' h={20} spacing={10}>
        <Text fontSize='sm' textAlign='justify' w='60ch' flex={1}>
          Choose a sensor configuration below and save it, then complete the
          tasks that will be shown on the new card. Leaving the page or clicking
          reset clears the configuration. Remember that doing so will delete any
          progress. All formulas for calculations are available under &apos;View
          theory&apos;. If you need to reset the configuration, but you
          generated the graphs already, save them before, clicking reset.
        </Text>
        {hasModal && (
          <TheoryModal header={hasModal}>{modalContent}</TheoryModal>
        )}
      </HStack>
    </VStack>
  );
};
