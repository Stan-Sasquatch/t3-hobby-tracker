import { trpc } from "@utils/trpc";
import useAuthenticatedSession from "./useAuthenticatedSession";

async function useAuthFriendOrUser(friendId: string) {
  const userData = trpc.users.getFriendsForUser.useQuery(friendId);
  const sessionData = useAuthenticatedSession();

  if (friendId === sessionData.user?.id) {
    return sessionData;
  }

  if (userData.isLoading) {
    return <h1>...Loading</h1>;
  }

  if (!userData.data?.userFriends.map((x) => x.user_id).includes(friendId)) {
    throw new Error("Not authorised to view this route");
  }

  return sessionData;
}
export default useAuthFriendOrUser;
