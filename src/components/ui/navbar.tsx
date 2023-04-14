import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useColorMode } from "~/hooks/useColorMode";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  const [colorMode, setColorMode] = useColorMode();
  const user = useUser();
  return (
    <nav className="bg-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between px-2 py-2">
          <div className="flex">
            <div className="mr-2 flex space-x-3">
              <Link href="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="mr-1 h-6 w-6 text-green-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                  />
                </svg>
                <span>Merc Streaks</span>
              </Link>
            </div>
            <div className="hidden items-center space-x-2 md:flex">
              <a href="/test">History</a>
              <a href="/test">Stats</a>
            </div>
          </div>

          <div className=" hidden items-center md:flex ">
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>

          <div className="flex items-center md:hidden">Mobile Button</div>
        </div>
        <div className="flex items-center md:hidden">Moble menu</div>
      </div>
    </nav>
  );
};

export { Navbar };
