import { useTransition, type PropsWithChildren } from 'react'

import { toast } from 'sonner'
import { X } from 'lucide-react'

import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui'
import { UserForm } from '../user-form'

import { getUser, updateUser } from '@/services/'
import type { RegisterUserFormData } from '../user-form/types'

interface UpdateUserSheetProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  userId: string | null
}

export function UpdateUserSheet(
  props: PropsWithChildren<UpdateUserSheetProps>
) {
  const { userId, isOpen, onOpenChange, children } = props

  const [isPending, startTransition] = useTransition()

  const onEditUser = async (data: RegisterUserFormData): Promise<void> => {
    if (!userId) {
      return
    }

    startTransition(async () => {
      const [error] = await updateUser(userId, data)

      if (error) {
        toast.error('Erro ao editar usuário!')
        return
      }

      onOpenChange?.(false)
      toast.success('Usuário editado com sucesso!')
    })
  }

  const defaultValues = async () => {
    if (!userId) {
      return
    }

    const [error, user] = await getUser(userId as string)

    const formattedUser = {
      ...user,
      isActive: user?.isActive,
    }

    if (error) {
      toast.error('Erro!', {
        description: 'Erro ao buscar unidade.',
      })

      return
    }

    return formattedUser
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='gap-0 p-10 min-w-[560px]'>
        <SheetHeader className='flex flex-row justify-between items-center p-0 mb-10'>
          <SheetTitle className='text-2xl font-normal font-noto-serif'>
            Adicionar usuário
          </SheetTitle>
          <SheetClose asChild>
            <Button variant='outline' rounded='full' size='icon'>
              <X />
            </Button>
          </SheetClose>
        </SheetHeader>

        <UserForm onSubmit={onEditUser} initialValues={defaultValues} />

        <SheetFooter className='flex flex-row gap-3 justify-end'>
          <SheetClose asChild>
            <Button type='button' variant='outline' rounded='full'>
              Cancelar
            </Button>
          </SheetClose>
          <Button
            form='user-form'
            type='submit'
            rounded='full'
            disabled={isPending}
          >
            Salvar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
