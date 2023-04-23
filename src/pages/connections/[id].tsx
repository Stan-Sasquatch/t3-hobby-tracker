import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useDefinedIdRoute } from "src/hooks/useDefinedIdRoute";
import Profile from "@clientCrud/home/components/profile";
import Loading from "@clientCrud/common/components/loading";

const Detail: NextPage = () => {
  const { id, loading } = useDefinedIdRoute();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Connections</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {id && <Profile id={id} />}
      </main>
    </>
  );
};

export default Detail;