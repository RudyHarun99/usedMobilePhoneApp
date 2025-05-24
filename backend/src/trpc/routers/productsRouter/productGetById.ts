import { z } from 'zod'
import { publicProcedure } from '../../index'
import { TRPCError } from '@trpc/server'

export const getByIdProduct = publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
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

      return product
    } catch (error) {
      console.log(error);
      throw error;
    }
  })