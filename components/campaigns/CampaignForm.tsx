"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { upsertCampaign } from "@/app/(actions)/campaignActions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Campaign } from "@prisma/client"
import { revalidatePath } from "next/cache"
import dayjs from "dayjs"
import { redirect } from "next/navigation"

const campaignFormSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/),
  streakWinCount: z.coerce.number().min(1, {
    message: "streakWinCount must be at least 1.",
  }),
  isActive: z.boolean(),
})

export type ProfileFormValues = z.infer<typeof campaignFormSchema>

export default function CampaignForm({ campaign }: { campaign?: Campaign }) {
  const isEdit = !!campaign
  // ...
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: `${campaign?.name ?? ""}`,
      description: `${campaign?.description ?? ""}`,
      start: `${
        campaign?.start ? dayjs(campaign.start).format("YYYY-MM-DDThh:mm") : ""
      }`,
      end: `${
        campaign?.end ? dayjs(campaign.end).format("YYYY-MM-DDThh:mm") : ""
      }`,
      streakWinCount: campaign?.streakWinCount ?? 1,
      isActive: campaign?.isActive ?? false,
    },
  })

  async function handleSubmit() {
    const values = form.getValues()
    console.log(values.streakWinCount)
    const data = await upsertCampaign(values, isEdit ? campaign.id : undefined)
    console.log(data)
    //return redirect("/admin/campaigns")
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold">
        {isEdit ? "Edit" : "Create"} Campaign
      </h1>
      <div className="flex justify-center rounded-md">
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the public streak campaign display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a description..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the campagin description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>
                    Starting date and time for campaign. (Your Local Time)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ending date and time for campaign. (Your Local Time)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{
                required: true,
              }}
              name="streakWinCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Streak Count To Win</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The streak number needed to win.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{isEdit ? "Edit" : "Create"}</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
