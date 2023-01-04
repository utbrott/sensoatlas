import { VStack, HStack, Text, Select } from '@chakra-ui/react';
import { Modal } from '@components/theory';

type Props = {
  hasModal?: string;
  isModalDisabled?: boolean;
  modalContent?: any;
  hasSelect?: boolean;
  selectOnChange?: (event: any) => void;
};

export const Subheader = ({
  hasModal,
  isModalDisabled = false,
  modalContent,
  hasSelect = false,
  selectOnChange,
}: Props) => {
  return (
    <VStack w='full' overflow='hidden' align='flex-start' spacing={2} px={4}>
      <HStack w='full' h={20} spacing={10}>
        <Text fontSize='sm' textAlign='justify' flex={1}>
          Choose a sensor configuration below and save it, then complete the
          tasks that will be shown on the new card. Leaving the page or clicking
          reset clears the configuration. Remember that doing so will delete any
          progress. If you need to reset the configuration, but you generated
          the graphs already, save them before clicking reset. If upon switching
          to a new lab there is no generated data - refresh the page.
        </Text>
        <HStack flex={1} align='flex-start' spacing={4}>
          {hasSelect && (
            <Select
              size='sm'
              variant='filled'
              bg='gray.800'
              rounded='md'
              placeholder='Select temperature sensor type...'
              onChange={selectOnChange}
              maxW='md'
            >
              <option value='RTD'>RTD: Resistance Temperature Detector</option>
              <option value='Thermocouple'>Thermocouple</option>
            </Select>
          )}
          {hasModal && (
            <Modal header={hasModal} isDisabled={isModalDisabled}>
              {modalContent}
            </Modal>
          )}
        </HStack>
      </HStack>
    </VStack>
  );
};
