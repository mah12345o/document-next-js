import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const isVerifyUser = cookieStore.get("token");

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isVerifyUser && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (pathname.startsWith("/login")) {
    if (isVerifyUser) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

console.log("middleware");

export const config = {
  matcher: ["/home/:path*", "/login/:path*", "/"],
};
