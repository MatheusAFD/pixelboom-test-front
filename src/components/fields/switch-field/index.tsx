'use client'

import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'

import type { SwitchFieldProps } from './types'
import { Switch } from '@/components/ui/switch'

interface SwitchProps extends SwitchFieldProps {
  name: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
}

export const SwitchField = (props: SwitchProps) => {
  const { label, description, id, name, control, ...rest } = props

  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className='flex items-center w-full justify-between p-4 rounded-md font-medium bg-primary-foreground outline outline-border cursor-pointer'
        >
          <div className='flex flex-col pointer-events-none'>
            <label
              className='text-card-foreground text-sm font-medium pointer-events-none'
              htmlFor={id}
              onClick={(e) => e.stopPropagation()}
            >
              {label}
            </label>
            <span className='text-xs text-muted-foreground pointer-events-none'>
              {description}
            </span>
          </div>

          <Switch
            {...rest}
            id={id}
            ref={ref}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    />
  )
}
