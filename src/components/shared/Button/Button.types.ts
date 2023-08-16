import { ButtonHTMLAttributes } from 'react'

export type TVariant = 'primary' | 'secondary'

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: TVariant
}
