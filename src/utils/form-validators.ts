import { z } from 'zod'

export const cpfPattern = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/
export const rgPattern = /^[0-9.-]{7,14}$/

function isValidCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '')
  if (clean.length !== 11) {
    return false
  }

  if (/^(\d)\1{10}$/.test(clean)) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) sum += Number(clean[i]) * (10 - i)
  let firstCheck = (sum * 10) % 11
  if (firstCheck === 10) firstCheck = 0
  if (firstCheck !== Number(clean[9])) {
    return false
  }
  sum = 0
  for (let i = 0; i < 10; i++) sum += Number(clean[i]) * (11 - i)
  let secondCheck = (sum * 10) % 11
  if (secondCheck === 10) secondCheck = 0
  if (secondCheck !== Number(clean[10])) {
    return false
  }
  return true
}

export const cpfValidator = z
  .string()
  .min(11, { message: 'O CPF deve ter no mínimo 11 caracteres' })
  .refine(isValidCPF, { message: 'CPF inválido.' })

export const rgValidator = z
  .string()
  .min(7, { message: 'O RG deve ter no mínimo 7 caracteres' })
  .regex(rgPattern, { message: 'RG inválido' })

export { isValidCPF }
