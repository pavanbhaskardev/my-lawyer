import { PrismaClient } from '@prisma/client/edge'
import { Env } from '../app'

export const getPrisma = (env: Env) => {
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URI,
  })

  return prisma
}
