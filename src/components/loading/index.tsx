import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'
import type { HTMLAttributes } from 'react'

export const Loading = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn('w-full flex justify-center items-center', className)}
      {...rest}
    >
      <Loader2 className='animate-spin text-green-principal' size={48} />
    </div>
  )
}
