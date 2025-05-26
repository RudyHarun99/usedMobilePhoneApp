import { z } from 'zod'
import { publicProcedure } from '../../index'
import { TRPCError } from '@trpc/server'

// Procedure to get a product by ID
export const getByIdProduct = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    try {
      // Find the product by ID
      const product = await ctx.prisma.product.findUnique({
        where: { id: input }
      })

      // Throw error if product not found
      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found'
        })
      }

      return product
    } catch (error) {
      console.log(error);
      throw error;
    }
  })