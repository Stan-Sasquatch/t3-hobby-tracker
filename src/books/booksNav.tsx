import type { WrapperProps } from "../common/models";
import Navbar from "../common/navBar";
import { booksNavigation } from "./models";

export default function BooksNav({ children }: WrapperProps) {
  return (
    <Navbar navigation={booksNavigation} pathname="/books">
      {children}
    </Navbar>
  );
}
