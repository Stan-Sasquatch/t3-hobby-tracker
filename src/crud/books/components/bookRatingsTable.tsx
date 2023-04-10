import type { BookRating, Book } from "@prisma/client";
import Link from "next/link";

interface BookRatingsTableProps {
  bookRatings:
    | (BookRating & {
        book: Book;
      })[]
    | undefined;
  bookColumnWidth?: number;
}

const BookRatingsTable = ({
  bookRatings,
  bookColumnWidth = 5,
}: BookRatingsTableProps) => {
  return (
    <table className="w-full border-2 border-white bg-purple-200 bg-opacity-25 text-white sm:text-[1rem]">
      <thead>
        <tr>
          <th className={`w-${bookColumnWidth}/12 border-2 border-white`}>
            Book
          </th>
          <th className="w-3/12 border-2 border-white">Author</th>
          <th className="w-2/12 border-2 border-white">Rating</th>
        </tr>
      </thead>
      <tbody>
        {bookRatings && (
          <>
            {bookRatings.some((x) => x) ? (
              bookRatings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-purple-100 hover:text-gray-500"
                >
                  <td
                    className={`max-h-8 w-${bookColumnWidth}/12 max-w-0 border-2 border-white lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap`}
                    title={b.book.title}
                  >
                    <Link className={"underline"} href={`books/${b.bookId}`}>
                      {b.book.title}
                    </Link>
                  </td>
                  <td className="w-3/12 border-2 border-white">
                    {b.book.author}
                  </td>
                  <td className="w-2/12 border-2 border-white text-center">
                    {b.rating}
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

export default BookRatingsTable;
