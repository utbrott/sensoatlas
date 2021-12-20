import { useContext } from 'react';
import { LabsContext } from '#store/labs-context';

export const useCompleteTask = (required: boolean) => {
  const context = useContext(LabsContext);
  if (required) context.updateLabFinishedState();
};
