import { z } from 'zod'
import { cpfValidator, rgValidator } from '@/utils/form-validators'

export const registerUserSchema = z.object({
  name: z.string().nonempty({ message: 'O campo é obrigatório' }),
  phone: z.string().nonempty({ message: 'O campo é obrigatório' }),
  cpf: cpfValidator,
  rg: rgValidator,
  email: z.string().email({ message: 'E-mail inválido' }),
  isActive: z.boolean().optional(),
})

export type RegisterUserFormData = z.infer<typeof registerUserSchema>

export interface UserFormProps {
  onSubmit: (data: RegisterUserFormData) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Partial<RegisterUserFormData> | any
}
