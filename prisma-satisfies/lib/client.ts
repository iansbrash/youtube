import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
export const prisma = new PrismaClient({
  // Optionally configure logging or other client options here
  // log: ['query', 'info', 'warn', 'error'],
});
