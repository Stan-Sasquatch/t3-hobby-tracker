import React from "react";
import { StarRatingInput } from "./starRatingInput";

type RatingPickerProps = {
  setRating: (value: React.SetStateAction<number | null>) => void;
  rating: number | null;
  handleSaveRating: () => void;
  saveDisabled: boolean;
};

export default function RatingPicker({
  setRating,
  rating,
  handleSaveRating,
  saveDisabled,
}: RatingPickerProps) {
  return (
    <div>
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
          disabled={saveDisabled}
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Save New Rating
        </button>
      </div>
    </div>
  );
}
