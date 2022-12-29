import { zodResolver } from '@hookform/resolvers/zod'
import { ComponentProps, forwardRef } from 'react'
import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext
} from 'react-hook-form'
import { ZodSchema, TypeOf } from 'zod'

interface UseZodFormProps<T extends ZodSchema<any>>
  extends UseFormProps<TypeOf<T>> {
  schema: T
}

export const useZodForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>) => {
  return useForm({ ...formConfig, resolver: zodResolver(schema) })
}

interface FieldErrorProps {
  name?: string
}

export const FieldError = ({ name }: FieldErrorProps) => {
  const {
    formState: { errors }
  } = useFormContext()

  if (!name) return null

  const error = errors[name]

  if (!error) return null

  return (
    <div className='text-sm font-semibold text-red-500'>
      {error.message.toString()}
    </div>
  )
}

interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

const FormRoot = <T extends FieldValues = any>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset
          className='flex flex-col space-y-4'
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}

interface InputProps extends ComponentProps<'input'> {
  label: string
}
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = 'number', ...props },
  ref
) {
  return (
    <label>
      <div className='mb-1 text-gray-800 dark:text-gray-200'>{label}</div>
      <input
        className='w-full rounded border bg-white px-4 py-2 text-gray-800 focus:border-blue-600 focus:ring-blue-500 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:bg-gray-900 dark:text-gray-200'
        type={type}
        ref={ref}
        {...props}
      >
        <FieldError name={props.name} />
      </input>
    </label>
  )
})

export const Form = Object.assign(FormRoot, { Input })
