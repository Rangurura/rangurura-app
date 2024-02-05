import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(
  req: NextRequest,
  res: NextResponse,
  next: () => void,
) {
  const token = req.cookies.get("token")?.value;
  if (
    !token &&
    req.nextUrl.pathname !== "/" &&
    req.nextUrl.pathname !== "/locales/*"
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && req.nextUrl.pathname == "/login") {
    return NextResponse.redirect(new URL("/app/leader", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|*|login|register/*|verify|_next/static|public|_next/image|favicon.ico|images|logo.svg|logo.png|rca.jpeg|favicon.svg|favicon.png).*)",
  ],
};
