import { initTRPC } from '@trpc/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient
}

export const createContext = async (): Promise<Context> => {
  return { prisma }
}

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure