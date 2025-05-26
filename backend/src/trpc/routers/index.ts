import { router } from '../index'
import { productsRouter } from './productsRouter'

// Combine feature routers into the main application router
export const appRouter = router({
  products: productsRouter
})

// Export the type of the main application router
export type AppRouter = typeof appRouter