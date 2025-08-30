import { supabase } from "@/services/supabase";
import { Database } from "../supabase.types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


export type UpdateRentArgs = Database["public"]["Functions"]["update_full_rent"]["Args"];
export type UpdateRentReturn = Database["public"]["Functions"]["update_full_rent"]["Returns"];

export async function updateRent(args: UpdateRentArgs ): Promise<PostgrestSingleResponse<UpdateRentReturn>> {

    const response = await supabase.rpc("update_full_rent", args);

    return response;
}