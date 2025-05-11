import { httpClientFetch } from '@/lib/http-client-fetch'
import type { RegisterUserFormData } from '@/components/users-management/user-form/types'
import type { User } from '@/types/get-users.types'
import type { ErrorResponse } from '@/types/error-response.types'

export type UpdateUserRequest = Partial<RegisterUserFormData>
export type UpdateUserResponse = User

export const updateUser = async (
  id: string,
  data: UpdateUserRequest
): Promise<[ErrorResponse | null, UpdateUserResponse | null]> => {
  const [error, response] = await httpClientFetch<
    UpdateUserResponse,
    ErrorResponse
  >({
    url: `/users/${id}`,
    method: 'PATCH',
    data,
  })
  if (error) {
    return [error, null]
  }
  return [null, response]
}
