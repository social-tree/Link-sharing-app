import { Database } from './supabase'

export type TPlatformType = Database['public']['Tables']['platforms']['Row']

export type TPlatformTypeWithLink = TPlatformType & { url: string }
export type TPlatformTypeWithSeperateLink = {
  platform: TPlatformType
  url: string
}
export type TUserPlatformsType =
  Database['public']['Tables']['users_platforms']['Row']
