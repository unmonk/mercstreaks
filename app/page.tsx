import HomeCTA from "@/components/home/CallToAction"
import { auth } from "@clerk/nextjs"
import dayjs from "dayjs"
import { redirect } from "next/navigation"

export default function Home() {
  const { userId } = auth()
  if (userId) {
    redirect("/pick")
  }
  return (
    <div>
      <HomeCTA />
      <div></div>
    </div>
  )
}
