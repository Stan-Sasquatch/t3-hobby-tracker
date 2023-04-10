import type { ChangeEvent } from "react";
import React from "react";
import type { MovieDBTvShow, MovieDBTvShowResponse } from "../models";
import type { UseQueryResult } from "@tanstack/react-query";

type TvShowSearchProps = {
  searchText: string;
  setSearchText: (value: React.SetStateAction<string>) => void;
  handleSearch: () => void;
  tvShowSearchQuery: UseQueryResult<MovieDBTvShowResponse>;
  onSelectedTvShowChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  tvShow: MovieDBTvShow | null;
};

export default function TvShowSearch({
  searchText,
  setSearchText,
  handleSearch,
  tvShowSearchQuery,
  onSelectedTvShowChange,
  tvShow,
}: TvShowSearchProps) {
  return (
    <>
      <div className="flex-row py-2">
        <label htmlFor="searchText" className="p-1 text-white">
          TV Show:
        </label>
        <input
          className="rounded-sm border-black p-1"
          type="text"
          id="searchText"
          name="TV Show"
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
      {tvShowSearchQuery.isSuccess &&
        tvShowSearchQuery.data.results.some((x) => x) && (
          <>
            <label className="p-1 text-white" htmlFor="select-tv-shows">
              TV Shows:
            </label>
            <select
              id="select-tv-shows"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={tvShow?.id}
              onChange={onSelectedTvShowChange}
            >
              <option key={"default"} value={""}>
                Select a tv show from the results
              </option>
              {tvShowSearchQuery.data.results.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.name} ${item.first_air_date}`}
                </option>
              ))}
            </select>
          </>
        )}
    </>
  );
}
