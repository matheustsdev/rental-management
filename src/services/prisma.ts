import { PrismaClient } from '@prisma/client';

const prismaBase = new PrismaClient();

type PrismaExtendedClient = typeof prismaBase;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaExtendedClient | undefined;
};

export const prisma: PrismaExtendedClient =
  globalForPrisma.prisma ?? prismaBase;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}