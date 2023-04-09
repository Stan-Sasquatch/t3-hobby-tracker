import type { ChangeEvent } from "react";
import React from "react";
import type { MovieDBFilm, MovieDBFilmResponse } from "../models";
import type { UseQueryResult } from "@tanstack/react-query";

type FilmSearchProps = {
  searchText: string;
  setSearchText: (value: React.SetStateAction<string>) => void;
  handleSearch: () => void;
  filmSearchQuery: UseQueryResult<MovieDBFilmResponse>;
  onSelectedFilmChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  film: MovieDBFilm | null;
};

export default function FilmSearch({
  searchText,
  setSearchText,
  handleSearch,
  filmSearchQuery,
  onSelectedFilmChange,
  film,
}: FilmSearchProps) {
  return (
    <>
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
      {filmSearchQuery.isSuccess &&
        filmSearchQuery.data.results.some((x) => x) && (
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
              {filmSearchQuery.data.results.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.title} ${item.release_date}`}
                </option>
              ))}
            </select>
          </>
        )}
    </>
  );
}
