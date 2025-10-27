import { NextRequest, NextResponse } from "next/server";
import { InjectRelations, TableRow } from "@/types/EntityType";
import { prisma } from "@/services/prisma";
import { DefaultResponse } from "@/models/DefaultResponse";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const where = searchParams.get("where") ? JSON.parse(searchParams.get("where")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof TableRow<"products"> | undefined;
    const ascending = searchParams.get("ascending") !== "false";
    const includes = searchParams.getAll("include") as (keyof InjectRelations<"products">)[];

    const start = (page - 1) * pageSize;

    const count = await prisma.products.count();

    const includeObject: Prisma.productsInclude<DefaultArgs> = {};

    includes.forEach((include) => {
      includeObject[include] = true
    });

    const paginatedProducts = await prisma.products.findMany({
        skip: start,
        take: pageSize,
        orderBy: {
          [orderBy ?? "updated_at"]: ascending ? "asc" : "desc"
        },
        where,
        include: includeObject
    });

    const response = new DefaultResponse(paginatedProducts, "Busca de produtos concluída.", page, pageSize, count);

    return NextResponse.json(response, { status: 200 })
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

    const newProduct = await prisma.products.create({
      data
    })

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
