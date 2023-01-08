import { CreateNewBookAndRating } from "../../books/commands/createNewBookAndRating";
import { CreateNewBookAndRatingModel } from "../../books/models";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const booksRouter = router({
  newBookAndRating: publicProcedure
    .input(CreateNewBookAndRatingModel)
    .mutation(async ({ input }) => {
      const { data, error } = await CreateNewBookAndRating(input);
      return {
        data,
        error,
      };
    }),
  getAllRatings: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bookRating.findMany({
      include: { book: true },
      orderBy: { createdAt: "desc" },
    });
  }),
  getBookById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.book.findUnique({
      where: { id: input },
    });
  }),
});
