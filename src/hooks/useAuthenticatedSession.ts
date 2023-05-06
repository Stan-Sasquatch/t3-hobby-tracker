import { useSession } from "next-auth/react";

function useAuthenticatedSession() {
  const { data: sessionData, status } = useSession();

  if (status !== "authenticated") {
    throw new Error("Session not authenticated");
  }

  if (!sessionData?.user) {
    throw new Error("User not found");
  }

  return sessionData;
}
export default useAuthenticatedSession;
