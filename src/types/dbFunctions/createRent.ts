import { supabase } from "@/services/supabase";
import { Database } from "../supabase.types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


export type CreateRentArgs = Database["public"]["Functions"]["create_full_rent"]["Args"];
export type CreateRentReturn = Database["public"]["Functions"]["create_full_rent"]["Returns"];

export async function createRent(args: CreateRentArgs ): Promise<PostgrestSingleResponse<CreateRentReturn>> {

    const response = await supabase.rpc("create_full_rent", args);

    return response;
}