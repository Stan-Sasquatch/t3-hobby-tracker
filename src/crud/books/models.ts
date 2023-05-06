import { z } from "zod";
import type { Navigation } from "../common/models";
import { Volume } from "@serverCrud/googleVolumes/models";

type bookRoutes = "Create" | "All";
export const booksNavigation: Navigation<bookRoutes> = {
  Create: {
    path: "/create",
    title: "New Rating",
  },
  All: {
    path: "",
    title: "All Book Ratings",
  },
};

export const Book = z.object({
  id: z.string().uuid(),
  createdAt: z.string(),
  title: z.string(),
  author: z.string(),
});

export type Book = z.infer<typeof Book>;

export const CreateNewBookAndRatingModel = z.object({
  userEmail: z.string(),
  volume: Volume,
  rating: z.number(),
});

export type CreateNewBookAndRatingModel = z.infer<
  typeof CreateNewBookAndRatingModel
>;
