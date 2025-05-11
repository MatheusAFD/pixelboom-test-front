import { useState } from 'react'

import {
  Calendar,
  Clock3,
  EllipsisVertical,
  Tag,
  User,
  Pencil,
  Trash2,
} from 'lucide-react'

import { Avatar, AvatarFallback, Button } from '@/components/ui'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

import type { User as UserType } from '@/types'
import { getNameInitials } from '@/utils/'
import { cn } from '@/utils/tailwind-utils'
import { Badge } from '@/components/ui/badge'

interface UserCardProps {
  user: UserType
  isLoading?: boolean
  onEdit?: VoidFunction
  onDelete?: VoidFunction
}

export const UserCard = (props: UserCardProps) => {
  const { user, onEdit, isLoading, onDelete } = props
  const [openPopover, setOpenPopover] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)

  return (
    <div
      className={cn(
        'flex justify-between items-center p-3 rounded-md outline outline-border',
        isLoading && 'animate-pulse'
      )}
    >
      <div className='flex gap-3 items-center'>
        <div>
          <Avatar className='size-14'>
            <AvatarFallback>{getNameInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>

        <div className='text-xs text-muted-foreground'>
          <div className='flex gap-3'>
            <p className='text-sm text-foreground'>{user.name}</p>
            <p className='flex gap-1 items-center'>
              <User size={12} /> 51 anos, homem
            </p>
          </div>

          <div className='flex gap-3'>
            <p className='flex gap-1 items-center'>
              <Calendar size={12} /> 22/03/2025 - 10:21am
            </p>
            <p className='flex gap-1 items-center'>
              <Clock3 size={12} />
              38m22s
            </p>
            <p className='flex gap-1 items-center'>
              <Tag size={12} /> Usuário Padrão
            </p>
          </div>
        </div>
      </div>

      <div className='flex gap-3 items-center'>
        <Badge variant={user.isActive ? 'secondary' : 'outline'}>
          {user.isActive ? 'Ativo' : 'Inativo'}
        </Badge>
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              rounded='full'
              size='icon'
              className='cursor-pointer'
            >
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-40 p-0' align='end'>
            <div className='flex flex-col'>
              <Button
                variant={'ghost'}
                type='button'
                className='justify-start hover:bg-accent transition-colors'
                onClick={() => {
                  setOpenPopover(false)
                  onEdit?.()
                }}
              >
                <Pencil size={16} /> Editar
              </Button>
              <Button
                variant={'ghost'}
                type='button'
                className='justify-start text-destructive hover:bg-accent transition-colors'
                onClick={() => {
                  setOpenAlert(true)
                }}
              >
                <Trash2 size={16} /> Excluir
              </Button>
              <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir este usuário? Essa ação não
                      poderá ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        setOpenAlert(true)
                        onDelete?.()
                      }}
                      disabled={isLoading}
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
