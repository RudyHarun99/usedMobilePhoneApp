import { initTRPC } from '@trpc/server'
import { PrismaClient } from '@prisma/client'

// Initialize Prisma Client for database operations
const prisma = new PrismaClient()

// Define the context type for tRPC, including Prisma Client
export type Context = {
  prisma: PrismaClient
}

// Create a context function that returns the Prisma Client
export const createContext = async (): Promise<Context> => {
  return { prisma }
}

// Initialize tRPC with the defined context
const t = initTRPC.context<Context>().create()

// Export the router and publicProcedure for defining API endpoints
export const router = t.router
export const publicProcedure = t.procedure