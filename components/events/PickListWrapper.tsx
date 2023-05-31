"use client"
import dayjs from "dayjs"
import EventPickList from "./EventPickList"
import { useParams } from "next/navigation"

export default async function PickListWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  let today = dayjs().format("YYYY-MM-DD")
  const params = useParams()
  let usingParms = false
  if (params.date) {
    today = dayjs(params.date).format("YYYY-MM-DD")
    usingParms = true
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <EventPickList date={today} useParam={usingParms} />
    </>
  )
}
