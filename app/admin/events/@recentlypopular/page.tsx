import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default async function RecentlyPopularEvent() {
  return <DataTable columns={columns} data={[]} />
}
