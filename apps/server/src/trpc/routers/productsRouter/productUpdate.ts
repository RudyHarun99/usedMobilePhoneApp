import { z } from 'zod'
import { productSchema } from './productSchema'
import { publicProcedure } from '../../index'
import { TRPCError } from '@trpc/server'

// Procedure to update product details by ID
export const updateProduct = publicProcedure
  .input(z.object({
    id: z.string(),
    data: productSchema.partial()
  }))
  .mutation(async ({ ctx, input }) => {
    try {
      const { id, data } = input

      // Find the product by ID
      const product = await ctx.prisma.product.findUnique({
        where: { id }
      })

      // Throw error if product not found
      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found'
        })
      }

      // Update the product details
      return await ctx.prisma.product.update({
        where: { id },
        data
      })
    } catch (error) {
      console.log(error);
      throw error;
    }
  })