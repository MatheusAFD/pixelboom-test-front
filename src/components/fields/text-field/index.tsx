import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import { CircleX } from 'lucide-react'
import { cn } from '@/utils/tailwind-utils'
import { Input } from '@/components/ui'
import { Label } from '@/components/ui/label'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { name, label = '', type = 'text', errorMessage, className, id, ...props },
    ref
  ) => {
    const hasLabel = Boolean(label)

    return (
      <fieldset className='w-full flex flex-col font-medium transition-all'>
        {hasLabel && (
          <Label htmlFor={`data-test-id-${id}`} className='mb-2'>
            {label}
          </Label>
        )}

        <Input
          ref={ref}
          name={name}
          id={`data-test-id-${id}`}
          type={type}
          className={cn(
            errorMessage && 'border-red-400 placeholder:text-red-400',
            className
          )}
          {...props}
        />

        <div
          className={cn(
            'transition-all duration-300 ease-in-out overflow-hidden',
            errorMessage ? 'max-h-10 mt-1' : 'max-h-0'
          )}
        >
          {errorMessage && (
            <div className='flex gap-1 items-center'>
              <CircleX size={20} className='fill-red-500 text-white' />
              <p className='font-medium text-xs text-red-500'>{errorMessage}</p>
            </div>
          )}
        </div>
      </fieldset>
    )
  }
)

TextField.displayName = 'TextField'
