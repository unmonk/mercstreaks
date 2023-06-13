import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs"
import { PickType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import dayjs from "dayjs"

async function getActivePick(userId: string | null) {
  "use server"
  if (!userId) return null
  const activePick = await db.pick.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
    include: {
      event: true,
    },
  })
  return activePick
}

async function getEvents(date: string | null) {
  "use server"
  if (!date) {
    const events = await db.event.findMany({
      where: {
        startTime: {
          gte: dayjs().toDate(),
        },
        endTime: {
          lte: dayjs().add(1, "day").toDate(),
        },
      },
      include: {
        picks: true,
        _count: {
          select: { picks: true },
        },
      },
    })
    return events
  } else {
    const events = await db.event.findMany({
      where: {
        startTime: {
          gte: dayjs(date).toDate(),
        },
        endTime: {
          lte: dayjs(date).add(1, "day").toDate(),
        },
      },
      include: {
        picks: true,
        _count: {
          select: { picks: true },
        },
      },
    })
    return events
  }
}

async function selectPick(eventId: string, option: PickType, path?: string) {
  "use server"
  const user = await currentUser()
  if (!user?.id) throw new Error("Not logged in")
  const activePick = await db.pick.findFirst({
    where: {
      userId: user.id,
      isActive: true,
    },
  })

  if (activePick) {
    throw new Error("Already Active Pick")
  }

  await db.pick.create({
    data: {
      userId: user.id,
      eventId: eventId,
      option: option,
      isActive: true,
    },
  })
  if (path) {
    revalidatePath(path)
  }
  revalidatePath(`/pick`)
}

async function deletePick(eventId: string, path?: string) {
  "use server"
  const user = await currentUser()
  if (!user?.id) throw new Error("Not logged in")
  const updatedPick = await db.pick.delete({
    where: {
      userId_eventId: {
        userId: user.id,
        eventId: eventId,
      },
    },
  })
  if (path) {
    revalidatePath(path)
  }
  revalidatePath(`/pick`)
}

export { getActivePick, selectPick, deletePick, getEvents }
