import { NextRequest, NextResponse } from "next/server";
import { CategoryType } from "@/types/entities/CategoryType";
import { categoryService } from "@/services/crud/categoryService";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = searchParams.get("filters") ? JSON.parse(searchParams.get("filters")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof CategoryType | undefined;
    const ascending = searchParams.get("ascending") !== "false";

    const result = await categoryService.find(filters, {
      page,
      pageSize,
      orderBy,
      ascending,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao buscar categorias",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newCategory = await categoryService.create(data);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erro ao criar categoria",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 400 }
    );
  }
}
