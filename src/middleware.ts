import { NextResponse, type NextRequest } from "next/server";

export function middleware() {
  return NextResponse.redirect(new URL("http://10.10.77.40:7899"))
}