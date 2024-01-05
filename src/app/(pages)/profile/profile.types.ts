import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IProfileFormValues {
  first_name: string
  last_name: string
  email: string
  avatar: string
}

export interface IProfileChildProps {
  register: UseFormRegister<IProfileFormValues>
  errors: FieldErrors<IProfileFormValues>
}
