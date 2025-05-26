import type { Context } from 'hono'
import { TRPCError } from '@trpc/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'

// HTTP status code mapping for tRPC error codes
const TRPC_ERROR_CODE_HTTP_STATUS = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

// Define the structure of an error response
type ErrorResponse = {
  error: {
    code?: string
    timestamp: string
    type: string
    message?: string
    path?: string
    data?: unknown
    details?: unknown
    target?: string
    stack?: string
  }
}

// Error handling middleware function
export const errorHandler = (err: unknown, c: Context) => {
  const timestamp = new Date().toISOString()

  // Handle tRPC errors
  if (err instanceof TRPCError) {
    const status = TRPC_ERROR_CODE_HTTP_STATUS[
      err.code as keyof typeof TRPC_ERROR_CODE_HTTP_STATUS
    ] || 500
    const response: ErrorResponse = {
      error: {
        code: err.code,
        timestamp,
        type: 'TRPC_ERROR',
        message: err.message,
        data: err.cause
      }
    }
    return new Response(JSON.stringify(response), { status })
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const response: ErrorResponse = {
      error: {
        code: 'VALIDATION_ERROR',
        timestamp,
        type: 'ZOD_ERROR',
        message: 'Validation failed',
        details: err.issues,
        path: err.issues[0]?.path.join('.')
      }
    }
    return c.json(response, 400)
  }

  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    const response: ErrorResponse = {
      error: {
        code: `PRISMA_${err.code}`,
        timestamp,
        type: 'PRISMA_ERROR',
        message: 'Database request error'
      }
    }
    return c.json(response, 400)
  }

  // Handle generic errors
  const response: ErrorResponse = {
    error: {
      timestamp,
      type: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred'
    }
  }
  // Return a generic error response
  return c.json(response, 500)
}