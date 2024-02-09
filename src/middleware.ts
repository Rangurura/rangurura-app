import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

export default function middleware(
  req: NextRequest,
  res: NextResponse,
  next: () => void,
) {
  const token = req.cookies.get("token")?.value;
  
  // Add an exception for translation files
  if (req.nextUrl.pathname.startsWith("/locales/")) {
    return NextResponse.next();
  }
  
  if (
    !token &&
    req.nextUrl.pathname !== "/" &&
    req.nextUrl.pathname !== "/locales/*"
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
  }
  
  if (token && req.nextUrl.pathname == "/login") {
    const decoded = jwtDecode(token ?? "");
    if(decoded.role === "ADMIN"){
      return NextResponse.redirect(new URL("/app/leader", req.url));
    }
    else if(decoded.role === "CITIZEN"){
      return NextResponse.redirect(new URL("/app/citizen", req.url));
    }
    else{
      toast.error("Invalid Token!")
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|/problem|/suggestion|/|/locales/*|login|register/*|verify|_next/static|public|_next/image|favicon.ico|images|logo.svg|logo.png|rca.jpeg|favicon.svg|favicon.png).*)",
  ],
};
