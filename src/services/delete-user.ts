import { httpClientFetch } from '@/lib/http-client-fetch'

import type { User } from '@/types/get-users.types'
import type { ErrorResponse } from '@/types/error-response.types'

type DeleteUserResponse = User

export const deleteUser = async (
  id: string
): Promise<[ErrorResponse | null, DeleteUserResponse | null]> => {
  const [error, response] = await httpClientFetch<
    DeleteUserResponse,
    ErrorResponse
  >({
    url: `/users/${id}`,
    method: 'DELETE',
    data: {
      id,
    },
  })

  if (error) {
    return [error, null]
  }
  return [null, response]
}
