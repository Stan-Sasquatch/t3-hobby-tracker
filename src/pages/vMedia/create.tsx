import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { vMediaTypeText } from "@clientCrud/vMedia/models";
import type { VisualMediaType } from "@prisma/client";
import CreateFilm from "@clientCrud/vMedia/components/createFilm";
import CreateTvShow from "@clientCrud/vMedia/components/createTvShow";

const Create: NextPage = () => {
  const [vMediaType, setVMediaType] = React.useState<VisualMediaType>("FILM");
  const otherType = (currentType: VisualMediaType) =>
    currentType === "FILM" ? "TV" : "FILM";
  const mediaTypeText = vMediaTypeText[vMediaType];

  return (
    <>
      <Head>
        <title>{`Create ${mediaTypeText} Rating`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
            {`Search for a ${mediaTypeText}`}
          </h1>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() =>
              setVMediaType((prevMediaType) => otherType(prevMediaType))
            }
          >
            Switch to {vMediaTypeText[otherType(vMediaType)]}
          </button>
          {vMediaType === "FILM" ? <CreateFilm /> : <CreateTvShow />}
        </div>
      </main>
    </>
  );
};

export default Create;
