export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          deleted: boolean | null
          deleted_at: string | null
          id: string
          measure_type: Database["public"]["Enums"]["measures_type"] | null
          name: string
          post_return_buffer_days: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          measure_type?: Database["public"]["Enums"]["measures_type"] | null
          name: string
          post_return_buffer_days?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted?: boolean | null
          deleted_at?: string | null
          id?: string
          measure_type?: Database["public"]["Enums"]["measures_type"] | null
          name?: string
          post_return_buffer_days?: number | null
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
          actual_return_buffer_days: number | null
          actual_return_date: string | null
          back: number | null
          bust: number | null
          created_at: string | null
          height: number | null
          hip: number | null
          id: string
          measure_type: Database["public"]["Enums"]["measures_type"]
          product_description: string
          product_id: string
          product_price: number
          rent_id: string
          shoulder: number | null
          sleeve: number | null
          waist: number | null
        }
        Insert: {
          actual_return_buffer_days?: number | null
          actual_return_date?: string | null
          back?: number | null
          bust?: number | null
          created_at?: string | null
          height?: number | null
          hip?: number | null
          id?: string
          measure_type: Database["public"]["Enums"]["measures_type"]
          product_description: string
          product_id: string
          product_price: number
          rent_id: string
          shoulder?: number | null
          sleeve?: number | null
          waist?: number | null
        }
        Update: {
          actual_return_buffer_days?: number | null
          actual_return_date?: string | null
          back?: number | null
          bust?: number | null
          created_at?: string | null
          height?: number | null
          hip?: number | null
          id?: string
          measure_type?: Database["public"]["Enums"]["measures_type"]
          product_description?: string
          product_id?: string
          product_price?: number
          rent_id?: string
          shoulder?: number | null
          sleeve?: number | null
          waist?: number | null
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
      create_full_rent: {
        Args: {
          p_address: string
          p_client_name: string
          p_discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          p_discount_value?: number
          p_internal_observations?: string
          p_phone: string
          p_products: Json
          p_receipt_observations?: string
          p_remaining_value?: number
          p_rent_date: string
          p_return_date?: string
          p_signal_value?: number
          p_total_value?: number
        }
        Returns: string
      }
      gbt_bit_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bool_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bool_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bpchar_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_bytea_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_cash_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_cash_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_date_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_date_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_enum_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_enum_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float4_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float4_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float8_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_float8_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_inet_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int2_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int2_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int4_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int4_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int8_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_int8_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_intv_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_intv_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_intv_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad8_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_macad8_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_numeric_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_oid_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_oid_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_text_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_time_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_time_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_timetz_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_ts_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_ts_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_tstz_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_uuid_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_uuid_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_var_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbt_var_fetch: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey_var_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey_var_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey16_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey16_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey2_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey2_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey32_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey32_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey4_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey4_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey8_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gbtreekey8_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      get_products_with_availability: {
        Args: { p_end_date: string; p_start_date: string }
        Returns: {
          actual_return_date: string
          availability: Database["public"]["Enums"]["availability_status"]
          buffer_end_date: string
          current_rent_id: string
          current_rent_return_date: string
          product: Json
        }[]
      }
      update_full_rent: {
        Args: {
          p_address: string
          p_client_name: string
          p_discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          p_discount_value?: number
          p_internal_observations?: string
          p_phone?: string
          p_products: Json
          p_receipt_observations?: string
          p_remaining_value?: number
          p_rent_date: string
          p_rent_id: string
          p_return_date?: string
          p_signal_value?: number
          p_total_value?: number
        }
        Returns: string
      }
    }
    Enums: {
      availability_status: "AVAILABLE" | "UNAVAILABLE" | "BUFFER_OCCUPIED"
      discount_type_enum: "PERCENTAGE" | "FIXED"
      measures_type: "SUIT" | "DRESS"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      availability_status: ["AVAILABLE", "UNAVAILABLE", "BUFFER_OCCUPIED"],
      discount_type_enum: ["PERCENTAGE", "FIXED"],
      measures_type: ["SUIT", "DRESS"],
    },
  },
} as const
