import { t } from '../trpc'
import { customAlphabet  } from 'nanoid/non-secure'
import { TRPCError } from '@trpc/server';
import { EventEmitter } from 'stream';
import { observable } from '@trpc/server/observable';

const router = t.router;

const eventEmitter = new EventEmitter();

const nanoid = customAlphabet('12345678890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)

export const appRouter = router({
    // merge predefined routers
    // post: postRouter,
    // message: messageRouter,
    newMeeting: t.procedure.query(() => nanoid()),
    // or individual procedures
    // hello: t.procedure.input(z.string().nullish()).query(({ input, ctx }) => {
    //   return `hello ${input ?? ctx.user?.name ?? 'world'}`;
    // }),
    // or inline a router
    admin: router({
      secret: t.procedure.query(({ ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: 'UNAUTHORIZED' });
        }
        if (ctx.user?.name !== 'alex') {
          throw new TRPCError({ code: 'FORBIDDEN' });
        }
        return {
          secret: 'sauce',
        };
      }),
      onUpdate: t.procedure.subscription(() => {
        return observable<string>((emit) => {
          eventEmitter.on('update', emit.next)
          return () => {
            eventEmitter.off('update', emit.next)
          }
        })})
    }),
  });