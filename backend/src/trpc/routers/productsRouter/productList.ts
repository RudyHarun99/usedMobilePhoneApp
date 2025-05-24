import { z } from 'zod'
import { publicProcedure } from '../../index'

const sortOrderSchema = z.enum([
  'asc', 'desc'
]).optional().default('asc')

export const listProduct = publicProcedure
  .input(z.object({
    search: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    minimumOrderQuantity: z.number().optional(),
    inStock: z.boolean().optional(),
    sortBy: z.enum([
      'name', 'price', 'stockQuantity', 'createdAt'
    ]).optional().default('createdAt'),
    sortOrder: sortOrderSchema,
    limit: z.number().min(1).max(100).optional().default(50),
    offset: z.number().min(0).optional().default(0)
  }).optional().default({}))
  .query(async ({ ctx, input }) => {
    try {
      const {
        search,
        minPrice,
        maxPrice,
        minimumOrderQuantity,
        inStock,
        sortBy,
        sortOrder,
        limit,
        offset
      } = input

      const option = {
        contains: search,
        mode: 'insensitive' as const
      }

      const where = {
        AND: [
          search ? {
            OR: [
              { name: option },
              { description: option },
              { sku: option }
            ]
          } : {},
          minPrice ? { price: { gte: minPrice } } : {},
          maxPrice ? { price: { lte: maxPrice } } : {},
          minimumOrderQuantity ?
          { minimumOrderQuantity: { gte: minimumOrderQuantity } } : {},
          inStock ? { stockQuantity: { gt: 0 } } : {}
        ].filter(condition => Object.keys(condition).length > 0)
      }

      const [products, total] = await Promise.all([
        ctx.prisma.product.findMany({
          where,
          orderBy: { [sortBy]: sortOrder },
          take: limit,
          skip: offset
        }),
        ctx.prisma.product.count({ where })
      ])

      return {
        products,
        metadata: {
          total,
          limit,
          offset,
          hasMore: offset + products.length < total
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  })