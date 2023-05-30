import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export default (async function CampaignBar() {
  const { userId } = auth()
  const activeCampaign = await db.campaign.findFirst({
    where: {
      isActive: true,
    },
  })

  return (
    <div className="w-full border-b border-zinc-800 bg-black py-1 pl-3 text-center text-white">
      {`Leader: ${activeCampaign ? activeCampaign.streakWinCount : 0} | ${
        userId ? "Needed 1" : "Sign Up To Play!"
      }`}
    </div>
  )
} as unknown as (props: any) => JSX.Element)
