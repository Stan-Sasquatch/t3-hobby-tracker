import { CreateNewBookAndRating } from "../../books/commands/createNewBookAndRating";
import { CreateNewBookAndRatingModel } from "../../books/models";
import { router, publicProcedure } from "../trpc";

export const booksRouter = router({
  newBookAndRating: publicProcedure
    .input(CreateNewBookAndRatingModel)
    .mutation(async ({ input }) => {
      return {
        response: await CreateNewBookAndRating(input),
      };
    }),
});
