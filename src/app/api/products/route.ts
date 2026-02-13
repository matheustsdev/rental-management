import { NextRequest, NextResponse } from "next/server";
import { TableRow } from "@/types/EntityType";
import { DefaultResponse } from "@/utils/models/DefaultResponse";
import { ErrorResponse } from "@/utils/models/ErrorResponse";
import { ListProductUseCase, ListProductUseCaseInputType } from "@/core/application/cases/product/ListProductUseCase";
import { productRepository } from "@/core/infrastructure/repositoriesFactory";
import { ServerError } from "@/utils/models/ServerError";
import { ProductInsertDtoType, ProductUpdateDtoType } from "@/types/entities/ProductType";
import { CreateProductlUseCase } from "@/core/application/cases/product/CreateProductUseCase";
import { UpdateProductUseCase } from "@/core/application/cases/product/UpdateProductUseCase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search");
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof TableRow<"products"> | undefined;
    const ascending = searchParams.get("ascending") !== "false";

    const listUseCaseInput: ListProductUseCaseInputType = {
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
      page,
      pageSize,
      orderBy,
      ascending
    };

    const useCase = new ListProductUseCase(productRepository);

    const { data, count } = await useCase.execute(listUseCaseInput);

    const response = new DefaultResponse(data, "Busca de produtos concluída.", page, pageSize, count);

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
      if (error instanceof ServerError) {
         const errorResponse = new ErrorResponse(error);
   
         return NextResponse.json(errorResponse);
       }
   
       return NextResponse.json(
         {
           error: "Erro ao listar produtos",
           details: error instanceof Error ? error.message : error,
         },
         { status: 500 }
       );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as ProductUpdateDtoType;
  
    const useCase = new UpdateProductUseCase(productRepository);
    const updatedProduct = await useCase.execute(body);
  
    const response = new DefaultResponse(updatedProduct, "Produto atualizado com sucesso.", null, null, null);
  
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      const errorResponse = new ErrorResponse(error);

      return NextResponse.json(errorResponse);
    }

    return NextResponse.json(
      {
        error: "Erro ao atualizar produto",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ProductInsertDtoType;

    const useCase = new CreateProductlUseCase(productRepository);
    const newProduct = await useCase.execute(body);

    const response = new DefaultResponse(newProduct, "Produto criado com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof ServerError) {
      const errorResponse = new ErrorResponse(error);

      return NextResponse.json(errorResponse);
    }

    return NextResponse.json(
      {
        error: "Erro ao criar produto",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}