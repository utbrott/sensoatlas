import { useContext } from 'react';
import { LabsContext } from '#store/labs-context';

export const useCompleteTask = () => {
  const context = useContext(LabsContext);
  const handleCompleteTask = () => {
    context.updateLabFinishedState();
  };

  return { handleCompleteTask };
};
