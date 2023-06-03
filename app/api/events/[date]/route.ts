import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import dayjs from "dayjs"

export async function GET(
  request: NextRequest,
  { params }: { params: { date: string } }
) {
  const searchParams = request.nextUrl.searchParams
  const date = params.date
  const skip = searchParams.get("skip")
  const take = searchParams.get("take")
  const events = await db.event.findMany({
    orderBy: {
      startTime: "asc",
    },
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
    take: take ? parseInt(take) : 15,
    skip: skip ? parseInt(skip) : 0,
  })
  return NextResponse.json(events)
}
