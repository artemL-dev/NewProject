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
      pages: {
        Row: {
          id: string
          user_id: string
          name: string
          slug: string
          type: 'slot' | 'general' | 'white' | 'prelanding'
          blocks: Json
          settings: Json
          metadata: Json
          is_published: boolean
          published_at: string | null
          project_id: string | null
          team_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          slug: string
          type: 'slot' | 'general' | 'white' | 'prelanding'
          blocks?: Json
          settings?: Json
          metadata?: Json
          is_published?: boolean
          published_at?: string | null
          project_id?: string | null
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          slug?: string
          type?: 'slot' | 'general' | 'white' | 'prelanding'
          blocks?: Json
          settings?: Json
          metadata?: Json
          is_published?: boolean
          published_at?: string | null
          project_id?: string | null
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      assets: {
        Row: {
          id: string
          user_id: string
          page_id: string
          name: string
          url: string
          type: 'image' | 'icon' | 'video'
          size: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          page_id: string
          name: string
          url: string
          type: 'image' | 'icon' | 'video'
          size?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          page_id?: string
          name?: string
          url?: string
          type?: 'image' | 'icon' | 'video'
          size?: number | null
          created_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'slot' | 'general' | 'white' | 'prelanding'
          thumbnail: string | null
          blocks: Json
          settings: Json
          is_public: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: 'slot' | 'general' | 'white' | 'prelanding'
          thumbnail?: string | null
          blocks?: Json
          settings?: Json
          is_public?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: 'slot' | 'general' | 'white' | 'prelanding'
          thumbnail?: string | null
          blocks?: Json
          settings?: Json
          is_public?: boolean
          created_at?: string
        }
      }
      page_versions: {
        Row: {
          id: string
          page_id: string
          version: number
          blocks: Json
          settings: Json
          created_at: string
        }
        Insert: {
          id?: string
          page_id: string
          version: number
          blocks: Json
          settings: Json
          created_at?: string
        }
        Update: {
          id?: string
          page_id?: string
          version?: number
          blocks?: Json
          settings?: Json
          created_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          color: string
          team_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          color?: string
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          color?: string
          team_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      generation_history: {
        Row: {
          id: string
          user_id: string
          page_id: string | null
          generation_type: string
          prompt: string | null
          template_id: string | null
          model: string | null
          tokens_used: number | null
          duration_ms: number | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          page_id?: string | null
          generation_type: string
          prompt?: string | null
          template_id?: string | null
          model?: string | null
          tokens_used?: number | null
          duration_ms?: number | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          page_id?: string | null
          generation_type?: string
          prompt?: string | null
          template_id?: string | null
          model?: string | null
          tokens_used?: number | null
          duration_ms?: number | null
          status?: string
          created_at?: string
        }
      }
      download_history: {
        Row: {
          id: string
          user_id: string
          page_id: string | null
          format: string
          file_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          page_id?: string | null
          format: string
          file_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          page_id?: string | null
          format?: string
          file_name?: string | null
          created_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          slug: string
          avatar_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          avatar_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          avatar_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'editor' | 'viewer'
          invited_by: string | null
          invited_at: string
          joined_at: string
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role: 'owner' | 'admin' | 'editor' | 'viewer'
          invited_by?: string | null
          invited_at?: string
          joined_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          role?: 'owner' | 'admin' | 'editor' | 'viewer'
          invited_by?: string | null
          invited_at?: string
          joined_at?: string
        }
      }
      team_invitations: {
        Row: {
          id: string
          team_id: string
          email: string
          role: 'admin' | 'editor' | 'viewer'
          invited_by: string | null
          token: string
          expires_at: string
          accepted_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          team_id: string
          email: string
          role: 'admin' | 'editor' | 'viewer'
          invited_by?: string | null
          token?: string
          expires_at?: string
          accepted_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          team_id?: string
          email?: string
          role?: 'admin' | 'editor' | 'viewer'
          invited_by?: string | null
          token?: string
          expires_at?: string
          accepted_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_team_members_with_email: {
        Args: { p_team_id: string }
        Returns: {
          id: string
          team_id: string
          user_id: string
          role: string
          invited_by: string | null
          invited_at: string
          joined_at: string
          email: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']
