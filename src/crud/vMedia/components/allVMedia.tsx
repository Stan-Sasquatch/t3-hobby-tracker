import React from "react";
import VMediaRatingsTable from "@clientCrud/vMedia/components/VMediaRatingsTable";
import type { VMedia, VMediaRating, VisualMediaType } from "@prisma/client";
import { vMediaTypeText } from "../models";

interface AllVMediaProps {
  allVMediaRatings: (VMediaRating & {
    vMedia: VMedia;
  })[];
  mediaType: VisualMediaType;
  onToggleMediaType: () => Promise<boolean>;
}
const AllVMedia = ({
  allVMediaRatings,
  mediaType,
  onToggleMediaType,
}: AllVMediaProps) => {
  return (
    <>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={onToggleMediaType}
      >
        Switch to {vMediaTypeText[mediaType === "FILM" ? "TV" : "FILM"]}
      </button>
      <div className="w-3/6">
        <VMediaRatingsTable
          vMediaRatings={allVMediaRatings}
          vMediaType={mediaType}
        />
      </div>
    </>
  );
};
export default AllVMedia;
