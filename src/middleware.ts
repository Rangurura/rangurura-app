import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(
  req: NextRequest,
  res: NextResponse,
  next: () => void,
) {
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|login|signup/*|verify|_next/static|public|_next/image|favicon.ico|images|logo.svg|logo.png|rca.jpeg|favicon.svg|favicon.png).*)",
  ],
};
