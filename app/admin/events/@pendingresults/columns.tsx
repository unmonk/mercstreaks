"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PendingEvent = {
  id: string
  question: string
  startTime: string
  endTime: string
}

export const columns: ColumnDef<PendingEvent>[] = [
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "startTime",
    header: "Started At",
  },
  {
    accessorKey: "endTime",
    header: "Estimated End Time",
  },
]
