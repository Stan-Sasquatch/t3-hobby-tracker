import Link from "next/link";
import { useRouter } from "next/router";
import type { Navigation, WrapperProps } from "./models";

interface NavbarProps<T extends string> {
  pathname: string;
  navigation: Navigation<T>;
  includeHome: boolean;
}

export default function Navbar<T extends string>({
  navigation,
  pathname,
  includeHome,
  children,
}: NavbarProps<T> & WrapperProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex w-full items-center justify-center bg-[#3f1d6f] py-3.5 text-white">
        {includeHome && (
          <div className="m-4 inline rounded-lg bg-pink-400 bg-opacity-25 px-3">
            <Link href="/">Home</Link>
          </div>
        )}
        <ul className="flex w-2/3 items-center justify-center bg-[#3f1d6f] py-3.5 text-white">
          {(Object.keys(navigation) as Array<keyof typeof navigation>).map(
            (key) => {
              const disabled = navigation[key]?.disabled ?? false;
              const selected =
                router.asPath === pathname + navigation[key].path;

              console.log(pathname + navigation[key].path);
              console.log(router.asPath);
              return (
                <li
                  className={`m-4 inline rounded-lg ${
                    disabled ? "bg-slate-400" : "bg-pink-400"
                  } bg-opacity-25 px-3 ${
                    selected ? "border-2 border-blue-800" : ""
                  }`}
                  key={key}
                >
                  <Link href={disabled ? "#" : pathname + navigation[key].path}>
                    {navigation[key].title}
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
      <div>{children}</div>
    </>
  );
}
