import { useQuery } from "@tanstack/react-query";
import type { ChangeEvent } from "react";
import React from "react";
import useAuthenticatedSession from "@auth/useAuthenticatedSession";
import { searchMovieDBFilm } from "@clientCrud/vMedia/queries";
import { trpc } from "@utils/trpc";
import type { MovieDBFilm } from "@clientCrud/vMedia/models";
import FilmSearch from "@clientCrud/vMedia/components/filmSearch";
import RatingPicker from "@clientCrud/common/components/ratingPicker";

export default function CreateFilm() {
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
          <p>{`created rating of ${response.data.rating} for : ${response.data.vMedia.title}`}</p>
        ) : (
          <p>{response?.message}</p>
        )}
      </div>
    </>
  );
}
