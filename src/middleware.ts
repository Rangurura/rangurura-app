// import { getCookie } from "cookies-next";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";
// import toast from "react-hot-toast";

// export default function middleware(
//   req: NextRequest,
//   res: NextResponse,
//   next: () => void,
// ) {
//   const token = req.cookies.get("token")?.value;

//   // const decoded = jwtDecode(token ?? "");
//   // try {
//   //   const currentDate = new Date().toDateString();
//   //   const decodedDate = new Date(decoded.iat ?? "").toDateString();
//   //   console.log(`Current date: ${currentDate}`);
//   //   console.log(`Decoded date: ${decodedDate}`);
//   // } catch (error) {
//   //   console.error("Error parsing date:", error);
//   // }

//   if (
//     req.nextUrl.pathname.startsWith("/locales/") ||
//     req.nextUrl.pathname.startsWith("/assets/") ||
//     req.nextUrl.pathname === "/problem" ||
//     req.nextUrl.pathname === "/suggestion"
//   ) {
//     return NextResponse.next();
//   }
//   if (
//     !token &&
//     req.nextUrl.pathname !== "/login" &&
//     req.nextUrl.pathname !== "/"
//   ) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   if (
//     token &&
//     (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/")
//   ) {
//     const decoded = jwtDecode(token ?? "") as { role: string };
//     if (decoded.role === "ADMIN") {
//       return NextResponse.redirect(new URL("/app/leader", req.url));
//     } else if (decoded.role === "CITIZEN") {
//       return NextResponse.redirect(new URL("/app/citizen", req.url));
//     } else {
//       toast.error("Invalid Token!");
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|/problem/*|/suggestion|/|/locales/*|register/*|verify|forgot|reset|_next/static|public|_next/image|favicon.ico|images|/assets/*|logo.svg|logo.png|rca.jpeg|favicon.svg|favicon.png).*)",
//   ],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { Role } from "@/typings/base.type";

const roles = [
  "ADMIN",
  "APPLICANT",
  "EMPLOYEE",
  "NORMAL_EMPLOYEE",
  "SDF_SECRETARIATE",
  "GRANT_COMMITTEE",
  "DYNAMIC",
];
const whitelist = ["/", "/redirect", "/public","/login","/register","/verify","/forgot"];
function getRolePath(role: Role): string {
  switch (role.toLowerCase()) {
    case "police":
      return "/app/police";
    case "rib":
      return "/app/rib";
    case "umuturage":
      return "/app/citizen";
    case "umuyobozi":
      return "/app/leader";
    case "admin":
      return "/app/admin";
    default:
      return "/login";
  }
}

export const checkToken = (token: string) => {
  let decoded: any;
  try {
    decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    return !isExpired;
  } catch (error) {
    return false;
  }
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (whitelist.includes(request.nextUrl.pathname) && !token?.value) {
    return NextResponse.next();
  }
  if (!token?.value) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try {
    console.log("token", token);
    const decoded: any = jwtDecode(token.value);
    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired && !whitelist.includes(request.nextUrl.pathname)) {
      request.cookies.delete("token");
      return NextResponse.redirect(new URL("/", request.url));
    }
    const role = decoded?.role;
    console.log(role);
    const nextUrl = getRolePath(role ?? "");
    if (whitelist.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL(nextUrl, request.url));
    }
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL(nextUrl, request.url));
    }
    const roleInRoute = request.nextUrl.pathname.split("/")[1].toUpperCase();
    if (roles.includes(roleInRoute as Role) && role !== roleInRoute) {
      return NextResponse.next();
    }
    return NextResponse.next();
  } catch (error) {
    request.cookies.delete("token");
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|locales|_next/static/*|public|_next|images|logo.svg|logo.png|favicon.svg|favicon.png).*)",
  ],
};
