import { cors } from 'hono/cors'

// Configure CORS middleware
export const corsMiddleware = cors({
  // Allow all origins
  origin: '*',
  // Allow specific HTTP methods
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // Allow specific headers in requests
  allowHeaders: ['Content-Type', 'Authorization'],
  // Expose specific headers in responses
  exposeHeaders: ['Content-Length'],
  // Cache preflight response for 600 seconds
  maxAge: 600,
  // Allow credentials in requests
  credentials: true,
})