import {
  Button,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/'

import {
  Activity,
  ChevronsUpDown,
  FileCheck,
  Headset,
  Settings,
  Users,
} from 'lucide-react'
import { NavLinks } from '../nav-links'
import { Avatar, AvatarFallback } from '../ui/avatar'

export function AppSidebar() {
  const menuItems = [
    {
      Icon: Activity,
      label: 'Dashboard',
    },

    {
      Icon: Users,
      label: 'Usuários',
      isActive: true,
    },

    {
      Icon: FileCheck,
      label: 'Documentos',
    },
  ]

  const settingsItems = [
    {
      Icon: Settings,
      label: 'Geral',
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className='px-6 py-5 h-[72px]  border-b border-sidebar-border'>
        <Button size='sm' className='w-24 bg-black self-start'>
          Logo
        </Button>
      </SidebarHeader>
      <SidebarContent className='p-4'>
        <SidebarMenuButton
          size='lg'
          className='text-sidebar-foreground text-sm font-semibold'
        >
          <Avatar className='h-8 w-8 rounded-lg grayscale'>
            <AvatarFallback className='rounded-lg text-primary'>
              FA
            </AvatarFallback>
          </Avatar>
          <div className=''>
            <span className=''>Filial A</span>
          </div>
          <ChevronsUpDown className='ml-auto size-4' />
        </SidebarMenuButton>

        <NavLinks label='Menu' items={menuItems} />

        <NavLinks label='Configurações' items={settingsItems} />
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <button className='text-green-primary bg-background rounded-full text-sm font-normal leading-4 text-start px-4 py-3 flex justify-between'>
          precisando de ajuda?
          <Headset size={16} />
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
