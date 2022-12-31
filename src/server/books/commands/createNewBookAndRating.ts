import type { Book, BookRating } from "@prisma/client";
import type { CreateNewBookAndRatingModel } from "../models";
import type { Response } from "../../common/models";
import { prisma } from "../../db/client";

export const CreateNewBookAndRating = async (
  model: CreateNewBookAndRatingModel
): Promise<Response<BookRating & { book: Book }>> => {
  const { userEmail, volume, rating } = model;
  let data = null;
  let success = false;
  const author = volume?.volumeInfo?.authors?.[0];
  const title = volume?.volumeInfo?.title;
  if (!author || !title) {
    const error =
      "Can't create a rating for a book that is missing an author or title";
    return { data, success, error };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    const error = "No user Id to assign the rating to";
    return { data, success, error };
  }

  const existingBook = await prisma.book.findUnique({
    where: {
      title_author: {
        title: title,
        author: author,
      },
    },
  });

  const userId = user.id;
  let bookId;
  let book;

  if (existingBook) {
    book = existingBook;
    bookId = existingBook.id;
    const existingRating = await prisma.bookRating.findUnique({
      where: {
        bookId_userId: {
          bookId,
          userId,
        },
      },
    });

    if (existingRating) {
      const error = "User already has a rating for this book";
      return { data, success, error };
    }
    console.log("Skipping creating this book as it already exists");
  } else {
    const data = {
      author,
      title,
    };
    book = await prisma.book.create({
      data,
    });
    bookId = book.id;
  }

  const ratingResponse = await prisma.bookRating.create({
    data: {
      bookId,
      rating,
      userId,
    },
  });
  data = { ...ratingResponse, book };
  success = true;
  return { data, success, error: null };
};
