import { router } from '../index'
import { productsRouter } from './productsRouter'

export const appRouter = router({
  products: productsRouter
})

export type AppRouter = typeof appRouter