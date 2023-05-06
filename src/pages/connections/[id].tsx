import { type NextPage } from "next";
import Head from "next/head";
import { useDefinedIdRoute } from "src/hooks/useDefinedIdRoute";
import Profile from "@clientCrud/home/components/profile";
import Loading from "@clientCrud/common/components/loading";
import { trpc } from "@utils/trpc";

const Detail: NextPage = () => {
  const { id, loading } = useDefinedIdRoute();
  const friendData = trpc.connections.getFriendForUser.useQuery(id ?? "");

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
        {id && friendData.isSuccess && (
          <Profile
            id={id}
            imageUrl={friendData?.data?.friend.image ?? ""}
            name={friendData?.data?.friend.name ?? ""}
          />
        )}
      </main>
    </>
  );
};

export default Detail;
