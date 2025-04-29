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
      categories: {
        Row: {
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          description: string | null
          id: string
          price: number
          receipt_description: string | null
          reference: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          price: number
          receipt_description?: string | null
          reference: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          price?: number
          receipt_description?: string | null
          reference?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      rent_products: {
        Row: {
          created_at: string | null
          id: string
          product_description: string
          product_id: string
          product_price: number
          rent_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_description: string
          product_id: string
          product_price: number
          rent_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_description?: string
          product_id?: string
          product_price?: number
          rent_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rent_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rent_products_rent_id_fkey"
            columns: ["rent_id"]
            isOneToOne: false
            referencedRelation: "rents"
            referencedColumns: ["id"]
          },
        ]
      }
      rents: {
        Row: {
          address: string | null
          client_name: string
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          discount_type:
            | Database["public"]["Enums"]["discount_type_enum"]
            | null
          discount_value: number | null
          id: string
          internal_observations: string | null
          phone: string | null
          receipt_observations: string | null
          remaining_value: number | null
          rent_date: string
          return_date: string | null
          signal_value: number | null
          total_value: number
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          client_name: string
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          discount_type?:
            | Database["public"]["Enums"]["discount_type_enum"]
            | null
          discount_value?: number | null
          id?: string
          internal_observations?: string | null
          phone?: string | null
          receipt_observations?: string | null
          remaining_value?: number | null
          rent_date: string
          return_date?: string | null
          signal_value?: number | null
          total_value: number
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          client_name?: string
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          discount_type?:
            | Database["public"]["Enums"]["discount_type_enum"]
            | null
          discount_value?: number | null
          id?: string
          internal_observations?: string | null
          phone?: string | null
          receipt_observations?: string | null
          remaining_value?: number | null
          rent_date?: string
          return_date?: string | null
          signal_value?: number | null
          total_value?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_rent_with_products: {
        Args: {
          p_client_name: string
          p_rent_date: string
          p_total_value: number
          p_discount_value: number
          p_discount_type: string
          p_internal_observations: string
          p_receipt_observations: string
          p_remaining_value: number
          p_return_date: string
          p_signal_value: number
          p_address: string
          p_phone: string
          p_product_ids: string[]
        }
        Returns: string
      }
    }
    Enums: {
      discount_type_enum: "PERCENTAGE" | "FIXED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      discount_type_enum: ["PERCENTAGE", "FIXED"],
    },
  },
} as const
