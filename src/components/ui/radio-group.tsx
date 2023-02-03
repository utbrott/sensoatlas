import { RadioGroup as HeadlessRadio } from '@headlessui/react';
import { useState } from 'react';

interface RadioGroupRootProps {
  label?: React.ReactNode;
  stacked?: boolean;
  value: any;
  onChange: React.Dispatch<any>;
  children: React.ReactNode;
  disabled?: boolean;
}

const RadioGroupRoot = ({
  label,
  value,
  onChange,
  children,
  ...props
}: RadioGroupRootProps) => {
  return (
    <HeadlessRadio value={value} onChange={onChange} {...props}>
      <HeadlessRadio.Label className='block text-sm dark:text-gray-300'>
        {label}
      </HeadlessRadio.Label>
      <div
        className={`flex w-full justify-between gap-2 ${
          props.stacked && 'flex-col'
        } ${label && 'mt-1'}`}
      >
        {children}
      </div>
    </HeadlessRadio>
  );
};

interface RadioGroupOptionProps {
  value: any;
  children: React.ReactNode;
}

const RadioGroupOption = ({ value, children }: RadioGroupOptionProps) => {
  return (
    <HeadlessRadio.Option
      value={value}
      className='w-full cursor-pointer select-none rounded border bg-gray-300/50 px-2 py-1 text-center text-sm hover:bg-gray-300 ui-checked:border-blue-500 ui-checked:font-medium ui-checked:text-blue-500 ui-disabled:cursor-not-allowed ui-disabled:bg-opacity-20 ui-disabled:opacity-60 dark:border-gray-600/50 dark:bg-gray-700/50 dark:ui-checked:border-blue-500'
    >
      {children}
    </HeadlessRadio.Option>
  );
};

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Option: RadioGroupOption
});
