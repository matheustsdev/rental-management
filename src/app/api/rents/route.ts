import { NextRequest, NextResponse } from "next/server";
import { IncludeConfigType } from "@/services/crud/baseCrudService";
import { TableRow } from "@/types/EntityType";
import { rentService } from "@/services/crud/rentService";
import { RentInsertDtoWithProduct, RentUpdateDtoWithProduct } from "@/types/entities/RentType";
import { Database } from "@/types/supabase.types";
import { RentProductMeasuresUpdateDtoType } from "@/types/entities/RentProductMeasuresTypes";
import { updateRent, UpdateRentArgs } from "@/types/dbFunctions/updateRent";
import { createRent, CreateRentArgs } from "@/types/dbFunctions/createRent";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = searchParams.get("filters") ? JSON.parse(searchParams.get("filters")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof TableRow<"rents"> | undefined;
    const ascending = searchParams.get("ascending") !== "false";

    let include;
    const includeParam = searchParams.get("include");
    if (includeParam) {
      try {
        // Parse include configuration from JSON string
        const includeConfig: IncludeConfigType = JSON.parse(includeParam);
        include = includeConfig; // Simplificado: usa o objeto parsed diretamente
      } catch (parseError) {
        return NextResponse.json(
          { error: "Invalid include configuration", details: String(parseError) },
          { status: 400 }
        );
      }
    }

    const result = await rentService.find(filters, {
      page,
      pageSize,
      orderBy,
      ascending,
      include,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar alugueis",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RentInsertDtoWithProduct;

    // Conversão direta usando a tipagem do Supabase
    const discountType = body.discount_type 
      ? body.discount_type as Database['public']['Enums']['discount_type_enum'] 
      : null;

    const rentProducts = body.rent_products.map((item) => ({
      ...item,
      rent_id: null,
      id: null,
      product_measures: {
        ...item.product_measures,
        rent_product_fk: null
      }
    }))

    const createRentDTO: CreateRentArgs = {
      p_address: body.address ?? "",
      p_client_name: body.client_name ?? "",
      p_discount_value: body.discount_value ?? 0,
      p_discount_type: discountType ?? "FIXED", 
      p_internal_observations: body.internal_observations ?? "",
      p_products: rentProducts,
      p_receipt_observations: body.receipt_observations ?? "",
      p_remaining_value: body.remaining_value ?? 0,
      p_rent_date: body.rent_date ?? "",
      p_return_date: body.return_date ?? "",
      p_signal_value: body.signal_value ?? 0,
      p_total_value: body.total_value ?? "",
    };

    const { data: rentId, error } = await createRent(createRentDTO);

    if (error) throw error;

    const newProduct = await rentService.findById(rentId, {
      rent_products: {
        foreignKey: "rent_id",
        table: "rent_products",
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao criar aluguel",
        details: error instanceof Error ? error.message : error,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as RentUpdateDtoWithProduct;

    const discountType = body.discount_type 
      ? body.discount_type as Database['public']['Enums']['discount_type_enum'] 
      : null;

    const productMeasures: RentProductMeasuresUpdateDtoType[] = body.rent_products.map((item) => ({
      back: item.product_measures.back,
      bust: item.product_measures.bust,
      height: item.product_measures.height,
      hip: item.product_measures.hip,
      shoulder: item.product_measures.shoulder,
      sleeve: item.product_measures.sleeve,
      waist: item.product_measures.waist
    }));
    
    console.log("Body >> ", body);

    const updateRentDTO: UpdateRentArgs = {
      p_client_name: body.client_name ?? "",
      p_rent_date: body.rent_date ?? "",
      p_total_value: body.total_value ?? 0,
      p_discount_value: body.discount_value ?? 0,
      p_discount_type: discountType ?? "", 
      p_internal_observations: body.internal_observations ?? "",
      p_receipt_observations: body.receipt_observations ?? "",
      p_remaining_value: body.remaining_value ?? 0,
      p_return_date: body.return_date ?? "",
      p_signal_value: body.signal_value ?? 0,
      p_address: body.address ?? "",
      p_phone: body.phone ?? "",
      p_product_ids: body.rent_products.map((item) => item.product_id ?? ""),
      p_product_measures: productMeasures,
      p_rent_id: body.id ?? "",
      p_rent_product_ids: body.rent_products.map((item) => item.id ?? ""),
    };

    console.log("Update DTO >> ", updateRentDTO);

    const { error } = await updateRent(updateRentDTO);

    if (error) throw error;

    const newProduct = await rentService.findById(body.id ?? "", {
      rent_products: {
        foreignKey: "rent_id",
        table: "rent_products",
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao criar aluguel",
        details: error instanceof Error ? error.message : error,
      },
      { status: 400 }
    );
  }
}

