import { DefaultErrorShape, TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { EventEmitter } from 'events';
import express from 'express';
import { z } from 'zod';
import { customAlphabet  } from 'nanoid/non-secure'
import ws from 'ws';

const nanoid = customAlphabet('12345678890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 5)

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== 'secret') {
      return null;
    }
    return {
      name: 'alex',
    };
  };

  return {
    req,
    res,
    user: getUser(),
    meta: {},
    errorShape: {},
    transformer: {}
  };
};
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const router = t.router;
const publicProcedure = t.procedure;

// --------- create procedures etc

// let id = 0;

// const ee = new EventEmitter();
// const db = {
//   posts: [
//     {
//       id: ++id,
//       title: 'hello',
//     },
//   ],
//   messages: [createMessage('initial message')],
// };
// function createMessage(text: string) {
//   const msg = {
//     id: ++id,
//     text,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   };
//   ee.emit('newMessage', msg);
//   return msg;
// }

// const postRouter = router({
//   createPost: t.procedure
//     .input(z.object({ title: z.string() }))
//     .mutation(({ input }) => {
//       const post = {
//         id: ++id,
//         ...input,
//       };
//       db.posts.push(post);
//       return post;
//     }),
//   listPosts: publicProcedure.query(() => db.posts),
// });

// const messageRouter = router({
//   addMessage: publicProcedure.input(z.string()).mutation(({ input }) => {
//     const msg = createMessage(input);
//     db.messages.push(msg);

//     return msg;
//   }),
//   listMessages: publicProcedure.query(() => db.messages),
// });

// root router to call
const appRouter = router({
  // merge predefined routers
  // post: postRouter,
  // message: messageRouter,
  newMeeting: publicProcedure.query(() => nanoid()),
  // or individual procedures
  // hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
  //   return `hello ${input ?? ctx.user?.name ?? 'world'}`;
  // }),
  // or inline a router
  admin: router({
    secret: publicProcedure.query(({ ctx }) => {
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
  }),
});

export type AppRouter = typeof appRouter;

  // express implementation
  const app = express();

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query);

    next();
  });

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  app.get('/', (_req, res) => res.send('hello'));
  const server = app.listen(2021, () => {
    console.log('listening on port 2021');
  });

  // applyWSSHandler({
  //   wss: new ws.Server({server}),
  //   router: appRouter,
  //   //@ts-ignore
  //   createContext
  // });
