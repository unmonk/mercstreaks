import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import CreateEventForm from "@/components/CreateEventForm";
export default function CreateEvent() {
  return (
    <>
      <SignedIn>
        Create Event
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
