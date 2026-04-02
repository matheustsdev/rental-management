import { NextRequest, NextResponse } from "next/server";
import { DefaultResponse } from "@/utils/models/DefaultResponse";
import { ErrorResponse } from "@/utils/models/ErrorResponse";
import { ServerError } from "@/utils/models/ServerError";
import { categoryRepository } from "@/core/infrastructure/repositoriesFactory";
import { GetCategoryUseCase } from "@/core/application/cases/category/GetCategoryUseCase";
import { UpdateCategoryUseCase } from "@/core/application/cases/category/UpdateCategoryUseCase";
import { DeleteCategoryUseCase } from "@/core/application/cases/category/DeleteCategoryUseCase";
import { UpdateCategorySchema } from "@/core/application/dtos/UpdateCategoryDTO";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const useCase = new GetCategoryUseCase(categoryRepository);
    const category = await useCase.execute(id);

    const response = new DefaultResponse(category, "Categoria encontrada.", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      return NextResponse.json(new ErrorResponse(error), { status: error.code || 500 });
    }

    return NextResponse.json(
      {
        error: "Erro ao obter categoria",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const validatedData = UpdateCategorySchema.parse({ ...body, id });

    const useCase = new UpdateCategoryUseCase(categoryRepository);
    const updatedCategory = await useCase.execute(validatedData);

    const response = new DefaultResponse(updatedCategory, "Categoria atualizada com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      return NextResponse.json(new ErrorResponse(error), { status: error.code || 500 });
    }
    
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
       return NextResponse.json({ error: "Erro de validação", details: error }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: "Erro ao atualizar categoria",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const useCase = new DeleteCategoryUseCase(categoryRepository);
    await useCase.execute(id);

    const response = new DefaultResponse(null, "Categoria excluída com sucesso.", null, null, null);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ServerError) {
      return NextResponse.json(new ErrorResponse(error), { status: error.code || 500 });
    }

    return NextResponse.json(
      {
        error: "Erro ao excluir categoria",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
