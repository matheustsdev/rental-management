import { PrismaClient, Prisma } from "@prisma/client";
import { ICategoryRepository, CategoryListInput } from "@/core/domain/repositories/ICategoryRepository";
import { CategoryType } from "@/types/entities/CategoryType";

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: Prisma.categoriesCreateInput): Promise<CategoryType> {
    return this.prisma.categories.create({
      data,
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async list(params?: CategoryListInput): Promise<CategoryType[]> {
    const { search, orderBy, ascending, page = 1, pageSize = 10 } = params || {};
    const skip = (page - 1) * pageSize;
    const orderDirection = ascending ? "asc" : "desc";
    const orderByKey = orderBy || "updated_at";

    const where: Prisma.categoriesWhereInput = {
      deleted: false,
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    return this.prisma.categories.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { [orderByKey]: orderDirection },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async update(id: string, data: Prisma.categoriesUpdateInput): Promise<CategoryType> {
    return this.prisma.categories.update({
      where: { id },
      data: {
        ...data,
        updated_at: new Date(),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findById(id: string): Promise<CategoryType | null> {
    return this.prisma.categories.findFirst({
      where: { id, deleted: false },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async findByName(name: string): Promise<CategoryType | null> {
    return this.prisma.categories.findFirst({
      where: { name, deleted: false },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  async count(where?: Prisma.categoriesWhereInput): Promise<number> {
    return this.prisma.categories.count({
      where: {
        ...where,
        deleted: false,
      },
    });
  }

  async delete(id: string): Promise<CategoryType> {
    return this.prisma.categories.update({
      where: { id },
      data: {
        deleted: true,
        deleted_at: new Date(),
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }
}
