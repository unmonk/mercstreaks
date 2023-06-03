import { db } from "@/lib/db"
import { auth, redirectToSignIn } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  const { eventId } = params
  const { userId } = auth()
  if (!userId) {
    return redirectToSignIn()
  }
  if (!eventId) {
    return NextResponse.json({ error: "No event id provided" }, { status: 400 })
  }
  const deletedPick = await db.pick.delete({
    where: {
      userId_eventId: {
        userId: userId,
        eventId: eventId,
      },
    },
  })
  return NextResponse.json(deletedPick, { status: 200 })
}
