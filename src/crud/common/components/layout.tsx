import { useRouter } from "next/router";
import ConnectionsNav from "@clientCrud/connections/components/connectionsNav";
import HomeNav from "@clientCrud/home/components/homeNav";
import type { WrapperProps } from "../models";
import VMediaNav from "@clientCrud/vMedia/components/vMediaNav";
import BooksNav from "@clientCrud/books/components/booksNav";

const layoutMap: {
  [key: string]: ({ children }: WrapperProps) => JSX.Element;
} = {
  signIn: ({ children }: WrapperProps) => <>{children}</>,
  "": HomeNav,
  books: BooksNav,
  connections: ConnectionsNav,
  vMedia: VMediaNav,
};

export const Layout = ({ children }: WrapperProps) => {
  const router = useRouter();
  const basePath = router.pathname.split("/")[1] ?? "";
  const NavWrapper = layoutMap[basePath];

  return NavWrapper ? <NavWrapper>{children}</NavWrapper> : <>{children}</>;
};
