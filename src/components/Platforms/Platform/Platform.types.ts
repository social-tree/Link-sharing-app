import { TPlatformTypeWithSeperateLink } from '@/types/Platform'
import { HTMLAttributes } from 'react'

export interface IPlatformProps extends HTMLAttributes<HTMLElement> {
  field: TPlatformTypeWithSeperateLink
  i: number
}
