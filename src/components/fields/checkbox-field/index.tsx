import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'

interface CheckboxFieldProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  label: string
  id?: string
  className?: string
}

export const CheckboxField = ({
  name,
  control,
  label,
  id,
  className,
}: CheckboxFieldProps) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`flex items-center space-x-2 ${className ?? ''}`}>
          <Checkbox
            id={id}
            ref={ref}
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
          <label
            htmlFor={id}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {label}
          </label>
        </div>
      )}
    />
  )
}
