import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
export default function Admin() {
  return (
    <>
      <SignedIn>Welcome To Admin</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
