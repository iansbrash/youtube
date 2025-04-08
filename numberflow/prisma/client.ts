import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Helps us maintain only a single Prisma instance between all API endpoints
export const prisma = globalForPrisma.prisma ?? new PrismaClient({}); 

if (process.env.NEXT_PUBLIC_ENVIRONMENT !== "prod")
  globalForPrisma.prisma = prisma;
