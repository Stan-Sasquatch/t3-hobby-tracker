import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent } from "react";
import React from "react";
import useAuthenticatedSession from "@auth/useAuthenticatedSession";
import { searchMovieDBFilm } from "@clientCrud/vMedia/queries";
import { trpc } from "@utils/trpc";
import { StarRatingInput } from "@clientCrud/common/components/starRatingInput";
import type { MovieDBFilm } from "@clientCrud/vMedia/models";

const Create: NextPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [film, setFilm] = React.useState<MovieDBFilm | null>(null);
  const [rating, setRating] = React.useState<number | null>(null);
  const sessionData = useAuthenticatedSession();
  const userEmail = sessionData.user?.email;
  const newFilmAndRatingMutation = trpc.vMedia.newFilmAndRating.useMutation();
  const filmSearch = useQuery({
    queryKey: ["movieDbFilmSearch", searchText],
    queryFn: () => searchMovieDBFilm(searchText),
    enabled: false,
  });

  const {
    isError,
    isSuccess,
    isLoading,
    error,
    data: response,
  } = newFilmAndRatingMutation;

  const submitDisabled = !film || !rating || !userEmail;
  function handleSearch() {
    filmSearch.refetch();
  }

  function handleSaveRating() {
    if (!submitDisabled) {
      newFilmAndRatingMutation.mutate({
        userEmail,
        film,
        rating,
      });
    }
  }

  const onSelectedFilmChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const item = filmSearch.data?.results?.find(
      (x) => x.id === +event.target.value
    );
    if (item) {
      setFilm(item);
      setRating(null);
    }
  };

  return (
    <>
      <Head>
        <title>Create Film Rating</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-[3rem]">
            Search for a Film
          </h1>
          <form>
            <div className="flex-col">
              <div className="flex-row py-2">
                <label htmlFor="searchText" className="p-1 text-white">
                  Film:
                </label>
                <input
                  className="rounded-sm border-black p-1"
                  type="text"
                  id="searchText"
                  name="Film"
                  value={searchText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchText(event.target.value)
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
              {filmSearch.isSuccess &&
                filmSearch.data.results.some((x) => x) && (
                  <>
                    <label className="p-1 text-white" htmlFor="select-films">
                      Films:
                    </label>
                    <select
                      id="select-films"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      value={film?.id}
                      onChange={onSelectedFilmChange}
                    >
                      <option key={"default"} value={""}>
                        Select a film from the results
                      </option>
                      {filmSearch.data.results.map((item) => (
                        <option key={item.id} value={item.id}>
                          {`${item.title} ${item.release_date}`}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              {film?.id && (
                <div className="container flex flex-col items-center justify-center">
                  <div className="inline-flex">
                    {[1, 2, 3, 4, 5].map((x) => (
                      <StarRatingInput
                        key={x}
                        onClick={() => setRating(x)}
                        checked={!!rating && x <= rating}
                      />
                    ))}
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
            </div>
          </form>
          <div className="text-center font-bold text-white">
            {isError && <p>{error.message}</p>}
            {isSuccess && response.data ? (
              <p>{`created rating of ${response.data.rating} for film: ${response.data.vMedia.title}`}</p>
            ) : (
              <p>{response?.error}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Create;
