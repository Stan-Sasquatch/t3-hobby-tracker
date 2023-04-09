import type { WrapperProps } from "../../common/models";
import Navbar from "../../common/components/navBar";
import { homeNavigation } from "./models";

export default function HomeNav({ children }: WrapperProps) {
  return (
    <Navbar navigation={homeNavigation} pathname="" includeHome={false}>
      {children}
    </Navbar>
  );
}
