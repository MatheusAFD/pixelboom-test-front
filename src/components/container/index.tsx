import { cn } from '@/utils/tailwind-utils'
import { cva, type VariantProps } from 'class-variance-authority'

const containerVariants = cva(' flex flex-col mx-auto w-full', {
  variants: {
    size: {
      default: 'max-w-[1136px]',
      small: 'max-w-[850px]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType
}

export const Container = ({
  className,
  size,
  as: Component = 'div',
  ...props
}: ContainerProps) => {
  return (
    <Component
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
}
