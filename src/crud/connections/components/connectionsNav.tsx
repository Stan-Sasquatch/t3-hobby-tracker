import type { WrapperProps } from "../../common/models";
import Navbar from "../../common/components/navBar";
import { connectionsNavigation } from "../models";

export default function ConnectionsNav({ children }: WrapperProps) {
  return (
    <Navbar
      navigation={connectionsNavigation}
      pathname="/connections"
      includeHome
    >
      {children}
    </Navbar>
  );
}
