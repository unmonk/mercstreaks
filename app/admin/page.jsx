import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import CreateEventForm from "@/components/CreateEventForm";
export default function Admin() {
  return (
    <>
      <SignedIn>
        Welcome To Admin
        <CreateEventForm />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
