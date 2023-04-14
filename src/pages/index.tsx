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
  return (
    <>
      <Head>
        <title>Merc Streaks</title>
        <meta name="description" content="Mercs Streaks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="bg-gray-200 dark:bg-gray-900">
        <div className="">
          <div className="mb-3 flex justify-end border-b  border-slate-400 p-4">
            Announcements, etc....., Current Pick? Three Tabs Pick | History |
            Search?
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
