import HomeCTA from "@/components/home/CallToAction";
import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (userId) {
    const today = dayjs().format("YYYY-MM-DD");
    redirect(`/pick/${today}`);
  }
  return (
    <div>
      <HomeCTA />
      <div></div>
    </div>
  );
}
