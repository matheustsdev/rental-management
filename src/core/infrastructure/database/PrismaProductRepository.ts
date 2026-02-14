// src/core/infrastructure/repositories/PrismaProductRepository.ts
import { availability_status, Prisma, PrismaClient } from "@prisma/client";
import { IProductRepository, ProductListInput } from "@/core/domain/repositories/IProductRepository";
import { Product } from "@/core/domain/entities/Product";
import { ProductType } from "@/types/entities/ProductType";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";
import { addDays, areIntervalsOverlapping } from "date-fns";


export class PrismaProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) { }

  async create(data: Prisma.productsCreateInput): Promise<ProductType> {
    return this.prisma.products.create({ data, include: { categories: true }});
  }

  async list(params: ProductListInput): Promise<ProductType[]> {
    const { where, orderBy, ascending, page = 1, pageSize = 10 } = params;
    const skip = (page - 1) * pageSize;
    const orderDirection = ascending ? "asc" : "desc";
    const orderByKey = orderBy || "updated_at";

    return this.prisma.products.findMany({
      where: {
        ...where,
        deleted: false
      },
      skip,
      take: pageSize,
      orderBy: {
        [orderByKey]: orderDirection,
      },
      include: {
        categories: true
      }
    });
  }

  async listWithAvailability(searchText: string, startDate: Date, endDate: Date): Promise<ProductAvailabilityType[]> {
    const products = await this.prisma.products.findMany({
      where: {
        deleted: false,
        OR: [
            {
              reference: {
                contains: searchText ?? "",
                mode: "insensitive"
              },
            },
            {
              description: {
                contains: searchText ?? "",
                mode: "insensitive"
              }
            }
          ]
      },
      orderBy: {
        reference: "desc",
      },
      include: {
        categories: true,
        rent_products: {
          where: {
            deleted: false
          },
          include: {
            rent: true,
          }
        }
      }
    });

    const productWithAvailability = products.map((product): ProductAvailabilityType => {
      const rentsDateBuferred = product.rent_products.map((rentProduct) => {
        const defaultBuffer = product.categories?.post_return_buffer_days ?? 0;
        const realBuffer = rentProduct.real_return_buffer_days ?? defaultBuffer;
        const rent = rentProduct.rent;
        const realReturnDate = addDays(new Date(rent.return_date), realBuffer);

        return {
          ...rent,
          rent_date: new Date(rent.rent_date),
          return_date: new Date(rent.return_date),
          return_with_buffer_date: realReturnDate,
        }
      });

      const sortedRentsDateBuferred = rentsDateBuferred.sort((a, b) => new Date(a.return_date).getTime() - new Date(b.return_date).getTime());
      const rentInUse = sortedRentsDateBuferred.find((rent) => areIntervalsOverlapping({ start: new Date(rent.rent_date), end: new Date(rent.return_with_buffer_date)}, { start: startDate, end: endDate }));

      let availability: availability_status = !rentInUse ? EAvailabilityStatus.AVAILABLE : EAvailabilityStatus.UNAVAILABLE;

      if (rentInUse) {
        const isOnBufferPeriod = areIntervalsOverlapping({ start: new Date(rentInUse.return_date), end: new Date(rentInUse.return_with_buffer_date) }, { start: startDate, end: endDate });

        if (isOnBufferPeriod) {
          availability = EAvailabilityStatus.BUFFER_OCCUPIED;
        }
      }


      return {
        ...product,
        availability
      }
    });

    return productWithAvailability;
  }

  async update(id: string, data: Prisma.productsUpdateInput): Promise<ProductType> {
    return this.prisma.products.update({
      where: { id },
      data,
      include: { categories: true }
    });
  }

  async findById(id: string): Promise<Product | null> {
    // 1. Busca no banco incluindo a relação com categories
    const prismaProduct = await this.prisma.products.findUnique({
      where: { id },
      include: {
        categories: true // <--- JOIN para pegar o buffer_days
      }
    });

    if (!prismaProduct) {
      return null;
    }

    // 2. Lógica de Mapeamento (Adapter)
    // O banco tem tabelas separadas, mas a Entidade é um objeto único.
    // Se a categoria for nula ou o buffer for nulo, assumimos 0.
    const bufferDays = prismaProduct.categories?.post_return_buffer_days ?? 0;

    // 3. Retorna a Entidade de Domínio
    return new Product(
      prismaProduct.id,
      prismaProduct.reference,
      prismaProduct.description,
      Number(prismaProduct.price), // Prisma Decimal -> JS Number
      bufferDays
    );
  }

  async count(where?: Prisma.productsWhereInput): Promise<number> {
    return this.prisma.products.count({ where });
  }
}
