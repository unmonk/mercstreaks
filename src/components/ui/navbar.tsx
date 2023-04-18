import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
  const user = useUser();
  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
          href="/"
        >
          Merc Streaks
        </Link>

        <div className="flex md:order-2">
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
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
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <UserButton />}
          </div>
        </div>
        <div
          className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-cta"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
            <li>
              <a
                href="#"
                className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Stats
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                History
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Groups
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };

// <nav className="bg-gray-100">
// <div className="mx-auto max-w-6xl">
//   <div className="flex justify-between px-2 py-2">
//     <div className="flex">
//       <div className="mr-2 flex space-x-3">
//         <Link href="/" className="flex items-center">
//           <span>Merc Streaks</span>
//         </Link>
//       </div>
//       <div className="hidden items-center space-x-2 md:flex">
//         <a href="/test">My Groups</a>
//         <a href="/test">Leaderboards</a>
//       </div>
//     </div>

//     <div className=" hidden items-center md:flex ">
//       {!user.isSignedIn && <SignInButton />}
//       {!!user.isSignedIn && <SignOutButton />}
//     </div>

//     <div className="flex items-center md:hidden">Mobile Button</div>
//   </div>
//   <div className="flex items-center md:hidden">Moble menu</div>
// </div>
// </nav>
