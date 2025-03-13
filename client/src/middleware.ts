import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    const session = await auth();
    if (
        session &&
        (request.nextUrl.pathname === "/login" ||
            request.nextUrl.pathname === "/register")
    ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/protected/:path*", "/login", "/register"],
};
