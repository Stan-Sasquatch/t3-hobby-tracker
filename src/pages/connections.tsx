import type { NextPage } from "next";
import Head from "next/head";
import useRequireAuth from "../auth/useRequireAuth";
import ConnectionsNav from "../connections/connectionsNav";

const Connections: NextPage = () => {
  const session = useRequireAuth();

  if (!session) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>Friends</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConnectionsNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
              Friends
            </h1>
          </div>
        </main>
      </ConnectionsNav>
    </>
  );
};

export default Connections;
