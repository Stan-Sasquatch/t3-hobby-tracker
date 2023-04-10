import type { Book, BookRating, VMedia, VMediaRating } from "@prisma/client";
import BookRatingsTable from "@clientCrud/books/components/bookRatingsTable";
import VMediaRatingsTable from "@clientCrud/vMedia/components/VMediaRatingsTable";

interface ProfileProps {
  name: string;
  bookRatings: (BookRating & {
    book: Book;
  })[];
  filmRatings: (VMediaRating & {
    vMedia: VMedia;
  })[];
  tvRatings: (VMediaRating & {
    vMedia: VMedia;
  })[];
}

const Profile = ({
  name,
  bookRatings,
  filmRatings,
  tvRatings,
}: ProfileProps) => {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
        {`${name}'s hobby tracker`}
      </h1>
      {bookRatings.length > 0 && (
        <>
          <p className="text-2xl text-white">Recently Read</p>
          <div className="w-3/6">
            <BookRatingsTable bookRatings={bookRatings} />
          </div>
        </>
      )}

      <p className="text-2xl text-white">Recently Watched</p>
      <div className="w-3/6">
        <VMediaRatingsTable vMediaRatings={filmRatings} vMediaType={"FILM"} />
      </div>
      <div className="w-3/6">
        <VMediaRatingsTable vMediaRatings={tvRatings} vMediaType={"TV"} />
      </div>
    </div>
  );
};

export default Profile;
