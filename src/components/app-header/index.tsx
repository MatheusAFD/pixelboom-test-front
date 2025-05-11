import { Bell, HelpCircleIcon } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  SidebarTrigger,
} from '../ui'
import { Container } from '../container'

export const AppHeader = () => {
  return (
    <header className='w-full flex justify-center items-center h-[72px] p-4 border-b border-sidebar-border'>
      <SidebarTrigger />
      <Container className='w-full flex items-end '>
        <div className='flex gap-3'>
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
