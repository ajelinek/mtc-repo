import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouterDefinition } from 'api/src/index'

const url = `${window.location.hostname}:2021/trpc`
const client = createTRPCProxyClient<AppRouterDefinition>({
  links: [loggerLink(), httpBatchLink({ url })]
})

export default client
