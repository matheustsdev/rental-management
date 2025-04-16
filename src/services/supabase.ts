import { createClient } from "@supabase/supabase-js";

export function createBackendSupabaseClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
}

export const supabase = createBackendSupabaseClient();
