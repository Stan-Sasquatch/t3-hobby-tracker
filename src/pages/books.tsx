import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import BookRatingsTable from "../crud/books/bookRatingsTable";
import BooksNav from "../crud/books/booksNav";
import { trpc } from "../utils/trpc";

const Books: NextPage = () => {
  const sessionData = useSession();
  const allBookRatings = trpc.books.getAllUserRatings.useQuery();

  if (!sessionData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BooksNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
              Your Book Ratings
            </h1>
            <div className="w-3/6">
              <BookRatingsTable bookRatings={allBookRatings.data} />
            </div>
          </div>
        </main>
      </BooksNav>
    </>
  );
};
export default Books;
