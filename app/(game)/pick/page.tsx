import DateTabs from "@/components/DateTabs"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import dayjs from "dayjs"
import { redirect } from "next/navigation"

export default function Pick() {
  const { userId } = auth()
  if (!userId) {
    redirectToSignIn()
  }

  return (
    <div>
      <DateTabs />
    </div>
  )
}
