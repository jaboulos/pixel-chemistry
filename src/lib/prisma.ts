import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// detailed logs of what queries are going to prisma from the app
export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ['query'] })

// if hot module reloading, continue to use same instance instead of creating new prisma client
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
