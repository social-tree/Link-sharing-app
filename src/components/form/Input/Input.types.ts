import { FieldErrors, FieldValues } from 'react-hook-form'

import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: JSX.Element | JSX.Element[] | null
  rightIcon?: JSX.Element | JSX.Element[] | null
  label?: string
  error?: FieldErrors<FieldValues>
}
