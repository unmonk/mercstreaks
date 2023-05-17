import { auth } from "@clerk/nextjs";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

export default function Pick() {
  const { userId } = auth();
  if (userId) {
    const today = dayjs().format("YYYY-MM-DD");
    redirect(`/pick/${today}`);
  }
  return (
    <div>
      <div>Not Logged In Pick Page</div>
    </div>
  );
}
