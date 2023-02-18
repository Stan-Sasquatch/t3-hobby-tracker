import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useRedirectToHomeIfAuthed from "../auth/useRedirectToHomeIfAuthed";
import Login from "../common/components/login";

const SignIn: NextPage = () => {
  const { data: sessionData } = useSession();
  useRedirectToHomeIfAuthed();

  return (
    <>
      <Head>
        <title>Hobby Tracker</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Hobby Tracker
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
          <div className="flex flex-col items-center gap-2">
            <Login sessionData={sessionData} />
            <p className="text-2xl text-white">
              Please sign in using the button above
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
