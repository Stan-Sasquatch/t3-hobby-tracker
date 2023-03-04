import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { UNRESTRICTED_PATHS } from "../auth/paths";
import Auth from "../auth/Auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const noAuth = UNRESTRICTED_PATHS.some((path: string) =>
    router.asPath.startsWith(path)
  );
  return (
    <SessionProvider session={session}>
      {noAuth ? (
        <Component {...pageProps} />
      ) : (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      )}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
