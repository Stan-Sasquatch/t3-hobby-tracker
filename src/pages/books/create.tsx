import { type NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent } from "react";
import React from "react";
import useAuthenticatedSession from "src/hooks/useAuthenticatedSession";
import { trpc } from "@utils/trpc";
import RatingPicker from "@clientCrud/common/components/ratingPicker";
import Link from "next/link";
import type { GoogleVolume } from "@serverCrud/googleVolumes/models";

const Create: NextPage = () => {
  const [authorSearchText, setAuthorSearchText] = React.useState<string>("");
  const [volumeSearchText, setVolumeSearchText] = React.useState<string>("");
  const [volume, setVolume] = React.useState<GoogleVolume | null>(null);
  const [rating, setRating] = React.useState<number | null>(null);
  const sessionData = useAuthenticatedSession();
  const userEmail = sessionData.user?.email;
  const newBookAndRatingMutation = trpc.books.newBookAndRating.useMutation();

  const googleVolumeSearch = trpc.googleVolumes.searchGoogleVolumes.useQuery(
    {
      volumeSearchText,
      authorSearchText,
    },
    { enabled: false }
  );

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
                      {googleVolumeSearch.data.items
                        .filter(
                          (item) =>
                            item.volumeInfo?.title &&
                            item.volumeInfo?.authors?.[0]
                        )
                        .map((item) => (
                          <option key={item.id} value={item.id}>
                            {`${item.volumeInfo?.title} by ${item.volumeInfo?.authors?.[0]}`}
                          </option>
                        ))}
                    </select>
                  </>
                )}
              {volume?.id && (
                <RatingPicker
                  setRating={setRating}
                  rating={rating}
                  handleSaveRating={handleSaveRating}
                  saveDisabled={isLoading || submitDisabled}
                />
              )}
            </div>
          </form>
          <div className="text-center font-bold text-white">
            {isError && <p>{error.message}</p>}
            {isSuccess && response.data ? (
              <p>
                {`created rating of ${response.data.rating} for book: `}
                <Link className={"underline"} href={`${response.data.bookId}`}>
                  {response.data.book.title}
                </Link>
              </p>
            ) : (
              <p>{response?.message}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;
