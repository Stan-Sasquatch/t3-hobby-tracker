import Link from "next/link";
import type { Navigation, WrapperProps } from "./models";

interface NavbarProps<T extends string> {
  pathname: string;
  navigation: Navigation<T>;
}

export default function Navbar<T extends string>({
  navigation,
  pathname,
  children,
}: NavbarProps<T> & WrapperProps) {
  return (
    <>
      <ul className="flex items-center justify-center bg-[#3f1d6f] py-3.5 text-white">
        {(Object.keys(navigation) as Array<keyof typeof navigation>).map(
          (key) => (
            <li
              className="m-4 inline rounded-lg bg-pink-400 bg-opacity-25 px-3"
              key={key}
            >
              <Link href={pathname + navigation[key].path}>
                {navigation[key].title}
              </Link>
            </li>
          )
        )}
      </ul>
      <div>{children}</div>
    </>
  );
}
