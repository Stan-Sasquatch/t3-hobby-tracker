import type { NextPage } from "next";
import Head from "next/head";
import useRequireAuth from "../auth/useRequireAuth";
import { trpc } from "../utils/trpc";

const Connections: NextPage = () => {
  const session = useRequireAuth();
  const allFriendRequestsForUser =
    trpc.friendRequests.getAllFriendRequests.useQuery();

  if (!session) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>Connections</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
            Your Connections
          </h1>
          <h2>Friend Requests</h2>
          <table className="w-3/6 border-2 border-white bg-purple-200 bg-opacity-25 text-white sm:text-[1rem]">
            <thead>
              <tr>
                <th className="w-4/12 border-2 border-white">Sender</th>
                <th className="w-4/12 border-2 border-white">Recipient</th>
                <th className="w-4/12 border-2 border-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {allFriendRequestsForUser.isSuccess &&
                allFriendRequestsForUser.data.map((r) => (
                  <tr
                    key={r.id}
                    className="hover:bg-purple-100 hover:text-gray-500"
                  >
                    <td className="max-h-8 w-4/12 border-2 border-white">
                      {r.fromUser.name}
                    </td>
                    <td className="w-4/12 border-2 border-white">
                      {r.toUser.name}
                    </td>
                    <td className="w-4/12 border-2 border-white text-center">
                      {r.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Connections;
