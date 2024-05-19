import { NextRequest, NextResponse } from 'next/server'
import { decryptToken } from './utils'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const publicRoutes = ['/auth']
const roleLinks = {
  admin: [
    "/users",
    "/products",
    "/orders",
    "/invoices",
    "/categories",
    "/banners",
    "/brands",
    "/delivery-types",
    "/characteristics",
    "/payment-types",
  ],
  merchant: [
    "/products",
    "/orders",
    "/invoices",
  ],
};

 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  // const isProtectedRoute = !publicRoutes.includes(path)
  const isProtectedRoute = Object.values(roleLinks).some(links => links.includes(path));

  const isPublicRoute = publicRoutes.includes(path)
  
  
  if (isProtectedRoute) {
    // 3. Decrypt the session from the cookie 
    const token: string = cookies().get('access_token')?.value || ""
    const userDetails: any = await decryptToken(token)
    
    if (!userDetails || !userDetails.email || !userDetails.user_role) {
       return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }

    // Check if user is authorized for the route
    // @ts-ignore
    const allowedRoutes = roleLinks[userDetails.user_role];
    
    if (!allowedRoutes.includes(path)) {
      return NextResponse.redirect(new URL('/', req.nextUrl)); 
    }

  } else if (path === '/auth') {
    // If the user is logged in, redirect them to the home page
    const token: string = cookies().get('access_token')?.value || "";
    const userDetails: any = await decryptToken(token);

    if (userDetails && userDetails.email && userDetails.user_role) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
}