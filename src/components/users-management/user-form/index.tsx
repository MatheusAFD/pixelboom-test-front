import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { MaskField, SwitchField, TextField } from '@/components/fields'

import {
  registerUserSchema,
  type RegisterUserFormData,
  type UserFormProps,
} from './types'
import { queryClient } from '@/lib/tanstack-query'
import { Checkbox } from '@/components/ui/checkbox'

export const UserForm = (props: UserFormProps) => {
  const { onSubmit, initialValues } = props

  const defaultFormValues =
    initialValues ??
    ({
      name: '',
      phone: '',
      cpf: '',
      rg: '',
      email: '',
      isActive: true,
      phoneIsWhatsapp: false,
    } as RegisterUserFormData)

  const {
    control,
    register,

    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<RegisterUserFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(registerUserSchema),
    defaultValues: defaultFormValues,
  })

  const onSubmitForm = async (data: RegisterUserFormData) => {
    await onSubmit(data)

    queryClient.invalidateQueries({
      queryKey: ['get-users'],
    })

    queryClient.invalidateQueries({
      queryKey: ['get-dashboard-stats'],
    })
  }

  return (
    <form
      id='user-form'
      onSubmit={handleSubmit(onSubmitForm)}
      className='grid gap-5'
    >
      <TextField
        {...register('name')}
        label='Nome completo'
        placeholder='Digite o nome'
        errorMessage={errors?.name?.message}
      />
      <TextField
        {...register('email')}
        type='email'
        label='E-mail'
        placeholder='Digite o e-mail'
        errorMessage={errors?.email?.message}
      />
      <div className='flex flex-col gap-2'>
        <MaskField
          control={control}
          name='phone'
          pattern='(00) 0 0000-0000'
          inputMode='numeric'
          label='Telefone'
          placeholder='Informe o telefone'
          errorMessage={errors?.phone?.message}
        />

        <div className='flex items-center space-x-2'>
          <Checkbox
            {...register('phoneIsWhatsapp')}
            id='isWhatsapp'
            checked={watch().phoneIsWhatsapp}
          />
          <label
            htmlFor='isWhatsapp'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            WhatsApp
          </label>
        </div>
      </div>

      <div className='flex gap-4'>
        <MaskField
          control={control}
          name='cpf'
          pattern='000.000.000-00'
          inputMode='numeric'
          label='Informe o CPF'
          placeholder='Informe o CPF'
          errorMessage={errors?.cpf?.message}
        />

        <TextField
          {...register('rg')}
          label='Informe o RG'
          placeholder='Informe o RG'
          errorMessage={errors?.rg?.message}
        />
      </div>

      <SwitchField
        control={control}
        name='isActive'
        label='Status'
        description='Definia se o usuário estará ativo ao ser adicionado.'
      />
    </form>
  )
}
