import { router } from "../trpc";
import { authRouter } from "./auth";
import { booksRouter } from "./books";
import { friendRequestsRouter } from "./friendRequests";
import { friendsRouter } from "./friends";

export const appRouter = router({
  auth: authRouter,
  books: booksRouter,
  friendRequests: friendRequestsRouter,
  friends: friendsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
