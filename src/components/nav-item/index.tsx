import * as React from 'react'

import { twMerge } from 'tailwind-merge'
import { Button } from '../ui'

export interface NavItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
}

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ className, isActive = false, ...props }, ref) => {
    return (
      <Button
        className={twMerge(
          'flex gap-3 p-3 justify-start text-sm text-muted-foreground  leading-4 cursor-pointer',
          className,
          isActive &&
            ' text-secondary hover:brightness-110 shadow-[inset_0_0_0_1px_black]'
        )}
        ref={ref}
        variant={isActive ? 'default' : 'ghost'}
        rounded={'full'}
        size={'lg'}
        {...props}
      >
        {props.children}
      </Button>
    )
  }
)
