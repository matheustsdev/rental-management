import { NextRequest, NextResponse } from "next/server";
import { RentInsertDtoWithProduct, RentUpdateDtoWithProduct } from "@/types/entities/RentType";
import { DefaultResponse } from "@/models/DefaultResponse";
import { prisma } from "@/services/prisma";
import { ProductType } from "@/types/entities/ProductType";

export async function GET(request: NextRequest) {
  try {

    const searchParams = request.nextUrl.searchParams;

    const where = searchParams.get("where") ? JSON.parse(searchParams.get("where")!) : undefined;

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const orderBy = searchParams.get("orderBy") as keyof ProductType | undefined;
    const ascending = searchParams.get("ascending") !== "false";

    const start = (page - 1) * pageSize;

    const count = await prisma.rents.count();

    const paginatedRents = await prisma.rents.findMany({
        skip: start,
        take: pageSize,
        orderBy: {
          [orderBy ?? "updated_at"]: ascending ? "asc" : "desc"
        },
        where,
        include: {
          rent_products: {
            include: {
              products: true
            }
          }
        }
    });

    return NextResponse.json(new DefaultResponse(paginatedRents, "Busca de alugueis concluída.", page, pageSize, count), { status: 200 })
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

    const newRent = await prisma.rents.create({
      data: body,
      include: {
          rent_products: {
            include: {
              products: true
            }
          }
        }
    });
  
    // await prisma.$transaction(async (tx) => {


    // });


    // const { data: rentId, error } = await createRent(createRentDTO);

    // if (error) throw error;

    // const newProduct = await rentService.findById(rentId, {
    //   rent_products: {
    //     foreignKey: "rent_id",
    //     table: "rent_products",
    //   },
    // });
  
    const response = new DefaultResponse(newRent, "Aluguel criado com sucesso", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const errorResponse = new DefaultResponse(null, `Erro ao criar aluguel >> ${(error as Error).message}`, null, null, null);

    return NextResponse.json(
      errorResponse,
      { status: 400 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = (await request.json()) as RentUpdateDtoWithProduct;

    if (!body.id) throw new Error("É obrigatório informar o ID do aluguel para atualiza-lo")

    const updatedRent = await prisma.rents.update({
      data: body,
      where: {
        id: body.id.toString()
      },
      include: {
          rent_products: {
            include: {
              products: true
            }
          }
        }
    });

    const response = new DefaultResponse(updatedRent, "Aluguel atualizado com sucesso", null, null, null);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const errorResponse = new DefaultResponse(null, `Erro ao atualizar aluguel >> ${(error as Error).message}`, null, null, null);

    return NextResponse.json(
      errorResponse,
      { status: 400 }
    );
  }
}

