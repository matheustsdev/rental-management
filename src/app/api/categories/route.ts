import { NextRequest, NextResponse } from "next/server";
import { DefaultResponse } from "@/models/DefaultResponse";
import { prisma } from "@/services/prisma";
import { TableRow } from "@/types/EntityType";
import { ErrorResponse } from "@/models/ErrorResponse";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const where = searchParams.get("where") ? JSON.parse(searchParams.get("where")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof TableRow<"categories"> | undefined;
    const ascending = searchParams.get("ascending") !== "false";

    const start = (page - 1) * pageSize;

    const count = await prisma.categories.count();

    const paginatedCategories = await prisma.categories.findMany({
        skip: start,
        take: pageSize,
        orderBy: {
          [orderBy ?? "updated_at"]: ascending ? "asc" : "desc"
        },
        where,
        include: {
          _count: true
        }
    });
      
    const response = new DefaultResponse(paginatedCategories, "Busca de categorias concluída.", page, pageSize, count);

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const errorResponse = new ErrorResponse("Erro ao buscar categorias", 500, (error as Error).message);

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.errorCode }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newCategory = await prisma.categories.create({
      data
    })

    const response = new DefaultResponse(newCategory, "Categoria criada com suvesso", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const errorResponse = new ErrorResponse("Erro ao criar categoria", 500, (error as Error).message)

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.errorCode }
    );
  }
}