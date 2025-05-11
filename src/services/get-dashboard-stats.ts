import { httpClientFetch } from '@/lib/http-client-fetch'

import type { ErrorResponse } from '@/types/error-response.types'

interface GetUsersDashboardStats {
  total: number
  active: number
  inactive: number
}

export const getDashboardStats = async (): Promise<
  [ErrorResponse | null, GetUsersDashboardStats | null]
> => {
  const [error, data] = await httpClientFetch<
    GetUsersDashboardStats,
    ErrorResponse
  >({
    url: `/users/dashboard/stats`,
    method: 'GET',
  })

  if (error) {
    return [error, null]
  }

  return [null, data]
}
