import { z } from 'zod'
import { publicProcedure } from '../../index'
import { TRPCError } from '@trpc/server'

export const deleteProduct = publicProcedure
  .input(z.string())
  .mutation(async ({ ctx, input }) => {
    try {
      const product = await ctx.prisma.product.findUnique({
        where: { id: input }
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found'
        })
      }

      await ctx.prisma.product.delete({
        where: { id: input }
      })

      return { success: true }
    } catch (error) {
      console.log(error);
      throw error;
    }
  })