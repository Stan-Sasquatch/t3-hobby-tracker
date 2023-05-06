import { trpc } from "@utils/trpc";
import useAuthenticatedSession from "./useAuthenticatedSession";

function useAuthFriendOrUser(friendId: string) {
  const userData = trpc.users.getFriendsForUser.useQuery();
  const sessionData = useAuthenticatedSession();

  if (friendId === sessionData.user?.id) {
    return { sessionData, isLoading: false };
  }

  if (
    !userData.isLoading &&
    !userData.data?.userFriends.map((x) => x.friend_id).includes(friendId)
  ) {
    throw new Error("Not authorised to view this route");
  }

  return { sessionData, isLoading: userData.isLoading };
}
export default useAuthFriendOrUser;
