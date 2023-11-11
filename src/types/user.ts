import { Database } from './supabase'

export type userType = Database['public']['Tables']['users']['Row']
