import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: JSX.Element | JSX.Element[] | null
  rightIcon?: JSX.Element | JSX.Element[] | null
}
