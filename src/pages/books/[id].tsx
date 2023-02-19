import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import BooksNav from "../../crud/books/booksNav";
import { trpc } from "../../utils/trpc";

const Detail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return <></>;
  }

  if (!id) {
    throw new Error("Id not passed correctly");
  }

  if (Array.isArray(id)) {
    throw new Error("Nested query not implemented for this route");
  }

  const bookDetail = trpc.books.getBookById.useQuery(id);
  return (
    <>
      <Head>
        <title>Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BooksNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          {bookDetail.isSuccess && (
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              {bookDetail.data?.title}
            </h1>
          )}
        </main>
      </BooksNav>
    </>
  );
};

export default Detail;
