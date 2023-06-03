import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import dayjs from "dayjs"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const skip = searchParams.get("skip")
  const take = searchParams.get("take")
  const events = await db.event.findMany({
    orderBy: {
      startTime: "asc",
    },
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
    take: take ? parseInt(take) : 15,
    skip: skip ? parseInt(skip) : 0,
  })
  return NextResponse.json(events)
}

export async function POST(request: Request) {
  const body = await request.json()
  const event = await db.event.create({
    data: {
      description: body.description,
      leftOption: body.leftOption,
      rightOption: body.rightOption,
      startTime: body.startTime,
      endTime: body.endTime,
    },
  })
  return NextResponse.json(event)
}
