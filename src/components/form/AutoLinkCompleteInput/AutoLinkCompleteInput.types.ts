import { InputHTMLAttributes } from 'react'
import { TPlatformType } from '@/types'
import { Control, UseControllerProps } from 'react-hook-form'

export interface IAutoLinkCompleteInputProps {
  links: TPlatformType[]
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  error?: {
    [key: string]: {
      message: string
    }
  }
  control: Control<any> | undefined
  name: string
  defaultValue?: any
}
