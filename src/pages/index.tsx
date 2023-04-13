import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const { data } = api.events.getAll.useQuery();
  console.log(user);

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
        <div>
          {data?.map((event) => (
            <div key={event.id}>
              {event.homeTeam} vs {event.awayTeam} at{" "}
              {event.startTime.toLocaleString()}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
