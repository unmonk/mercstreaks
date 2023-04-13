import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();

  return (
    <>
      <Head>
        <title>Merc Streaks</title>
        <meta name="description" content="Mercs Streaks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#eee8e8] to-[#4e7a35]">
        <div>
          {!user.isSignedIn && <SignInButton />}{" "}
          {!!user.isSignedIn && <SignOutButton />}{" "}
        </div>
      </main>
    </>
  );
};

export default Home;
