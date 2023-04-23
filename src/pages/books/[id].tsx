import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { trpc } from "@utils/trpc";
import { useDefinedIdRoute } from "@utils/hooks/useDefinedIdRoute";
import Image from "next/image";

const Detail: NextPage = () => {
  const { id, loading } = useDefinedIdRoute();

  if (loading) {
    return <></>;
  }

  const bookDetail = trpc.books.getBookById.useQuery(id);
  return (
    <>
      <Head>
        <title>Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {bookDetail.isSuccess && (
          <>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              {bookDetail.data?.title}
            </h1>
            {bookDetail.data?.subtitle && (
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                {bookDetail.data.subtitle}
              </h2>
            )}
            {bookDetail.data?.imageLink && (
              <Image
                src={bookDetail.data.imageLink}
                alt={`Book cover for ${bookDetail.data?.title}`}
                width={100}
                height={100}
              />
            )}
            {bookDetail.data?.previewLink && (
              <a className="text-white" href={bookDetail.data.previewLink}>
                See more
              </a>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Detail;
