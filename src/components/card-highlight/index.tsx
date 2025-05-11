interface CardHighlightProps {
  label: string
  highlight?: string | number
}

export const CardHighlight = (props: CardHighlightProps) => {
  const { label, highlight } = props

  return (
    <div className='flex-1 min-w-56 max-w-full p-6 rounded-md bg-primary-foreground font-noto-serif'>
      <p className='text-xs text-muted-foreground'>{label}</p>
      <strong className='font-normal text-[32px] text-foreground'>
        {highlight}
      </strong>
    </div>
  )
}
