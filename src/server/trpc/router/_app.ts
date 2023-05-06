import { router } from "../trpc";
import { booksRouter } from "@serverCrud/books/router";
import { connectionsRouter } from "@serverCrud/connections/router";
import { googleVolumesRouter } from "@serverCrud/googleVolumes/router";
import { usersRouter } from "@serverCrud/users/router";
import { VMediaRouter } from "@serverCrud/vMedia/router";

export const appRouter = router({
  books: booksRouter,
  connections: connectionsRouter,
  users: usersRouter,
  vMedia: VMediaRouter,
  googleVolumes: googleVolumesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
