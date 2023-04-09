import type { WrapperProps } from "@clientCrud/common/models";
import Navbar from "@clientCrud/common/components/navBar";
import { booksNavigation } from "./../models";

export default function BooksNav({ children }: WrapperProps) {
  return (
    <Navbar navigation={booksNavigation} pathname="/books" includeHome>
      {children}
    </Navbar>
  );
}
