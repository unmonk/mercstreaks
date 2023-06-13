"use client"
import { LayoutGrid, ListMusic, Radio, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

export default function Sidebar({ className }: { className?: string }) {
  const generateResults = async () => {
    const results = await fetch("/api/cron/eventresults", {
      method: "POST",
    })
  }
  const generateEvents = async () => {
    const results = await fetch("/api/cron/scheduletoevents", {
      method: "POST",
    })
  }
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Admin
          </h2>
          <div className="space-y-1">
            <Link href="/admin/events">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                Events
              </Button>
            </Link>
            <Link href="/admin/campaigns">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Radio className="mr-2 h-4 w-4" />
                Campaigns
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Stuff
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => generateEvents()}
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Generate Events
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={() => generateResults()}
            >
              <ListMusic className="mr-2 h-4 w-4" />
              Generate Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
