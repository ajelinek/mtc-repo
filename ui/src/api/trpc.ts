import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouterDefinition } from 'api/src/index'

const client = createTRPCProxyClient<AppRouterDefinition>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: 'http://localhost:2021/'
    })
  ]
})

export default client
