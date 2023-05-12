import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const events = await db.event.findMany();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();
  const event = await db.event.create({
    data: {
      description: body.description,
      leftOption: body.leftOption,
      rightOption: body.rightOption,
      startTime: body.startTime,
      endTime: body.endTime,
    },
  });
  return NextResponse.json(event);
}
