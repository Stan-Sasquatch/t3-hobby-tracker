import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { trpc } from "@utils/trpc";
import { useDefinedIdRoute } from "src/hooks/useDefinedIdRoute";

const Detail: NextPage = () => {
  const { id, loading } = useDefinedIdRoute();

  if (loading) {
    return <></>;
  }

  const vMediaDetail = trpc.vMedia.getVMediaById.useQuery(id);
  return (
    <>
      <Head>
        <title>Books</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {vMediaDetail.isSuccess && (
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {vMediaDetail.data?.title}
          </h1>
        )}
      </main>
    </>
  );
};

export default Detail;
