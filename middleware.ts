import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/user/login";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`/user/profile`, request.nextUrl));
  }

 
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user/login"],
};
