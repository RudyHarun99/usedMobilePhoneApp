import type { Context } from 'hono'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '../trpc/routers'
import { createContext } from '../trpc/index'

export async function trpcHandler(c: Context) {
  const res = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req: c.req.raw,
    router: appRouter,
    createContext,
    onError({ error }) {
      throw error;
    }
  })
  return res
}