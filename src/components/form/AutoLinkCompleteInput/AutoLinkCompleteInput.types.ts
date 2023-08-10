import { InputHTMLAttributes } from 'react'
import { TPlatformType } from '@/types'
import { UseControllerProps } from 'react-hook-form'

export interface IAutoLinkCompleteInputProps extends UseControllerProps {
  links: TPlatformType[]
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  error?: {
    [key: string]: {
      message: string
    }
  }
}
