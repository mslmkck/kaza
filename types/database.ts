export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'user' | 'expert' | 'admin'
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'user' | 'expert' | 'admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'user' | 'expert' | 'admin'
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          user_id: string | null
          category: string
          title: string
          content: string
          status: 'pending' | 'answered' | 'closed'
          priority: 'low' | 'normal' | 'high' | 'urgent'
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          category: string
          title: string
          content: string
          status?: 'pending' | 'answered' | 'closed'
          priority?: 'low' | 'normal' | 'high' | 'urgent'
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          category?: string
          title?: string
          content?: string
          status?: 'pending' | 'answered' | 'closed'
          priority?: 'low' | 'normal' | 'high' | 'urgent'
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      answers: {
        Row: {
          id: string
          question_id: string | null
          expert_id: string | null
          content: string
          is_accepted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question_id?: string | null
          expert_id?: string | null
          content: string
          is_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question_id?: string | null
          expert_id?: string | null
          content?: string
          is_accepted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          user_id: string | null
          case_number: string | null
          case_type: 'traffic_accident' | 'damage' | 'insurance' | 'other'
          title: string
          description: string | null
          fault_percentage: number
          status: 'open' | 'in_progress' | 'closed' | 'archived'
          total_amount: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          case_number?: string | null
          case_type: 'traffic_accident' | 'damage' | 'insurance' | 'other'
          title: string
          description?: string | null
          fault_percentage?: number
          status?: 'open' | 'in_progress' | 'closed' | 'archived'
          total_amount?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          case_number?: string | null
          case_type?: 'traffic_accident' | 'damage' | 'insurance' | 'other'
          title?: string
          description?: string | null
          fault_percentage?: number
          status?: 'open' | 'in_progress' | 'closed' | 'archived'
          total_amount?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          case_id: string | null
          uploaded_by: string | null
          file_name: string
          file_url: string
          file_type: string | null
          file_size: number | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id?: string | null
          uploaded_by?: string | null
          file_name: string
          file_url: string
          file_type?: string | null
          file_size?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string | null
          uploaded_by?: string | null
          file_name?: string
          file_url?: string
          file_type?: string | null
          file_size?: number | null
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string | null
          title: string
          message: string | null
          type: 'info' | 'success' | 'warning' | 'error'
          is_read: boolean
          link: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          title: string
          message?: string | null
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string
          message?: string | null
          type?: 'info' | 'success' | 'warning' | 'error'
          is_read?: boolean
          link?: string | null
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          event_type: string
          event_data: Json | null
          user_id: string | null
          session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          event_data?: Json | null
          user_id?: string | null
          session_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          event_data?: Json | null
          user_id?: string | null
          session_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      user_role: 'user' | 'expert' | 'admin'
      question_status: 'pending' | 'answered' | 'closed'
      question_priority: 'low' | 'normal' | 'high' | 'urgent'
      case_type: 'traffic_accident' | 'damage' | 'insurance' | 'other'
      case_status: 'open' | 'in_progress' | 'closed' | 'archived'
      notification_type: 'info' | 'success' | 'warning' | 'error'
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database }
    | { schema: keyof Database; name: keyof (Database['public']['Tables'] & Database['public']['Views']) },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] &
      Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database }
    | { schema: keyof Database; name: keyof Database['public']['Tables'] },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database }
    | { schema: keyof Database; name: keyof Database['public']['Tables'] },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never
