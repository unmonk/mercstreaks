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
