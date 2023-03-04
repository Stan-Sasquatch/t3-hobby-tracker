import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function useRequireAuth() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData && typeof sessionData != "undefined") {
      router.push(`/signIn`);
    }
  }, [sessionData, router]);

  return sessionData;
}
export default useRequireAuth;
