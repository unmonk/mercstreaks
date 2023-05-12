import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  return (
    <nav className="border-gray-200 bg-white dark:bg-zinc-800">
      {/* TOP NAV */}

      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-zinc-800 dark:border-zinc-600">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-zinc-700 group"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">
              Picks
            </span>
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-zinc-700 group"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">
              Stats
            </span>
          </button>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-zinc-700 group"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">
              Groups
            </span>
          </button>
          <span className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-zinc-700 group">
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
      <div className="flex-wrap items-center justify-between p-4 hidden md:flex mx-auto max-w-screen-xl ">
        <Link
          className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          href="/"
        >
          Streaks
        </Link>

        <div className="flex md:order-2">
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:focus:ring-zinc-600 md:hidden"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="inline-flex items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-cta"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-zinc-700 dark:bg-zinc-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-zinc-800">
            <li>
              <Link
                href="/"
                className="block rounded bg-green-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-green-700 md:dark:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/stats"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-500"
              >
                Stats
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-500"
              >
                History
              </Link>
            </li>
            <li>
              <Link
                href="/groups"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-900 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-green-700 md:dark:hover:bg-transparent md:dark:hover:text-green-500"
              >
                Groups
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-3 w-full border-b border-zinc-800 bg-black pl-3 text-center text-white rounded-b-lg">
        <SignedIn>Stash: $20,000 | Leader: 15 | Needed 1</SignedIn>
        <SignedOut>Stash: $20,000 | Leader: 15 | Join Today</SignedOut>
      </div>
    </nav>
  );
};

export { Navbar };
