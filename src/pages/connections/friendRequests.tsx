import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import useRequireAuth from "../../auth/useRequireAuth";
import ConnectionsNav from "../../connections/connectionsNav";
import type { CompleteStatusEnum } from "../../connections/models";
import { trpc } from "../../utils/trpc";

const FriendRequests: NextPage = () => {
  const session = useRequireAuth();
  const { isSuccess, data } =
    trpc.friendRequests.getAllFriendRequests.useQuery();
  const utils = trpc.useContext();
  utils.friendRequests.getAllFriendRequests.invalidate();

  const newBookAndRatingMutation =
    trpc.friendRequests.updatePendingRequest.useMutation({
      onSuccess() {
        utils.friendRequests.getAllFriendRequests.invalidate();
      },
    });

  const [currentRequestStatus, setCurrentRequestStatus] =
    React.useState<CompleteStatusEnum | null>(null);

  if (!session) {
    return <h1>Loading...</h1>;
  }
  const showPendingColumn =
    isSuccess && data.some((x) => x.status === "PENDING");

  return (
    <>
      <Head>
        <title>Friend Requests</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConnectionsNav>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
              Friend Requests
            </h1>
            <table className="w-3/6 border-2 border-white bg-purple-200 bg-opacity-25 text-white sm:text-[1rem]">
              <thead>
                <tr>
                  <th className="w-4/12 border-2 border-white">Sender</th>
                  <th className="w-4/12 border-2 border-white">Recipient</th>
                  <th className="w-4/12 border-2 border-white">Status</th>
                  {showPendingColumn && (
                    <th className="w-4/12 border-2 border-white">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {isSuccess &&
                  data.map((r) => (
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
                      {showPendingColumn && (
                        <td className="w-4/12 border-2 border-white text-center">
                          {r.status === "PENDING" &&
                          r.toUserId === session.user?.id ? (
                            <>{/* Make a dialog */}</>
                          ) : (
                            <></>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </ConnectionsNav>
    </>
  );
};

export default FriendRequests;
