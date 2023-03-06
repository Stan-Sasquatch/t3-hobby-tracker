import { useRouter } from "next/router";
import type { WrapperProps } from "../crud/common/models";
import Auth from "./auth";

const UNRESTRICTED_PATHS = ["/signIn"];

export const AuthWrapper = ({ children }: WrapperProps) => {
  const router = useRouter();
  const requireAuth = !UNRESTRICTED_PATHS.some((path: string) => {
    return router.asPath.startsWith(path);
  });
  return requireAuth ? <Auth>{children}</Auth> : <>{children}</>;
};
