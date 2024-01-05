import { FieldErrors, FieldValues } from 'react-hook-form'

import { InputHTMLAttributes } from 'react'
import { TFormFields } from '@/Contexts/DataProvider/DataProvider.types'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: JSX.Element | JSX.Element[] | null
  rightIcon?: JSX.Element | JSX.Element[] | null
  label?: string
  error?: FieldErrors<any> | null
  customError?: string | null
}
