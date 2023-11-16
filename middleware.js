import { NextResponse } from 'next/server'
 
export function middleware(request) {
  if (request.nextUrl.pathname == "/dashboard") {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard/home"
    return NextResponse.redirect(url)
  }
}
