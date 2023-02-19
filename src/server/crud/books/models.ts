import type { BookRating } from "@prisma/client";
import { z } from "zod";

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

export type BookRatingBaseModel = Omit<BookRating, "id" | "createdAt">;
export const CreateNewBookAndRatingModel = z.object({
  userEmail: z.string(),
  volume: Volume,
  rating: z.number(),
});

export type CreateNewBookAndRatingModel = z.infer<
  typeof CreateNewBookAndRatingModel
>;
