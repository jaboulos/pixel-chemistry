import { NextResponse } from 'next/server'
import { auth } from './auth'
import { authRoutes, publicRoutes } from './routes'

// Apply authentication middleware to handle different route access based on authentication status
export default auth((req) => {
  // Get the URL from the request
  const { nextUrl } = req
  console.log('nextUrl', nextUrl)

  // Get authentication status and convert it into a boolean
  const isLoggedIn = !!req.auth

  // Check if the request is for a public route
  const isPublic = publicRoutes.includes(nextUrl.pathname)

  // Check if the request is for an authentication route (e.g., login, register)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Allow access to public routes without authentication
  if (isPublic) {
    return NextResponse.next()
  }

  // If the request is for an authentication route and the user is already logged in, redirect to the members area
  if (isAuthRoute) {
    if (isLoggedIn) {
      // nextUrl is the base URL, here we are adding '/members' to it, so baseUrl + '/members'
      return NextResponse.redirect(new URL('/members', nextUrl))
    }
    // If they are not logged in, allow them to proceed to the authentication route
    return NextResponse.next()
  }

  // If the request is for a non-public route and the user is not logged in, redirect to the login page
  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // If none of the above conditions are met, allow the request to proceed
  return NextResponse.next()
})

/*
 * Middleware runs on every request unless specified otherwise
 * This config tells it what not to run on
 *
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
 *
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
