import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Login from "../crud/common/components/login";
import Head from "next/head";
import useRedirectToHomeIfAuthed from "src/hooks/useRedirectToHomeIfAuthed";

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
            <p className="text-lg text-white">
              Without signing in You won&apos;t be able to track your hobbies or
              connect with friends to view theirs. However you can still view my
              recent activities <span className="underline">here!</span>
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
