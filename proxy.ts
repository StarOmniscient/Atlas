import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page, auth routes, and API routes
  if (pathname.startsWith("/auth") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }




  if (token?.email) {
      try {

        const user = await import("@/lib/prisma").then(m => m.default.user.findUnique({
            where: { email: token.email as string }
        }));

        if (user) {
            const needsUpdate = 
                user.username !== token.username || 
                user.displayName !== token.displayName || 
                user.avatarUrl !== token.avatarUrl;

            if (needsUpdate) {
                const newToken = {
                    ...token,
                    username: user.username,
                    displayName: user.displayName,
                    avatarUrl: user.avatarUrl,
                };

                // Re-encode token
                const encoded = await import("next-auth/jwt").then(m => m.encode({
                    token: newToken,
                    secret: process.env.NEXTAUTH_SECRET!,
                }));

                const response = NextResponse.next();
                
                // Determine cookie name based on environment
                const cookieName = process.env.NODE_ENV === "production" 
                    ? "__Secure-next-auth.session-token" 
                    : "next-auth.session-token";

                response.cookies.set(cookieName, encoded, {
                    httpOnly: true,
                    sameSite: "lax",
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                });
                
                return response;
            }
        }
      } catch (error) {
          console.error("Proxy session update validation failed:", error);
          // Continue request even if validation fails
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
