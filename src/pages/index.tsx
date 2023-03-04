import { type NextPage } from "next";
import Head from "next/head";
import HomeNav from "../crud/home/homeNav";
import useRequireAuth from "../auth/useRequireAuth";
import BookRatingsTable from "./../crud/books/bookRatingsTable";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const session = useRequireAuth();
  const userData = trpc.users.getRecentActivitiesForUser.useQuery(
    session?.user?.id ?? ""
  );

  return (
    <>
      <Head>
        <title>Hobby Tracker</title>
      </Head>
      <HomeNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"></h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-white">Hello from Stan</p>
              <p className="text-2xl text-white">This is the actual homepage</p>
              <BookRatingsTable bookRatings={userData.data?.bookRatings} />
            </div>
          </div>
        </main>
      </HomeNav>
    </>
  );
};

export default Home;
