import { ERentStatus, Prisma, PrismaClient } from "@prisma/client";
import { IRentalRepository, RentalListInput } from "@/core/domain/repositories/IRentalRepository";
import { RentReturnDTO } from "@/core/application/cases/rent/RentReturnUseCase";
import { getUTCDateFromInput } from "@/utils/getUTCDateFromInput";
import { subDays } from "date-fns";
import { MeasureType } from "@/constants/EMeasureType";
import { Rent } from "@/core/domain/entities/Rent";
import { RentProduct } from "@/core/domain/entities/RentProduct";

type PrismaRentWithRelations = Prisma.rentsGetPayload<{
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
}>;

export class PrismaRentalRepository implements IRentalRepository {
  constructor(private prisma: PrismaClient) { }

  private mapToEntity(prismaRent: PrismaRentWithRelations): Rent {
    const items = prismaRent.rent_products.map(rp => new RentProduct({
      id: rp.id,
      productId: rp.product_id,
      productPrice: Number(rp.product_price),
      productDescription: rp.product_description,
      measureType: rp.measure_type as MeasureType,
      bust: rp.bust ? Number(rp.bust) : null,
      waist: rp.waist ? Number(rp.waist) : null,
      hip: rp.hip ? Number(rp.hip) : null,
      shoulder: rp.shoulder ? Number(rp.shoulder) : null,
      sleeve: rp.sleeve ? Number(rp.sleeve) : null,
      height: rp.height ? Number(rp.height) : null,
      back: rp.back ? Number(rp.back) : null,
      realReturnDate: rp.real_return_date,
      realReturnBufferDays: rp.real_return_buffer_days,
      product: rp.products ? {
        reference: rp.products.reference,
        categories: rp.products.categories ? {
          name: rp.products.categories.name
        } : null
      } : null
    }));

    return new Rent({
      id: prismaRent.id,
      code: Number(prismaRent.code),
      status: prismaRent.status,
      rentDate: prismaRent.rent_date,
      returnDate: prismaRent.return_date,
      clientName: prismaRent.client_name,
      address: prismaRent.address,
      phone: prismaRent.phone,
      discountType: prismaRent.discount_type,
      discountValue: Number(prismaRent.discount_value),
      signalValue: Number(prismaRent.signal_value),
      internalObservations: prismaRent.internal_observations,
      receiptObservations: prismaRent.receipt_observations,
      items,
      createdAt: prismaRent.created_at,
      realReturnDate: prismaRent.real_return_date
    });
  }

  async create(rent: Rent): Promise<Rent> {
    const data = rent.toJSON();
    
    const newRent = await this.prisma.rents.create({
      data: {
        id: data.id,
        status: data.status,
        rent_date: data.rentDate,
        return_date: data.returnDate,
        client_name: data.clientName,
        address: data.address,
        phone: data.phone,
        discount_type: data.discountType,
        discount_value: new Prisma.Decimal(data.discountValue),
        signal_value: new Prisma.Decimal(data.signalValue),
        internal_observations: data.internalObservations,
        receipt_observations: data.receiptObservations,
        total_value: new Prisma.Decimal(rent.getTotalValue()),
        remaining_value: new Prisma.Decimal(rent.getRemainingValue()),
        real_return_date: data.realReturnDate,
        rent_products: {
          createMany: {
            data: data.items.map(item => ({
              product_id: item.productId,
              product_price: new Prisma.Decimal(item.productPrice),
              product_description: item.productDescription,
              measure_type: item.measureType,
              bust: item.bust != null ? new Prisma.Decimal(item.bust) : null,
              waist: item.waist != null ? new Prisma.Decimal(item.waist) : null,
              hip: item.hip != null ? new Prisma.Decimal(item.hip) : null,
              shoulder: item.shoulder != null ? new Prisma.Decimal(item.shoulder) : null,
              sleeve: item.sleeve != null ? new Prisma.Decimal(item.sleeve) : null,
              height: item.height != null ? new Prisma.Decimal(item.height) : null,
              back: item.back != null ? new Prisma.Decimal(item.back) : null,
            }))
          }
        }
      },
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

    return this.mapToEntity(newRent as PrismaRentWithRelations);
  }

  async list(params: RentalListInput): Promise<Rent[]> {
    const { search, status, startDate, endDate, orderBy, ascending, page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    const orderDirection = ascending ? "asc" : "desc";
    const orderByKey = orderBy || "updated_at";

    const where: Prisma.rentsWhereInput = {
      deleted: false,
    };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.rent_date = {};
      if (startDate) {
        where.rent_date.gte = startDate;
      }
      if (endDate) {
        where.rent_date.lte = endDate;
      }
    }

    if (search) {
      const searchTerm = `%${search}%`;
      const matchedRents = await this.prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM rents
        WHERE (
          unaccent("client_name") ILIKE unaccent(${searchTerm})
          OR unaccent("address") ILIKE unaccent(${searchTerm})
          OR unaccent("phone") ILIKE unaccent(${searchTerm})
        )
      `;
      const ids = matchedRents.map((rent) => rent.id);
      where.id = { in: ids };
    }

    const rents = await this.prisma.rents.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        [orderByKey]: orderDirection,
      },
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

    return rents.map(r => this.mapToEntity(r as PrismaRentWithRelations));
  }

  async update(id: string, rent: Rent): Promise<Rent> {
    const data = rent.toJSON();

    const updatedRent = await this.prisma.rents.update({
      where: { id },
      data: {
        status: data.status,
        rent_date: data.rentDate,
        return_date: data.returnDate,
        client_name: data.clientName,
        address: data.address,
        phone: data.phone,
        discount_type: data.discountType,
        discount_value: new Prisma.Decimal(data.discountValue),
        signal_value: new Prisma.Decimal(data.signalValue),
        internal_observations: data.internalObservations,
        receipt_observations: data.receiptObservations,
        total_value: new Prisma.Decimal(rent.getTotalValue()),
        remaining_value: new Prisma.Decimal(rent.getRemainingValue()),
        real_return_date: data.realReturnDate,
        // Se a lista de produtos na entidade for diferente da do banco (gerenciada pelo UseCase que chama deleteRentProducts),
        // o use case deve garantir a limpeza. O repositório aqui apenas cria os novos se necessário.
        rent_products: {
          createMany: {
            data: data.items.map(item => ({
              product_id: item.productId,
              product_price: new Prisma.Decimal(item.productPrice),
              product_description: item.productDescription,
              measure_type: item.measureType,
              bust: item.bust != null ? new Prisma.Decimal(item.bust) : null,
              waist: item.waist != null ? new Prisma.Decimal(item.waist) : null,
              hip: item.hip != null ? new Prisma.Decimal(item.hip) : null,
              shoulder: item.shoulder != null ? new Prisma.Decimal(item.shoulder) : null,
              sleeve: item.sleeve != null ? new Prisma.Decimal(item.sleeve) : null,
              height: item.height != null ? new Prisma.Decimal(item.height) : null,
              back: item.back != null ? new Prisma.Decimal(item.back) : null,
            }))
          }
        }
      },
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
      
    return this.mapToEntity(updatedRent as PrismaRentWithRelations);
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

  async find(id: string): Promise<Rent | null> {
    const rent = await this.prisma.rents.findUnique({
      where: { id, deleted: false },
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

    if (!rent) return null;

    return this.mapToEntity(rent as PrismaRentWithRelations);
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

  async findActiveByProduct(productId: string, excludeRentId?: string): Promise<Rent[]> {
    const where: Prisma.rentsWhereInput = {
      rent_products: {
        some: {
          product_id: productId,
          deleted: false,
        },
      },
      deleted: false,
    };

    if (excludeRentId) {
      where.id = {
        not: excludeRentId,
      };
    }

    const rents = await this.prisma.rents.findMany({
      where,
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

    return rents.map(r => this.mapToEntity(r as PrismaRentWithRelations));
  }

  async count(params: RentalListInput): Promise<number> {
    const { search, status, startDate, endDate, orderBy, ascending, page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    const orderDirection = ascending ? "asc" : "desc";
    const orderByKey = orderBy || "updated_at";

    const where: Prisma.rentsWhereInput = {
      deleted: false,
    };

    if (status) {
      where.status = status;
    }

    if (startDate || endDate) {
      where.rent_date = {};
      if (startDate) {
        where.rent_date.gte = startDate;
      }
      if (endDate) {
        where.rent_date.lte = endDate;
      }
    }

    if (search) {
      const searchTerm = `%${search}%`;
      const matchedRents = await this.prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM rents
        WHERE (
          unaccent("client_name") ILIKE unaccent(${searchTerm})
          OR unaccent("address") ILIKE unaccent(${searchTerm})
          OR unaccent("phone") ILIKE unaccent(${searchTerm})
        )
      `;
      const ids = matchedRents.map((rent) => rent.id);
      where.id = { in: ids };
    }

    return this.prisma.rents.count({ 
      where,
      skip,
      take: pageSize,
      orderBy: {
        [orderByKey]: orderDirection,
      }
    });
  }

  async returnRent(rentReturn: RentReturnDTO): Promise<Rent> {
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
            products: {
              include: {
                categories: true,
              },
            },
          },
        },
      },
    });

    const results = await this.prisma.$transaction([
      ...updateRentProductsQueries,
      updateRentQuery,
    ]);

    return this.mapToEntity(results[results.length - 1] as PrismaRentWithRelations);
  }

  async findOverlappingRents(productId: string, startDate: Date, endDate: Date): Promise<Rent[]> {
    const marginStartDate = subDays(startDate, 30);

    const rents = await this.prisma.rents.findMany({
      where: {
        deleted: false,
        rent_products: {
          some: {
            product_id: productId,
            deleted: false,
          },
        },
        rent_date: {
          lte: endDate,
        },
        OR: [
          { status: { not: ERentStatus.FINISHED } },
          { real_return_date: { gte: marginStartDate } },
          { return_date: { gte: marginStartDate } }
        ]
      },
      orderBy: {
        rent_date: 'asc',
      },
      include: {
        rent_products: {
          include: {
            products: {
              include: {
                categories: true
              }
            }
          }
        },
      },
    });

    return rents.map(r => this.mapToEntity(r as PrismaRentWithRelations));
  }
}
