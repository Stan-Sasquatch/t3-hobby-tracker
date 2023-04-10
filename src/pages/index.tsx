import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import useAuthenticatedSession from "./../auth/useAuthenticatedSession";
import Profile from "@clientCrud/home/components/profile";

const Home: NextPage = () => {
  const sessionData = useAuthenticatedSession();
  const userData = trpc.users.getRecentActivitiesForUser.useQuery(
    sessionData.user?.id ?? ""
  );
  const bookRatings = userData.data?.bookRatings ?? [];
  const filmRatings =
    userData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "FILM"
    ) ?? [];

  const tvRatings =
    userData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "TV"
    ) ?? [];

  return (
    <>
      <Head>
        <title>Hobby Tracker</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {sessionData.user?.name && (
          <Profile
            name={sessionData.user.name}
            bookRatings={bookRatings}
            filmRatings={filmRatings}
            tvRatings={tvRatings}
          />
        )}
      </main>
    </>
  );
};

export default Home;
