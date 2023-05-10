import ws from 'ws';
import * as trpcExpress from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import express from 'express';
import { z } from 'zod';
import { observable } from '@trpc/server/observable';
import { t } from './trpc';
import { appRouter } from './routers/index'
import { createContext } from './context';
 

// --------- create procedures etc

// let id = 0;

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
//   listPosts: t.procedure.query(() => db.posts),
// });

// const messageRouter = router({
//   addMessage: t.procedure.input(z.string()).mutation(({ input }) => {
//     const msg = createMessage(input);
//     db.messages.push(msg);

//     return msg;
//   }),
//   listMessages: t.procedure.query(() => db.messages),
// });

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

  applyWSSHandler({
    wss: new ws.Server({server}),
    router: appRouter,
    //@ts-ignore
    createContext
  });
