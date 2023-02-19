import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import useRequireAuth from "../auth/useRequireAuth";
import BooksNav from "../crud/books/booksNav";
import { trpc } from "../utils/trpc";

const Books: NextPage = () => {
  const sessionData = useRequireAuth();
  const allBooks = trpc.books.getAllUserRatings.useQuery();

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
            <table className="w-3/6 border-2 border-white bg-purple-200 bg-opacity-25 text-white sm:text-[1rem]">
              <thead>
                <tr>
                  <th className="w-5/12 border-2 border-white">Book</th>
                  <th className="w-3/12 border-2 border-white">Author</th>
                  <th className="w-2/12 border-2 border-white">Rating</th>
                </tr>
              </thead>
              <tbody>
                {allBooks.isSuccess && (
                  <>
                    {allBooks.data.some((x) => x) ? (
                      allBooks.data.map((b) => (
                        <tr
                          key={b.id}
                          className="hover:bg-purple-100 hover:text-gray-500"
                        >
                          <td
                            className="max-h-8 w-5/12 max-w-0 border-2 border-white lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap"
                            title={b.book.title}
                          >
                            <Link
                              className={"underline"}
                              href={`books/${b.bookId}`}
                            >
                              {b.book.title}
                            </Link>
                          </td>
                          <td className="w-3/12 border-2 border-white">
                            {b.book.author}
                          </td>
                          <td className="w-2/12 border-2 border-white text-center">
                            {b.rating}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={3}>
                          No Ratings Yet!
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </BooksNav>
    </>
  );
};

export default Books;
