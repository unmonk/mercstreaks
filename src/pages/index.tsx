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
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow2 = new Date(today);
  tomorrow2.setDate(tomorrow2.getDate() + 2);
  console.log(data);
  return (
    <>
      <Head>
        <title>Merc Streaks</title>
        <meta name="description" content="Mercs Streaks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dark h-screen w-screen bg-gradient-to-t from-green-950 to-green-600">
        <Navbar />

        <div className="flex flex-col items-center">
          <div className="center mb-3  w-full border-b border-zinc-800 bg-black pl-3 text-white">
            Stash: $20,000 | Leader: 15 | Needed 1
          </div>
          {/* Date Picker */}
          <div className="mb-3 flex w-full flex-wrap border-b  border-zinc-800 p-4">
            <button className="m-0 w-1/3 border-2 border-r-0 border-black bg-slate-800 bg-gradient-to-b from-slate-600 p-2 text-white">
              {today.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </button>
            <button className=" m-0 w-1/3 border-b-2 border-t-2 border-black bg-green-800 bg-gradient-to-b from-green-700 p-2 text-white">
              {tomorrow.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </button>
            <button className="m-0 w-1/3 border-2 border-l-0 border-black  bg-slate-800 bg-gradient-to-b from-slate-600 p-2  text-white">
              {tomorrow2.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </button>
          </div>
          {!user.isSignedIn && <div>Sign in to play</div>}
          {!!user.isSignedIn && (
            <div className="flex w-5/6 flex-col gap-4">
              {data?.map((event) => (
                <Eventbox
                  {...event}
                  temperature={event._count.picks}
                  key={event.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
