import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import CreateEventForm from "@/components/events/CreateEventForm";
export default function CreateEvent() {
  return (
    <>
      <SignedIn>
        <div className="flex flex-col items-center">
          <CreateEventForm />
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
