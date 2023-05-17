import { authMiddleware } from "@clerk/nextjs";
import { AuthObject } from "@clerk/nextjs/dist/server";
import { NextRequest, NextResponse } from "next/server";

export async function pickTimezoneMiddleware(req: NextRequest) {
  const { nextUrl: url, headers } = req;
  const timezone = headers.get("x-vercel-ip-timezone");
  url.searchParams.set("tz", timezone ?? "America/New_York");
  return NextResponse.rewrite(url);
}

export default authMiddleware({
  afterAuth(auth, req, evt) {
    return pickTimezoneMiddleware(req);
  },
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};
