import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default async function PendingResultsEvents() {
  return <DataTable columns={columns} data={[]} />
}
