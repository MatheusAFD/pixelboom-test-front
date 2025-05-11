import { ListPagination } from '@/components/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUrlFilters } from '@/hooks'

interface UsersListFooterProps {
  limit: number
  total: number
  visibleItemsCount: number
}

export const UsersListFooter = (props: UsersListFooterProps) => {
  const { limit, total, visibleItemsCount } = props

  const { handleLimitChange } = useUrlFilters()

  return (
    <footer className='flex items-center justify-between h-10 mt-5 '>
      <p className='text-sm text-muted-foreground'>
        {visibleItemsCount} de {total}
      </p>

      <div>
        <ListPagination limit={limit} total={total} />
      </div>

      <div className='flex items-center gap-2'>
        <p className='text-sm text-muted-foreground'>Itens por página</p>

        <Select
          value={String(limit)}
          onValueChange={(value) => handleLimitChange(Number(value))}
        >
          <SelectTrigger className='w-[70px] min-h-10'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='5'>5</SelectItem>
              <SelectItem value='10'>10</SelectItem>
              <SelectItem value='20'>20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </footer>
  )
}
