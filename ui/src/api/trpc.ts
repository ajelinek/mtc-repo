import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouter } from '../../../api/src/server'

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: 'http://localhost:2021/trpc'
    })
  ]
})

export default client
