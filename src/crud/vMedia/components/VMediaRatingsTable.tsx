import type { VMediaRating, VMedia, VisualMediaType } from "@prisma/client";
import Link from "next/link";

interface VMediaRatingsTableProps {
  vMediaRatings:
    | (VMediaRating & {
        vMedia: VMedia;
      })[]
    | undefined;
  vMediaType: VisualMediaType;
}

const VMediaRatingsTable = ({
  vMediaRatings,
  vMediaType,
}: VMediaRatingsTableProps) => {
  const dateTitle = vMediaType === "FILM" ? "Release Date" : "First Air Date";
  const monthYear = (date: Date) =>
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getFullYear();
  return (
    <table className="w-full border-2 border-white bg-purple-200 bg-opacity-25 text-white sm:text-[1rem]">
      <thead>
        <tr>
          <th className="w-5/12 border-2 border-white">Title</th>
          <th className="w-3/12 border-2 border-white">{dateTitle}</th>
          <th className="w-2/12 border-2 border-white">Rating</th>
        </tr>
      </thead>
      <tbody>
        {vMediaRatings && (
          <>
            {vMediaRatings.some((x) => x) ? (
              vMediaRatings.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-purple-100 hover:text-gray-500"
                >
                  <td
                    className="max-h-8 w-5/12 max-w-0 border-2 border-white lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap"
                    title={v.vMedia.title}
                  >
                    <Link className={"underline"} href={`vMedia/${v.vMediaId}`}>
                      {v.vMedia.title}
                    </Link>
                  </td>
                  <td className="w-3/12 border-2 border-white">
                    {monthYear(v.vMedia.releaseDate)}
                  </td>
                  <td className="w-2/12 border-2 border-white text-center">
                    {v.rating}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={3}>
                  No Ratings Yet!
                </td>
              </tr>
            )}
          </>
        )}
      </tbody>
    </table>
  );
};

export default VMediaRatingsTable;
