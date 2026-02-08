// src/core/infrastructure/repositories/PrismaProductRepository.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { IProductRepository, ProductListInput } from "@/core/domain/repositories/IProductRepository";
import { Product } from "@/core/domain/entities/Product";
import { ProductType } from "@/types/entities/ProductType";
import { ProductAvailabilityType } from "@/types/ProductAvailabilityType";
import { EAvailabilityStatus } from "@/constants/EAvailabilityStatus";


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
      where,
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

  // async listWithAvailability(params: ProductListInput, startDate: Date, endDate: Date): Promise<ProductType[]> {
  //   const { where, orderBy, ascending, page = 1, pageSize = 10 } = params;
  //   const skip = (page - 1) * pageSize;
  //   const orderDirection = ascending ? "asc" : "desc";
  //   const orderByKey = orderBy || "updated_at";

  //   const products = await this.prisma.products.findMany({
  //     where,
  //     skip,
  //     take: pageSize,
  //     orderBy: {
  //       [orderByKey]: orderDirection,
  //     },
  //     include: {
  //       categories: true,
  //       rent_products: {
  //         where: {
  //           deleted: false,
  //           OR: [
  //             {
  //               AND: [
  //                 {
  //                   actual_return_date: { not: null }
  //                 },
  //                 {
  //                   actual_return_date: { gte: new Date() }
  //                 }
  //               ]
  //             },
  //             {
  //               rents: {
  //                 return_date: {
  //                   gte: new Date()
  //                 }
  //               }
  //             }
  //           ]
  //         }
  //       }
  //     }
  //   });

  //   const productWithAvailability = products.map((product): ProductAvailabilityType => {
  //     const isAvailable = product.rent_products.length === 0;

  //     return {
  //       ...product,  
  //       current_rent_id: rentInUse?.id ?? null,
  //       actual_return_date: rentInUse?.return_date ?? null,
  //       availability: isAvailable ? EAvailabilityStatus.AVAILABLE : EAvailabilityStatus.UNAVAILABLE,
  //       buffer_end_date: rentProduct?.actual_return_buffer_days ? new Date(rentProduct?.actual_return_buffer_days) : null,
  //       current_rent_return_date: rentInUse?.return_date ? new Date(rentInUse.return_date) : null
  //     }
  //   });

  //   return productWithAvailability;
  // }

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
