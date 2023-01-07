import type { Book, BookRating } from "@prisma/client";
import type { CreateNewBookAndRatingModel } from "../models";
import { prisma } from "../../db/client";

export const CreateNewBookAndRating = async (
  model: CreateNewBookAndRatingModel
): Promise<BookRating & { book: Book }> => {
  const { userEmail, volume, rating } = model;
  const author = volume?.volumeInfo?.authors?.[0];
  const title = volume?.volumeInfo?.title;
  if (!author || !title) {
    return Promise.reject(
      new Error(
        "Can't create a rating for a book that is missing an author or title"
      )
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return Promise.reject(new Error("No user Id to assign the rating to"));
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
      return Promise.reject(
        new Error("User already has a rating for this book")
      );
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
  return { ...ratingResponse, book };
};
