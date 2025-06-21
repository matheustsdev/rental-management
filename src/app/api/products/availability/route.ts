import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/services/supabase";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");

    const { data, error } = await supabase.rpc("get_products_with_availability", {
      p_start_date: startDate ? new Date(startDate) : new Date(),
      p_end_date: endDate ? new Date(endDate) : new Date(),
    });

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar produtos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
