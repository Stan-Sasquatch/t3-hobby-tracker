import { useQuery } from "@tanstack/react-query";
import type { InferGetStaticPropsType } from "next";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import type { ChangeEvent } from "react";
import React from "react";
import { authorSearchGoogleVolumes } from "../../books/queries";
import type { GoogleVolume } from "../../server/books/models";
import { trpc } from "../../utils/trpc";

export async function getStaticProps() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY) {
    throw new Error("Missing Google Books API Key env variable");
  }
  return { props: { googleKey: process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY } };
}

const Create: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const [authorSearchText, setAuthorSearchText] = React.useState<string>("");
  const [volumeSearchText, setVolumeSearchText] = React.useState<string>("");
  const [volume, setVolume] = React.useState<GoogleVolume | null>(null);
  const [rating, setRating] = React.useState<number | null>(null);

  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const newBookAndRatingMutation = trpc.books.newBookAndRating.useMutation();
  const googleVolumeSearch = useQuery({
    queryKey: ["googleVolumes", volumeSearchText, authorSearchText],
    queryFn: () =>
      authorSearchGoogleVolumes(
        props.googleKey,
        volumeSearchText,
        authorSearchText
      ),
    enabled: false,
  });

  const {
    isError,
    isSuccess,
    isLoading,
    error,
    data: response,
  } = newBookAndRatingMutation;

  const submitDisabled = !volume || !rating || !userEmail;
  function handleSearch() {
    googleVolumeSearch.refetch();
  }

  function handleSaveRating() {
    if (!submitDisabled) {
      newBookAndRatingMutation.mutate({
        userEmail,
        volume,
        rating,
      });
    }
  }

  const onSelectedBookChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const item = googleVolumeSearch.data?.items?.find(
      (x) => x.id === event.target.value
    );
    if (item) {
      setVolume(item);
      setRating(null);
    }
  };

  const starRatingInput = (position: number) => {
    const checked = !!rating && position <= rating;
    return (
      <div onClick={() => setRating(position)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-yellow-300 ${checked ? "fill-current" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create Book Rating</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
            Search for a book
          </h1>
          <form>
            <div className="flex-col">
              <div className="flex-row py-2">
                <label htmlFor="volume" className="p-1 text-white">
                  Volume:
                </label>
                <input
                  className="rounded-sm border-black p-1"
                  type="text"
                  id="volume"
                  name="volume"
                  value={volumeSearchText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setVolumeSearchText(event.target.value)
                  }
                />
                <label htmlFor="author" className="p-1 text-white">
                  Author:
                </label>
                <input
                  className="rounded-sm border-black p-1"
                  type="text"
                  id="author"
                  name="author"
                  value={authorSearchText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setAuthorSearchText(event.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={handleSearch}
                  className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
              {googleVolumeSearch.isSuccess &&
                googleVolumeSearch?.data?.items?.some((x) => x) && (
                  <>
                    <label className="p-1 text-white" htmlFor="select-books">
                      Books:
                    </label>
                    <select
                      id="select-books"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={volume?.id ?? ""}
                      onChange={onSelectedBookChange}
                    >
                      <option key={"default"} value={""}>
                        Select a book from the results
                      </option>
                      {googleVolumeSearch.data.items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {`${item.volumeInfo?.title} ${item.volumeInfo?.authors?.[0]}`}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              {volume?.id && (
                <div className="container flex flex-col items-center justify-center">
                  <div className="inline-flex">
                    {starRatingInput(1)}
                    {starRatingInput(2)}
                    {starRatingInput(3)}
                    {starRatingInput(4)}
                    {starRatingInput(5)}
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveRating}
                    disabled={isLoading || submitDisabled}
                    className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                  >
                    Save New Rating
                  </button>
                </div>
              )}
              {isError && <p>{error.message}</p>}
              {isSuccess && response.data ? (
                <p>{`created rating of ${response.data.rating} for book: ${response.data.book.title}`}</p>
              ) : (
                <p>{response?.error}</p>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Create;
