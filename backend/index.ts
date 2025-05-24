import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { corsMiddleware } from './src/middlewares/cors'
import { errorHandler } from './src/middlewares/errorHandler'
import { trpcHandler } from './src/handlers/trpc'

const app = new Hono()

// Global middleware
app.use('*', logger())
app.use('*', corsMiddleware)

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }))

// tRPC endpoint
app.use('/api/trpc/*', trpcHandler)

// Error handler
app.onError((err, c) => {
  return errorHandler(err, c);
})

const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}