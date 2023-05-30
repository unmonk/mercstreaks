import CampaignForm from "@/components/campaigns/CampaignForm"
import CampaignTable from "@/components/campaigns/CampaignTable"

export default async function CampaignPage() {
  return (
    <div className="flex w-full">
      <div>
        {/* @ts-expect-error Async Server Component */}
        <CampaignTable />
      </div>
    </div>
  )
}
