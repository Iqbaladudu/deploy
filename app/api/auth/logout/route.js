import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    cookies().delete("iaiaccess");
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  } catch (error) {
    return new Response("Terjadi kesalahan", { status: 500 });
  }
};
