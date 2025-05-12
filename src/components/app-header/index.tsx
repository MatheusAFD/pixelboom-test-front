import { Bell, HelpCircleIcon } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  SidebarTrigger,
} from '@/components/ui'

import { Container } from '@/components'

export const AppHeader = () => {
  return (
    <header className='w-full sticky top-0 z-10 md:relative bg-background flex justify-center items-center h-[72px] border-b border-sidebar-border'>
      <SidebarTrigger className='pl-4' />
      <Container className='w-full flex items-end'>
        <div className='flex gap-3 md:p-4'>
          <Button rounded={'full'} size='icon' variant='outline'>
            <HelpCircleIcon />
          </Button>

          <Button rounded={'full'} size='icon' variant='outline'>
            <Bell />
          </Button>

          <Avatar className='size-10'>
            <AvatarImage src='https://github.com/matheusafd.png' />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </header>
  )
}
