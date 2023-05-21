import React from "react";
import { auth } from "@clerk/nextjs";
import { ActivePickCard } from "./ActivePickCard";
import { db } from "@/lib/db";

export default (async function ActivePick() {
  const { userId } = auth();

  if (userId) {
    const activePick = await db.pick.findFirst({
      where: {
        userId: userId,
        isActive: true,
      },
      include: {
        event: true,
      },
    });
    if (activePick) {
      return <>{activePick && <ActivePickCard activePick={activePick} />}</>;
    }
  }
  return null;
} as unknown as (props: any) => JSX.Element);
