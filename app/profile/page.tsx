import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { auth } from "@clerk/nextjs";

export default async function ProfilePage() {
  const { sessionClaims, userId } = auth();
  const fullName: string = sessionClaims?.fullName as string;
  const imageUrl: string = sessionClaims?.image as string;
  const email: string = sessionClaims?.email as string;

  const firstInitial = fullName?.charAt(0);
  if (!userId || !sessionClaims) {
    return <div>No User Found</div>;
  }

  return (
    <div className="h-full w-full">
      <div className="grid grid-cols-2 gap-4 p-2">
        <Card className="m-1 p-2">
          <div className="flex flex-col items-center">
            <h2 className="mb-2">{fullName ?? userId}</h2>
            <Avatar>
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{firstInitial ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="w-1/2">
              <span className="font-semibold">Email:</span>
              <p>{email ?? "Email Not Found"}</p>
            </div>
            <div className="w-1/2">
              <span className="font-semibold">Full Name:</span>
              <p>{fullName ?? "Name Not Found"}</p>
            </div>
          </div>
        </Card>
        <Card className="m-1 h-full bg-red-500 p-2">Right Side</Card>
      </div>
    </div>
  );
}
