import { auth } from "@clerk/nextjs";

export default function CampaignBar() {
  const { userId } = auth();
  return (
    <div className="w-full border-b border-zinc-800 bg-black py-1 pl-3 text-center text-white">
      {`Leader: 15 | ${userId ? "Needed 1" : "Sign Up To Play!"}`}
    </div>
  );
}
