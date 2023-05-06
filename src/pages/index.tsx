import { type NextPage } from "next";
import Head from "next/head";
import useAuthenticatedSession from "../hooks/useAuthenticatedSession";
import Profile from "@clientCrud/home/components/profile";

const Home: NextPage = () => {
  const sessionData = useAuthenticatedSession();

  if (!sessionData.user) {
    throw new Error("User not found");
  }
  const { id, name, image } = sessionData.user;

  return (
    <>
      <Head>
        <title>Hobby Tracker</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Profile id={id} imageUrl={image ?? ""} name={name ?? ""} />
      </main>
    </>
  );
};

export default Home;
