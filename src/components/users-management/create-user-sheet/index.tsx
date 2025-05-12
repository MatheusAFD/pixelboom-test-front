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

import { useDisclosure } from '@/hooks/use-disclosure'

import { createUser } from '@/services/'
import type { RegisterUserFormData } from '../user-form/types'
import { queryClient } from '@/lib'

export const CreateUserSheet = (props: PropsWithChildren) => {
  const { children } = props

  const [isPending, startTransition] = useTransition()

  const { isOpen, onOpenChange } = useDisclosure()

  const onCreateUser = async (data: RegisterUserFormData) => {
    startTransition(async () => {
      const [error] = await createUser(data)

      if (error) {
        toast.error('Erro ao criar usuário!')
        return
      }

      await queryClient.invalidateQueries({
        queryKey: ['get-users'],
      })

      await queryClient.invalidateQueries({
        queryKey: ['get-dashboard-stats'],
      })

      onOpenChange(false)
      toast.success('Usuário adicionado com sucesso!')
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='gap-0 p-4 md:p-10 min-w-full md:min-w-[560px]'>
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

        <UserForm onSubmit={onCreateUser} />

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
            Adicionar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
