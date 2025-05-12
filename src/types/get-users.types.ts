export interface GetUsersFilters {
  search: string
  page: number
  limit: number
}

export interface GetUsersResponse {
  data: User[]
  totalItems: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  rg: string
  isActive: boolean
  phoneIsWhatsapp: boolean
  createdAt: string | Date
  updatedAt: string | Date
  deletedAt: string | Date
}
