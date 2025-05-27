import { z } from 'zod'
import { publicProcedure } from '../../index'
import { TRPCError } from '@trpc/server'

// Procedure to delete a product by ID
export const deleteProduct = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
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

      // Delete the product
      await ctx.prisma.product.delete({
        where: { id: input }
      })

      return {
        success: true,
        message: `Product ${input} deleted`,
        product,
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  })