import { ListFilter, Search } from 'lucide-react'

import { Button, Input } from '@/components/ui'
import { UserCard } from '../user-card'
import { useUrlFilters } from '@/hooks'
import { useForm } from 'react-hook-form'
import type { GetUsersResponse } from '@/types'
import { useState, useTransition } from 'react'
import { UpdateUserSheet } from '../update-user-sheet'
import { deleteUser } from '@/services'
import { toast } from 'sonner'
import { queryClient } from '@/lib/tanstack-query'

interface UsersListContainerProps {
  data: GetUsersResponse | undefined | null
  isLoading?: boolean
}

interface FormData {
  search: string
}

export const UsersListContainer = (props: UsersListContainerProps) => {
  const { data, isLoading } = props

  const [isPending, startTransition] = useTransition()

  const [userToEdit, setUserToEdit] = useState<string | null>(null)
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setEditModalIsOpen(open)

    if (open === false) {
      setUserToEdit(null)
    }
  }

  const { handleSearch } = useUrlFilters()

  const { register, handleSubmit } = useForm<FormData>()

  const onDeleteUser = async (userId: string): Promise<void> => {
    if (!userId) {
      return
    }

    startTransition(async () => {
      const [error] = await deleteUser(userId)

      if (error) {
        toast.error('Erro ao editar usuário!')

        return
      }

      queryClient.invalidateQueries({ queryKey: ['get-users'] })

      onOpenChange?.(false)
      toast.success('Usuário deletado com sucesso!')
    })
  }

  const onSubmit = (data: FormData) => {
    handleSearch(data.search)
  }

  return (
    <section className='mt-5 flex flex-col gap-5'>
      <div className='flex items-center gap-3'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 relative'>
          <Search
            className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground'
            size={16}
          />

          <Input
            {...register('search')}
            type='search'
            placeholder='Buscar...'
            className='w-full h-10 pl-8'
          />
        </form>
        <Button variant='outline' rounded='full' size='icon'>
          <ListFilter />
        </Button>
      </div>

      {data?.data.map((user) => {
        return (
          <UserCard
            key={user.id}
            user={user}
            isLoading={isLoading || isPending}
            onEdit={() => {
              setUserToEdit(user.id)
              setEditModalIsOpen(true)
            }}
            onDelete={() => {
              onDeleteUser(user.id)
            }}
          />
        )
      })}

      <UpdateUserSheet
        userId={userToEdit}
        isOpen={editModalIsOpen}
        onOpenChange={onOpenChange}
      />
    </section>
  )
}
