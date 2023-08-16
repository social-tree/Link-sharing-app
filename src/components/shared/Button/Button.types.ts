import { ButtonHTMLAttributes } from 'react'

export type TVariant = 'primary' | 'secondary' | 'socialMedia'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: TVariant
  backgroundColor?: string
  socialIcon?: string
}
