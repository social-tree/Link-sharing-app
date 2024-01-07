import { TPlatformTypeWithSeperateLink } from '@/types/Platform'
import { HTMLAttributes } from 'react'

export interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  name: string
}
