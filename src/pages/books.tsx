import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import BookRatingsTable from "../crud/books/bookRatingsTable";
import { trpc } from "../utils/trpc";

const Books: NextPage = () => {
  const allBookRatings = trpc.books.getAllUserRatings.useQuery();

  return (
    <>
      <Head>
        <title>Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
};
export default Books;
