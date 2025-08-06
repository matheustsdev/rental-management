import { Database } from "@/types/supabase.types";
import { createClient } from "@supabase/supabase-js";

export function createBackendSupabaseClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
}

export const supabase = createBackendSupabaseClient();
