import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFieldArrayRemove,
  UseFormClearErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'

import { Session } from '@supabase/supabase-js'
import {
  TPlatformType,
  TPlatformTypeWithLink,
  TPlatformTypeWithSeperateLink,
} from '@/types/Platform'
import { userType } from '@/types/user'

export type TControl = Control<
  {
    links: ILink[]
    first_name: string
    last_name: string
    email: string
    avatar: string
  },
  any
>

export interface IDataContext {
  addLink: () => void
  remove: UseFieldArrayRemove
  platforms: TPlatformType[]
  control: Control<TFormFields> | undefined
  user: userType | null
  session: Session | null
  fields: FieldArrayWithId<TFormFields, 'links', 'id'>[] | null
  register: UseFormRegister<TFormFields> | null
  watch: UseFormWatch<TFormFields> | null
  reset: UseFormReset<TFormFields> | null
  handleSubmit: UseFormHandleSubmit<TFormFields> | null
  clearErrors: UseFormClearErrors<TFormFields> | null
  errors: FieldErrors<TFormFields> | null
  setValue: UseFormSetValue<TFormFields> | null
  setError: UseFormSetError<TFormFields>
  notUsedPlatforms: TPlatformType[]
}

export type TFormFields = {
  links: ILink[]
  first_name: string
  last_name: string
  email: string
  avatar: string
}
export interface ILink {
  url: string
  platform: TPlatformType
  platform_type: number
}
