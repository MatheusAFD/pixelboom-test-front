import { httpClientFetch } from '@/lib/http-client-fetch'
import type { User } from '@/types/get-users.types'
import type { ErrorResponse } from '@/types/error-response.types'

export type GetUserResponse = User

export const getUser = async (
  id: string
): Promise<[ErrorResponse | null, GetUserResponse | null]> => {
  const [error, response] = await httpClientFetch<
    GetUserResponse,
    ErrorResponse
  >({
    url: `/users/${id}`,
    method: 'GET',
  })
  if (error) {
    return [error, null]
  }
  return [null, response]
}
