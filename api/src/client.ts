import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import { tap } from '@trpc/server/observable';
import type { AppRouter } from './server';

const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

const url = `http://localhost:2021/trpc`;

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op, next }) => {
        console.log('->', op.type, op.path, op.input);

        return next(op).pipe(
          tap({
            next(result) {
              console.log('<-', op.type, op.path, op.input, ':', result);
            },
          }),
        );
      },
    httpBatchLink({ url }),
  ],
});

const authedClient = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url,
      headers: () => ({
        authorization: 'secret',
      }),
    }),
  ],
});

async function main() {
  
  await authedClient.newMeeting.query();
  console.log('hi')
}

void main();
