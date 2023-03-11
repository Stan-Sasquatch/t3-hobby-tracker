import type { BookRating } from "@prisma/client";
export type BookRatingBaseModel = Omit<BookRating, "id" | "createdAt">;
