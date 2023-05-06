import BookRatingsTable from "@clientCrud/books/components/bookRatingsTable";
import VMediaRatingsTable from "@clientCrud/vMedia/components/VMediaRatingsTable";
import { trpc } from "@utils/trpc";
import useAuthFriendOrUser from "src/hooks/useAuthFriendOrUser";
import Image from "next/image";
import Link from "next/link";
import Loading from "@clientCrud/common/components/loading";
import type { VMedia, VMediaRating, VisualMediaType } from "@prisma/client";

interface ProfileProps {
  id: string;
  imageUrl: string;
  name: string;
}

const Profile = ({ id, name, imageUrl }: ProfileProps) => {
  const { sessionData, isLoading } = useAuthFriendOrUser(id);
  const userActivityData = trpc.users.getRecentActivitiesForUser.useQuery(id);
  const isCurrentUsersProfile = id === sessionData.user?.id;
  const bookRatings = userActivityData.data?.bookRatings ?? [];
  const filmRatings =
    userActivityData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "FILM"
    ) ?? [];

  const tvRatings =
    userActivityData.data?.vMediaRatings.filter(
      (x) => x.vMedia.visualMediaType === "TV"
    ) ?? [];

  if (isLoading) {
    return <Loading />;
  }

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
            <Link
              className="text-white"
              href={
                isCurrentUsersProfile ? "/books" : `/connections/${id}/books`
              }
            >{`See all book ratings${name ? ` for ${name}` : ""}`}</Link>
          </div>
        </>
      )}
      <p className="text-2xl text-white">Recently Watched</p>
      <VMediaRatingsDisplay
        ratings={filmRatings}
        isCurrentUsersProfile={isCurrentUsersProfile}
        id={id}
        name={name}
        mediaType={"FILM"}
      />
      <VMediaRatingsDisplay
        ratings={tvRatings}
        isCurrentUsersProfile={isCurrentUsersProfile}
        id={id}
        name={name}
        mediaType={"TV"}
      />
    </div>
  );
};

export default Profile;

function VMediaRatingsDisplay({
  ratings,
  isCurrentUsersProfile,
  id,
  name,
  mediaType,
}: {
  ratings: (VMediaRating & {
    vMedia: VMedia;
  })[];
  isCurrentUsersProfile: boolean;
  id: string;
  name: string;
  mediaType: VisualMediaType;
}) {
  return (
    <div className="w-3/6">
      <VMediaRatingsTable vMediaRatings={ratings} vMediaType={mediaType} />
      <Link
        className="text-white"
        href={
          isCurrentUsersProfile
            ? `/vMedia?mediaType=${mediaType}`
            : `/connections/${id}/vMedia?mediaType=${mediaType}`
        }
      >{`See all ${mediaType.toLocaleLowerCase()} ratings${
        name ? ` for ${name}` : ""
      }`}</Link>
    </div>
  );
}
