import { NextRequest, NextResponse } from "next/server";
import { IncludeConfigType } from "@/services/crud/baseCrudService";
import { TableRow } from "@/types/EntityType";
import { productService } from "@/services/crud/productService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = searchParams.get("filters") ? JSON.parse(searchParams.get("filters")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof TableRow<"products"> | undefined;
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

    const result = await productService.find(filters, {
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
        error: "Erro ao buscar produtos",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newProduct = await productService.create(data);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao criar produto",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
