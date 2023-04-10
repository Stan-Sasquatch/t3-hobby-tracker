import { useQuery } from "@tanstack/react-query";
import type { ChangeEvent } from "react";
import React from "react";
import useAuthenticatedSession from "@auth/useAuthenticatedSession";
import { searchMovieDBTvShow } from "@clientCrud/vMedia/queries";
import { trpc } from "@utils/trpc";
import type { MovieDBTvShow } from "@clientCrud/vMedia/models";
import TvShowSearch from "@clientCrud/vMedia/components/tvShowSearch";
import RatingPicker from "@clientCrud/common/components/ratingPicker";

export default function CreateTvShow() {
  const [searchText, setSearchText] = React.useState<string>("");
  const [tvShow, setTvShow] = React.useState<MovieDBTvShow | null>(null);
  const [rating, setRating] = React.useState<number | null>(null);
  const sessionData = useAuthenticatedSession();
  const userEmail = sessionData.user?.email;
  const newTvShowAndRatingMutation =
    trpc.vMedia.newTvShowAndRating.useMutation();
  const tvShowSearchQuery = useQuery({
    queryKey: ["movieDbTvShowSearch", searchText],
    queryFn: () => searchMovieDBTvShow(searchText),
    enabled: false,
  });

  const {
    isError,
    isSuccess,
    isLoading,
    error,
    data: response,
  } = newTvShowAndRatingMutation;

  const submitDisabled = !tvShow || !rating || !userEmail;
  function handleSearch() {
    tvShowSearchQuery.refetch();
  }

  function handleSaveRating() {
    if (!submitDisabled) {
      newTvShowAndRatingMutation.mutate({
        userEmail,
        tvShow,
        rating,
      });
    }
  }

  const onSelectedTvShowChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const item = tvShowSearchQuery.data?.results?.find(
      (x) => x.id === +event.target.value
    );
    if (item) {
      setTvShow(item);
      setRating(null);
    }
  };

  return (
    <>
      <form>
        <div className="flex-col">
          <TvShowSearch
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            tvShowSearchQuery={tvShowSearchQuery}
            onSelectedTvShowChange={onSelectedTvShowChange}
            tvShow={tvShow}
          />
          {tvShow?.id && (
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
          <p>{`created rating of ${response.data.rating} for ${response.data.vMedia.title}`}</p>
        ) : (
          <p>{response?.message}</p>
        )}
      </div>
    </>
  );
}
