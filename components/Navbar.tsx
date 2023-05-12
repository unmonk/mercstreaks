"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  const picksIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-combine"
    >
      <rect width="8" height="8" x="2" y="2" rx="2"></rect>
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"></path>
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2"></path>
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1"></path>
      <polyline points="7 21 10 18 7 15"></polyline>
      <rect width="8" height="8" x="14" y="14" rx="2"></rect>
    </svg>
  );

  const statsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-bar-chart-3"
    >
      <path d="M3 3v18h18"></path>
      <path d="M18 17V9"></path>
      <path d="M13 17V5"></path>
      <path d="M8 17v-3"></path>
    </svg>
  );

  const groupIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-users-2"
    >
      <path d="M14 19a6 6 0 0 0-12 0"></path>
      <circle cx="8" cy="9" r="4"></circle>
      <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"></path>
    </svg>
  );

  const topNavLinks = [
    { name: "Home", href: "/" },
    { name: "Stats", href: "/stats" },
    { name: "Groups", href: "/groups" },
    { name: "History", href: "/history" },
  ];
  const bottomNavLinks = [
    { name: "Picks", href: "/", icon: picksIcon },
    { name: "Stats", href: "/stats", icon: statsIcon },
    { name: "Groups", href: "/groups", icon: groupIcon },
  ];
  const pathname = usePathname();

  return (
    <nav className="border-gray-200 bg-white dark:bg-zinc-800">
      {/* TOP NAV */}

      <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-zinc-600 dark:bg-zinc-800 md:hidden">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {bottomNavLinks.map((link) => {
            let isActive = false;
            link.href === "/"
              ? (isActive = pathname === link.href)
              : (isActive = pathname.startsWith(link.href));
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
          <span className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-zinc-700">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="redirect" />
            </SignedOut>
          </span>
        </div>
      </div>

      {/* TOP NAV */}
      <div className="mx-auto hidden max-w-screen-xl flex-wrap items-center justify-between p-4 md:flex ">
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
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="redirect" />
        </SignedOut>
      </div>
      <div className="mb-3 w-full border-b border-zinc-800 bg-black pl-3 text-center text-white">
        <SignedIn>Stash: $20,000 | Leader: 15 | Needed 1</SignedIn>
        <SignedOut>Stash: $20,000 | Leader: 15 | Join Today</SignedOut>
      </div>
    </nav>
  );
};

export { Navbar };
