import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function useRequireAuth() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!sessionData && typeof sessionData != "undefined") {
      router.push(`/`);
    }
  }, [sessionData, router]);

  return sessionData;
}
export default useRequireAuth;
