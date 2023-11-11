import { Control } from 'react-hook-form'
import { Session } from '@supabase/supabase-js'
import { TPlatformType } from '@/types/Platform'
import { userType } from '@/types/user'

export type TControl = Control<
  {
    links: ILink[]
    firstName: string
    lastName: string
    email: string
    profileImage: string
  },
  any
>

export interface IDataContext {
  /*   addLink: () => void */
  remove: (index: number) => void
  platforms: TPlatformType[]
  control: TControl
  user: userType | null
  session: Session | null
}

export interface ILink {
  url: string
  platform: TPlatformType
}
