import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import type { WrapperProps } from "../crud/common/models";

function Auth({ children }: WrapperProps): JSX.Element {
  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!sessionData && typeof sessionData != "undefined") {
      router.push(`/signIn`);
    }
  }, [sessionData, router]);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default Auth;
