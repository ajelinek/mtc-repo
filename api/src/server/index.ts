import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { Express } from 'express'
import { appRouter } from '../routers'
import { myServer } from '../types'
import { createContext } from './trpc'
import { nanoid } from 'nanoid'
export { publicProcedure, router, t } from './trpc'
export { io } from '../index' //I do not like this at all
export * from './sockets'

export function mountTRPCServer(app: Express) {
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  )
}
