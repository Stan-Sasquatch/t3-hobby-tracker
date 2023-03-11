import { z } from "zod";
import type { Navigation } from "../common/models";

export const googleVolumeQueryTypes = { author: "inauthor", title: "intitle" };
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

const VolumeInfo = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  authors: z.string().array().optional(),
});

const Volume = z.object({
  id: z.string(),
  volumeInfo: VolumeInfo,
});

export const GoogleVolumesResponse = z.object({
  items: Volume.array().optional(),
});

export type GoogleVolumesResponse = z.infer<typeof GoogleVolumesResponse>;
export type GoogleVolume = z.infer<typeof Volume>;

export const CreateNewBookAndRatingModel = z.object({
  userEmail: z.string(),
  volume: Volume,
  rating: z.number(),
});

export type CreateNewBookAndRatingModel = z.infer<
  typeof CreateNewBookAndRatingModel
>;
