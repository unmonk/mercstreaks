import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { Eventbox } from "~/components/ui/eventbox";
import { Navbar } from "~/components/ui/navbar";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.events.getAll.useQuery();
  if (isLoading) return <div>...Loading</div>;
  if (!data) return <div>Something went wrong</div>;
  console.table(user);
  return (
    <>
      <Head>
        <title>Merc Streaks</title>
        <meta name="description" content="Mercs Streaks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dark h-screen w-screen bg-gray-200 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center">
          <div className="mb-3 border-b  border-slate-400 p-4">
            Stash: $20,000 | Leader: 15 | Needed 1
          </div>
          {!user.isSignedIn && <div>Sign in to play</div>}
          {!!user.isSignedIn && (
            <div className="flex w-3/5 flex-col gap-4">
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
