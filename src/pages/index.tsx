import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import HomeNav from "../home/homeNav";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from Stan" });

  return (
    <>
      <Head>
        <title>Hobby Tracker</title>
      </Head>
      <HomeNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Hobby Tracker
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-white">
                {hello.data ? hello.data.greeting : "Loading..."}
              </p>
              <Login />
            </div>
          </div>
        </main>
      </HomeNav>
    </>
  );
};

export default Home;

const Login: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
