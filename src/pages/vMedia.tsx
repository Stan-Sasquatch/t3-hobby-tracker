import { type NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import VMediaRatingsTable from "../crud/vMedia/VMediaRatingsTable";
import { trpc } from "../utils/trpc";
import type { VisualMediaType } from "@prisma/client";
import { vMediaTypeText } from "../crud/vMedia/models";

const VMedia: NextPage = () => {
  const [vMediaType, setVMediaType] = useState<VisualMediaType>("FILM");
  const allVMediaRatings = trpc.vMedia.getAllUserRatings.useQuery(vMediaType);
  const otherType = (currentType: VisualMediaType) =>
    currentType === "FILM" ? "TV" : "FILM";
  return (
    <>
      <Head>
        <title>{vMediaTypeText[vMediaType]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
            {`Your ${vMediaTypeText[vMediaType]} Ratings`}
          </h1>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() =>
              setVMediaType((prevMediaType) => otherType(prevMediaType))
            }
          >
            Switch to {vMediaTypeText[otherType(vMediaType)]}
          </button>
          <div className="w-3/6">
            <VMediaRatingsTable
              vMediaRatings={allVMediaRatings.data}
              vMediaType={vMediaType}
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default VMedia;
