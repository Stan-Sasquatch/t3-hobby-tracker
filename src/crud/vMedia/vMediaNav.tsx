import type { WrapperProps } from "../common/models";
import Navbar from "./../common/components/navBar";
import { vMediaNavigation } from "./models";

export default function VMediaNav({ children }: WrapperProps) {
  return (
    <Navbar navigation={vMediaNavigation} pathname="/vMedia" includeHome>
      {children}
    </Navbar>
  );
}
