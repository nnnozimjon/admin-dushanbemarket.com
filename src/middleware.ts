import { NextRequest, NextResponse } from "next/server";
import { decryptToken } from "./utils";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const publicRoutes = ["/auth"];
const roleLinks = {
  admin: [
    "/users",
    "/categories",
    "/brands",
    "/delivery-types",
    "/characteristics",
    "/payment-types",
    "/widgets"
  ],
  merchant: ["/products", "/orders", "/profile"],
};

export default async function middleware(req: NextRequest, res: NextResponse) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  // const isProtectedRoute = !publicRoutes.includes(path)
  const isProtectedRoute = Object.values(roleLinks).some((links) =>
    links.includes(path)
  );

  // 3. Decrypt the session from the cookie
  const token: string = cookies().get("access_token")?.value || "";
  const userDetails: any = await decryptToken(token);

  if (isProtectedRoute) {
    if (!userDetails || !userDetails.email || !userDetails.user_role) {
      return NextResponse.redirect(new URL("/auth", req.nextUrl));
    }

    // Check if user is authorized for the route
    // @ts-ignore
    const allowedRoutes = roleLinks[userDetails.user_role];

    if (!allowedRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/products", req.nextUrl));
    }
  } else if (path === "/auth") {
    if (userDetails && userDetails.email && userDetails.user_role) {
      return NextResponse.redirect(new URL("/products", req.nextUrl));
    }
  } else if (!userDetails?.email && !userDetails?.user_role) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)"],
};
