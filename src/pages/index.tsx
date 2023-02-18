import { type NextPage } from "next";
import Head from "next/head";
import HomeNav from "../home/homeNav";
import useRequireAuth from "../auth/useRequireAuth";

const Home: NextPage = () => {
  useRequireAuth();
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
              <p className="text-2xl text-white">Hello from Stan</p>
              <p className="text-2xl text-white">This is the actual homepage</p>
            </div>
          </div>
        </main>
      </HomeNav>
    </>
  );
};

export default Home;
