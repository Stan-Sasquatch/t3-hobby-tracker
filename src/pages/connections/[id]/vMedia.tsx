import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { ZVisualMediaType, vMediaTypeText } from "@clientCrud/vMedia/models";
import { trpc } from "@utils/trpc";
import AllVMedia from "@clientCrud/vMedia/components/allVMedia";
import { useDefinedIdRoute } from "src/hooks/useDefinedIdRoute";
import Loading from "@clientCrud/common/components/loading";

const VMedia: NextPage = () => {
  const router = useRouter();
  const { id: userId, loading } = useDefinedIdRoute();
  const mediaType = ZVisualMediaType.parse(router.query["mediaType"] ?? "FILM");
  const allVMediaRatings = trpc.vMedia.getAllUserRatings.useQuery({
    userId: userId ?? "",
    mediaType,
  });

  const friendQuery = trpc.connections.getFriendForUser.useQuery(userId ?? "");
  const name = friendQuery.data?.friend.name;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{vMediaTypeText[mediaType]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
            {`${name ? `${name}'s` : ""} ${vMediaTypeText[mediaType]} Ratings`}
          </h1>
          <AllVMedia
            allVMediaRatings={allVMediaRatings.data ?? []}
            mediaType={mediaType}
            onToggleMediaType={() =>
              router.replace({
                query: {
                  ...router.query,
                  mediaType: mediaType === "FILM" ? "TV" : "FILM",
                },
              })
            }
          />
        </div>
      </main>
    </>
  );
};
export default VMedia;
