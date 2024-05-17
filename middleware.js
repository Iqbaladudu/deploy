import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname == "/dashboard") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/labeling";
    return NextResponse.redirect(url);
  }
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !request.cookies.has("iaiaccess")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname == "/" && request.cookies.has("iaiaccess")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/labeling";
    return NextResponse.redirect(url);
  }
}
