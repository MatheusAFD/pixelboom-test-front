import type { PropsWithChildren, ReactNode } from 'react'

interface ConditionalProps {
  condition: boolean
  fallback?: ReactNode
}

export const Conditional = (props: PropsWithChildren<ConditionalProps>) => {
  const { condition, fallback, children } = props

  if (!condition) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
