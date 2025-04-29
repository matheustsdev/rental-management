import { Database } from "@/types/supabase.types"; // Importe os tipos do Supabase

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createSupabaseEnum<T extends keyof Database["public"]["Enums"]>(enumName: T) {
  return new Proxy(
    {},
    {
      get: (_, prop: string) => prop,
    }
  ) as { [K in Database["public"]["Enums"][T]]: K };
}
