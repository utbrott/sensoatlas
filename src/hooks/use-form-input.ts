import React, { useReducer, useEffect } from 'react';

const initialState = {
  value: '',
  index: 0,
};

const fieldReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INPUT': {
      return { value: action.value, index: state.index };
    }
    case 'RESET': {
      return { value: '', index: state.index + 1 };
    }
    default:
      return initialState;
  }
};

export const useFormInput = (validator: number[], inputName?: string) => {
  const [field, dispatch] = useReducer(fieldReducer, initialState);

  const isEmpty = (value: string) => value.trim() === '';
  const isFieldEmpty = isEmpty(field.value);

  // ! Remove before true production deploy, correct answer logger
  useEffect(() => {
    console.log(`${inputName}/${field.index}:`, validator[field.index]);
  }, [inputName, field.index, validator]);

  const isInvalid = (value: string) =>
    parseFloat(value) !== validator[field.index];
  const isFieldInvalid = isInvalid(field.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT', value: e.currentTarget.value });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: field.value,
    index: field.index,
    isFieldEmpty,
    isFieldInvalid,
    handleChange,
    handleReset,
  };
};
