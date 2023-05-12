import { DateTabs } from "@/components/DateTabs";

export default function Home() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrow2 = new Date(today);
  tomorrow2.setDate(tomorrow2.getDate() + 2);

  return (
    <div className="flex flex-col items-center">
      <DateTabs today={today} tomorrow={tomorrow} tomorrow2={tomorrow2} />
    </div>
  );
}
