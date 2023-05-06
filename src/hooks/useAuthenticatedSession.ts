import { useSession } from "next-auth/react";

function useAuthenticatedSession() {
  const { data: sessionData, status } = useSession();

  if (status !== "authenticated") {
    throw new Error("Session not authenticated");
  }

  return sessionData;
}
export default useAuthenticatedSession;
