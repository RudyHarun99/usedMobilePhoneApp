import { z } from 'zod'

// Schema for product data validation
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