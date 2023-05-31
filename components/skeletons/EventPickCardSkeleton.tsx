import { Skeleton } from "@/components/ui/skeleton"
export default function EventPickCardSkeleton({ num }: { num: number }) {
  const skeletons = Array.from({ length: num }).map((_, i) => (
    <div className="border-1 min-h-6 mb-6 w-5/6 gap-6 pb-6 md:w-3/4 xl:w-1/2">
      <div className="m-2 space-y-4">
        <Skeleton className="h-4" />
      </div>
      <div className="grid grid-flow-row grid-cols-5 md:grid-cols-5">
        <div className="col-span-1 flex justify-self-start">
          <div className="space-y-2">
            <Skeleton className="h-14 w-14" />
          </div>
        </div>
        <div className="col-span-1 flex justify-self-start">
          <Skeleton className="space-x-4" />
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>
        <div className="col-span-1 flex justify-self-start"></div>
        <div className="col-span-1 flex justify-self-end">
          <Skeleton className="h-14 w-14 rounded-full" />
          <Skeleton className="space-x-4" />
        </div>
        <div className="col-span-1 flex justify-self-end">
          <div className="space-y-2">
            <Skeleton className="h-14 w-14" />
          </div>
        </div>
      </div>
    </div>
  ))

  return <> {skeletons}</>
}
