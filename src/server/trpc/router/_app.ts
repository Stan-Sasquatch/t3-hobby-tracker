import { router } from "../trpc";
import { booksRouter } from "../../crud/books/router";
import { connectionsRouter } from "../../crud/connections/router";
import { usersRouter } from "../../crud/users/router";

export const appRouter = router({
  books: booksRouter,
  connections: connectionsRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
