import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { trpc } from "../utils/trpc";

const Books: NextPage = () => {
  const allBooks = trpc.books.getAllBooks.useQuery();

  return (
    <>
      <Head>
        <title>Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <table className="w-3/6 border-2 border-white bg-purple-200 bg-opacity-25 text-white sm:text-[1rem]">
            <thead>
              <tr>
                <th className="w-5/12 border-2 border-white">Book</th>
                <th className="w-3/12 border-2 border-white">Author</th>
                <th className="w-2/12 border-2 border-white">Rating</th>
              </tr>
            </thead>
            <tbody>
              {allBooks.isSuccess &&
                allBooks.data.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-purple-100 hover:text-gray-500"
                  >
                    <td
                      className="max-h-8 w-5/12 max-w-0 overflow-hidden overflow-ellipsis whitespace-nowrap border-2 border-white"
                      title={b.book.title}
                    >
                      {b.book.title}
                    </td>
                    <td className="w-3/12 border-2 border-white">
                      {b.book.author}
                    </td>
                    <td className="w-2/12 border-2 border-white">{b.rating}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Books;
