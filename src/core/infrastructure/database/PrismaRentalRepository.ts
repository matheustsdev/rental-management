// src/core/infrastructure/prisma/PrismaRentalRepository.ts
import { ERentStatus, Prisma, PrismaClient } from "@prisma/client";
import { IRentalRepository, RentalListInput } from "@/core/domain/repositories/IRentalRepository";
import { Rental } from "../../domain/entities/Rental";
import { RentType } from "@/types/entities/RentType";
import { RentReturnDTO } from "@/core/application/cases/rent/RentReturnUseCase";
import { getUTCDateFromInput } from "@/utils/getUTCDateFromInput";

export class PrismaRentalRepository implements IRentalRepository {
  constructor(private prisma: PrismaClient) { }

  async create(data: Prisma.rentsCreateInput): Promise<RentType> {
    const newRent: RentType = await this.prisma.rents.create({
      data,
      include: {
        rent_products: {
          include: {
            products: true,
          },
        },
      },
    });

    return newRent;
  }

  async list(params: RentalListInput): Promise<RentType[]> {
    const { search, orderBy, ascending, page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    const orderDirection = ascending ? "asc" : "desc";
    const orderByKey = orderBy || "updated_at";

    if (!search) {
      return this.prisma.rents.findMany({
            where: {
              deleted: false,
            },
            skip,
            take: pageSize,
            orderBy: {
              [orderByKey]: orderDirection,
            },
            include: {
              rent_products: {
                include: { products: true },
              },
            },
      });
    }

    const searchTerm = `%${search}%`;
    const matchedRents = await this.prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM rents
      WHERE (
        unaccent("client_name") ILIKE unaccent(${searchTerm})
        OR unaccent("address") ILIKE unaccent(${searchTerm})
        OR unaccent("phone") ILIKE unaccent(${searchTerm})
      )
      AND "deleted" = false
    `;

    const ids = matchedRents.map((rent) => rent.id);

    return this.prisma.rents.findMany({
            where: {
              id: { in: ids },
            },
            skip,
            take: pageSize,
            orderBy: {
              [orderByKey]: orderDirection,
            },
            include: {
              rent_products: {
                include: { products: true },
              },
            },
      });

    
  }

  async update(id: string, data: Prisma.rentsUpdateInput): Promise<RentType> {
    const updatedRent = await this.prisma.rents.update({
      where: { id },
      data,
      include: {
        rent_products: {
          include: {
            products: true,
          },
        },
      },
    });
      
    return updatedRent;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.rents.update({
        where: { id },
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      }),
      this.prisma.rent_products.updateMany({
        where: { rent_id: id },
        data: {
          deleted: true,
          deleted_at: new Date(),
        },
      }),
    ]);
  }

  async find(id: string) {
    const rent = await this.prisma.rents.findUnique({
      where: { id },
      include: {
        rent_products: {
          include: {
            products: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });

    return rent;
  }

  async deleteRentProducts(rentId: string): Promise<void> {
    await this.prisma.rent_products.updateMany({
      where: { rent_id: rentId },
      data: {
        deleted: true,
        deleted_at: new Date(),
      },
    });
  }

  async findActiveByProduct(productId: string, excludeRentId?: string): Promise<Rental[]> {
    const where: Prisma.rentsWhereInput = {
      // Busca aluguéis que contenham o produto especificado
      rent_products: {
        some: {
          product_id: productId,
          deleted: false,
        },
      },
      // E que não estejam marcados como deletados (nosso análogo a 'CANCELADO')
      deleted: false,
    };

    if (excludeRentId) {
      where.id = {
        not: excludeRentId,
      };
    }

    // A query correta busca em 'rents' e filtra pela tabela relacional 'rent_products'
    const rentRows = await this.prisma.rents.findMany({
      where,
    });

    // Mapeia as linhas do banco de dados para a nossa Entidade de Domínio (Rental)
    return rentRows.map((row) => {
      // Para a checagem de disponibilidade, consideramos 'deleted: false' como 'ACTIVE'.
      // Uma lógica mais complexa poderia diferenciar 'ACTIVE' de 'RETURNED' com base na data.
      const status = "ACTIVE";

      // A entidade de domínio `Rental` espera uma `endDate`. O schema do banco
      // permite `return_date` nulo, o que pode causar inconsistências.
      if (!row.return_date) {
        // É uma boa prática lançar um erro aqui para sinalizar dados inconsistentes.
        throw new Error(
          `Dado inconsistente: O aluguel com ID ${row.id} não possui data de devolução.`
        );
      }

      return new Rental(
        row.id,
        productId, // O contexto da busca é por este produto
        row.rent_date,
        row.return_date,
        status
      );
    });
  }

  async count(where?: Prisma.rentsWhereInput): Promise<number> {
    return this.prisma.rents.count({ where });
  }

  async returnRent(rentReturn: RentReturnDTO): Promise<RentType> {
    const { id, rentProducts } = rentReturn;
    const returnDate = getUTCDateFromInput(new Date());

    const updateRentProductsQueries = rentProducts.map((rp) =>
      this.prisma.rent_products.update({
        where: { id: rp.id },
        data: {
          real_return_date: returnDate,
          real_return_buffer_days: rp.realBuffer,
        },
      })
    );

    const updateRentQuery = this.prisma.rents.update({
      where: { id },
      data: {
        real_return_date: returnDate,
        status: ERentStatus.FINISHED
      },
      include: {
        rent_products: {
          include: {
            products: true,
          },
        },
      },
    });

    const results = await this.prisma.$transaction([
      ...updateRentProductsQueries,
      updateRentQuery,
    ]);

    return results[results.length - 1] as RentType;
  }
}
