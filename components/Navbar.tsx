"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckSquareIcon,
  UserIcon,
  Users2Icon,
  TrophyIcon,
  SettingsIcon,
} from "lucide-react";

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  const topNavLinks = [
    { name: "Home", href: "/" },
    { name: "Stats", href: "/stats" },
    { name: "Groups", href: "/groups" },
    { name: "History", href: "/history" },
  ];
  const bottomNavLinks = [
    { name: "Pick", href: "/", icon: <CheckSquareIcon size={28} /> },
    { name: "Profile", href: "/stats", icon: <UserIcon size={28} /> },
    { name: "Groups", href: "/groups", icon: <Users2Icon size={28} /> },
    {
      name: "Leaders",
      href: "/leaderboard",
      icon: <TrophyIcon size={28} />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SettingsIcon size={28} />,
    },
  ];
  const pathname = usePathname();
  const { userId } = useAuth();

  return (
    <>
      <nav className="w-full border-gray-200 bg-white dark:bg-zinc-800">
        {/* BOTTOM NAV */}

        <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 md:hidden">
          <div className="mx-auto grid h-full max-w-lg grid-cols-5 font-medium">
            {bottomNavLinks.map((link) => {
              let isActive = false;
              link.href === "/"
                ? (isActive = pathname === link.href)
                : (isActive = pathname.startsWith(link.href));
              if (link.name === "Settings" && !userId) {
                return <SignInButton mode="redirect" key={link.name} />;
              }
              return (
                <button
                  type="button"
                  className={
                    isActive
                      ? "group inline-flex flex-col items-center justify-center bg-gray-50 px-5 dark:bg-zinc-700"
                      : "group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-zinc-700"
                  }
                  key={link.name}
                >
                  {link.icon}
                  <Link
                    className="flex flex-col items-center text-sm text-gray-500 group-hover:text-green-600 dark:text-gray-400 dark:group-hover:text-green-500"
                    href={link.href}
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                </button>
              );
            })}
          </div>
        </div>

        {/* TOP NAV */}
        <div className=" mx-auto hidden w-full max-w-screen-xl flex-wrap items-center justify-between p-4 md:flex ">
          <Link
            className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
            href="/"
          >
            Streaks
          </Link>

          <div
            className="hidden w-full items-center justify-between md:flex md:w-auto"
            id="navbar-cta"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-zinc-700 dark:bg-zinc-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-zinc-800">
              {topNavLinks.map((link) => {
                let isActive = false;
                link.href === "/"
                  ? (isActive = pathname === link.href)
                  : (isActive = pathname.startsWith(link.href));
                return (
                  <li
                    key={link.name}
                    className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-500"
                  >
                    <Link
                      href={link.href}
                      className={
                        isActive
                          ? "text-green-600 dark:hover:text-green-500"
                          : "block rounded p-0 hover:bg-transparent hover:text-green-700 dark:text-white dark:hover:bg-transparent dark:hover:text-green-500"
                      }
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect" />
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
