import { Bell, HelpCircleIcon } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  SidebarTrigger,
} from '../ui'
import { Container } from '../container'

export const AppHeader = () => (
  <header className='w-full fixed z-10 bg-background flex justify-center items-center h-[72px] border-b border-sidebar-border'>
    <SidebarTrigger className='pl-4' />
    <Container className='w-full flex items-end md:ml-[239px]'>
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
