import { Control, FieldValues } from 'react-hook-form'

import { TPlatformType } from '@/types'

export type TControl = Control<{
  links: ILink[];
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}, any>


export interface IPlatform extends TPlatformType {
  url: string
}

export interface IDataContext {
  addLink: () => void
  remove: (index: number) => void
  platforms: IPlatform[]
  control: TControl
}

export interface ILink {
  url: string
  platform: IPlatform
}
