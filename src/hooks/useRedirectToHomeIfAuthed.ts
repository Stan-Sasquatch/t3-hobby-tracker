import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function useRedirectToHomeIfAuthed() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionData) {
      router.push(`/`);
    }
  }, [sessionData, router]);

  return sessionData;
}
export default useRedirectToHomeIfAuthed;
