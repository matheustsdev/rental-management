import { NextRequest, NextResponse } from "next/server";
import { InjectRelations, TableRow } from "@/types/EntityType";
import { prisma } from "@/services/prisma";
import { DefaultResponse } from "@/models/DefaultResponse";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ErrorResponse } from "@/models/ErrorResponse";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof TableRow<"products"> | undefined;
    const ascending = searchParams.get("ascending") !== "false";
    const includes = searchParams.getAll("include[]") as (keyof InjectRelations<"products">)[];

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
        where: {
          OR: [
            {
              reference: {
                contains: search ?? "",
                mode: "insensitive"
              },
            },
            {
              description: {
                contains: search ?? "",
                mode: "insensitive"
              }
            }
          ]
        },
        include: includeObject
    });

    const response = new DefaultResponse(paginatedProducts, "Busca de produtos concluída.", page, pageSize, count);

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const errorResponse = new ErrorResponse("Erro ao buscar produtos", 500, (error as Error).message)

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.errorCode }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newProduct = await prisma.products.create({
      data
    })

    const response = new DefaultResponse(newProduct, "Produto criado com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const errorResponse = new ErrorResponse("Erro ao criar produto.", 500, (error as Error).message)

    return NextResponse.json(
      errorResponse,
      { status: errorResponse.errorCode }
    );
  }
}