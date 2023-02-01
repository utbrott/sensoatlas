import { ComponentProps, forwardRef } from 'react';
import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext
} from 'react-hook-form';
import { ZodSchema, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface UseZodFormProps<T extends ZodSchema<any>>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>) => {
  return useForm({ ...formConfig, resolver: zodResolver(schema) });
};

interface FieldErrorProps {
  name?: string;
}

export const FieldError = ({ name }: FieldErrorProps) => {
  const {
    formState: { errors }
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  return (
    <div className='mt-1 text-xs text-red-500'>{error.message.toString()}</div>
  );
};

interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  complete?: boolean;
}

const FormRoot = <T extends FieldValues = any>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
        {...props}
      >
        <fieldset
          className='flex flex-col space-y-4'
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};

interface InputProps extends ComponentProps<'input'> {
  label: string;
  withProgress?: { max: number; value: number };
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, withProgress, type = 'number', ...props },
  ref
) {
  return (
    <label>
      <div className='mb-1 text-sm text-gray-800 dark:text-gray-200'>
        {label}
      </div>
      <input
        className='h-9 w-full rounded border border-gray-300 bg-white px-4 py-2 text-gray-800 focus:border-blue-500 focus:ring-blue-400 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:focus:border-blue-600 dark:focus:ring-blue-500'
        type={type}
        ref={ref}
        {...props}
      />
      {withProgress && (
        <InputProgressBar max={withProgress.max} value={withProgress.value} />
      )}
      <FieldError name={props.name} />
    </label>
  );
});

interface InputProgressBarProps {
  value?: number;
  max?: number;
}

const InputProgressBar = ({ value, max }: InputProgressBarProps) => {
  const barWidth = `${(value / max) * 100}%`;

  return (
    <div className='mt-1 flex h-1 flex-row rounded bg-gray-500/30 dark:bg-gray-700/30'>
      <div
        className={`rounded ${
          value === max
            ? 'bg-green-400/70 dark:bg-green-500/70'
            : 'bg-blue-400 dark:bg-blue-500/70'
        } transition-all duration-200`}
        style={{ width: barWidth }}
      />
    </div>
  );
};

export const Form = Object.assign(FormRoot, { Input });
