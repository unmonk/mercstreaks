import { auth, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { userId, sessionClaims } = auth();
  const { eventId, option } = await req.json();

  if (!userId || !sessionClaims) {
    return redirectToSignIn();
  }

  //check if user has existing active pick
  //if so, return error
  //else, create pick
  //return success
  const activePick = await db.pick.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

  if (activePick) {
    return NextResponse.json({ error: "Already Active Pick" }, { status: 400 });
  }

  const newPick = await db.pick.create({
    data: {
      userId: userId,
      eventId: eventId,
      option: option,
      isActive: true,
    },
  });

  return NextResponse.json(newPick, { status: 200 });
}

export async function PUT(req: Request) {
  const { userId } = auth();
  const { eventId } = await req.json();
  if (!userId) {
    return redirectToSignIn();
  }
  if (!eventId) {
    return NextResponse.json(
      { error: "No event id provided" },
      { status: 400 }
    );
  }
  const updatedPick = await db.pick.update({
    where: {
      userId_eventId: {
        userId: userId,
        eventId: eventId,
      },
    },
    data: {
      isActive: false,
    },
  });
  return NextResponse.json(updatedPick, { status: 200 });
}

export async function GET(req: Request) {
  const { userId, sessionClaims } = auth();

  if (!userId || !sessionClaims) {
    return redirectToSignIn();
  }

  const activePick = await db.pick.findFirst({
    where: {
      userId: userId,
      isActive: true,
    },
  });

  return NextResponse.json(activePick, { status: 200 });
}
