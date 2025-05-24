import { z } from 'zod'

export const productSchema = z.object({
  sku: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  stockQuantity: z.number(),
  minimumOrderQuantity: z.number()
})