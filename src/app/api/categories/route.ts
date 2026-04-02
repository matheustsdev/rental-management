import { NextRequest, NextResponse } from "next/server";
import { DefaultResponse } from "@/utils/models/DefaultResponse";
import { ErrorResponse } from "@/utils/models/ErrorResponse";
import { ServerError } from "@/utils/models/ServerError";
import { categoryRepository } from "@/core/infrastructure/repositoriesFactory";
import { ListCategoryUseCase } from "@/core/application/cases/category/ListCategoryUseCase";
import { CreateCategoryUseCase } from "@/core/application/cases/category/CreateCategoryUseCase";
import { CreateCategorySchema } from "@/core/application/dtos/CreateCategoryDTO";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const search = searchParams.get("search") ?? undefined;
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") || undefined;
    const ascending = searchParams.get("ascending") !== "false";

    const useCase = new ListCategoryUseCase(categoryRepository);

    const { data, count } = await useCase.execute({
      search,
      page,
      pageSize,
      orderBy,
      ascending,
    });

    const response = new DefaultResponse(data, "Busca de categorias concluída.", page, pageSize, count);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      return NextResponse.json(new ErrorResponse(error), { status: error.code || 500 });
    }

    return NextResponse.json(
      {
        error: "Erro ao listar categorias",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateCategorySchema.parse(body);

    const useCase = new CreateCategoryUseCase(categoryRepository);
    const newCategory = await useCase.execute(validatedData);

    const response = new DefaultResponse(newCategory, "Categoria criada com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof ServerError) {
      return NextResponse.json(new ErrorResponse(error), { status: error.code || 500 });
    }
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
       return NextResponse.json({ error: "Erro de validação", details: error }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Erro ao criar categoria",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}