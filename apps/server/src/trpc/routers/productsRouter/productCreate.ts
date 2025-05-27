import { productSchema } from './productSchema'
import { publicProcedure } from '../../index'
import { ulid } from 'ulid'

// Procedure to create a new product
export const createProduct = publicProcedure
  .input(productSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      // Create a new product using Prisma
      return await ctx.prisma.product.create({
        data: {
          id: ulid(),
          ...input
        }
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  })