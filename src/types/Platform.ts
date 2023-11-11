import { Database } from './supabase'

export type TPlatformType = Database['public']['Tables']['platforms']['Row']

export type TPlatformTypeWithLink = TPlatformType & { url: string }
