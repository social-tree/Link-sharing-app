import { ButtonHTMLAttributes } from 'react'

export interface ISocialMediaButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string
  socialIcon: string
  link: string
}
