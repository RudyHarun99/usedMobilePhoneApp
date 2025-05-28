import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { corsMiddleware } from './src/middlewares/cors'
import { errorHandler } from './src/middlewares/errorHandler'
import { trpcHandler } from './src/handlers/trpc'

// Initialize a new Hono app instance
const app = new Hono()

// Global middleware for logging requests
app.use('*', logger())
// Global middleware for handling CORS
app.use('*', corsMiddleware)

// Health check endpoint to verify server status
app.get('/', (c) => c.text('Hono app is alive'));
app.get('/ping', (c) => c.json({ pong: true }));
app.get('/health', (c) => c.json({ status: 'ok' }));

// Route for handling tRPC API requests
app.use('/api/trpc/*', trpcHandler)

// Global error handler to manage exceptions
app.onError((err, c) => {
  return errorHandler(err, c);
})

// Define the server port, defaulting to 3000 if not set in environment
const port = Bun.env.PORT || 3000
console.log(`Server is running on port ${port}`)

// Export the server configuration
export default {
  port,
  fetch: app.fetch,
}