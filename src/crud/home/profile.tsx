import type { Book, BookRating } from "@prisma/client";
import BookRatingsTable from "../books/bookRatingsTable";

interface ProfileProps {
  name: string;
  userData:
    | (BookRating & {
        book: Book;
      })[]
    | undefined;
}

const Profile = ({ name, userData }: ProfileProps) => {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
        {`${name}'s hobby tracker`}
      </h1>
      <p className="text-2xl text-white">Hello from Stan</p>
      <p className="text-2xl text-white">This is the actual homepage</p>
      <div className="w-3/6">
        <BookRatingsTable bookRatings={userData} />
      </div>
    </div>
  );
};

export default Profile;
