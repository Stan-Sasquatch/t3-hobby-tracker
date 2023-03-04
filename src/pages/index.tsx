import { type NextPage } from "next";
import Head from "next/head";
import HomeNav from "../crud/home/homeNav";
import { trpc } from "../utils/trpc";
import Profile from "../crud/home/profile";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const userData = trpc.users.getRecentActivitiesForUser.useQuery(
    session?.user?.id ?? ""
  );
  const test = userData.data?.bookRatings;
  return (
    <>
      <Head>
        <title>Hobby Tracker</title>
      </Head>
      <HomeNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          {session?.user?.name && (
            <Profile name={session.user.name} userData={test} />
          )}
        </main>
      </HomeNav>
    </>
  );
};

export default Home;
