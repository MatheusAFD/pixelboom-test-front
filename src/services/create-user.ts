import { httpClientFetch } from '@/lib/http-client-fetch'
import type { RegisterUserFormData } from '@/components/users-management/user-form/types'
import type { User } from '@/types/get-users.types'
import type { ErrorResponse } from '@/types/error-response.types'

export type CreateUserRequest = RegisterUserFormData
export type CreateUserResponse = User

export const createUser = async (
  data: CreateUserRequest
): Promise<[ErrorResponse | null, CreateUserResponse | null]> => {
  const [error, response] = await httpClientFetch<
    CreateUserResponse,
    ErrorResponse,
    CreateUserRequest
  >({
    url: '/users',
    method: 'POST',
    data,
  })

  if (error) {
    return [error, null]
  }

  return [null, response]
}
