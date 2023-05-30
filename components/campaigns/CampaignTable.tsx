import { db } from "@/lib/db"
import { Switch } from "../ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import Link from "next/link"
import { Campaign } from "@prisma/client"

async function fetchCampaigns() {
  const campaigns = await db.campaign.findMany()
  campaigns.sort((a, b) => {
    if (a.isActive && !b.isActive) return -1
    if (!a.isActive && b.isActive) return 1
    if (a.start > b.start) return -1
    if (a.start < b.start) return 1
    return 0
  })
  return campaigns
}

function generateRows(campaigns: Campaign[]) {
  if (!campaigns) return null
  return campaigns.map((campaign: any) => (
    <TableRow
      key={campaign.id}
      className={`
      ${campaign.isActive ? "bg-yellow-50 dark:bg-slate-900" : ""}
      cursor-pointer
    `}
    >
      <TableCell>
        <Switch id="activate" checked={campaign.isActive} />
      </TableCell>
      <TableCell>{campaign.name}</TableCell>
      <TableCell>{campaign.description}</TableCell>
      <TableCell>{campaign.streakWinCount}</TableCell>
      <TableCell className="font-medium">
        {new Date(campaign.start).toLocaleString()}
      </TableCell>
      <TableCell className="font-medium">
        {new Date(campaign.end).toLocaleString()}
      </TableCell>
      <TableCell>
        <div className="flex justify-center space-x-2">
          <Button variant="ghost" size="sm">
            Delete
          </Button>
          <Link href={`/admin/campaigns/${campaign.id}`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  ))
}

export default async function CampaignTable() {
  const data = await fetchCampaigns()
  return (
    <>
      <div className="flex w-full flex-row justify-between pt-4">
        <h1 className="p-2 text-3xl font-bold">Campaigns</h1>
        <Link href="/admin/campaigns/new">
          <Button variant="default">Create Campaign</Button>
        </Link>
      </div>
      <div className="flex justify-center rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Active</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Win At</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{data && generateRows(data)}</TableBody>
        </Table>
      </div>
    </>
  )
}
