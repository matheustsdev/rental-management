import { NextRequest, NextResponse } from "next/server";
import { IncludeConfigType } from "@/services/crud/baseCrudService";
import { TableRow } from "@/types/EntityType";
import { rentService } from "@/services/crud/rentService";
import { supabase } from "@/services/supabase";
import { RentInsertDtoWithProduct } from "@/types/entities/RentType";
import { EDiscountTypes } from "@/constants/EDiscountType";

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
        include = Object.entries(includeConfig).reduce((acc, [alias, config]) => {
          return {
            ...acc,
            [alias]: {
              table: config.table,
              foreignKey: config.foreignKey,
              fields: config.fields,
            },
          };
        }, {});
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
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RentInsertDtoWithProduct;

    const getDiscountTypeEnum = () => {
      if (!body.discount_type) return null;

      if (body.discount_type === EDiscountTypes.FIXED) return EDiscountTypes.FIXED;

      return EDiscountTypes.PERCENTAGE;
    };

    const { data: rentId, error } = await supabase.rpc("create_rent_with_products", {
      p_client_name: body.client_name,
      p_rent_date: body.rent_date,
      p_total_value: body.total_value,
      p_discount_value: body.discount_value,
      p_discount_type: getDiscountTypeEnum(),
      p_internal_observations: body.internal_observations,
      p_receipt_observations: body.receipt_observations,
      p_remaining_value: body.remaining_value,
      p_return_date: body.return_date,
      p_signal_value: body.signal_value,
      p_address: body.address,
      p_phone: body.phone,
      p_product_ids: body.productIds,
    });

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
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
