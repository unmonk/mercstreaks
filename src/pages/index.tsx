import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { Pickbox } from "~/components/ui/pickbox";
import { Eventbox } from "~/components/ui/eventbox";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.events.getAll.useQuery();
  console.log(user);

  if (isLoading) return <div>...Loading</div>;
  if (!data) return <div>Something went wrong</div>;
  return (
    <>
      <Head>
        <title>Merc Streaks</title>
        <meta name="description" content="Mercs Streaks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen justify-center bg-gradient-to-b from-[#eee8e8] to-[#a9bd9f]">
        <div className="h-full w-full border-x border-slate-400 p-4 md:max-w-2xl xl:max-w-screen-2xl">
          <div className="flex justify-end border-b  border-slate-400 p-4">
            {!user.isSignedIn && <SignInButton />}{" "}
            {!!user.isSignedIn && <SignOutButton />}{" "}
          </div>
          {!user.isSignedIn && <div>Sign in to play</div>}
          {!!user.isSignedIn && (
            <div className="flex flex-col gap-4 ">
              {data?.map((event) => (
                <Eventbox {...event} key={event.id} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
