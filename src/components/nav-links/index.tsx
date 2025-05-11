import { type LucideProps } from 'lucide-react'

import { NavItem } from '../nav-item'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '../ui'

interface NavLinksProps {
  label: string
  items: {
    label: string
    Icon: React.FC<LucideProps>
    isActive?: boolean
  }[]
}

export const NavLinks = (props: NavLinksProps) => {
  const { items, label } = props

  return (
    <SidebarGroup className='p-0'>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <div className='flex flex-col gap-[6px]'>
        {items.map((item) => {
          return (
            <SidebarMenu key={item.label}>
              <NavItem isActive={item.isActive}>
                {' '}
                <item.Icon size={16} /> {item.label}
              </NavItem>
            </SidebarMenu>
          )
        })}
      </div>
    </SidebarGroup>
  )
}
