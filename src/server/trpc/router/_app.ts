import { router } from "../trpc";
import { authRouter } from "./auth";
import { booksRouter } from "./books";
import { exampleRouter } from "./example";
import { friendRequestsRouter } from './friendRequests';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  books: booksRouter,
  friendRequests: friendRequestsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
