import { Container } from '@/components/container'
import { Button } from '@/components/ui'
import { Plus } from 'lucide-react'
import { CardHighlight } from '../../card-highlight'
import { UsersListContainer } from '../users-list-container'
import { CreateUserSheet } from '../create-user-sheet'
import { UsersListFooter } from '../users-list-pagination'
import { useGetUsers, useUrlFilters } from '@/hooks'
import { useGetDashboardStats } from '@/hooks/use-get-dashboard-stats'
import { Conditional } from '@/components/conditional'
import { Loading } from '@/components/loading'

export const Users = () => {
  const { search, page, limit } = useUrlFilters()

  const {
    data,
    isLoading: isLoadingUsers,
    isPlaceholderData,
  } = useGetUsers({
    limit,
    page,
    search,
  })

  const { data: dashboardData, isLoading } = useGetDashboardStats()

  return (
    <Container as='main' className='py-10'>
      <section className='flex justify-between items-center'>
        <h1 className='font-noto-serif text-foreground text-[30px]'>
          Usuários
        </h1>
        <CreateUserSheet>
          <Button rounded='full'>
            {' '}
            <Plus /> Adicionar
          </Button>
        </CreateUserSheet>
      </section>

      <div className='flex gap-5 flex-wrap mt-10'>
        <Conditional condition={!isLoading} fallback={<Loading />}>
          <CardHighlight label='Usuários' highlight={dashboardData?.total} />
          <CardHighlight label='Tempo de sessão' highlight='31m 20s' />
          <CardHighlight label='Ativos' highlight={dashboardData?.active} />
          <CardHighlight label='Inativos' highlight={dashboardData?.inactive} />
        </Conditional>
      </div>

      <Conditional
        condition={!isLoadingUsers}
        fallback={<Loading className='mt-20' />}
      >
        <UsersListContainer data={data} isLoading={isPlaceholderData} />
      </Conditional>

      <UsersListFooter
        limit={limit}
        total={data?.totalItems ?? 0}
        visibleItemsCount={data?.data.length ?? 0}
      />
    </Container>
  )
}
