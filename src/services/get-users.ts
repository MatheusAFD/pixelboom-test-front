import { httpClientFetch } from '@/lib/http-client-fetch'
import type { GetUsersFilters, GetUsersResponse } from '@/types'
import type { ErrorResponse } from '@/types/error-response.types'

export const getUsers = async (
  filters: GetUsersFilters
): Promise<[ErrorResponse | null, GetUsersResponse | null]> => {
  const { limit, page, search } = filters

  const [error, data] = await httpClientFetch<GetUsersResponse, ErrorResponse>({
    url: `/users?search=${search}&page=${page}&limit=${limit}`,
    method: 'GET',
  })

  if (error) {
    return [error, null]
  }

  return [null, data]
}
