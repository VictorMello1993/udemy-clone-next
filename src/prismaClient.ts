import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

// O escopo global é para evitar o erro de múltiplas conexões entre clients diferentes quando a mesma base é conectada pelo Prisma
(globalThis as any).prismaClient = (globalThis as any).prismaClient ?? prismaClient;
