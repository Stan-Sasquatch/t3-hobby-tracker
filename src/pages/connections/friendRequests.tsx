import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { trpc } from "@utils/trpc";
import useAuthenticatedSession from "src/hooks/useAuthenticatedSession";

const FriendRequests: NextPage = () => {
  const sessionData = useAuthenticatedSession();
  const { isSuccess, data } = trpc.connections.getAllFriendRequests.useQuery();
  const utils = trpc.useContext();

  const friendRequest = trpc.connections.updatePendingRequest.useMutation({
    onSuccess() {
      utils.connections.getAllFriendRequests.invalidate();
    },
  });

  function onAccept(id: string) {
    return function () {
      friendRequest.mutate({ id, status: "CONFIRMED" });
    };
  }

  function onReject(id: string) {
    return function () {
      friendRequest.mutate({ id, status: "REJECTED" });
    };
  }

  const showActionColumn =
    isSuccess &&
    data.some(
      (x) => x.status === "PENDING" && x.toUserId === sessionData.user?.id
    );

  return (
    <>
      <Head>
        <title>Friend Requests</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                {showActionColumn && (
                  <th className="w-4/12 border-2 border-white">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isSuccess &&
                data.map((r) => (
                  <tr key={r.id}>
                    <td className="max-h-8 w-4/12 border-2 border-white text-center">
                      {r.fromUser.name}
                    </td>
                    <td className="w-4/12 border-2 border-white text-center">
                      {r.toUser.name}
                    </td>
                    <td className="w-4/12 border-2 border-white text-center">
                      {r.status}
                    </td>
                    {showActionColumn && (
                      <td className="w-4/12 border-2 border-white text-center">
                        <div className="flex">
                          <button
                            onClick={onAccept(r.id)}
                            className="m-3 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={onReject(r.id)}
                            className="m-3 rounded bg-gray-500 py-2 px-4 font-bold text-black hover:bg-gray-700"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default FriendRequests;
