import { productSchema } from './productSchema'
import { publicProcedure } from '../../index'
import { ulid } from 'ulid'

export const createProduct = publicProcedure
  .input(productSchema)
  .mutation(async ({ ctx, input }) => {
    try {
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