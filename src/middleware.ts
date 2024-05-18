import { NextRequest, NextResponse } from 'next/server'
import { decryptToken } from './utils'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const publicRoutes = ['/auth']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = !publicRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
  
  // 3. Decrypt the session from the cookie 
  const token: string = cookies().get('access_token')?.value || ""
  const userDetails:any = await decryptToken(token)
  
  if (isProtectedRoute) {
    if (!userDetails?.email) {
      return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }

    if (!(userDetails?.user_role === 'merchant')) {
      return NextResponse.redirect(new URL('/auth', req.nextUrl));
    }
  }

  if (
    isPublicRoute &&
    userDetails?.email &&
    userDetails?.user_role === 'merchant'
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$).*)'],
}