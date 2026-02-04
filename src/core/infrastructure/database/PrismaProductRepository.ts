// src/core/infrastructure/repositories/PrismaProductRepository.ts
import { PrismaClient } from "@prisma/client";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { Product } from "@/core/domain/entities/Product";


export class PrismaProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) { }

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
}
