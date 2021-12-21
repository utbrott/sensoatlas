import React, { useReducer } from 'react';

const initialState = {
  hasError: false,
  errorMessage: '',
};

const validationReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'EMPTY': {
      return {
        hasError: true,
        errorMessage: 'Answer is required.',
      };
    }
    case 'INVALID': {
      return {
        hasError: true,
        errorMessage: 'Incorrect, please verify the answer.',
      };
    }
    case 'NONE': {
      return {
        hasError: false,
        errorMessage: '',
      };
    }
    default:
      return initialState;
  }
};

export const useFormValidation = (
  isEmpty: boolean,
  isInvalid: boolean,
  resetFunc: () => void
) => {
  const [validation, dispatch] = useReducer(validationReducer, initialState);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isEmpty) return dispatch({ type: 'EMPTY' });
    if (isInvalid) return dispatch({ type: 'INVALID' });
    dispatch({ type: 'NONE' });
    resetFunc();
  };

  return {
    hasError: validation.hasError,
    error: validation.errorMessage,
    handleSubmit,
  };
};
