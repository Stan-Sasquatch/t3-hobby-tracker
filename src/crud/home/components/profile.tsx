import BookRatingsTable from "@clientCrud/books/components/bookRatingsTable";
import VMediaRatingsTable from "@clientCrud/vMedia/components/VMediaRatingsTable";
import { trpc } from "@utils/trpc";
import useAuthFriendOrUser from "src/hooks/useAuthFriendOrUser";
import Image from "next/image";
import Link from "next/link";

interface ProfileProps {
  id: string;
  imageUrl: string;
  name: string;
}

const Profile = ({ id, name, imageUrl }: ProfileProps) => {
  useAuthFriendOrUser(id);
  const userActivityData = trpc.users.getRecentActivitiesForUser.useQuery(id);
  const bookRatings = userActivityData.data?.bookRatings ?? [];
  const filmRatings =
    userActivityData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "FILM"
    ) ?? [];

  const tvRatings =
    userActivityData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "TV"
    ) ?? [];

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <div>
        <Image
          className="rounded-full"
          src={imageUrl}
          alt={name ? `${name}'s avatar ` : "user's avatar"}
          width="50"
          height="50"
        />
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
        {name && `${name}'s hobby tracker`}
      </h1>
      {bookRatings.length > 0 && (
        <>
          <p className="text-2xl text-white">Recently Read</p>
          <div className="w-3/6">
            <BookRatingsTable bookRatings={bookRatings} />
            <Link className="text-white" href="/books">{`See all book ratings${
              name ? ` for ${name}` : ""
            }`}</Link>
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
