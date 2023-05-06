import { trpc } from "@utils/trpc";
import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import BookRatingsTable from "@clientCrud/books/components/bookRatingsTable";
import { useDefinedIdRoute } from "src/hooks/useDefinedIdRoute";
import Loading from "@clientCrud/common/components/loading";
import useAuthFriend from "src/hooks/useAuthFriendOrUser";

const FriendBooks: NextPage = () => {
  const { id, loading } = useDefinedIdRoute();
  useAuthFriend(id ?? "");
  const friendQuery = trpc.connections.getFriendForUser.useQuery(id ?? "");
  const allBookRatings = trpc.books.getAllUserRatings.useQuery(id ?? "");
  const name = friendQuery.data?.friend.name;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{name ? `${name}'s books` : "books"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {
            <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
              {name ? `${name}'s book ratings` : "book ratings"}
            </h1>
          }
          <div className="w-3/6">
            <BookRatingsTable bookRatings={allBookRatings.data} />
          </div>
        </div>
      </main>
    </>
  );
};
export default FriendBooks;
