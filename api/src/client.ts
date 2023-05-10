import { createTRPCProxyClient, createWSClient, httpBatchLink, splitLink } from '@trpc/client';
import { tap } from '@trpc/server/observable';
import type { AppRouter } from './server';
import { wsLink } from '@trpc/client';

const url = `http://localhost:2021/trpc`;

// const wsClient = createWSClient({url: 'ws://localhost:2021/trpc'})

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
    // splitLink({
    //   condition: (op) => {return op.type === 'subscription'},
    //   true: wsLink({client: wsClient}),
    //   false: httpBatchLink({
    //     url,
    //     headers: () => ({
    //       authorization: 'secret',
    //     }),
    //   })
    // })
    httpBatchLink({
          url,
          headers: () => ({
            authorization: 'secret',
          }),
        })
  ],
});

async function main() {

  // wsClient.startTimer.subscribe(undefined, {
  //   onData: id => console.log('timer', id)
  // })
  
  console.log(await authedClient.newMeeting.query());
}

void main();
