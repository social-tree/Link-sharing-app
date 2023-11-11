export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      platforms: {
        Row: {
          background_color: string | null
          created_at: string
          icon_name: string | null
          id: number
          name: string | null
          regex: string | null
        }
        Insert: {
          background_color?: string | null
          created_at?: string
          icon_name?: string | null
          id?: number
          name?: string | null
          regex?: string | null
        }
        Update: {
          background_color?: string | null
          created_at?: string
          icon_name?: string | null
          id?: number
          name?: string | null
          regex?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          nickname: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          nickname?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          nickname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users_platforms: {
        Row: {
          created_at: string
          platforms: Json[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          platforms?: Json[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          platforms?: Json[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_platforms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
