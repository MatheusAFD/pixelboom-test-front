import { parseAsInteger, useQueryState } from 'nuqs'

export const useUrlFilters = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [limit, setLimit] = useQueryState(
    'limit',
    parseAsInteger.withDefault(5)
  )
  const [search, setSearch] = useQueryState('search', { defaultValue: '' })

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
  }

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
  }

  const handleReset = () => {
    setPage(1)
    setSearch('')
    setLimit(5)
  }

  return {
    page,
    search,
    limit,
    handleLimitChange,
    handleReset,
    handleSearch,
    handlePageChange,
  }
}
