import { useQuery } from '@tanstack/react-query'

import { getUsers } from '@/services/get-users'

interface UseGetUsersParams {
  limit: number
  page: number
  search: string
}

export const useGetUsers = (params: UseGetUsersParams) => {
  const { limit, page, search } = params

  const queryData = useQuery({
    queryKey: ['get-users', search, page, limit],
    queryFn: async () => {
      const [error, response] = await getUsers({ limit, page, search })
      if (error) {
        throw error
      }

      return response
    },
    placeholderData: (prev) => prev,
    staleTime: 300000,
  })

  const pagination = {
    totalPages: queryData.data?.totalItems ?? 0,
  }

  return { pagination, ...queryData }
}
