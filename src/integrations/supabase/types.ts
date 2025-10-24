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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ecological_metrics: {
        Row: {
          created_at: string
          id: string
          last_earning_date: string | null
          money_earned_today_ars: number | null
          total_co2_saved_kg: number
          total_money_earned_ars: number | null
          total_money_saved_ars: number
          total_trips: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          last_earning_date?: string | null
          money_earned_today_ars?: number | null
          total_co2_saved_kg?: number
          total_money_earned_ars?: number | null
          total_money_saved_ars?: number
          total_trips?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          last_earning_date?: string | null
          money_earned_today_ars?: number | null
          total_co2_saved_kg?: number
          total_money_earned_ars?: number | null
          total_money_saved_ars?: number
          total_trips?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ecological_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecological_metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          alias: string | null
          avatar_url: string | null
          cbu: string | null
          created_at: string
          cvu: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          alias?: string | null
          avatar_url?: string | null
          cbu?: string | null
          created_at?: string
          cvu?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          alias?: string | null
          avatar_url?: string | null
          cbu?: string | null
          created_at?: string
          cvu?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      trip_requests: {
        Row: {
          audio_note: string | null
          created_at: string
          id: string
          passenger_id: string
          pickup_lat: number | null
          pickup_lng: number | null
          pickup_location: string | null
          status: string
          trip_id: string
          updated_at: string
        }
        Insert: {
          audio_note?: string | null
          created_at?: string
          id?: string
          passenger_id: string
          pickup_lat?: number | null
          pickup_lng?: number | null
          pickup_location?: string | null
          status?: string
          trip_id: string
          updated_at?: string
        }
        Update: {
          audio_note?: string | null
          created_at?: string
          id?: string
          passenger_id?: string
          pickup_lat?: number | null
          pickup_lng?: number | null
          pickup_location?: string | null
          status?: string
          trip_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_requests_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_requests_passenger_id_fkey"
            columns: ["passenger_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trip_requests_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          cancelled_at: string | null
          co2_saved_kg: number | null
          completed_at: string | null
          created_at: string
          departure_date: string
          departure_time: string
          destination: string
          destination_lat: number | null
          destination_lng: number | null
          distance_km: number | null
          driver_id: string
          estimated_duration_minutes: number | null
          id: string
          money_saved_ars: number | null
          origin: string
          origin_lat: number | null
          origin_lng: number | null
          seats_available: number
          status: string
          updated_at: string
          vehicle_id: string
        }
        Insert: {
          cancelled_at?: string | null
          co2_saved_kg?: number | null
          completed_at?: string | null
          created_at?: string
          departure_date: string
          departure_time: string
          destination: string
          destination_lat?: number | null
          destination_lng?: number | null
          distance_km?: number | null
          driver_id: string
          estimated_duration_minutes?: number | null
          id?: string
          money_saved_ars?: number | null
          origin: string
          origin_lat?: number | null
          origin_lng?: number | null
          seats_available: number
          status?: string
          updated_at?: string
          vehicle_id: string
        }
        Update: {
          cancelled_at?: string | null
          co2_saved_kg?: number | null
          completed_at?: string | null
          created_at?: string
          departure_date?: string
          departure_time?: string
          destination?: string
          destination_lat?: number | null
          destination_lng?: number | null
          distance_km?: number | null
          driver_id?: string
          estimated_duration_minutes?: number | null
          id?: string
          money_saved_ars?: number | null
          origin?: string
          origin_lat?: number | null
          origin_lng?: number | null
          seats_available?: number
          status?: string
          updated_at?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trips_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          color: string
          created_at: string
          driver_id: string
          id: string
          license_plate: string
          model: string
          seats_available: number
          updated_at: string
        }
        Insert: {
          color: string
          created_at?: string
          driver_id: string
          id?: string
          license_plate: string
          model: string
          seats_available: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          driver_id?: string
          id?: string
          license_plate?: string
          model?: string
          seats_available?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      public_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_trip_savings: {
        Args: { seats_filled: number }
        Returns: {
          co2_saved_kg: number
          money_earned_per_passenger_ars: number
          money_saved_ars: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "driver" | "passenger" | "both"
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
      user_role: ["driver", "passenger", "both"],
    },
  },
} as const
