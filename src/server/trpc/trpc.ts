import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);

const isFriendOfOrIs = (friendId: string) => {
  return t.middleware(async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (friendId === ctx.session.user?.id) {
      return next({
        ctx: {
          // infers the `session` as non-nullable
          session: { ...ctx.session, user: ctx.session.user },
        },
      });
    }

    const userData = await ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      include: {
        userFriends: true,
      },
    });

    if (!userData?.userFriends.map((x) => x.user_id).includes(friendId)) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        // infers the `session` as non-nullable
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  });
};

export const friendsProtectedProcedure = (friendId: string) =>
  t.procedure.use(isFriendOfOrIs(friendId));
