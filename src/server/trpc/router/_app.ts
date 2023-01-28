import { router } from "../trpc";
import { authRouter } from "./auth";
import { booksRouter } from "./books";
import { friendRequestsRouter } from "./friendRequests";

export const appRouter = router({
  auth: authRouter,
  books: booksRouter,
  friendRequests: friendRequestsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
