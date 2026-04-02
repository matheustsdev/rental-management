import { Prisma } from "@prisma/client";

export type CategoryType = Prisma.categoriesGetPayload<{
  include: {
    _count: {
      select: { products: true };
    };
  };
}>;
