import { useRouter } from "next/router";
import BooksNav from "../books/booksNav";
import ConnectionsNav from "../connections/connectionsNav";
import HomeNav from "../home/homeNav";
import type { WrapperProps } from "./models";

const layoutMap: {
  [key: string]: ({ children }: WrapperProps) => JSX.Element;
} = {
  signIn: ({ children }: WrapperProps) => <>{children}</>,
  "": HomeNav,
  books: BooksNav,
  connections: ConnectionsNav,
};

export const Layout = ({ children }: WrapperProps) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1] ?? "";
  const NavWrapper = layoutMap[basePath];

  return NavWrapper ? <NavWrapper>{children}</NavWrapper> : <>{children}</>;
};
