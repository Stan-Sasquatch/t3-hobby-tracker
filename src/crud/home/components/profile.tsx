import BookRatingsTable from "@clientCrud/books/components/bookRatingsTable";
import VMediaRatingsTable from "@clientCrud/vMedia/components/VMediaRatingsTable";
import { trpc } from "@utils/trpc";
import useAuthFriendOrUser from "src/hooks/useAuthFriendOrUser";

interface ProfileProps {
  id: string;
}

const Profile = ({ id }: ProfileProps) => {
  useAuthFriendOrUser(id);
  const userData = trpc.users.getRecentActivitiesForUser.useQuery(id);
  const bookRatings = userData.data?.bookRatings ?? [];
  const filmRatings =
    userData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "FILM"
    ) ?? [];

  const tvRatings =
    userData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "TV"
    ) ?? [];

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
        {userData.data?.name && `${userData.data.name}'s hobby tracker`}
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
