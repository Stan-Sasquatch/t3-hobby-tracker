import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import Head from "next/head";
import type { ChangeEvent } from "react";
import React from "react";
import useAuthenticatedSession from "@auth/useAuthenticatedSession";
import { searchMovieDBFilm } from "@clientCrud/vMedia/queries";
import { trpc } from "@utils/trpc";
import type { MovieDBFilm } from "@clientCrud/vMedia/models";
import FilmSearch from "@clientCrud/vMedia/components/filmSearch";
import RatingPicker from "@clientCrud/common/components/ratingPicker";

const Create: NextPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [film, setFilm] = React.useState<MovieDBFilm | null>(null);
  const [rating, setRating] = React.useState<number | null>(null);
  const sessionData = useAuthenticatedSession();
  const userEmail = sessionData.user?.email;
  const newFilmAndRatingMutation = trpc.vMedia.newFilmAndRating.useMutation();
  const filmSearchQuery = useQuery({
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
    filmSearchQuery.refetch();
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
    const item = filmSearchQuery.data?.results?.find(
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
              <FilmSearch
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearch={handleSearch}
                filmSearchQuery={filmSearchQuery}
                onSelectedFilmChange={onSelectedFilmChange}
                film={film}
              />
              {film?.id && (
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
              <p>{`created rating of ${response.data.rating} for film: ${response.data.vMedia.title}`}</p>
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
